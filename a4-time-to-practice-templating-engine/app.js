const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

const adminData = require('./routes/admin');
const usersRoutes = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', adminData.routes);
app.use(usersRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page not Found',
        activeUser: false,
        activeAddUser: false,
        formCSS: false
    })
});

app.listen(8080);
