//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var MessageModelSchema = new Schema({
    name: String,
    email: String,
    subject:String,
    message:String
});

//Export function to create "User" model class
module.exports = mongoose.model('Message', MessageModelSchema );