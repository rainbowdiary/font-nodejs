const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router({
    prefix: '/users'
});

const fn = async(ctx,next)=>{
    console.log("fn");
    await next()
}

// router.get("/:id",(ctx,next)=>{
//     console.log(typeof  +ctx.params.id)
//     ctx.body="hello router get ----"
// })
router.get("/",fn,(ctx,next)=>{
    ctx.body="hello router get"
})
router.post("/",(ctx,next)=>{
    console.log(ctx.headers)
    ctx.status = 200;
    ctx.body={
        message:"post"
    }
})
router.get("/damu",(ctx,next)=>{ctx.body="hello users damu"})

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods())
app.listen(8080,()=>{console.log("server is runing on http://127.0.0.1:8080")});