### mongodb
C:
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
    use db (切换|创建)
    db.createCollection(<collection>)
    db.<collection>.insert([{文档对象1},{文档对象2}...])
    db.<collection>.insertOne(文档对象)
* R - read
    db.<collection>.find(查询条件, 投影)
    db.<collection>.findOne(查询条件, 投影);
    操作符：
        1. > >= < <= !=  $gt $gte $lt $lte $ne $exists $type $not $and
        2. 或 $in $or $and
        3. 正则表达式
        4. $where
    db.<collection>.find({price:{$in:[1,2]}});//（包含。。或者包含。。）查询price中含有1或者2的数据
    投影：过滤不必要的数据
* U - update
    db.<collection>.updateOne(查询条件，更新内容)
    db.<collection>.updateMany(查询条件，更新内容)
* D - delete
    db.dropDatabase()
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
