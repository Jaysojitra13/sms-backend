const SignUp = require('../models/signup.model.js');

// Create and Save a new user
exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    
    // Create a user
    const user = new SignUp({
        firstname:          req.body.firstname,  
        lastname:           req.body.lastname,    
        email:              req.body.email,
        password:           req.body.password,    
        confirmpassword:    req.body.confirmpassword, 
        birthdate:          req.body.birthdate,   
        profilePhoto:       req.body.profilePhoto,
        flateBlock:         req.body.flateBlock,
        flateNumber:        req.body.flateNumber,
        mobileNumber:       req.body.mobileNumber
    });  
    
    // Save user in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    SignUp.find({}, {flateBlock: 1, flateNumber: 1, firstname: 1, lastname: 1})
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    SignUp.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    
    // Find user and update it with the request body
    SignUp.findByIdAndUpdate(req.params.userId, {
        firstname:          req.body.firstname,  
        lastname:           req.body.lastname,    
        email:              req.body.email,
        password:           req.body.password,    
        confirmpassword:    req.body.confirmpassword, 
        birthdate:          req.body.birthdate,   
        profilePhoto:       req.body.profilePhoto,
        flateBlock:         req.body.flateBlock,
        flateNumber:        req.body.flateNumber,
        mobileNumber:       req.body.mobileNumber
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    SignUp.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};