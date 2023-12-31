const Sequelize = require("sequelize");
const connection = require("./database");

const Question = connection.define('Question', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }

});
Question.sync({force: false}).then(()=>{
    console.log("model created");
})

module.exports = Question;