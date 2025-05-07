const http = require("http");

const server = http.createServer((req, res) => {
  res.end("This is node");
});

server.listen(3000);
