const http = require("http");
const fs = require("fs");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("content-Type", "text/html");

  if (req.url == '/' || req.url == '/home') {
    res.statusCode = 200;
    const data = fs.readFileSync("index.html");
    res.end(data.toString());
  } else if (req.url == '/about-us') {
    res.statusCode = 200;
    res.end("<h1>About us page</h1>");
  } else if (req.url == '/contact') {
    res.statusCode = 200;
    res.end("<h1>Contact us page</h1>");
  } else {
    res.statusCode = 404;
    res.end('<h1>Error 404</h1>');
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
