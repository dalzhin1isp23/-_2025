const fs = require("fs");
const http = require("http");
const path = require("path");

const server = http.createServer((req, res) => {
  const url = req.url === "/" ? "/index.html" : req.url;
  const filePath = path.join(__dirname, "temp", url);

  const extname = path.extname(url);
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg"
  };
  const contentType = mimeTypes[extname] || "text/html";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.createReadStream(path.join(__dirname, "temp/page/404.html")).pipe(res);
      } else {
        res.writeHead(500);
        res.end("Ошибка сервера");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});