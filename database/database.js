const Sequelize = require("sequelize");


const connection = new Sequelize('questionsanswers', 'root', '0611',{
    host: 'localhost',
    port: 4000,
    dialect: 'mysql'
});

module.exports = connection;