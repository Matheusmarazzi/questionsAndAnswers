const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const question = require("./database/Questions");
const answer = require("./database/Answers");
const Answers = require("./database/Answers");


//database
connection.authenticate()
    .then(()=>{
        console.log('connected successfully');
    })
    .catch((err)=>{
        console.log(err);
    })

//calling EJS   || defining the view engine as EJS
app.set('view engine', 'ejs');

//defining the folder for static files
app.use(express.static('public'));
//body parser
app.use(bodyParser.urlencoded({extended: false}));//transform form data into JS
app.use(bodyParser.json());



app.get('/', (req, res) =>{
    question.findAll({raw:true, order:[
        ['id', 'DESC']// arrange in descending order  [DESC || ASC]
    ]})//return only the data
        .then((questions)=>{
            res.render("index",{
                questions: questions
            }); //Rendering a view and receive data

        })
});
app.get('/toask', (req, res) =>{
    res.render("toAsk"); //Rendering a view
});
app.post('/save', (req, res)=>{
    let title = req.body.title;
    let describe = req.body.describe;
    question.create({
        title: title,
        description: describe
    })
        .then(()=>{
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
        })


})
app.get('/question/:id',(req, res)=>{
    let id = req.params.id;
    question.findOne({
        where:{id:id}
    })
    .then((question)=>{
        if(question){
            Answers.findAll({
                where: {questionID:question.id},
                order: [['id', 'DESC']]
            }).then((answer)=>{
                res.render("question",{
                    answer: answer,
                    question:question
               })
            })
           
        }else
        res.redirect("/");
    })

});
app.post('/reply',(req, res)=>{
    let body = req.body.body;
    let questionID = req.body.questionID;

    Answers.create({
        body: body,
        questionID: questionID
    })
    .then(()=>{
        res.redirect("/question/"+questionID);
    });


})

app.listen(6060, ()=>{
    console.log('app rodando');
});