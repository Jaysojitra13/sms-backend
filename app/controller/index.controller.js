const SignUp = require('../models/signup.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/database.config.js')
const Maintenance = require('../models/maintenance.model.js');
// Create and Save a new user
exports.create = (req, res) => {    
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    //Check Wheather user is created or not
    SignUp.find({email: req.body.email})
    .then(user => {
        if(user.length >= 1) {
            return res.status(409).json({
                message: "User already exist"
            })
        } else {
            // Create a user
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) 
                {return res.status(500).json({
                    error: err
                })}
                else{
                    const user = new SignUp({
                        firstName:          req.body.firstName,
                        lastName:           req.body.lastName, 
                        email:              req.body.email,
                        password:           hash ,
                        confirmpassword:    req.body.confirmpassword,
                        birthdate:          req.body.birthdate,
                        flatePurchaseDate:          req.body.flatePurchaseDate,
                        profilePhoto:       req.file.path,
                        flateBlock:         req.body.flateBlock,
                        flateNumber:        req.body.flateNumber,
                        mobileNumber:       req.body.mobileNumber,
                        
                    });
                    // Save user in the database
                    user.save()
                    .then(user => {
                        var token = jwt.sign({ id: user._id }, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        res.send({user: user, token: token});
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the user."
                        });
                    });
                }
                
            })
        }
    })
    
    
    
    
    
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    console.log(req.params.loginUserId);
    
    SignUp.findOne({"_id": req.params.loginUserId}, (err, user) => {
            let promise = new Promise((resolve, reject) => {
                console.log(user.flateBlock)
                resolve(user.flateBlock)
            })
            
        
            SignUp.find({$or: [{flateBlock: user.flateBlock}]}, {flateBlock: 1, flateNumber: 1, firstname: 1, lastname: 1})
            .then(users => {
                res.send(users);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            });
        })
    
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
        firstName:          req.body.firstname,  
        lastName:           req.body.lastname,    
        email:              req.body.email,
        password:           req.body.password,    
        birthdate:          req.body.birthdate,   
        flatePurchaseDate:          req.body.flatePurchaseDate,
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

//Login with token
exports.login = (req, res) => {
    SignUp.findOne({email: req.body.email},)
    .then(user => {
        // if (err) return res.status(500).send({message: 'Error on the server.'});
        if (!user) return res.status(404).send({message: 'No user found.'});
        
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        
        var token = jwt.sign({flateBlock: user.flateBlock, id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        
        res.status(200).send({ auth: true, token: token });
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: err
            });                
        }
        return res.status(500).send({
            message: err
        });
    });
};

//Verify token
exports.checkToken = (req, res) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        SignUp.findById(decoded.id, {password: 0} ,function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            
            res.status(200).send(decoded);
        });
        
    });
}


//logout
exports.logout = (req, res) => {
    res.status(200).send({ auth: false, token: null });
}