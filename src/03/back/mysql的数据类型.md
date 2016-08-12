## 1.mysql的数据类型
    1. 数值型
    2. 字符型
    3. 日期和时间型
    4. null
   
## 2.mysql的数值列类型

类型 | 说明
- | -
tinyint |	非常小的整数
smallint |	较小整数
mediumint |	中等大小整数
int	 |标准整数
bigint	| 较大整数
float |	单精度浮点数
double |	双精度浮点数
decimal	| 一个串的浮点数


类型说明 | 取值范围
- | -
tinyint[(m)] |	有符号值：-128 到127（- 27 到27 - 1） 无符号值：0到255（0 到28 - 1）
smallint[(m)] |	有符号值：-32768 到32767（- 215 到215 - 1） 无符号值：0到65535（0 到21 6 - 1）
mediumint[(m)] |	有符号值：-8388608 到8388607（- 22 3 到22 3 - 1 ） 无符号值：0到16777215（0 到22 4 - 1）
int[(m)] |	有符号值：-2147683648 到2147683647（- 231 到231- 1） 无符号值：0到4294967295（0 到232 - 1）
bigint[(m)] |	有符号值：-9223372036854775808 到9223373036854775807（- 263到263-1） 无符号值：0到18446744073709551615（0到264 – 1）
float[(m, d)] |	最小非零值：±1.175494351e - 38
double[(m,d)] |	最小非零值：±2.2250738585072014e - 308
decimal (m, d) |	可变；其值的范围依赖于m 和d

```
在定义整型列时，可以指定可选的显示尺寸m。如果这样，m应该是一个1 到255的整数,d的值可为0 到3 0，但是不应大于m - 2.
```
类型说明 | 存储需求
- | -
tinyint[(m)] |	1字节
smallint[(m)] |	2字节
mediumint[(m)] |	3字节
int[(m)] |	4字节
bigint[(m)] |	8字节
float[(m, d)] |	4字节
double[(m, d)] |	8字节
decimal (m, d) |	m字节（mysql < 3.23），m+2字节（mysql > 3.23 ）
#### 数值，字符串，NULL代价
#### varchar(5) varchar(200)存'hello'
#### 关于int(11)里指定的长度
#### 关于unsigned扩充

## mysql字符串列类型

类型名 | 说明
-|-
char| 	定长字符串
varchar	|可变长字符串
tinyblob|	非常小的blob（二进制大对象）
blob	|小blob
mediumblob|	中等的blob
longblob|	大blob
tinytext|	非常小的文本串
text|	小文本串
mediumtext|	中等文本串
longtext|	大文本串
enum	|枚举；列可赋予某个枚举成员
set	|集合；列可赋予多个集合成员

类型说明|最大尺寸|存储需求
-|-|-
char( m)|	m 字节|	m 字节
varchar(m)|	m 字节|	l + 1字节
tinyblob, tinytext|	28- 1字节|	l + 1字节
blob, text|	216 - 1 字节|	l + 2字节
mediumblob, mediumtext|	224- 1字节|	l + 3字节
longblob, longtext|	232- 1字节|l + 4字节
enum(“value1”, “value2”, ...)|	65535 个成员|	1 或2字节
set (“value1”, “value2”, ...)|	64个成员|	1、2、3、4 或8字节


## MySQL日期列类型

类型名|说明
-|-
date | 	“yyyy-mm-dd”格式表示的日期值
time |	“hh:mm:ss”格式表示的时间值
datetime |	“yyyy-mm-dd hh:mm:ss”格式
timestamp |	“yyyymmddhhmmss”格式表示的时间戳值
year |	“yyyy”格式的年份值
表6：日期时间列类型
类型名|取值范围|存储需求
-|-|-
date |	“1000-01-01”到“9999-12-31” |	3字节
time | “-838:59:59”到“838:59:59” |	3字节
datetime |	“1000-01-01 00:00:00” 到“9999-12-31 23:59:59” |	8字节
timestamp |	19700101000000 到2037 年的某个时刻 |	4字节
year |	1901 到2155	 |1字节
## ENUM