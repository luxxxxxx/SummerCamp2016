### 第二节课 重新介绍 node.js npm and blablabla （早点入坑...逃

+ 建议开发环境 node.js@4+ && npm@3+ 
  - https://nodejs.org/


+ npm init
  - package.json


+ require 和 module.exports
  - CommonJS 规范
    - 模块引用 require
      - 接受模块标识并引入到上下文中
    - 模块定义 exports
      - exports 是 module 的属性，用来将方法挂载在该对象上
    - 模块标识 module
      - 对象 模块本身，在 node.js 中，一个模块就是文件本身
  - require 方法如何寻找模块
    - node_modules
  - 核心模块 文件（自定义）模块
  - *.js || *.node || *.json || others
  - ES6 中关于 module 的部分 http://es6.ruanyifeng.com/#docs/module
  - 自己写一下


+ npm install 使用 npm 下载模块
  - --save || -S (添加到项目依赖中) 
  - --save-dev || -D (添加到项目开发环境依赖中)
  - -g || --global (全局)
  - -d (显示 loglevel info)
  - 下载指定版本的模块
  - cnpm || rednpm
    - 装 bash 装 zsh 啥的


+ 解锁一个新项目的正确姿势
  - git init
  - .gitignore
  - npm init
  - npm install


+ 写个小 demo?
  - fs
  - request https://www.npmjs.com/package/request
  - cherrio https://www.npmjs.com/package/cheerio
  - 页面地址 "http://www.snh48.com/member_detail.php?sid="

  - ES6 写法 
    - - 可以写 ES6 
    - node@6- 需要安装 babel
    - babel-core babel-preset-es2015
    - .babelrc
      -	"presets": ["es2015"]
    - node@6+ 滋瓷 ES6 用了都说吼啊


+ 再来看看官方给出的 demo
  - 创建一个 http 服务器 https://nodejs.org/en/about/
  - 遇到不懂的函数 看看 api


+ npm 处理依赖
  【链接】npm3的依赖管理方案
  http://yanni4night.com/2016/01/01/npm3-dependencies/


+ gulp webpack
  - 所以到底是拿来干啥的


+ 用 gulp 写的项目传不上去 git 为啥
  - 是不是 .gitignore 没有做好


+ .gitignore 文件 使用 npm 构建项目时候一般需要忽略的文件
  - .DS_Store
  - node_modules
  - .idea
  - git rm -r --cached .


+ gulp 前天大明推荐的插件
  - 推荐的一些写法


+ 炒鸡入门的教程
  - 菜鸟教程 http://www.runoob.com/nodejs/nodejs-tutorial.html 只能说能用 不太建议看 但是如果对 node.js 啥都不懂的话可以先敲一下这个
  - 去年上一届的推荐给我们的七天教程 http://www.lvtao.net/content/book/node.js.htm


+ node.js api 中文文档 gitbook 在线看 || 下载到本地
  - 稍微老一点版本的 https://www.gitbook.com/book/davidcai1993/nodejs-api-doc-in-chinese/details
  - node.js@6.1 的 https://www.gitbook.com/book/dynastywind/nodejs-v6-1-api-documentation/details


+ 要求
  - 把 node 环境搭好
  - 专题网尽量使用 gulp 提高效率
  - 写得怎么样了
  - 提高效率 不怕踩坑 多学姿势 注意作息
  - git


+ 作业
  - 尝试用原生 fs + http 两个模块写个搞图片的程序
  - 提示 
    - 只需要用到图片的连接 用 http 去请求就可以了 不用先去扒整个网页的链接 
    - 并不是所有的链接都有图
    - http 需要创建 server 监听端口
    - dl: 周日 24:00 前