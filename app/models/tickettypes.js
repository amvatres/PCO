//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var TicketTypesModelSchema = new Schema({
    firstname: String,
    lastname: String,
    email:String,
    type:String
});

//Export function to create "User" model class
module.exports = mongoose.model('TicketType', TicketTypesModelSchema );