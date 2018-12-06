const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader('Content-Type', 'text/html');
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Username</title><head>');
    res.write('<body><h1>Hi, welcome!</h1><h2>Please, enter a username?</h2>');
    res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/users' && method === 'GET') {
    res.write('<html>');
    res.write('<head><title>Username List</title><head>');
    res.write('<ul><li>Robin van Persie</li><li>Jordy Clasie</li><li>Stephan Berghuis</li></ul>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split("=")[1]);
      res.statusCode = 302;
      res.setHeader('Location', '/users');
      return res.end();
    });
  }    
});

server.listen(8080);
