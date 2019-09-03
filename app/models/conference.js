//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ConferenceModelSchema = new Schema({
    title: String,
    date: Date,
    place: String,
    city: String,
    description: String,
    venue:String,
    imageUrl:String,
    videoUrl:String,
    contactAddress: String,
    contactPhoneNumber: String,
    contactEmail:String
});

module.exports = mongoose.model('Conference', ConferenceModelSchema );