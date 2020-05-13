# NodeJS
github账号:xpromise 熊键
## day01
### debugger调试

    1. node --inspect-brk 文件

    2 .打开浏览器出现node logo标志

    1. 点击nodelogo标志

### nodejs服务端模块化

使用的commonjs规范

1. 导入

    require
    路径怎么写:
    自己写的模块,不是自己写的模块

2. 暴露

    module.exports = xxx

###　nodejs每个模块
每个模块都包裹了一层看不见的函数

    模块函数的查看arguments.callee().toString
    原理:通过函数把模块通过参数传过去,才可以使用

### nodejs组成

1. 浏览器js组成

    DOM/BOM/ECMAScript

2. nodejs组成

   没有DOM/BOM

### 异步代码执行顺序(重要)

#### js代码执行顺序, 同步->异步->微任务->宏任务  所有进入异步的是事件回调函数中的代码
js引擎执行异步代码的优先级划分为: 宏任务和微任务, 

    宏任务优先级低
    微任务优先级高
    先执行微任务,当微任务全部执行完全,再执行宏任务,执行完一个宏任务,检查是否有微任务,有就执行,没有就执行下一个宏任务

宏任务

    setInterval
    setTimeout
    setImmidiate
    requestAnimationFrame

微任务:

    微任务优先级:process.nextTick 优先级最大,其他顺序执行(只有nodejs有)
    process.nextTick()
    queueMicrotask()
    promise.then().catch().finally()

宏任务的优先级：看nodejs的事件轮训机制
### 事件驱动
node解析引擎:V8
参考资料：nodejs官网的英文文档
  https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
#### I/O处理:自己的ilbuv（事件循环）
6个阶段, nodejs启动的时候, 不断轮训
   1. timers定时器 定时器队列 定时器的callback
   2. pending callbacks
   3. idle, prepare
   4. poll轮训 轮训队列, I/O操作的callback 轮训阶段控制所有定时器执行
       1. 之前是否设置过setImmidiate
       2. 定时器是否到点
       - 实现任何一点都会就进入下一个阶段
   5. check检测 setImmidiate
       - 微任务队列
       - 宏任务队列
       - 微任务可以随时插队
       - 遇到定时器,分线程执行,放到异步队列
   6.close callbacks
每个阶段都有一个FIFO队列执行回调, 直到队列用尽, 当该阶段队列中的回调函数用尽, 进入下一个阶段


### API

1. global 全局
2. process

    启动进程的所有信息
    属性和方法

3. Buffer

    存二进制数据
    Buffer.from 字符串转二级制
    toString 二进制转字符串

内置APi

4. path

    normalize:转义成正常路径
    join 拼接相对路径
    resolve 拼接绝对路径
    extname 后缀名

5. events 处理错误

    获取事件 继承而来
    绑定事件
        持久性事件on
        一次性事件once
    触发事件 emit
    解绑事件 off

6. fs

x 1
r 4
w 2
mode: 默认0o666
同步 带sync
异步 不带sync, 有回调

1. 同步读写

    获取文件信息
    读取文件 读取文件存在buffer中 
    写文件 把buffer的内容写入到文件
    关闭文件 
    查看文件 查看buffer内容

2. 异步读写

    不带sync
    有回调
    结合new Promise async
    util模块 promisify化,改成promise

3. 不关闭文件,会导致内存泄露
处理错误:try{}catch

## day02

### fs简单读写文件
使用与小文件读写
### 可读流和可写流
适用于大文件读写
用途: 读写大文件
同步读写性能太慢
问题: **爆仓**, 写不过来

### mongodb
C:
  use db (切换|创建)
  db.createCollection("collName")
  insert()
R:findOne/find
    运算符 $gt $gte $lt $lte $
    或的条件为多个字段用or
    条件为一个字段用$in
    /正则表达式/
    {$where:function(){this}}  this指向被查找的文档对象
  投影: 找到你想找到的字段, 把不要的字段过滤, 字段:0/1
U:updateOne/UpdateMany
    {}查找所有
    $inc 增加
    $set 修改
D:deleteOne/deleteMany 
  删除整条记录

**CRUD 增删改查**
* C - create 
    db.collection.insert(文档对象)
* R - read
    db.collection.find(查询条件, 投影)
    db.collection.findOne(查询条件, 投影);
    操作符：

        1. > >= < <= !=  $gt $gte $lt $lte $ne
        2. 或 $in $or $and
        3. 正则表达式
        4. $where
    db.collection1.find({price:{$in:[1,2]}});//（包含。。或者包含。。）查询price中含有1或者2的数据
    投影：过滤不必要的数据
* U - update
    db.collection.updateOne(查询条件，更新内容)
    db.collection.updateMany(查询条件，更新内容)
* D - delete
    db.<collection>.deleteOne(查询条件)
    db.<collection>.deleteMany(查询条件)

###　mongoose模块
1. mongoose模块使用
   1). 引入mongoose模块
   2). 连接数据库
   3). 绑定检查连接的事件
   4). 创建Schema约束
   5). 根据Schema创建mongoose Model集合
   6). 根据Model集合新建文档对象
   6). 用Model集合操作文档对象
   7). 保存新建的数据

2. mongoose进行模块化
db/index.js models/collections app.js

## day03
### http模块
response.setHeader 设置响应头
响应报文,请求报文
状态码: 
    301: 永久重定向 
    302: 重定向到临时资源
    304: 重定向到缓存
    401: 没有权限,需要权限才可以访问
    403: 不管有没有权限都不允许访问
    404: 客户端访问资源不存在
### express库
cookie解决http无状态的问题

## day04
### experss中间件
#### 中间件 middleware
1. 是什么？
本质上一个函数
2. 作用：
修改req和res对象: 同一个请求中，所有中间件和路由共享同一个req和res
执行任意代码
处理请求，返回响应
调用下一个中间件/路由
3. 执行顺序：
当请求进来服务器时，会从上到下依次执行路由/中间件。
  如果遇到中间件，就立即执行，如果调用了next方法，就在执行下一个，如果没有，就请求到此终止
  如果遇到路由，看当前请求的请求方式和请求路径是否匹配上，如果匹配上就执行，如果没有匹配上，就看下一个
  如果都没有，返回404
4. 应用场景：
应用级中间件
  提取路由重复代码到中间件中（进行代码复用）。
  防盗链、权限检验等。。
内置中间件
  express内置的中间件
    express.static(文件目录)
    express.urlencoded({extended: true})
错误处理中间件
  app.use((err, req, res, next) => {})
路由器中间件
  router 用来分类管理 route
第三方中间件
  cookie-parser 解析cookie数据
#### 应用级中间件use
app.use((req, res, next) {})
#### static express内置的中间件
express.static(文件目录)
文件目录下所有文件都可以被访问
#### router路由器中间
1. router路由器中间件定义:
    对路由器和中间件进行模块化
    分类管理路由/中间件,对路由/中间件进行模块化
2. 用法:
    构造调用,生成实例对象
    有中间件功能,router.use/router.get/router.post
    需要应用在app上,app.use(router);内部会把调用的use,get,post应用到app上;
    暴露router,就会把router上的中间件和路由(use,get,post)都应用在app上;
    所以暴露router,使用app引用即可,这就是模块化的原理
3. 模块化思想
    单一功能,单一职责
    一个模块只做一件事

## http缓存

浏览器刷新页面不会走缓存  
  只有页面中src发送请求才会走缓存
* 强缓存:
last-modified第一次成功请求返回
if-Modified-Since 客户端发请求带上的
两个相等：说明请求内容没有被修改
  走协商缓存
  返回304状态码

请求是否去了后台
- 访问304请求到了后台，进行了协商
- 访问200，但是为memory-cache就没有去后台
- 200，为OK则去了后台

强缓存结束后进行协商缓存
cache-control: no-cache 去后台确认缓存是否有效

* Etag & if-None-Match
  - 根据文件内容进行缓存；解决文件修改时间变，内容没变也走缓存
  - 响应首部字段etag & 请求首部字段if-None-Match
  - 库etag：获取文件的唯一hash值


## day05
### 服务端渲染
模板引擎:pug
- 渲染带数据的页面
- 库:jade/pug写html文档
- 命令行:
    (一定全局安装,因为依赖express,现在找express)
    - npm i pug -g
    - npm i pug-cli -g
    - pug -P 文件名 转换为html并不压缩
* 格式:
  - 层级关系:空格隔开
  - 标签属性用() ,多个属性逗号分割
  - 注释 |
  - 变量: #{} 或者 = 或者 - js语句
  - 代码块: 
      . 
        代码块1
        代码块2
  - 条件判断
  - 混合(复用结构代码)
    - 定义:mixin xxx(参数) 使用+xxx(参数) 
  - 引入文件:include
  - 继承: extends "path" 或者include "path"
  - 转义: != 或者 \
  - js语法: - var a = "123"
  - 命中不渲染: unless n === 6
  - 流程控制:
    - if
    - else
    - switch 
    - each item in arry
* 需求:改变错误查看方式
* jade同pug, handlebars
  * jade将.jade和数据渲染成html
    * jade.renderFile("xx.jade",{数据})
* 必须结合node发送请求一起做服务端渲染才有意义
#### 结合案例
目标:服务端渲染:带数据的页面渲染,服务端将数据返回出去
#### 模板引擎渲染:res.render("",{}) 告诉他渲染的东西是什么
1. res.render:将数据渲染到模板页面(pug)上
2. 将pug渲染成html页面,将最后的html返回
3. 客户端访问login服务器响应页面:
   1. 把res.sendFile换成res.render("login.pug",{数据})
4. 目录必须叫views,内部封装了,可以找到路径
    这个渲染做了两件事:(可以不设置)
    app.set('view engine','pug');  //设置使用哪个模板引擎解析模板资源
    app.set('view','view');  //设置模板资源目录,app.sett('view',目录名称);


#### 在页面显示错误:
只改中间件,路由没有改
    页面提示所有错误;
    渲染数据
    Object.keys(person) 返回空数组 ;提取所有属性组成一个数组
post路由修改

提交的时候返回了新的页面
登陆页:
    提交保留username
    密码不符合规范,用户保留
注册页修改

重定向修改
### cookie
让请求带状态
1. 是什么:
    在浏览器存储少量数据(key-value)
    解决http协议无状态问题
2. 原理:
    客户端发请求给服务器,
    设置cookie:服务器给一个凭证cookie给客户端,
    客户端自动保存cookie
    客户端访问服务器自动带上cookie,
3. 使用
服务端: 设置,获取,删除
设置:
    res.cookie(key,value)
    res.send();
获取:
    req.header.cookie
    第三方中间件:cookieParse
删除: 
    res.clearCookie(key)
    过期时间:立即过去
cookie失效性
   1. cookuie默认是会话存储.(关闭浏览器会话就结存数)
   2. 持久化cookie
      1. 设置过期时间
      2. 一般10年 永久过期
      3. 不同浏览器不共享cookie
      4. cookie不能被截取,httpOnly只能服务器获取cookie,安全性:csrf
4. 缺点
   1. 存储容量小:通常同一个域名下数量只有20个左右,每个大小为4kb左右
   2. 传输流量大: 每次发送请求浏览器都会把所有cookie自动携带上
   3. 安全性较低: 在没有使用https中,传输过程中随时被人截取,随便拿个cookie就能伪造登陆
      不能存敏感数据
    session解决此问题
5. 作用
   持久登陆

6. 应用到案例
   1. 登陆 成功访问use.pug
   2. 登陆成功返回cookie
      1. res.cookie('user',user._id,{})
   3. 获取cookie
      1. router.get('/user',cookieParer(),())
      2. req.cookies
        如果没有权限,返回401没权限
      3. 成功判断cookie是否正确,数据库找
7. session
解决cookie问题 
   1. 存储无限
   2. 服务端,只产生一个cookie
   3. 安全性更好,只有一个cookie,数据都在sesion中
原理:
   1. 客户端发送请求到服务器,服务器创建session对象(会话存储)
   2. 给每个对象添加标识,sesstionid,找到sesstion对象
   3. 服务器返回响应返回cookie,携带sessionid(加密后),帮助找到对象
   4. 下次客户端自动携带cookie
   5. 服务器解析cookie携带的sessionid并解密,数据库找到对象,读取数据,
   6. 返回响应给客户端
   7. 持久化session 存储在数据库
库: express中间件express-session
    临时session用法
    结合数据库用法
        session存7天,对应cookie也存7天
结合案例:
    登陆成功后:
        往session对象存东西
        会创建session对象,生成唯一的session_id,保存到数据库
    读取session:
        session中间件,自动解析cookie,加密后的session_id,进行解密,将解密后的session_id去数据库找session对象,将找到的session对象挂载大屏req.session上
    客户端查看session_id:  connect.sid
作用:
    登陆过程中保存用户信息

## day06
1. ajax
  XML: 可扩展的标记语言
  JSON
  jsom.parser
  json.Stringify
四步:
   1. 创建xhr实例对象 
   2. 绑定事件监听：监听响应结果 xhr.onreadystatechange
           当readyState的值发生变化时，触发的事件
          0: 代表xhr刚刚创建。readyState的初始值就是0
          1: 代表open方法调用了，但send方法还没有调用。（还没发送请求，还来得及设置请求头）
          2：代表send方法调用了（已经发送请求），并接受到部分响应结果（接收到了响应首部：响应头和响应状态码）
          3：代表接受了部分/全部响应体数据（如果数据较大，只接受了一部分。如果较小，就全部接受了）
          4：代表接受完全部响应体数据
   3. 设置请求信息 xhr.open()
     请求方式
     请求地址
     请求参数
     请求头 xhr.setRequestHeader() post请求一定要设置请求头
   4. 发送请求 xhr.send()

注意：发送ajax请求的页面必须通过自己服务器访问，不能通过webstorm去访问。
    一旦通过webstorm访问，就会产生跨域问题。
2. 总结ajax:
   1. 一个在客户端发送异步请求的技术
   2. 特点：
     无刷新更新页面
   3. 工作原理
     浏览器有一个ajax引擎负责发送请求
注意点:
post请求必须设置请求头
并设置请求体参数使用中间件解析
  // 只能解析post请求的urlencoded编码的参数
  app.use(express.urlencoded({extended:true}))
  // 只能解析post请求的json编码的参数
  app.use(express.json())
3. jqueryAjax
  等DOM加载完
  等页面完全加载完
  jquery版本介绍:
    1.xx.xx
    2.xx.xx
    3.xx.xx
    版本越低兼容性越好,越高兼容性却差
    越低功能越齐全,越高功能越少,很多模块都分出去了,只保留最核心的功能

4. ajax三级联动
  伴随dom操作
  减少dom重排重绘
  拼串

  province.change: 当value值发生变化触发      select value值是option的值
  cities.change:
    获取province:$province
    获取city:this.value

5. 跨域问题
违背同源策略
  http://www.baidu.com:3000
不同源:
  钓鱼网站
  禁止访问cookie
  iframe
  禁止操作dom
  禁止向非同源访问
请求分为:
  1. 普通请求
  2. 只有ajax才有跨域问题
解决跨域
  1. jsonp 原生
  2. cors  
     1. (官方推出解决方案,设置响应头)
  3. 服务器代理

jsonp:
     1. (利用script天然跨域特性来解决跨域)
     2. (兼容性好,只能发get请求的局限性)
     3. 代码
     4. ```     /*document.getElementById('btn').onclick = function () {
      // 1. 创建script标签
      const script = document.createElement('script');
      // 2. 设置script标签的src属性：设置请求地址
      script.src = 'http://localhost:3000/jsonp?callback=fn';
      // 3. 定义fn回调函数: 必须是全局函数
      window.fn = function (data) {
        // 响应成功的回调
        console.log(data); // 响应成功的数据
      };
      // 4. 将script添加body中，才能生效
      document.body.appendChild(script);
      ```
     5. 库:jquery会发jsonP
          $.getJSON('http://localhost:3000/jsonp?callback=?', function (data) {
            console.log(data);
          })
cors:
      cors：官方的解决方案
    特点：
      1. 可以发任意请求
      2. 兼容性稍差
    Access-Control-Allow-Credentials: true
      允许预检请求：浏览器当发现你当前请求是一个特殊请求（POST/PUT/DELETE或者包含特殊请求头字段），就会发送一个预检请求。
      预检请求的请求方式是options。
      预检请求作用就是检查当前请求是否可以跨域。如果不可以跨域，后面不发请求了。如果跨域跨域，后面的请求才会发送过去
    Access-Control-Allow-Headers: X-Juejin-Src,X-Juejin-Uid,X-Juejin-Client,X-Juejin-Token
      允许哪些请求头可以跨域
    Access-Control-Allow-Methods: GET, PUT, POST, DELETE, HEAD
      允许哪些请求方式可以跨域
    Access-Control-Allow-Origin: https://juejin.im
      允许哪些请求来源地址可以跨域
    Access-Control-Max-Age: 86400
      预检请求结果的缓存时间
  // res.set('access-control-allow-origin', '*');
  // res.set('access-control-allow-origin', 'http://localhost:63342');
  

  
用户不会产生的标签 代替

允许多个:类似于防盗链
f2: xhr
# 要求:
    代码写一遍
    事件轮训,宏任务,微任务
    promise源码,面试杀手锏
    每天写一遍,写三遍以上
    模块先有印象

# 作业 晨测
 1. 谈谈原型
 2. 谈谈闭包
 3. 函数的防抖和节流(概念和代码)
 4. 实现instanceOf API源码
 5. 实现扁平化数据API,flat源码
 6. 手写call/apply/bind
 7. 快速排序
    分析:拆成小/大
        小再拆成小/大
        算法
        时间复杂度
        空间复杂度
        数据结构:二叉树
  8. 自定义事件机制实现
  9. 去重三种方法

## 知识点
### 计算机知识
I/O 读写
CPU密集: 多核CPU
I/O密集: 机械硬盘换固态硬盘
异步I/O:    
    两个人同时处理两件事
    耗时时间取决于最大的那个事情,而不是两者之和
单线程, 异步I/O
浏览器/nodejs: 多进程多线程
前端-> nodejs中间件 -> java
bff
为前端服务的后端
### 工具:
#### cross-env库
区分运行的是生产环境还是开发环境
npm start 运行开发环境 
npm build 运行生成环境
#### 解决反复重启服务器的问题：
    npm i nodemon -g
    nodemon app.js

### 函数知识点
函数只只有遇到return下面的代码才不会执行
### 数组知识点
数组过滤:
    map 长度不变,值变
    filter 长度变,值不变
    reduce 长度和值都变
some 返回true/false
#### websocket
 http特点:客户端不能向客户端发送请求,服务端不能向客户端发请求

# node作用
node 实现服务器的功能,裸服务器
    手写接口
    实现跟java一样的功能和作用


# node要懂
1. node相对路径都是参照
2. 全局api
  - process.cwd()路径
  - 即node命令执行路径
3. 内置模块
   1. fs(pipe)
    * 可读流两种模式
    * 明白流的切换
      1. flowing模式|流动模式
      2. paused模式|暂停模式（初始于）
         1. paused切换到flowing
            1. stream.data
            2. stream.pipe
         2. flowing切换paused
            1. stream.pause方法
            2. stream.unpipe方法
   1. http发请求
      1. 如何启动服务，node可以请求
         1. req可读流 icommingmessage
         2. res可写流
      2. 发请求（要熟悉）
         1. 发请求，返回clientTequest是可写流
4. 事件循环机制