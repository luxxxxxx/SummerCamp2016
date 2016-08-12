
####存储程序：
- 存储过程
- 存储函数
counts 
update  counts set money = money-1000 where name = 'wu';
////    
update conts set money = +1000 where 'wang'


####事务：

BEGIN
update  counts set money = money-1000 where name = 'wu';

update conts set money = +1000 where 'wang';




COMMIT

ROLLBACK
	