# 是什么?
阿里提供的nodejs的框架

# 服务端ORM
概念：
Object Relational Mapping  对象-关系映射
ORM把数据库映射成对象，解决面向对象与关系数据库存在互不匹配的现象的技术。
  数据库的表（table） --> 类（class）
  记录（record，行数据）--> 对象（object）
  字段（field）--> 对象的属性（attribute）
即使用对象封装数据库操作，开发者使用面向对象编程，与数据对象直接交互，不用关心底层数据库。因此可以不碰SQL语言

库： mongoose

## 常见的ORM框架:
**Node.js系列**：
  1. ORM2:https://github.com/dresende/node-orm2
  2. sequelize：
  3. Knex.js:官网：https://knexjs.org/
  4. TypeORM:采用 TypeScript 编写，支持使用 TypeScript 或 Javascript（ES5，ES6，ES7） 开发。目标是保持支持最新的 Javascript 特性来帮助开发各种用户数据库的应用 - 不管是轻应用还是企业级的

## sequelize
介绍：
基于promise的关系型数据库ORM框架，这个库完全采用JavaScript开发并且能够用在Node.JS环境中，易于使用，支持多SQL方言(dialect)，它当前支持MySQL、MariaDB、SQLite、PostgreSQL、Sql Server 数据库。

官网：http://docs.sequelizejs.com/

现在比较流行的企业级应用方案：
前端框架+egg.js+Serverless