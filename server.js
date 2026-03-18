const http = require('http');

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'Hello World from Cloud Run!',
    timestamp: new Date().toISOString(),
    path: req.url,
  }));
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
