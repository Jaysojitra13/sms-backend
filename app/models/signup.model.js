var mongoose = require('mongoose');

var signUpSchema = new mongoose.Schema({
    firstname:          {type: String, required: true},
    lastname:           {type: String, required: true},
    email:              {type: String, required: true},
    password:           {type: String, required: true},
    confirmpassword:     {type: String, required: true},
    birthdate:           {type: Date, required: true, default: Date.now()},
    profilePhoto:        {type: String, required: true},
    flateBlock:          {type: String, required: true},
    flateNumber:        {type: String, required: true},
    mobileNumber:       {type: Number, required: true}
    
});

module.exports = mongoose.model('SignUp', signUpSchema);