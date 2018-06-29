const SignUp = require('../models/signup.model.js');
const Maintenance = require('../models/maintenance.model');


exports.createMaintenance = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }



    Maintenance.find({"currentUser.id": req.params.currentUserId})
    .then(maintenance => {
        // console.log(maintenance[0].months)
        if(maintenance.length >= 1) {
            // Maintenance.update({"currentUser.id": req.params.currentUserId})
            // .then(result => {
                
            // })
            // .catch(err => {
            //     console.log(err)
            // })
            // const month = req.body.months
            // $push: {months: req.body.month}
            res.send(maintenance[0].months)
        }else {
            const newMaintenance = new Maintenance({
                currentUser: {
                    id: req.params.currentUserId,
                },
                months: req.body.months
            });
            newMaintenance.save()
            .then(maintenance => {
                res.send(maintenance)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message + "a"|| "Maintenance is not saved"
                })
            })
        }
    })
    // .catch(err => {
    //     if(err) res.status(404).send({
    //         message: err.message +  "b"|| "Maintenance is not found"
    //     })
    // })

        
    // });
    
    
}