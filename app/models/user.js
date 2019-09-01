//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
    username: String, 
    password: String, 
    firstname: String,
    lastname: String,
    email:String,
    phoneNumber: Number,
    country: String,
    company: String,
    position:String,
    imageUrl:String,
    admin:Boolean
});

//Export function to create "User" model class
module.exports = mongoose.model('User', UserModelSchema );