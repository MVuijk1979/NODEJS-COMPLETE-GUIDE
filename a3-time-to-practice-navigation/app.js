const path = require("path");
const express = require('express');

const app = express();

const adminRoutes = require('./routes/admin');
const usersRoutes = require('./routes/users');

app.use('/admin', adminRoutes);
app.use(usersRoutes);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  });

app.listen(8080);