const SignUp = require('../models/signup.model.js');
const Maintenance = require('../models/maintenance.model');


exports.createMaintenance = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    var currentUser = {
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    
    var month = {
        monthName: req.body.month,
        isPaid: req.body.isPaid
    }
    
    var months = months.push(month)
    var newMaintenance = {
        datePaid: req.body.date,
        currentUser: currentUser,
        months: months
    }
    
    Maintenance.create(newMaintenance, (err, newMaintenance) => {
        if(err) console.log(err);
        res.send(newMaintenance);
    
    })
    
    
}