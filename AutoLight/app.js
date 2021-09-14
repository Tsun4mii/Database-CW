const express = require('express');
const fs = require('fs');
const app = express();
var path = require("path");
var exphbs = require("express-handlebars");

app.use(express.static("./"));
app.use(express.static(path.join(__dirname, "public")));
app.engine('.hbs', exphbs({ defaultLayout: 'index', extname: '.hbs', layoutsDir: "views" }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.post('/login', (req, res)=>{
    res.render('index.hbs')
})
app.get("/login",(req, res)=>
{
    res.sendFile(__dirname + '/views/login.html');
});
app.get('/', (req, res)=>{
    res.end('hi');
})
app.listen(5000);