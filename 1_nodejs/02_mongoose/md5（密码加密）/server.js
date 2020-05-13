const http = require("http");
const md5 = require("blueimp-md5");



const app = http.createServer((req, res) => {


  const query = url.parse(req.url).query;
  console.log(query);

  res.end(md5(query));
  console.log(md5(query));

});

app.listen("3000", () => {
  console.log("server lisenning at http://localhost:3000");
})