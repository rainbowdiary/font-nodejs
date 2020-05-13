const Koa = require("Koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router()
//  koa-bodyparser只支持json格式
const bodyParser = require("koa-bodyparser")
/* 
methods：
  put: 全更新
  patch: 局部更新
  MVC: 
   Model（数据模型）
   V: view
   C: controller
*/
router.get("/", (ctx, next) => {
  ctx.body = "hello get"
})
router.post("/users", (ctx, next) => {
  ctx.body = "hello post";
  ctx.body = ctx.request.body
})
app.use(bodyParser())
app.use(router.routes());
//可以发OPTIONS预检请求，返回allow响应头，客户端可得知服务器能发送哪些请求
app.use(router.allowedMethods())  
app.listen(3000, () => {
  console.log("server is lisening on http://127.0.0.1:3000");
})