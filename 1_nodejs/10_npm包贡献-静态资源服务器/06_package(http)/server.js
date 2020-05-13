//系统模块
const http = require("http");
//自定义模块
const config = require("./config");
const asyncFn = require("./async/async")

class Server {
    constructor(argv){
        this.config = Object.assign(config,argv)
    };
    start(){
        //启动http服务
        const server = http.createServer((req,res)=>{
            asyncFn(req,res,this.config).catch((err)=>{
                if(err.code && err.code.toUpperCase() === 'ENOENT'){
                    res.writeHead(404,"zgdd not find")
                    res.end("404")
                }else{
                    res.writeHead(500,"server error")
                    res.end(err.message)
                }
            })
        })
        server.listen(this.config.port,this.config.host,()=>{
            console.log(`server is runing on http://${this.config.host}:${this.config.port}`)
        })
    }
}

module.exports = Server