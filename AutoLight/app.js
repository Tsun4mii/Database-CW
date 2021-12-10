const express = require('express');
const fs = require('fs');
const app = express();
var path = require("path");
const cookieSession = require('cookie-session');
var exphbs = require("express-handlebars");
const Db = require('./DB/db')
const mDb = require('./DB/masterDb');
let DB = new Db();
let mDB = new mDb();

let sess;

app.use(express.static("./"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieSession({
    name: 'session',
    keys: ['shh', 'its a secret']
}))
app.engine('.hbs', exphbs({ defaultLayout: 'index', extname: '.hbs', layoutsDir: "views" }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/reg', (req, res)=>{
    res.sendFile(__dirname + '/views/register.html');
})

app.post('/api/reg', (req, res)=>{
    console.log(req.body.login);
    DB.regUser(req.body.login, req.body.password, req.body.email, req.body.firstName, req.body.lastName, req.body.sex, req.body.age, req.body.userType)
    .then(() => {
        res.json({status:'OK'})
    });
})

app.post('/api/backup', (req, res)=>{
    let filePath = '../Backups/CW_DB.bak';
    if(fs.existsSync(filePath))
    {
        fs.unlinkSync(filePath);
        DB.backupDb().then(() => {
            res.json({status: 'OK'})
        }).catch(err => {
            res.json(err)
        });
    }
    else
    {
        DB.backupDb().then(() => {
            res.json({status: 'OK'})
        }).catch(err => {
            res.json(err)
        });
    }
})
app.post('/api/resireNewIn', (req,res) => 
{
    console.log(req.body.newDbName);
    let name = "'"+req.body.newDbName + "'";
    mDB.restoreNewInstance(name);
})
app.post('/api/restore', (req, res)=>{
    mDB.restoreDb(req, res).then(() => {
        res.json({status: 'OK'})
    });
})

app.post('/login', (req, res)=>{
    console.log(req.body.login + ' ' + req.body.password);
    DB.login(req, res, req.body.password, req.body.login).then(data =>{
    }).catch(err => {
        console.log(err);
    });
})
app.get('/testdata', (req, res) => {
    res.sendFile(__dirname + '/views/testdata.html');
})
app.get("/login",(req, res)=>
{
    res.sendFile(__dirname + '/views/login.html');
});
app.post('/logout', (req, res)=>{
    req.session = null;
    res.redirect('http://localhost:5000/')
})
app.get('/adminreg', (req,res) =>{
    res.sendFile(__dirname + '/views/adminreg.html')
})
app.post('/adminreg', (req, res) => {
    DB.regAdmin(req.body.login, req.body.password ,req.body.adminType, req.body.employeeId, res);
})
app.get('/adminlog', (req, res) =>{
    res.sendFile(__dirname + '/views/adminlog.html')
})
app.post('/adminlog', (req, res)=>{
    DB.logAdmin(req.body.login,req.body.password, res, req);
})
app.get('/user', (req, res) => {
    if(req.session.role == 'user'){
    res.sendFile(__dirname + '/views/user.html');
    }
    else{
        res.sendFile(__dirname + '/views/errors/PrivError.html');
    }
})
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/index.html');
})
app.post('/', (req, res)=>{
    DB.selectAllUsers2(req, res);
})
app.get('/api/:proc',(req,res)=>{
    let proc = req.params.proc;
    DB.execNoParams(req, res, proc);
})
app.post('/export/:type', (req, res) => {
    let proc = req.params.type;
    if(proc == 'ExProdToXml'){
        DB.ExProdToXml(req, res)
    }
    else if(proc == 'ImProdFromXml'){
        DB.ImProdFromXml(req, res).then(() => {
            res.json({status: 'OK'})
        });
    }
})
app.get('/admin', (req, res)=>{
    if(req.session.role == 'admin'){
    res.sendFile(__dirname + '/views/admin.html');
    }
    else{
        res.sendFile(__dirname + '/views/errors/PrivError.html');
    }

})

app.post('/control/:fun/:exec', (req, res) => {
    let param = '';
    let json = req.body;
    let Exec = req.params.exec + req.params.fun;
    for(key in json)
    {
        param += ("'"+json[key]+"',");
    }
    param = param.slice(0, param.length-1);
    DB.execWithParams(Exec, param, res).then(records => {
        res.json({status:"OK"});
    }).catch(err => {
        res.sendFile(__dirname + '/views/errors/DMLError.html');
    });
})

app.get('/api/:proc/:start/:end',(req,res)=>{
    let proc = req.params.proc;
    let params = '';
    params += req.params.start + ', ' + req.params.end;
    DB.execWithParams(proc,params, res).then(records => 
        {
            res.json(records.recordset)});
})
app.post('/api/search', (req, res) => {
    let code = req.body.code;
    DB.execWithParams('SearchProd', code, res).then(records => 
        {
            res.json(records.recordset)
        });
})
app.post('/api/changeDb', (req,res)=>{
    let dbName = req.body.name;
    DB.connectToReserve(dbName, res);
})
app.post('/api/addToBucket', (req, res) => {
    let code = req.body.code;
    let amount = req.body.amount;
    let login = req.session.login;
    let params = code + ', ' + login + ', ' + amount;
    DB.execWithParams('AddToBucket', params, res).then(records =>
        {
            res.json({status:'OK'});
        }).catch(err => {
            console.log(err);
        })
})
app.post('/api/OBucket', (req, res)=>{
    let id = req.session.id;
    let params = req.body.start + ', ' + req.body.end +', ' + id;
    DB.execWithParams('OBucket', params, res).then(records => {
        res.json(records.recordset);
    }).catch(err => {
        console.log('not error');
    })
})
app.listen(5000);

//TODO: 
/*
1. Добавить поставщиков и связать с товарами + вывод в таблицу ---- DONE!
2. Добавить вывод по страницам(20 элементов) ---- DONE! FIX: сделать для всех функций ----DONE
3. Добавить функционал восстановления в новую бд ----DONE 
4. Доделать CRUD и формы для всех нужных сущностей
5. Оформить страницу обычного юзера ----  DONE
6. Добавить сессии и роутинг по сессии  ----DONE
7. Автоген 100000 строк для продуктов 
8. Индексы
9. ЕБУЧИЙ РЕФАКТОР --DONE?
*/