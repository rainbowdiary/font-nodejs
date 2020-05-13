const Koa = require("koa");
const app = new Koa();
app.use(async (ctx, next) => {
  console.log("1-start")
  var res = await next()
  console.log("1-end", res)
})
app.use(async (ctx, next) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("2-start");
      resolve();
    }, 2000)
  })
  ctx.body = "hello koa"
  console.log("2-end");
  return "damu"
})
app.listen(3000)

/*
* koa没有实现洋葱模型
  next是dispatch，返回一个promise 
  是回调的包裹

* 如何保证洋葱模型?
   - 中间件定义为async函数
   - 中间件中异步代码包装成promise，并且await
   - 所有next()都要await 

* 分析 
 - next()是否执行取决于下一个中间件函数的返回值
 - 下一个中间件的async同步输出返回pending状态的promise，
 - 只有当下一个中间件async函数异步代码被执行，await状态确认，返回resolve()
 - next()状态改为resolve才会执行下面的代码
 
* 原因:有异步代码，洋葱模型无法保证，异步代码会最后执行
 */
