### 第三章 IP：网际协议
#### 3.1引言
- 不可靠
- 无连接

#### 3.2 IP首部
- big endian字节序 32 = 8 + 8 + 8 + 8
- 协议版本号
- 首部长度
- 服务类型8bit = 3 + 4 + 1
- 总长度字段   长->分片(1500)  短->填充 (46)
- 标识字段   +1
- 标志字段和片偏移
- TTL  32/64   0->ICMP->源主机
- 协议字段：上面的运输层使用的什么协议
q       |   q
--      |   --
ICMP    |   1
IGMP    |   2
TCP     |   6
UDP     |   17
OSPF    |   89
- 首部校验和：根据IP首部计算的校验和码
- 源IP
- 目的IP
- 任选项，可变长：选项字段一直都以32bit作为界限，在必要的时候插入值为0的填充字节，这样就保证首部始终是32bit的整数倍(这是首部长度字段所要求的)


### 第四章 ARP
子网掩码：   255.255.255.0         11111111  11111111 11111111 00000000
IP     ：   140.252.1.29		   01001100  11111100 00000001  00011101
- -------------------------------------------------------------------------
-           140.252.1.0          01001100  11111100   00000001    0000000
#### ARP分组格式：
- 以太网数据帧长度：60(14帧头 + 46数据)  + 4帧尾
- ARP总长度：42(14帧头 + 28数据)字节 + 18
- 最大最小传输单元
#### ARP举例


#### 代理ARP

#### 免费arp

#### arp命令：
- arp -a 查看所有
- arp -d 删除某项缓存
- arp -s 增加某项ip=>MAC缓存 |temp


### 第五章RARP
- 网络上的系统，具有本地磁盘的，从磁盘上配置文件读取IP地址，无盘的读取网卡上硬件地址发送RARP。

#### 分组格式
- 与ARP基本一致
- RARP的帧类型代码不同。
- RARP请求--广播，应答--单播。

### 第六章 ICMP

#### ICMP地址掩码请求与应答
- 请求发往广播地址，发送主机也能收到来自本机的ICMP应答。
    
    这是广播的一般特性：发送主机也能通过某种内部环回机制收到一分广播报文拷贝。由于属于"广播"的定义是指局域网上的所有主机，因此他必须包括发送主机在内。当以太网驱动程序识别出目的地址是广播地址后，他就把分组送到网络上，同时传一份拷贝到环回地址。
- 应答地址必须是淡泊地址，除非请求端的源IP是0.0.0.0.









