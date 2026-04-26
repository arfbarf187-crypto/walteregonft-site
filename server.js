const http = require("http");

const server = http.createServer((req, res) => {
  res.write("Hood Catz server online.");
  res.end();
});

server.listen(3000);

console.log("Server running at http://localhost:3000");