const sql = require('mssql/msnodesqlv8');
const bcrypt = require('bcrypt');

const config = {
    "driver":"msnodesqlv8",
    "connectionString": "Driver={SQL Server Native Client 11.0};Server={DESKTOP-23I014S};Database={CW_DB};Trusted_Connection={yes};"
}

let connectionPool;

class DB {
    constructor(){
        connectionPool = new sql.ConnectionPool(config).connect().then(pool =>{
            console.log('Connected to MSSQL server');
            return pool;
        }).catch(err => console.log('Connection failed: ', err));
    }

    async backupDb()
    {
        return connectionPool.then(pool => {
             pool.request().execute('backupDB');
        })
    }

    async restoreDb(){
        return connectionPool.then(pool => {
            pool.request().execute('restoreDB');
        })
    }

    selectAllUsers2(req, res)
    {
        sql.connect(config).then(pool => {
            return pool.request().query('EXEC selAllUsers',(err, data)=>{
                res.send(data.recordset);
            })
        })
    }

    regAdmin(login, password, tid, eid, res)
    {
        let encPass = bcrypt.hashSync(password, 5);
        return connectionPool.then(pool => pool.query(`exec regAdmin '${login}', '${encPass}', '${tid}', '${eid}'`, (err, data)=>{
            if(data.rowsAffected == -1)
            {
                res.json({status: 'ERROR'});
            }
            else 
            {
                res.redirect('http://localhost:5000/admin')
            }
        }))
    }

    async regUser(login, password, email, firstName, secondName, sex, age, userType)
    {
        let encPass = await bcrypt.hash(password, 10);
        console.log(encPass);
        return connectionPool.then(pool => {
            pool.request().input('login', sql.NVarChar, login)
            .input('password', sql.NVarChar, encPass)
            .input('email', sql.NVarChar, email)
            .input('firstName', sql.NVarChar, firstName)
            .input('secondName', sql.NVarChar, secondName)
            .input('sex', sql.NChar, sex)
            .input('age', sql.Int, age)
            .input('userType', sql.Int, userType)
            .execute('regUser');
        }).catch(err => {
            console.log(err);
        })
    }
    logAdmin(login, password, res, req)
    {
        return connectionPool.then(pool => 
            pool.query(`exec logAdmin ${login}`, (err, data)=>{
                console.log(data);
                if(bcrypt.compareSync(password, data.recordset[0].adminPassword))
                {
                    req.session.login = login;
                    req.session.role = 'admin';
                    res.redirect('http://localhost:5000/admin');
                }
                else{
                    res.json({status:'ERROR'})
                }
            }))
    }
    async login(req, res, password, login)
    {
        return connectionPool.then(pool => {
            pool.request().input('login', sql.NVarChar, login)
            .execute('selOneUser',(err, data)=>{
                if(bcrypt.compareSync(password, data.recordset[0].password))
                {
                    req.session.login = data.recordset[0].login;
                    req.session.role = 'user';
                    res.redirect('http://localhost:5000/user');
                }
                else{
                    res.json({status:'ERROR'})
                }
                if(data === undefined)
                {
                    res.json({status:'ERROR'})
                }
            }); 
        }).catch(err => {
            console.log(err);
            console.log('WRONG login or pass');
        })
    }
    selectAllUsers(req, res)
    {
        sql.connect(config).then(pool => {
            return pool.request().execute('selAllUsers',(err, data)=>{
                res.send(data.recordset);
            });
        });
    }

    execNoParams(req, res, procName)
    {
        return connectionPool.then(pool => {
            return pool.request().query(`exec ${procName}`, (err, data)=> {
                res.send(data.recordset);
            });

        })
    }

    execWithParams(procName, params, res)
    {
        return connectionPool.then(pool => 
             pool.query(`exec ${procName} ${params}`))
    }

    ExProdToXml(req, res)
    {
        return connectionPool.then(pool => {
            pool.request().execute('ExProdToXml', (err, data) =>{
                res.send(data.recordsets[0]);
            })
        })
    }

    ImProdFromXml(req, res)
    {
        return connectionPool.then(pool => {
                pool.request().execute('ImProdfromXml', (err, data) =>{
                res.send(data.recordsets[0]);
            })
        })
    }
}

module.exports = DB