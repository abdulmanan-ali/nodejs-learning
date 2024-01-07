const { log } = require("console");
const http = require("http");
const fs = require("node:fs");
const url = require("url")

// const port = process.env.PORT || 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("content-Type", "text/html");
//   //   res.end(
//   //     "<h1>This is code with harry</h1> <p>this is the coding tutorial</p>"
//   //   );
//   res.end(fs.readFileSync("index.html"));
// });

// server.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

// piyush sever-------------------------------------------------

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();

  const log = `${Date.now()}: ${req.url} New Request received \n`
  const myUrl = url.parse(req.url)
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {  //(req.url)
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        res.end("About Page");
        break
      default:
        res.end("Error 404")
        break;
    }
  })
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});