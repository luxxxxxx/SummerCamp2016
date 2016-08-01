## 数组
函数 | 描述
-|-
array_combine()|	通过合并两个数组来创建一个新数组
array_keys()|	返回数组中所有的键名
array_key_exists()|	检查指定的键名是否存在于数组中。|
array_merge()|	把一个或多个数组合并为一个数组。|
array_pop()|	删除数组的最后一个元素（出栈）。|
array_push()|	将一个或多个元素插入数组的末尾（入栈）。
array_unshift()|	在数组开头插入一个或多个元素
array_search()|	搜索数组中给定的值并返回键名。
array_sum()	|返回数组中值的和。
arsort()|	对关联数组按照键值进行降序排序。
asort()	|对关联数组按照键值进行升序排序。
count()	|返回数组中元素的数目。
### foreach
http://www.laruence.com/2009/08/23/1065.html 
### json
通过AJAX传到PHP的json字符串有时候加上反斜杠”\”来转义，PHP处理时需要先去掉反斜杠，然后再json_decode.
$str = stripslashes($_POST['json']); 
$arr = json_decode($str,true); 
### var_export
- mixed var_export ( mixed $expression [, bool $return ] )
此函数返回关于传递给该函数的变量的结构信息，它和 var_dump() 类似，不同的是其返回的表示是合法的 PHP 代码。可以通过将函数的第二个参数设置为 TRUE，从而返回变量的表示。
### var_dump
```
<?php
$a = array (1, 2, array ("a", "b", "c"));
var_export ($a);

/* 输出：
array (
  0 => 1,
  1 => 2,
  2 => 
  array (
    0 => 'a',
    1 => 'b',
    2 => 'c',
  ),
)
*/

$b = 3.1;
$v = var_export($b, TRUE);
echo $v;

/* 输出：
3.1
*/
```
## 对象方面
### self()
- new self()返回当类类的一个实例，有父类就是父类的

### static()
- new static()返回当前类的一个实例，就是本类，子类自己，和$this很像，new static()相当于$class = get_class($this); return new $class();
```


class A {
  public static function get_self() {
    return new self();
  }

  public static function get_static() {
    return new static();
  }
}

class B extends A {}

echo get_class(B::get_self()); // A
echo get_class(B::get_static()); // B
echo get_class(A::get_static()); // A

```

### method_exists()
- method_exists(object obj,string funcName)

### fgetcsv($url)
- 当一个接口返回csv 数据时，使用fgetcsv函数接收，该函数会用逗号作为分隔符将读取的每一行数据转存为数组的一个元素。

## 时间函数

### 时区设置
- date_default_timezone_set('PRC');
- - date.timezone = Pdate.timezone = PRC

### 获取指定时间戳
- mktime(hour,minute,second,month,day,year,is_dst)
echo "$time";
- strtotime(2015-05-20 15:21:23)
```
strtotime("now");
strtotime("3 October 2005");
strtotime("+5 hours");
获取某月的天数：
$month_days =date('t',mktime(0,0,0,$thisMonth,1,$thisYear));
$month_days=date('t',strtotime($thisYear.'-'.$thisMonth.'-01'));日期格式
```

### date_format()
- 过程化风格：由 date_create() 返回的 DateTime 类型的对象。
```
过程化风格
<?php
$date = date_create('2000-01-01');
echo date_format($date, 'Y-m-d H:i:s');
?>
```
- 面向对象风格
```
<?php
$date = new DateTime('2000-01-01');
echo $date->format('Y-m-d H:i:s');
?>
```

### 加密函数
- md5
```
  上面这段代码是不是很熟悉？然而MD5的加密方式目前在PHP的江湖中貌似不太受欢迎了，因为它的加密算法实在是显得有点简单了，而且很多破解密码的站点都存放了很多经过MD5加密的密码字符串，所以这里我是非常不提倡还在单单使用MD5来加密用户的密码的。
```
 
- password_hash(pass,算法,salt,cost)
    盐值（salt）选项从 PHP 7.0.0 开始被废弃（deprecated）了。 现在最好选择简单的使用默认产生的盐值。
```
$pass = ‘123456’;
$pass_hash = password_hash($pass,PASSWORD_DEFAULT,[’salt’=>’22位盐值’,’cost'=>10]);
if(password_verify($pass,$pass_hash)) 
    echo ’true’;
```

```
这里才是我们的重头戏，Password Hashing API是PHP 5.5之后才有的新特性，它主要是提供下面几个函数供我们使用：

password_hash() – 对密码加密.
password_verify() – 验证已经加密的密码，检验其hash字串是否一致.
password_needs_rehash() – 给密码重新加密.
password_get_info() – 返回加密算法的名称和一些相关信息.

虽然说crypt()函数在使用上已足够，但是password_hash()不仅可以使我们的代码更加简短，而且还在安全方面给了我们更好的保障，所以，现在PHP的官方都是推荐这种方式来加密用户的密码，很多流行的框架比如Laravel就是用的这种加密方式。

<?php
$hash = password_hash($passwod, PASSWORD_DEFAULT);

对，就是这么简单，一行代码，All done。

PASSWORD_DEFAULT目前使用的就是Bcrypt，所以在上面我会说推荐这个，不过因为Password Hashing API做得更好了，我必须郑重地想你推荐Password Hashing API。这里需要注意的是，如果你代码使用的都是PASSWORD_DEFAULT加密方式，那么在数据库的表中，password字段就得设置超过60个字符长度，你也可以使用PASSWORD_BCRYPT，这个时候，加密后字串总是60个字符长度。

这里使用password_hash()你完全可以不提供盐值(salt)和 消耗值 (cost)，你可以将后者理解为一种性能的消耗值，cost越大，加密算法越复杂，消耗的内存也就越大。当然，如果你需要指定对应的盐值和消耗值，你可以这样写：

<?php
$options = [
    'salt' => custom_function_for_salt(), //write your own code to generate a suitable salt
    'cost' => 12 // the default cost is 10
];
$hash = password_hash($password, PASSWORD_DEFAULT, $options);

密码加密过后，我们需要对密码进行验证，以此来判断用户输入的密码是否正确：

<?php
if (password_verify($password, $hash)) {
    // Pass
}
else {
    // Invalid
}

很简单的吧，直接使用password_verify就可以对我们之前加密过的字符串（存在数据库中）进行验证了。

然而，如果有时候我们需要更改我们的加密方式，如某一天我们突然想更换一下盐值或者提高一下消耗值，我们这时候就要使用到password_needs_rehash()函数了：

<?php
if (password_needs_rehash($hash, PASSWORD_DEFAULT, ['cost' => 12])) {
    // cost change to 12
    $hash = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);

    // don't forget to store the new hash!
}

只有这样，PHP的Password Hashing API才会知道我们重现更换了加密方式，这样的主要目的就是为了后面的密码验证。

简单地说一下password_get_info()，这个函数一般可以看到下面三个信息：

algo – 算法实例
algoName – 算法名字
options – 加密时候的可选参数

所以，现在就开始用PHP 5.5吧，别再纠结低版本了。

```
- hash('sha256',pass)
<?php
$password = hash("sha256", $password);

PHP内置了hash()函数，你只需要将加密方式传给hash()函数就好了。你可以直接指明sha256, sha512, md5, sha1等加密方式。
```
其实跟前面的MD5同期的还有一个SHA1加密方式的，不过也是算法比较简单，所以这里就一笔带过吧。而这里即将要说到的SHA256 和 SHA512都是来自于SHA2家族的加密函数，看名字可能你就猜的出来了，这两个加密方式分别生成256和512比特长度的hash字串。

他们的使用方法如下：

<?php
$password = hash("sha256", $password);

PHP内置了hash()函数，你只需要将加密方式传给hash()函数就好了。你可以直接指明sha256, sha512, md5, sha1等加密方式。
```

### http_build_query      生成 URL-encode() 之后的请求字符串
```
<?php
$data = array('foo'=>'bar',
              'baz'=>'boom',
              'cow'=>'milk',
              'php'=>'hypertext processor');

echo http_build_query($data) . "\n";
echo http_build_query($data, '', '&amp;');

?>
以上例程会输出：
foo=bar&baz=boom&cow=milk&php=hypertext+processor
foo=bar&amp;baz=boom&amp;cow=milk&amp;php=hypertext+processor
```
- http_build_query的实现
- array_sum()
- strrec()

#### POST
### php的post中提交数组参数


- 首先php中要想从页面传送数组到服务端a,要在页面上多个空间同名，而且对于名称有要求，那就是 name="aa[ ]"，注意这里要多加一个数组的符号，这样才能在服务端a取到，
[php] view plaincopy
$_POST[aa]   
得到的为数组。
- 更深一层的问题是，假设我现在需要对post中的参数进行处理后，再传送给另外一个服务端，对于参数aa，应该怎么传递呢？
如果不做什么处理，拼装完post请求后，服务端b获取到的永远只是Array，无法取到实际值。
现在的解决方案是：现在服务端a进行序列化，然后在服务端b接收后进行反序列化。这样反序列化后的值就是一个数组了，和a段获取到的一样。
序列化
```
[php] view plaincopy
<p> $_POST["aa"] =serialize($_POST[aa]);</p>  
反序列化
[php] view plaincopy
$a =  "a:2:{i:0;s:1:\"1\";i:1;s:1:\"2\";}";  
var_dump(unserialize($a));  
结果是什么呢：
[php] view plaincopy
array(2) {  
  [0]=>  
  string(1) "1"  
  [1]=>  
  string(1) "2"  
}  
```
- 而在post中获取到的序列化后的参数是有进行添加过转义符的，获取后需要去掉，然后才能反序列化成功
```
[php] view plaincopy
$bb = $_POST["aa"  
$bb = str_replace("\\", '', $bb);  //然而我在test_api里用curl方式传序列化字符串，并没有添加转义字符
var_dump(unserialize($a));  
```
好了，这样才是你要的结果。
 
- 当然，还有一种问题是，你可以直接把数组值传递给页面的某一空间，提交给服务端。这种情况同样需要序列化和反序列化。
页面
```
[html] view plaincopy
<input type="hidden" name="aa" value="<?php echo base64_encode(serialize($array));?>"  />  
  
var_dump(base64_decode(unserialize(<pre class="html" name="code">{1}</pre><br>  
POST['post_data'])));  
<pre></pre>  
<p><br>  
不知道加了这个base64_encode有什么作用，貌似是给中文编码的吧？</p>  
      
        <div style="padding-top:20px">           
            <p style="font-size:12px;">
        </div>  
```

    
### php中序列化与反序列化


- 把复杂的数据类型压缩到一个字符串中
serialize() 把变量和它们的值编码成文本形式
unserialize() 恢复原先变量

```
eg:
$stooges = array('Moe','Larry','Curly');
$new = serialize($stooges);
print_r($new);echo "<br />";
print_r(unserialize($new));
结果：a:3:{i:0;s:3:"Moe";i:1;s:5:"Larry";i:2;s:5:"Curly";}
Array ( [0] => Moe [1] => Larry [2] => Curly )
```
- 当把这些序列化的数据放在URL中在页面之间会传递时，需要对这些数据调用urlencode()，以确保在其中的URL元字符进行处理：

```
$shopping = array('Poppy seed bagel' => 2,'Plain Bagel' =>1,'Lox' =>4);
echo '<a href="next.php?cart='.urlencode(serialize($shopping)).'">next</a>';
margic_quotes_gpc和magic_quotes_runtime配置项的设置会影响传递到unserialize()中的数据。
如果magic_quotes_gpc项是启用的，那么在URL、POST变量以及cookies中传递的数据在反序列化之前必须用stripslashes()进行处理：
$new_cart = unserialize(stripslashes($cart)); //如果magic_quotes_gpc开启
$new_cart = unserialize($cart);
如果magic_quotes_runtime是启用的，那么在向文件中写入序列化的数据之前必须用addslashes()进行处理，而在读取它们之前则必须用stripslashes()进行处理：

$fp = fopen('/tmp/cart','w');
fputs($fp,addslashes(serialize($a)));
fclose($fp);
//如果magic_quotes_runtime开启
$new_cat = unserialize(stripslashes(file_get_contents('/tmp/cart')));
//如果magic_quotes_runtime关闭
$new_cat = unserialize(file_get_contents('/tmp/cart'));


```

在启用了magic_quotes_runtime的情况下，从数据库中读取序列化的数据也必须经过stripslashes()的处理，保存到数据库中的序列化数据必须要经过addslashes()的处理，以便能够适当地存储。


```
mysql_query("insert into cart(id,data) values(1,'".addslashes(serialize($cart))."')");
$rs = mysql_query('select data from cart where id=1');
$ob = mysql_fetch_object($rs);
//如果magic_quotes_runtime开启
$new_cart = unserialize(stripslashes($ob->data));
//如果magic_quotes_runtime关闭
$new_cart = unserialize($ob->data);
```
当对一个对象进行反序列化操作时，PHP会自动地调用其__wakeUp()方法。这样就使得对象能够重新建立起序列化时未能保留的各种状态。例如：数据库连接等
 