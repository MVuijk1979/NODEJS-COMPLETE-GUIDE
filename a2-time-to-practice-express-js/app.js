const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log('first middleware');
//   next();
// })

// app.use((req, res, next) => {
//   console.log('second middleware');
//   res.send('<h1>Hi, it\'s me!</h1>')
// })


app.use('/user', (req, res, next) => {
  res.send('<h1>The "user" Page</h1>');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(8080);
