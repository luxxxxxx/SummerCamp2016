'use strict';


const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const testDB = require('./connect.js');
const crypto = require('crypto');


function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'));
app.set('view engine', 'hbs');


app.post('/sign', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let secret = md5(password);

    testDB.query('INSERT INTO users SET ?', {id: null ,username: username, password: secret}, function(err, rows) {
        if(err) {
            console.log(err);
        } else {
            console.log(rows);
            res.end('注册成功');
        }
    });

});
app.post('/login', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let secret = md5(password);

    testDB.query('SELECT username, password FROM users WHERE username = ?', [username], function(err, rows) {
        if(err) {
            console.log(err);
        } else {
            if(rows[0].password === secret) {
                res.end('登录成功');
            }
        }
    });
});

app.all('/', function(req, res) {
    res.end('all');
})


let server = http.createServer(app);


server.listen(3000);
console.log('server run at 3000;');


