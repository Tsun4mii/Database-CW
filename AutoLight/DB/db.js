const sql = require('mssql/msnodesqlv8');
const argon = require('argon2');

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
        sql.connect(config).then(pool => {
            return pool.request().execute('backupDB');
        })
    }

    async restoreDb(){
        sql.connect(config).then(pool => {
            return pool.request().execute('restoreDB');
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

    async regUser(login, password, email, firstName, secondName, sex, age, userType)
    {
        let encPass = await argon.hash(password);
        sql.connect(config).then(pool => {
            return pool.request().input('login', sql.NVarChar, login)
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
    async login(req, res, password, login)
    {
        let recs;
        console.log(login +' '+ password);
        let hashPassword = await argon.hash(password);
        console.log(hashPassword);
        sql.connect(config).then(pool => {
            return pool.request().input('login', sql.NVarChar, login)
            .input('pass', sql.NVarChar, hashPassword)
            .execute('LoginUser',(err, data)=>{
                if(data.recordset[0] !== null)
                {
                    console.log(data.recordset[0]);
                    res.redirect('http://localhost:5000/testdata');
                }
                else throw new Error('Wrong login or password');
            });
        }).catch(err => {
            console.log(err);
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
        sql.connect(config).then(pool => {
            return pool.request().query(`exec ${procName}`, (err, data)=> {
                res.send(data.recordset);
            });

        })
    }

    execWithParams(procName, params)
    {
        sql.connect(config).then(pool => {
            return pool.request().query(`exec ${procName} ${params}`);
        })
    }
}

module.exports = DB