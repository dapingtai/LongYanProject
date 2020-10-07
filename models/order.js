/*
* LongYan 訂單模組
* */

const mogoose = require('mongoose');

const OrederSchema = new mogoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    town:{type: String, required: true},
    area:{type: String, required: true},
    areanumber:{type: Number, required: true},
    address:{type: String, required: true},
    friendcode:{type: String },
    count:{
        longyan: {type: Number, required: true}
    },
    annotation:{type: String},
    status: {type: String, required: true}
})

module.exports = mogoose.model('Order', OrederSchema);
