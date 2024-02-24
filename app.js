const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Send the response body "Hello World"
  res.end('Hello World\n');
});

// Listen on port 3000, IP defaults to 127.0.0.1 (localhost)
server.listen(8080, () => {
  console.log('Server running at http://127.0.0.1:8080/');
});
