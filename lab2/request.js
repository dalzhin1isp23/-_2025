const fs = require("fs");
const http = require("http");
const path = require("path");

const server = http.createServer((req, res) => {
  const url = req.url;

  let filePath;
  let contentType = "text/html";

  if (url === '/' || url === '/index.html') {
    filePath = path.join(__dirname, "temp", "index.html");
  } else if (url === '/style.css') {
    filePath = path.join(__dirname, "temp", "index.css");
    contentType = "text/css";
  } else if (url === '/script.js') {
    filePath = path.join(__dirname, "temp", "script", "script.js");
    contentType = "application/javascript";
  } else if (url === '/404.jpg') {
    filePath = path.join(__dirname, "temp", "img", "404.jpg");
    contentType = "image/png";
  } else {
    filePath = path.join(__dirname, "temp", "page", "404.html");
    
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 — Страница не найдена</h1>");
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