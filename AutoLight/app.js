const express = require('express');
const fs = require('fs');
const app = express();
var path = require("path");
var exphbs = require("express-handlebars");
const Db = require('./DB/db')
const mDb = require('./DB/masterDb');
let DB = new Db();
let mDB = new mDb();

app.use(express.static("./"));
app.use(express.static(path.join(__dirname, "public")));
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
    DB.regUser(req.body.login, req.body.password, req.body.email, req.body.firstName, req.body.lastName, req.body.sex, req.body.age, req.body.userType);
})

app.post('/api/backup', (req, res)=>{
    let filePath = '../Backups/CW_DB.bak';
    if(fs.existsSync(filePath))
    {
        fs.unlinkSync(filePath);
        DB.backupDb();
    }
    else
    {
        DB.backupDb();
    }
})
app.post('/api/restore', (req, res)=>{
    mDB.restoreDb(req, res);
})

app.post('/login', (req, res)=>{
    console.log(req.body.login + ' ' + req.body.password);
    DB.login(req, res, req.body.password, req.body.login);
})
app.get('/testdata', (req, res) => {
    res.sendFile(__dirname + '/views/testdata.html');
})
app.get("/login",(req, res)=>
{
    res.sendFile(__dirname + '/views/login.html');
});
app.get('/', (req, res)=>{
    res.end('hi');
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
        DB.ImProdFromXml(req, res);
    }
})
app.get('/admin', (req, res)=>{
    res.sendFile(__dirname + '/views/admin.html');
})
app.listen(5000);

//TODO: 1) Процедура, которая создает новую базу данных и восстанавливает ее со старого бэкапа
// 2) JS функции для взаимодействия с этой процедурой 
// 3) Процедуры вывода всех остальных данных
// 4) JS функции для генераций таблиц для оставшихся данных 