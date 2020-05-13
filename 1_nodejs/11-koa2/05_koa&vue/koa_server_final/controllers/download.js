const data = require("../db/download")
class Download {
  index(ctx) {
    ctx.body = data
  }
}
module.exports = new Download()