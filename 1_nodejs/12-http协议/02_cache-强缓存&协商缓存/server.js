const http = require("http");
const config = require("./config");
const fs = require("fs");
var etag = require('etag')
const { promisify } = require("util")
const statP = promisify(fs.stat)
const readFileP = promisify(fs.readFile)
//  console.log有颜色
const chalk = require('chalk');

const server = http.createServer(async (req, res) => {

  if (req.url === "/cat") {
    const rs = fs.createReadStream("./cat.txt")
    const state = await statP("./cat.txt")
    const body = await readFileP("./cat.txt")
    const Etag = etag(body)
    console.log(body, Etag);

    const lastModified = new Date(state.mtime).toUTCString();// fs.stats.mtime表明上次修改此文件的时间戳
    const ifModifiedSince = req.headers["if-modified-since"];
    const ifNoneMatch = req.headers["if-none-match"];
    console.log(ifModifiedSince, ifNoneMatch);

    //文件内容没有被改动
    if (ifModifiedSince === lastModified || ifNoneMatch === Etag) {
      res.writeHead(304, "not Modified", {
        "Cache-Control": "no-cache", //检测强缓存有效性，如果无效就不再使用强缓存
        "last-modified": lastModified,
        "Etag": Etag
      })
      res.end()

      //文件内容被改过
    } else {
      res.writeHead(200, "ok ok ok expires", {
        //命中强缓存(memory cache)					
        // "expires": new Date(Date.now() + 24 * 60 * 60 * 10000).toUTCString(), //24h后强缓存过期；
        "Cache-Control": "max-age=5",  //5s内命中强缓存 HTTP 1.1；优先级高。
        "last-modified": lastModified, //文件最后一次被修改的时间。 第一次请求成功返回
        //  强缓存失效，chrome下次发请求服务器自动带上植入last-modified的If-Modified-Since字段（chrome也是实现http协议）
        "Etag": Etag
      })
    }

    rs.pipe(res)
    return
  }
  res.end();
})
//  启动服务器
server.listen(config.port, config.host, () => {
  const addr = `http://${config.host}:${config.port}`
  console.info(`listenning in:${chalk.blue(addr)}`);
})