const express = require('express');

const router = express.Router();

const users = [];

// / => GET
router.get('/', (req, res, next) => {
    res.render('add-user', {
        pageTitle: 'Add User',
        activeUser: false,
        activeAddUser: true,
        formCSS: true,
        userCSS: true
    });
});

// / => POST
router.post('/', (req, res, next) => {
    users.push({ name: req.body.name });
    res.redirect('/users');
});

exports.routes = router;
exports.users = users;