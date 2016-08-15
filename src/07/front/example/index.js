'use strict';
const http = require('http');

const querystring = require('querystring');


const server = http.createServer(function (req, res) {


    let dataStr = '';
    req.on('data', function(data) { 
        dataStr += data;
    });

    req.on('end', function() {
        console.log(dataStr);
        // let decodeURIString = decodeURI(dataStr);
        // let params = querystring.parse(decodeURIString);
        // console.log(params);
        // req.body = params
    });

});


server.listen(10000);

console.log('server run in 127.0.0.1:10000');