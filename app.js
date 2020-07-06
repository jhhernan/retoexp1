require('dotenv').config();
const express = require("express");
const cors= require("cors");
const moment = require('moment');

const Visitor = require('./src/models/visitor.model');

const initDatabase = require('./src/db.js');

const port = 3000;

initDatabase();


const app = express();
app.use(cors());
//app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }))



app.get("/", async(req, res) => {

    let table = '<a href="/register">Register</a> </br> <table>';
    table += "<thead><tr><th>Name</th><th>Email</th></tr></thead>";
    table+= "<tbody>"
    const visitors= await Visitor.find();
    let table1 = visitors.forEach(visitor => {table += "<tr><td>"+visitor.name+"</td><td>"+visitor.email+"</td></tr>"})
    table += "</tbody></table>";
    res.status(200).send(table);   
})

app.get("/register", async (req, res) => {

    let form = '<form action="/register" method="post">';
    form += '<label for="name">Name:</label><input type="text" id="name" name="name"> </br>';
    form += '<label for="email">Email:</label><input type="text" id="email" name="email"> </br>';
    form += '<label for="password">Password:</label><input type="password" id="password" name="password"> </br>';

    form += '<button type="submit">Enviar</button>';
    form += '</form>';
    res.status(200).send(form);
});

app.post("/register", async(req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;


    let visitor = await Visitor.create({ name, email, password })
    let table = "<table>";
    table += "<thead><tr><th>Name</th><th>Email</th></tr></thead>";
    table+= "<tbody>"
    table += "<tr><td>"+name+"</td><td>"+email+"</td><td></tr>";
    table += "</tbody></table>";
    //res.status(200).send(table);   
    res.redirect('/');
})




app.listen(port, () => console.log(`Listening on port ${port}`)); 