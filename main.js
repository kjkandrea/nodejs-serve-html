const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((request, response) => {
  const pathname = url.parse(request.url, true).pathname;

  if (request.method === 'GET') {
    if(pathname === '/'){
      response.writeHead( 200, {'Content-Type':'text/html'});
      fs.readFile(__dirname + '/static/home.html', (error, data) => {
        if (error) console.error(error); // 에러 발생시 에러 기록하고 종료
        response.end(data, 'utf-8'); // 브라우저로 전송
      });
    }else if(pathname){
      function pathnameParser() {
        const arr = pathname.split('/')
        let pathnameParse = `${arr[1]}.html`

        return pathnameParse;
      }

      fs.readFile(__dirname + `/static/${pathnameParser()}`, (error, data) => {
        if (error) {
          console.log(error)
          response.writeHead(404);
          response.end('Not Found')
        }
        response.writeHead( 200, {'Content-Type':'text/html'});
        response.end(data, 'utf-8'); // 브라우저로 전송
      });
      console.log('pathnameParser : ',pathnameParser())
    }else {
      response.writeHead(404);
      response.end('Not Found')
    }
  }
}).listen(3000);