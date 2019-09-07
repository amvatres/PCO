//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var AgendaModelSchema = new Schema({
    date: Date,
    time: String,
    activity: String,
    description: String
});

module.exports = mongoose.model('Agenda', AgendaModelSchema );