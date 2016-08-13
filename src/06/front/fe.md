# 今天的主题是node

### 但是我要先说函数

+ javascript中的函数

  + 函数表达式 ```var fun = function(){}```

  + 函数声明 ```function fun(){};```

  + 函数表达式与函数声明的转换

    ​

  + 自执行函数

    + 依赖自执行函数实现的块级作用域

    + 依赖自执行函数实现的函数懒加载

      ​



+   箭头函数

    + 语法

    + 箭头函数的this(没有自己的this)

    + 箭头函数的arguments(没有自己的arguments对象)

      ​


​	命令式的编程和过程式的编程






+ 函数是一等公民

  + 什么叫一等公民函数

  + 函数可以作为参数传递

  + 函数可以作为返回值返回





+ javascript中的高阶函数

  + 什么是高阶函数

    ​

    刷题

    1:  求a到b整数之和

    2:  求a到b的平方之和

    3:  求a到b立方之和

    ​

  + 回调 & 异步

    + 什么是回调

      Callback 即 call then back 被主**函数**调用运算后会返回主**函数**），是指通过**函数**参数传递到其它代码的，某一块可执行代码的引用。 

      example:

      ```javascript
      [1, 2, 3, 4].forEach(item => console.log(item));
      ```

      ​


+ 但是它的意义是什么?



+ 什么是异步

  ta是程序控制流风格

​       example: 


    ​```javascript
    ajax({
      url: 'hongyan.cqupt.edu.cn',
      success: function(res) {
      	console.log(res);
      }
    })
    ​```
    
    + 它又有什么意义

​	






## Node



### HTTP协议



从浏览器打开一个网页说起

```
用户填uri -> 浏览器发起请求  -> 服务查找资源 -> 渲染数据 -> 服务器返回资源   -> 用户得到资源
```



典型的请求头: 

```
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Encoding:gzip
Accept-Language:zh-CN,zh;q=0.8,en;q=0.6
Cache-Control:no-cache
Connection:keep-alive
Cookie:bid=S9AvLayy8ok; ll="108309"; _vwo_uuid_v2=56A49133A5404EE8D05B18E52F874ACE|70f4bfc20018344623a5d2aaee6e86e7; _pk_id.100001.4cf6=1c8d82026fbd9bb8.1471058481.1.1471058502.1471058481.; _pk_ses.100001.4cf6=*; __utma=30149280.337288159.1471058486.1471058486.1471058486.1; __utmb=30149280.0.10.1471058486; __utmc=30149280; __utmz=30149280.1471058486.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=223695111.70097285.1471058486.1471058486.1471058486.1; __utmb=223695111.0.10.1471058486; __utmc=223695111; __utmz=223695111.1471058486.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)
Host:movie.douban.com
User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36
```



keep-alive:  http:  1.2以下版本 





典型的响应头

```
Cache-Control:no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Connection:Keep-Alive
Content-Type:text/html; charset=gb2312
Date:Sat, 13 Aug 2016 03:33:57 GMT
Expires:Thu, 19 Nov 1981 08:52:00 GMT
Keep-Alive:timeout=5, max=100
Pragma:no-cache
Server:Apache/2.4.20 (Win64) PHP/5.6.22
Transfer-Encoding:chunked
X-Powered-By:PHP/5.6.22
```

一些Content-type

```json
{
  	'htm'   : 'text/html',
	'html'  : 'text/html',
	'js'    : 'application/x-javascript',
	'css'   : 'text/css',
	'jpg'   : 'image/jpeg',
	'jpe'   : 'image/jpeg',
	'jpeg'  : 'image/jpeg',
	'png'   : 'image/png',
	'zip'   : 'application/zip',
	'doc'   : 'application/msword'
}
```

### HTTP 模块

+ request 

  + request.url


  + request.method
  + event: data

  ​

+ response

  + response.write	

  + response.end

  + response.writeHeader

    ​

    ​

## Buffer

二进制流