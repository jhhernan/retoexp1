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
app.use(express.json());

app.get("/", async(req, res) => {
    let name;
    if (req.query.name) {
        name = req.query.name
    }else {
        name = "Anónimo";
    }

    let visitor = await Visitor.findOne({ name: name })
    if (visitor===null || name === "Anónimo"){
        visitor = await Visitor.create({name, count: 1});
    }else {
        const options = {
            new: true,
        };
        visitor = await Visitor.findByIdAndUpdate(visitor._id, {count: visitor.count +1}, options);
    }
    let table = "<table>";
    table += "<thead><tr><th>id</th><th>name</th><th>count</th></tr></thead>";
    table+= "<tbody>"
    const visitors= await Visitor.find();
    let table1 = visitors.forEach(visitor => {table += "<tr><td>"+visitor.id+"</td><td>"+visitor.name+"</td><td>"+visitor.count+"</td></tr>"})
    table += "</tbody></table>";
    res.status(200).send(table);
   
})

app.listen(port, () => console.log(`Listening on port ${port}`)); 