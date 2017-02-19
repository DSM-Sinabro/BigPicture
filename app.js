var express = require('express');
var path = require('path');
var mysql = require('mysql');
var session = require('express-session');
var parser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:true)});
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "alswl7580",
    database : "booktopia"
});

connection.connect(function(err) {
    if(err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

app.use(express.static(path.join(__dirname,'public')));

app.use(session({
    secret: 'duck',
    resave: false,
    saveUninitialized: true
}))

app.get('/', function(req, res) {
    res.render('Main', {status: req.session.id});
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

app.post('/login', function(req, res) {
    var id = res.body.id;
    var pwd = res.body.pwd;
    var data = [id, pwd];
    connection.query('select *from userinfo where id='+ id,
    function(err, rows) {
        console.log(rows[0].pwd);
        if(err) {
            console.log(err);
        } else {
            if(rows.length == 0) {
                res.status(500).send('잘못된 회원 정보입니다.');
            } else {
                req.session.userid = id;
                req.session.usernum = rows[0].user_number;
                sess = true;
                res.send({msg: '로그인에 성공하였습니다.'});
            }
        }
    });
})

app.listen(3000, function() {
    console.log('port 3000 is opened');
});
