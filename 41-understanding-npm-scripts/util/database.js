const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'VPQdClKHx2tINW9EqXLy'
});

module.exports = pool.promise();