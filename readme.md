# 쥐돌이의 포트폴리오 node.js 서버 구성해주기

쥐돌이는 웹 개발자로 일하고 싶어하는 취업준비생이다.
쥐돌이는 html 공부를 열심히 하여 html로 자신의 포트폴리오를 만들었다. 
총 4개의 home, about, portfolio, contact 페이지로 구성되어 있으며 디렉토리 구조는 다음과 같다.

```
static/
--/ home.html
--/ about.html
--/ portfolio.html
--/ contact.html
main.js
```

쥐돌이는 node.js서버에 자신의 포트폴리오를 호스팅 하고싶다. 쥐돌이를 도와 `main.js`에 **nodejs로 서버를 생성하여 웹 어플리케이션을 만들어주자.**

## 1. Home 표시하기

### path 분석하기

main.js를 다음과 같이 구성하여 우선 path에 대해 알아보자

``` javascript
const http = require('http');
const url = require('url');

http.createServer((request, response) => {
  const path = url.parse(request.url, true);

  console.log(path)
}).listen(3000);
```

이후 [http://localhost:3000/path?query=something](http://localhost:3000/path?query=something) 으로 접속해보면 다음과 같은 결과를 볼 수 있다.

``` javascript
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?query=something',
  query: [Object: null prototype] { query: 'something' },
  pathname: '/path',
  path: '/path?query=something',
  href: '/path?query=something'
}
```

`pathname`에 **순수한 path 정보**가 담기는 걸 볼 수 있다. 이를 토대로 home을 분기할 수 있을것이다.

### pathname을 토대로 root페이지(home) 분기하기

다음과 같이 코드를 해보자

``` javascript
const http = require('http');
const url = require('url');

http.createServer((request, response) => {
  const pathname = url.parse(request.url, true).pathname;

  if(pathname === '/'){
    response.end('is Home');
  }
}).listen(3000);
```

http://localhost:3000/ 으로 접근하면 이제 'is Home' 텍스트가 표기된다.

`pathname`으로 홈페이지를 멋지게 분기했으니 이제 'is Home' 텍스트가 아닌 HTML을 응답해보자.

### home.html 내용 응답하기

home.html을 응답해주긴 위해서는 해당 파일을 읽어들여 내용을 응답해주어야 할것이다.
이때 사용되는 모듈이 `fs`이며 해당 모듈내에 `readFile` 메서드를 사용한다. 
`readFile`을 이용하여 다음과 같이 업데이트 하여보자.

``` javascript
const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((request, response) => {
  const pathname = url.parse(request.url, true).pathname;

  if(pathname === '/'){
    fs.readFile(__dirname + '/static/home.html', (error, data) => {
      response.end(data);
    });
  }
}).listen(3000);
```

실행 후 요청을 보내보면 `static/home.html` 이 root에 표시되는 걸 볼 수 있다.
두가지 처리를 더 해주자.

* 성공 시 응답 상태 코드 200 보내주기
* 에러 발생시 에러 예외 처리

``` javascript
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
```