#### 0.简介认识：
- ZEND引擎升级到Zend Engine 3，也就是所谓的PHP NG,性能增加一倍
- 增加抽象语法树，使编译更加科学
- 64位的INT支持
- 统一的变量语法
- 原声的TLS - 对扩展开发有意义
- 一致性foreach循环的改进
- 新增 <=>、**、?? 、\u{xxxx}操作符
- 增加了返回类型的声明
- 增加了标量类型的声明
- 核心错误可以通过异常捕获了
- 增加了上下文敏感的词法分析

#### 1.编译安装：
1. 下载源码包
2. .configure --prefix=/etc/php7 (--with-apxs2)  
3. make & make install
```
Installing PHP SAPI module:       apache2handler
/usr/share/httpd/build/instdso.sh SH_LIBTOOL='/usr/share/apr-1/build-1/libtool' libs/libphp7.so /usr/libexec/apache2
/usr/share/apr-1/build-1/libtool --mode=install install libs/libphp7.so /usr/libexec/apache2/
libtool: install: install libs/libphp7.so /usr/libexec/apache2/libphp7.so
sed: RE error: illegal byte sequence
sed: RE error: illegal byte sequence
Warning!  dlname not found in /usr/libexec/apache2/libphp7.so.
Assuming installing a .so rather than a libtool archive.
chmod 755 /usr/libexec/apache2/libphp7.so
[activating module `php7' in /private/etc/apache2/httpd.conf]
Installing shared extensions:     /usr/local/lib/php/extensions/no-debug-non-zts-20151012/
Installing PHP CLI binary:        /usr/local/bin/
Installing PHP CLI man page:      /usr/local/php/man/man1/
Installing phpdbg binary:         /usr/local/bin/
Installing phpdbg man page:       /usr/local/php/man/man1/
Installing PHP CGI binary:        /usr/local/bin/
Installing PHP CGI man page:      /usr/local/php/man/man1/
Installing build environment:     /usr/local/lib/php/build/
Installing header files:           /usr/local/include/php/
Installing helper programs:       /usr/local/bin/
  program: phpize
  program: php-config
Installing man pages:             /usr/local/php/man/man1/
  page: phpize.1
  page: php-config.1
Installing PEAR environment:      /usr/local/lib/php/
[PEAR] Archive_Tar    - installed: 1.4.0
[PEAR] Console_Getopt - installed: 1.4.1
[PEAR] Structures_Graph- installed: 1.1.1
[PEAR] XML_Util       - installed: 1.3.0
[PEAR] PEAR           - installed: 1.10.1
Warning! a PEAR user config file already exists from a previous PEAR installation at '/Users/Mr_liang/.pearrc'. You may probably want to remove it.
Wrote PEAR system config file at: /usr/local/etc/pear.conf
You may want to add: /usr/local/lib/php to your php.ini include_path
/usr/local/bin/php-src/build/shtool install -c ext/phar/phar.phar /usr/local/bin
ln -s -f phar.phar /usr/local/bin/phar
Installing PDO headers:           /usr/local/include/php/ext/pdo/
```

4. vi httpd.conf
   
 LoadModule php7_module xxx/libphp7.so

文件最后加上：
```
<FilesMatch \.php$>
SetHandler application/x-httpd-php
</FilesMatch>
```

#### 2.标准类型声明：

标量类型声明已被引入。标量类型声明有两种选择方式 -
- 强制方式- 强制性是默认模式，不需要指定
- 严格方式 - 严格模式有明确的暗示

默认情况下，所有的PHP文件都处于弱类型校验模式。新的declare指令，通过指定strict_types的值（1或者0），1表示严格类型校验模式，作用于函数调用和返回语句；0表示弱类型校验模式。

declare(strict_types=1)必须是文件的第一个语句。如果这个语句出现在文件的其他地方，将会产生一个编译错误，块模式是被明确禁止的。

strict_types指令只影响指定使用的文件，不会影响被它包含（通过include等方式）进来的其他文件。该指令在运行时编译，不能修改。它的运作方式，是在opcode中设置一个标志位，让函数调用和返回类型检查符合类型约束。

以下几种类型的函数参数可以通过上述模式被强制执行 
- int
- float
- bool
- string
- interfaces
- array
- callable
```
//默认
<?php  
	function add($arr){
		return array_sum($arr);
	}
	var_dump(add([2,'4',5.6]));
?>
//float(11.6)

//强制模式
#2.php
<?php
   // Coercive mode
   function sum(int ...$ints) {
      return array_sum($ints);
   }
   print(sum(2, '3', 4.1));
?>
//9

//严格模式
2.php
<?php
   // Strict mode
   declare(strict_types=1);
   function sum(int ...$ints) {
      return array_sum($ints);
   }
   print(sum(2, '3', 4.1));
?>
//Fatal error: Uncaught TypeError: Argument 2 passed to sum() must be of the type integer, string given, ...

//对包含文件的影响
#add.php
<?php 
	function add(int $a,int $b)
	{
		# code...
		return $a+$b;
	}
 ?>
//强制模式
#2.2.php
<?php 
	require 'add.php';
	var_dump(add(1,2.2));   //3    
    var_dump(add(1,'2'));   //3
	var_dump(add(2,34))     //36
 ?>
 //严格模式
 #2.2.php
 <?php 
	declare(strict_types=1);
	require 'add.php';
	var_dump(add(1,2.2));   //报错
	var_dump(add(1,'2'));   //报错
	var_dump(add(2,34))     //36
 ?>
 ```
 
#### 3.返回类型声明
返回类型声明指定的一个函数返回值的类型。以下类型可以用来作为返回类型声明。
- int
- float
- bool
- string
- interfaces
- array
- callable
```
//php5
#3-1.php
<?php  
	function getnum(){
		return 1.00;
	}
	var_dump(getnum());   //float(1)
?>

//强制方式
#3-1.php
<?php  
	function getnum() ：int{
		return 1.00;
	}
	var_dump(getnum());   //int(1)
?>
//严格方式
<?php
    declare(strict_types=1);
	function getnum():int{
		return 1.00;
	}
	var_dump(getnum());//报错
?>
```

#### 4.null合并运算符
空合并运算符(??)已被引入。它被用来代替三元运算并与 isset()函数功能结合一起使用。如果它存在并且它不是空的，空合并运算符返回它的第一个操作数;否则返回第二个操作数。
```
#4-1.php
<?php
    $a=0;
    $b = $a ? $a : 'kong';
    var_dump($b);
?>
<?php  
    $a = 0;
	$b = isset($a) ? $a : 'kong';  //$a ?? 'kong' ;
	var_dump($b);
?>
<?php  
	$b = $a ?? $c ??'kong' ;
	var_dump($b);
?>
```
#### 5.飞船操作符：
1. 用于比较两个表达式。当第一个表达式比第二个表达式分别小于，等于或大于它返回-1，0或1。
```
示例：
<?php
   //integer comparison
   print( 1 <=> 1);print("<br/>");
   print( 1 <=> 2);print("<br/>");
   print( 2 <=> 1);print("<br/>");
   print("<br/>");
   //float comparison
   print( 1.5 <=> 1.5);print("<br/>");
   print( 1.5 <=> 2.5);print("<br/>");
   print( 2.5 <=> 1.5);print("<br/>");
   print("<br/>");
   //string comparison
   print( "a" <=> "a");print("<br/>");
   print( "a" <=> "b");print("<br/>");
   print( "b" <=> "a");print("<br/>");
?>
```
```
这将在浏览器产生输出以下结果-
0
-1
1

0
-1
1

0
-1
1
```

#### 5.常量数组
数组常量现在可以使用 define() 函数定义。 在PHP5.6，它们只能使用 const 关键字定义。
```
<?php
   //define a array using define function
   define('animals', [
      'dog',
      'cat',
      'bird'
   ]);
   print(animals[1]);
?>
```
#### 6.匿名类
在php7中，匿名类现在可以使用 new class 来定义。匿名类可以使用来代替完整的类定义。
```
<?php
   interface Logger {
      public function log(string $msg);
   }

   class Application {
      private $logger;

      public function getLogger(): Logger {
         return $this->logger;
      }

      public function setLogger(Logger $logger) {
         $this->logger = $logger;
      }  
   }

   $app = new Application;
   $app->setLogger(new class implements Logger {
      public function log(string $msg) {
         print($msg);
      }
   });

   $app->getLogger()->log("My first Log Message");
?>
```

#### 7. 方法临时绑定
```
<?php
   class A {
      private $x = 1;
   }

   // PHP 7+ code, Define
   $value = function() {
      return $this->x;
   };

   print($value->call(new A));
?>
```

#### 8.过滤unserialize()
PHP7引入了过滤 unserialize()函数以在反序列化不受信任的数据对象时提供更好的安全性。它可以防止可能的代码注入，使开发人员能够使用序列化白名单类
```
$data = unserialize($serializedObj1 , ["allowed_classes" => true]); 
// ["allowed_classes" => ["MyClass1", "MyClass2"]]

<?php
class MyClass1 { 
   public $obj1prop;   
}
class MyClass2 {
   public $obj2prop;
}


$obj1 = new MyClass1();
$obj1->obj1prop = 1;
$obj2 = new MyClass2();
$obj2->obj2prop = 2;

$serializedObj1 = serialize($obj1);
$serializedObj2 = serialize($obj2);

// default behaviour that accepts all classes
// if allowed_classes is passed as false, unserialize converts all objects into __PHP_Incomplete_Class object
$data = unserialize($serializedObj1 , ["allowed_classes" => true]);

$data2 = unserialize($serializedObj2 , ["allowed_classes" => ["MyClass1", "MyClass2"]]);

print($data->obj1prop);
print("<br/>");
print($data2->obj2prop);
?>
```

#### 9.random
新的函数引入以产生一个跨平台的方式加密安全整数和字符串。
- random_bytes() - 生成加密安全伪随机字节。
- random_int() - 生成加密安全伪随机整数。
- -var_dump(bin2hex(random_bytes(2)));

#### 10.期望
期望是向后兼容的增强到旧 assert() 函数。期望允许在生产代码零成本的断言，并提供在断言失败时抛出自定义异常的能力。assert() 不是一种语言构建体，其中第一个参数是一个表达式的比较字符串或布尔用于测试。

#### 11.use引入命名空间
```
<?php
// Before PHP 7
use com\yiibai\ClassA;
use com\yiibai\ClassB;
use com\yiibai\ClassC as C;

use function com\yiibai\fn_a;
use function com\yiibai\fn_b;
use function com\yiibai\fn_c;

use const com\yiibai\ConstA;
use const com\yiibai\ConstB;
use const com\yiibai\ConstC;

// PHP 7+ code
use com\yiibai\{ClassA, ClassB, ClassC as C};
use function com\yiibai\{fn_a, fn_b, fn_c};
use const com\yiibai\{ConstA, ConstB, ConstC};

?>
```
#### 12.错误处理
从PHP7，错误处理和报告已经改变。PHP5中使用了传统的错误报告机制的错误，现在大多数的错误将通过抛出异常错误处理。类似于异常，这些错误异常会冒泡，直到它们到达第一个匹配的catch块。如果没有匹配的块，那么会使用 set_exception_handler() 安装一个默认的异常处理并被调用，并在情况下，如果没有默认的异常处理程序，那么该异常将被转换为一个致命的错误，并会像传统错误那样处理。
由于 Error 层次结构不是从异常(Exception)，代码扩展使用catch (Exception $e) { ... } 块来处理未捕获的异常，PHP5中将不会处理这样的错误。  catch (Error $e) { ... } 块或 set_exception_handler()处理程序需要处理的致命错误。
```
 try {
         $value = $this->n % 0;
         return $value;
      } catch (DivisionByZeroError $e) {
         return $e->getMessage();
      }
```
#### 13.整数除法
intdiv()函数，它执行操作数的整数除法并返回结果为 int 类型。
```
$value = intdiv(10,3);  //int 3
```

### 14. session选项
从PHP7+，session_start()函数接受数组参数覆盖在php.ini中设置的会话配置指令。这些选项支持 session.lazy，在默认情况下如果PHP会话数据改变，那么会覆盖任何会话数据信息。

添加另一种选择是：read_and_close，这表明会话数据应被读取，然后该会话应当立即被关闭不变。例如，session.cache_limiter 设置为私有，并设置标志使用下面的代码片段之后立即关闭会话。
```
<?php
session_start([
   'cache_limiter' => 'private',
   'read_and_close' => true,
]);
?>
```

#### 15.禁用功能
- PHP4风格的构造函数
PHP4式构造函数，它与类的名称相同，因为它们是在所定义类的方法，现在已过时，并且将在未来被移除。如果PHP4的构造仅仅是一个类中定义构造函数，PHP7将发出E_DEPRECATED。类实现构造函数 __construct()方法不受影响。
- 非静态方法静态调用已被弃用，并且可能在将来被移除。
```
<?php
class A {
   function b() {
      print('OK');
   }
}
A::b();
?>
//正常：OK
//以后，这将在浏览器产生以下输出 -

Deprecated: Non-static method A::b() should not be called statically in...
Non-static call
```
- password_hash() - salt 选项
password_hash()函数的salt选项已被弃用，使开发人员不会产生他们自己的(通常是不安全的)salt。函数本身生成一个加密的安全salt，在开发者没有提供salt值时 - 因此，定制 salt 生成不再需要了。

      


