// var isArray = require("./my_modules/isArray");
// var myTool = require("./my_modules/myTool");
/*
*   寻找的方式是按照路径文件名来找 后缀不加默认 js
*   一个模块可以是对象 也可以是函数
*/



/* patch member imgs from SNH48 official website */

import fs from "fs";
import child_process from 'child_process';

import request from "request";
import cheerio from "cheerio";

/*
*   fs 和 child_process 是 node.js 自带的核心模块 直接引用
*   request 和 cheerio 是使用 npm 下载的模块
*/

const dir_name = './images';
const page_url = "http://www.snh48.com/member_detail.php?sid=";
let counter = 0;

function prepare_dir (dir_name) {
    fs.open(dir_name, 'r+', (err) => {
        if (err) {
            console.log(err);
            if (err.errno == -2) {
                let exec = child_process.exec;
                let codes = "mkdir " + dir_name;

                exec(codes, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("创建目录成功");
                    }
                });
            }

        }
    });
}
function patch_pic (target_url) {
    request(target_url, (err, res, body) => {
        if (!err && res.statusCode == 200) {
            let $ = cheerio.load(body);
            let target = $('.mem_p img').toArray()[0];
            let name = target.attribs.alt.replace(/\s.+/g, "") + ".jpg";
            let uri = target.attribs.src;

            if (name != ".jpg") {
                download(uri, name, dir_name, (err) => {
                    if (err) {
                        console.log(arr);
                    } else {
                        counter ++;
                        console.log("第" + counter + "张照片 " + name + " 下载完成");
                    }
                });
            }
        }
    });
}
function download (target_url, filename, pathname, callback) {
    request(target_url).pipe(fs.createWriteStream(pathname + '/' + filename)).on('close', callback);
}

prepare_dir(dir_name);
for (let i = 1; i < 200; i++) {
    patch_pic(page_url + i);
}