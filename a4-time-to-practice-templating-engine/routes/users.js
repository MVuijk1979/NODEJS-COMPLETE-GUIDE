const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/users', (req, res, next) => {
    const users = adminData.users;
    res.render('users', {
        users: users,
        pageTitle: 'Show Users',
        activeUser: true,
        activeAddUser: false,
        formCSS: false,
        userCSS: true
    });
});

module.exports = router;
