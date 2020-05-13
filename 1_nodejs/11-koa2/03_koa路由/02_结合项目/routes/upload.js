const Router = require("koa-router");
const uploadRouter = new Router({ prefix: "/upload" });
const { uploadFile } = require("../controllers/upload")
uploadRouter.post("/", uploadFile)

module.exports = uploadRouter