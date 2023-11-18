const { log } = require("console");
const http = require("http");
const fs = require("node:fs");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("content-Type", "text/html");
  //   res.end(
  //     "<h1>This is code with harry</h1> <p>this is the coding tutorial</p>"
  //   );
  res.end(fs.readFileSync("index.html"));
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
