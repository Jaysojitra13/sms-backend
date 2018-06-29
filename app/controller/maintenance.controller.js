const SignUp = require('../models/signup.model.js');
const Maintenance = require('../models/maintenance.model');


exports.createMaintenance = (req, res) => {
    console.log(req.params.currentUserId)
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // var currentUser = {
    //     id: req.body.id,
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname
    // }
    
    // var month = {
    //     monthName: req.body.month,
    //     isPaid: req.body.isPaid
    // }
    
    // var months = months.push(month)

    // var newMaintenance = {
    //     datePaid: req.body.date,
    //     currentUser: currentUser,
    //     months: months
    // }
    
    // Maintenance.create(newMaintenance, (err, newMaintenance) => {
    //     if(err) console.log(err);
    //     res.send(newMaintenance);
    
    // })

    Maintenance.find({"currentUser.id": req.params.currentUserId})
    .then(maintenance => {
        if(maintenance.length >= 1) {
            res.send(maintenance+ "hello")
        }else {
            const newMaintenance = new Maintenance({
                datePaid: req.body.date,
                currentUser: {
                    id: req.params.currentUserId,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname 
                },
                months: req.body.months
            });
            newMaintenance.save()
            .then(maintenance => {
                res.send(maintenance)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Maintenance is not saved"
                })
            })
        }
    })
    .catch(err => {
        if(err) res.status(404).send({
            message: err.message || "Maintenance is not found"
        })
    })

        
    // });
    
    
}