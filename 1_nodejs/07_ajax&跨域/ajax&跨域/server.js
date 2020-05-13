const http = require("http");
const app = http.createServer((req, res) => {
  console.log(req);

  res.end("hello")
});
app.listen("3000", () => {
  console.log("server is lisening on http://127.0.0.1:3000");
})