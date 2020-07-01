const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((request, response) => {
  const pathname = url.parse(request.url, true).pathname;

  if(pathname === '/'){
    response.writeHead( 200, {'Content-Type':'text/html'});
    fs.readFile(__dirname + '/static/home.html', (error, data) => {
      if (error) throw error; // 에러 발생시 에러 기록하고 종료
      response.end(data, 'utf-8'); // 브라우저로 전송
    });
  }
}).listen(3000);