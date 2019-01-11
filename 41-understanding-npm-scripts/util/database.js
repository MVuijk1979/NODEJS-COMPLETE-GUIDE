const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'VPQdClKHx2tINW9EqXLy', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;