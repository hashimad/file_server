const http = require("http");
const fs = require("fs");
const os = require("os");

const host = "127.0.0.1";
const port = 5000;

const server = http.createServer((req, res) => {
  const urlPath = req.url;
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  //Index Page
  if (urlPath === "/") {
    fs.readFile("pages/index.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.write("File not found");
      } else {
        res.write(data);
      } // end of else
      res.end();
    });
  }
  //About Page
  else if (urlPath === "/about") {
    fs.readFile("pages/about.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.write("File not found");
      } else {
        res.write(data);
      } // end of else
      res.end();
    });
  }
  //system info
  else if (urlPath === "/sys") {
    res.setHeader("Content-Type", "text/plain");
    const data = JSON.stringify({
      hostname: os.hostname(),
      platform: os.platform(),
      architecture: os.arch(),
      numberOfCPUS: os.cpus(),
      networkInterfaces: os.networkInterfaces(),
      uptime: os.uptime(),
    });

    fs.writeFile("osinfo.json", data, (err) => {
      if (err) {
        res.end("Error Occur");
      }
      res.statusCode = 201;
      res.end("Your OS info has been saved successfully!");
    });
  }

  //404 Page
  else {
    res.statusCode = 404;
    fs.createReadStream(__dirname + "/pages/404.html").pipe(res);
  }
});

server.listen(port, host, () => {
  console.log(`Server Running at ${host}:${port}`);
});
