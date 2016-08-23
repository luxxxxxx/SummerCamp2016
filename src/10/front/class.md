## RESTful

+ 起源

  REST 这个词，是 Roy Thomas Fielding 在他 2000 年的博士论文中提出的。

  ​

+ 名称

  Fielding 将他对互联网软件的架构原则，定名为 REST，即 Representational State Transfer 的缩写。我对这个词组的翻译是 "表现层状态转化"。
  如果一个架构符合 REST 原则，就称它为 RESTful 架构。



+ URI 

  用于标识某一互联网资源名称的字符串

  ​


+ 资源 Resources

  REST 的名称 "表现层状态转化" 中，省略了主语。“表现层 "其实指的是" 资源”（Resources）的 "表现层"。

  **所谓 "资源"，就是网络上的一个实体，或者说是网络上的一个具体信息。**它可以是一段文本、一张图片、一首歌曲、一种服务，总之就是一个具体的实在。你可以用一个 URI 指向它，每种资源对应一个特定的 URI。要获取这个资源，访问它的 URI 就可以，因此 URI 就成了每一个资源的地址或独一无二的识别符。

  ​

+ 表现层 Representation

  “资源 "是一种信息实体，它可以有多种外在表现形式。我们把" 资源 "具体呈现出来的形式，叫做它的" 表现层”（Representation）。



+ 状态转化 State Transfer

  访问一个网站，就代表了客户端和服务器的一个互动过程。在这个过程中，势必涉及到数据和状态的变化

  ​

+ CRUD

  + C: create

  + R: read

  + U: update

  + D: delete

    ​


+ 五个 HTTP 动词

  + GET

    获取

  + DELETE

    删除

  + POST

    创造

  + PUT

    更新或替换

  + PATCH

    局部更新

    ​

    ​



+ 综述, 什么是 RESTful 架构
  1. 每一个 URI 代表一种资源；

  2. 客户端和服务器之间，传递这种资源的某种表现层；

  3. 客户端通过四个 HTTP 动词，对服务器端资源进行操作，实现 "表现层状态转化"。

     ​

     ​



+ 注意

  + URI 应该是名词,而不包含动词

  + 在 URI 中加入版本号 ?  

    ```

    	http://www.example.com/app/1.0/foo
    　　
    　　 http://www.example.com/app/1.1/foo
    　　
    　　 http://www.example.com/app/2.0/foo
    　　
    ```

    **处理办法**: 

    版本号可以在 HTTP 请求头信息的 Accept 字段中进行区分

    ```
    　　Accept: vnd.example-com.foo+json; version=1.0
    　　Accept: vnd.example-com.foo+json; version=1.1
    　　Accept: vnd.example-com.foo+json; version=2.0
    ```



参考: 

http://www.ruanyifeng.com/blog/2011/09/restful

http://www.ruanyifeng.com/blog/2014/05/restful_api.html







## 单页 web 应用

+ web2.0 ajax

+ 从一个 web 应用开始  栗子:  gitbook

+ 路由

  + hash 跳转

    监听 window 的  hashchange 事件,针对不同的 hash 做不同的处理,可以前进后退

  + history api

    用 history.pushState 往浏览器历史里塞个地址,然后触发window.onpopstate 事件就可以根据当前 URI 地址中的查询内容让对应的菜单执行 Ajax 载入，实现 Ajax 的前进与后退效果

    参考: http://www.zhangxinxu.com/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/

    https://www.zeroling.com/the-usage-of-pjax/




### MV*

+ model

  用于封装与应用程序的业务逻辑相关的数据以及对数据的处理方法

+ view

  能够实现数据有目的的显示


