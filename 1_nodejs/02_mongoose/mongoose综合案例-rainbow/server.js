const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const app = new Koa()
const routerFn = require("./routes")
//  koa错误处理
const error = require('koa-json-error')
const _ = require('lodash');
//  参数校验
const parameter = require('koa-parameter');
//  koa错误处理
let options = {
  // Avoid showing the stacktrace in 'production' env
  postFormat: (e, obj) => process.env.NODE_ENV === 'production' ? _.omit(obj, 'stack') : obj
};

// 连接数据库
require("./db")
// 参数校验
parameter(app);

app
  .use(bodyParser())
  .use(error(options));
routerFn(app)

app.listen("8080", () => {
  console.log("server is listenning on http://127.0.0.1:8080");
})