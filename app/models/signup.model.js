var mongoose = require('mongoose');

var signUpSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    confirmpassword: String,
    birthdate: {type: Date, default: Date.now()},
    profilePhoto: String,
    flateBlock: String,
    flateNumber: String,
    mobileNumber: Number
  
});

module.exports = mongoose.model('SignUp', signUpSchema);