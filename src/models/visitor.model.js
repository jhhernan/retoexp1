const {model, Schema, models} = require('mongoose');


const visitorSchema = new Schema({
    name: {
        type: String,
        required:[true, "Name is required"] 
    }, 
    date:{ 
        type: Date,
        required:[true, "date is required"]  
    }, 

},{
    timestamps: true,
});

const Visitor = model('Visitor', visitorSchema);

module.exports = Visitor;