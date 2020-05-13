const fs = require("fs");
const { promisify } = require("util")
const readDirP = promisify(fs.readdir)

module.exports = async (app) => {
  const paths = await readDirP(__dirname)
  paths.forEach((path) => {
    if (path === "index.js") return
    const router = require(`./${path}`);
    app
      .use(router.routes())
      .use(router.allowedMethods());
  })
}
