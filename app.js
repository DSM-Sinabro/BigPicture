var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "1234"
});

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/main.html');
});

app.get('/noticelist/:pagenum', function(req, res) {
    console.log(req.params.pageNum);
    res.sendFile(__dirname + '/public/html/noticelist.html');
});

app.get('/notice/:postnum', function(req, res) {
    res.sendFile(__dirname + 'public/html/noticeview.html');
});

app.get('/mypage/:myinfo', function(req, res) {
    res.sendFile(__dirname + '/public/html/mypage.html');
});

app.get('/searchBookList', function(req, res) {
    res.sendFile(__dirname + '/public/html/searchbook.html');
});

app.get('/news', function(req, res) {
    res.sendFile(__dirname + '/public/html/news.html');
});

app.post('/signin', function(req, res) {
    res.sendFile(__dirname + '/public/html/main.html');
});

app.post('/signout', function(req, res) {
    res.sendFile(__dirname + '/public/html/main.html');
});

app.post('/suggest', function(req, res) {
    res.sendFile(__dirname + '/public/html/suggest.html');
});

app.post('/apply', function(req, res) {
    res.sendFile(__dirname + '/public/html/apply.html');
});

app.post('/borrowExtend', function(req, res) {
    res.sendFile(__dirname + '/public/html/mypage.html');
});

app.post('/searchBook', function(req, res) {
    res.sendFile(__dirname + '/public/html/searchbook.html');
});

app.listen(3000, function() {
    console.log('port 3000 is opened');
});
