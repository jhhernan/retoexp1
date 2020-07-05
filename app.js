const express = require("express");
const cors= require("cors");
const moment = require('moment');

const Visitor = require('./src/models/visitor.model');

const initDatabase = require('./src/db.js');


initDatabase();


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async(req, res) => {
    let name;
    if (req.query.name) {
        name = req.query.name
    }else {
        name = "Anónimo";
    }
    let date = moment().toDate();
    const visitor = await Visitor.create({name, date});

    res.status(200).send("<h1>El visitante fue almacenado con éxito</h1>");
    
})

module.exports = app;