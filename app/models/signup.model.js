var mongoose = require('mongoose');

var signUpSchema = new mongoose.Schema({
    title: String,
    content: String
  
});

module.exports = mongoose.model('SignUp', signUpSchema);