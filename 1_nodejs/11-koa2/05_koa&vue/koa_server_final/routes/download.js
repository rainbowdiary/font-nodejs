const Router = require("koa-router");
const homeRouter = new Router({ prefix: "/download" });
const { index } = require("../controllers/download")
homeRouter.get("/", index)

module.exports = homeRouter