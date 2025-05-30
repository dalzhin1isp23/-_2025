const fs = require("fs");
const http = require("http");
const path = require("path");
const https = require("https");

let products = [];


https.get("https://dummyjson.com/products",  (api) => {
  let data = '';
  api.on('data', chunk => data += chunk);
  api.on('end', () => {
    try {
      const json = JSON.parse(data);
      products = json.products;
    } catch (e) {
      console.error('Ошибка парсинга данных:', e);
    }
  });
}).on('error', (err) => {
  console.error('Ошибка загрузки продуктов:', err);
});

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url.startsWith('/api/')) {
    if (products.length === 0) {
      return res.writeHead(500, { "Content-Type": "text/plain" }).end("Данные ещё не загружены");
    }

    if (url === '/api/products') {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(products));
    }

  
    if (url.startsWith('/api/product/search')) {
      const query = new URLSearchParams(url.split('?')[1]).get('query');
      const filtered = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(filtered));
    }


    const productByIdMatch = url.match(/^\/api\/product\/(\d+)$/);
    if (productByIdMatch) {
      const id = parseInt(productByIdMatch[1], 10);
      const product = products.find(p => p.id === id);
      if (product) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(product));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Продукт не найден" }));
      }
    }


    return res.writeHead(404).end("API не найден");
  }

  
  let filePath;
  let contentType = "text/html";

  
  const product_page_match = url.match(/^\/product\/(\d+)$/);
  if (product_page_match) {
    filePath = path.join(__dirname, "ne_temle","page", "product.html"); 
    contentType = "text/html";
  } else if (url === '/') {
    filePath = path.join(__dirname, "ne_temle", "app.html");
  } else if (url === '/style.css') {
    filePath = path.join(__dirname, "ne_temle", "style.css");
    contentType = "text/css";
  } else if (url === '/404.jpg') {
    filePath = path.join(__dirname, "ne_temle","img","404.jpg");
    contentType = "image/png";
  } else if (url === '/lupa.png') {
    filePath = path.join(__dirname, "ne_temle","img", "lupa.png");
    contentType = "image/png";
  } else if (url === '/script.js') {
    filePath = path.join(__dirname, "ne_temle","script", "scpt.js");
    contentType = "application/javascript";
  } else {
    filePath = path.join(__dirname, "ne_temle","page", "404.html");
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        filePath = path.join(__dirname, "ne_temle","page", "404.html");
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