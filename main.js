const http = require('http');
const url = require('url');

http.createServer((request, response) => {
  const pathname = url.parse(request.url, true).pathname;

  if(pathname === '/'){
    response.end('is Home');
  }
}).listen(3000);