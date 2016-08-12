## MySQL Binary  Log
也就是常说的bin-log,，是mysql执行改动产生的二进制日志文件，其主要作用有两个：
* 数据恢复 
* 主从数据库。用于slave端执行增删改，保持与master同步。 

#### 1.开启binary log功能 
  1. 需要修改mysql的配置文件， 的my.ini/my.cnf，添加一句
  ```
  log_bin = mysql_bin
  ```
  即可
  
     eg： 
     [mysqld] 
             ...... 
             log_bin = mysql_bin 
             ...... 
       log_bin是生成的bin-log的文件名，后缀则是6位数字的编码，从000001开始，按照上面的配置，生成的文件则为： 
             mysql_bin.000001 
             mysql_bin.000002 
             ...... 
  
2. 配置保存以后重启mysql的服务器，用show variables like  '%bin%'查看bin-log是否开启

#### 2.查看产生的binary log 
1. bin-log因为是二进制文件，不能通过记事本等编辑器直接打开查看，mysql提供两种方式查看方式，在介绍之前，我们先对数据库进行一下增删改的操作，否则log里边数据有点空。
```
   create table bin( id int(10) primary key auto_increment,name varchar(255));(测试前我已经建表)
   insert into bin(name) values ('orange'); 
```

2. 在客户端中使用  show binlog events in 'mysql_bin.000001'  语句进行查看,为了排序美观，可以在结尾加\G使结果横变纵，此时结尾无需加；语句结束符。
    - Log_name:此条log存在那个文件中，从上面可以看出这2条log皆存在与mysql_bin.000001文件中。 
    - Pos:log在bin-log中的开始位置 
    - Event_type:log的类型信息 
    - Server_id:可以查看配置中的server_id,表示log是那个服务器产生 
    - End_log_pos：log在bin-log中的结束位置 
    - Info:log的一些备注信息，可以直观的看出进行了什么操作 
    
    
3. 用mysql自带的工具mysqlbinlog
```
mysql > mysqlbinlog mysql_bin.000001 
```

虽然排版有点乱，但从图中我们可以得到更多信息，如时间戳，自增的偏移，是否自动提交事务等信息。- P606

#### 3.利用bin_log恢复数据(date与position)

-  1.最长用的就是恢复指定数据端的数据了，可以直接恢复到数据库中： 
    mysqlbinlog  --start-date="2014-02-18 16:30:00" --stop-date="2014-02-18 17:00:00" mysql_bin.000001 |mysql -uroot -p123456
      亦可导出为sql文件，再导入至数据库中： 
      mysqlbinlog  --start-date="2014-02-18 16:30:00" --stop-date="2014-02-18 17:00:00" mysql_bin.000001 >d:\1.sql
      source d:\1.sql 
- 2.指定开始\结束位置，从上面的查看产生的binary log我们可以知道某个log的开始到结束的位置，我们可以在恢复的过程中指定回复从A位置到B位置的log.需要用下面两个参数来指定：
    --start-positon="50" //指定从50位置开始 
    --stop-postion="100"//指定到100位置结束 

#### 4.bin_log相关操作
 1.查看最后一个bin日志文件是那个，现在位置。
show master status;

2.启用新的日志文件，一般备份完数据库后执行。
flush logs;

3.清空现有的所用bin-log 
reset master;

4.
执行
```
PURGE MASTER LOGS TO 'mysql-bin.*****'
```
命令，是将'*****'编号之前的所有日志进行删除
执行
```
PURGE MASTER LOGS BEFORE 'yyyy-mm-dd hh:mm: ss'
```
命令，是将在'yyyy-mm-dd hh:mm: ss'时间之前的所有日志进行删除

5.
```
EXPIRE_LOGS_DAYS
```
此参数是设置日志的过期天数，过期的日志将会被自动删除，这有利于减少我们管理日志的工作量，需要修改my.cnf



- http://blog.chinaunix.net/uid-29625632-id-5098315.html
- http://blog.csdn.net/lwei_998/article/details/18940965
- http://www.cnblogs.com/billyxp/p/3460682.html
