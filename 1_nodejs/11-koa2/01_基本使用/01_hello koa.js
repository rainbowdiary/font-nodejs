/* 
*  1. 在koa中中间件就是一个回调函数
*  2. koa中的中间件接受两个参数
*        ctx: koa的上下文
*        next： 下一个中间件（下一个回调函数）
*  3. 默认在koa中第一个中间件是被自动调用的
*  4. 我们可以使用use方法不断的注册中间件
*/

const Koa = require("koa");  // Koa是一个class
const app = new Koa();
app.use((ctx) => {             // use方法只是将对应的回调函数收集到一个数组中
  ctx.body = "hello koa"
})
app.listen(3000)