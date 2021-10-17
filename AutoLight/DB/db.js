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
    selectAllUsers(req, res)
    {
        sql.connect(config).then(pool => {
            return pool.request().execute('selAllUsers',(err, data)=>{
                res.send(data.recordset);
            });
        });
    }
}

module.exports = DB