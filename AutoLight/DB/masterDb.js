const sql = require('mssql/msnodesqlv8');

const config = {
    "driver":"msnodesqlv8",
    "connectionString": "Driver={SQL Server Native Client 11.0};Server={DESKTOP-23I014S};Database={master};Trusted_Connection={yes};"
}

let connectionPool;

class masterDb {
    constructor(){
        connectionPool = new sql.ConnectionPool(config).connect().then(pool =>{
            console.log('Connected to master');
            return pool;
        }).catch(err => console.log('Connection failed: ', err));
    }

    async restoreDb(req, res){
        sql.connect(config).then(pool => {
            return pool.request().execute('restoreDB');
        })
    }
}

module.exports = masterDb;