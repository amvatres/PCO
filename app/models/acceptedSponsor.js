//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var AcceptedSponsorModelSchema = new Schema({
    company:String,
    companyDescription: String,
    logoUrl: String,
    typeOfSponsorship: String,
    contactEmail: String,
});

//Export function to create "User" model class
module.exports = mongoose.model('AcceptedSponsor', AcceptedSponsorModelSchema );