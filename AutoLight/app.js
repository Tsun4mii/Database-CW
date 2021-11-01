const express = require('express');
const fs = require('fs');
const app = express();
var path = require("path");
var exphbs = require("express-handlebars");
const Db = require('./DB/db')
let DB = new Db();

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
    DB.backupDb();
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
app.listen(5000);