//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SpeakerModelSchema = new Schema({
    firstname: String,
    lastname: String,
    email:String,
    country: String,
    company: String,
    position:String,
    imageUrl:String,
    twitterUrl:String,
    linkedinUrl:String,
    facebookUrl:String,
    topic:String,
    description: String
});

//Export function to create "User" model class
module.exports = mongoose.model('Speaker', SpeakerModelSchema );