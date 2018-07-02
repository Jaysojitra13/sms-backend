const SignUp = require('../models/signup.model.js');
const Maintenance = require('../models/maintenance.model');

//Create Maintenance object
exports.createMaintenance = (req, res) => {
    const arrOfMonths = req.body;
    
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
  

    
    Maintenance.findOne({"currentUser.id": req.params.currentUserId, month: req.body.month}, (err, maintenance) => {
        if (maintenance) {
            let promise = new Promise((resolve, reject) => {
                maintenance.isPaid = req.body.isPaid
                maintenance.save()
                resolve(maintenance);
            }).then(    
                res.send({
                    "message": "maintenance updated "
                })
            )
        } else {
            
            const newMaintenance = new Maintenance({
                currentUser: {
                    id: req.params.currentUserId,
                },
                month: req.body.month,
                isPaid: req.body.isPaid
            })
            
            newMaintenance.save()
            .then(Maintenance => {
                res.status(200).send({
                    message: "Maintenance is created"
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err || "Maintenance is not found"
                })
            })
        }
    })   
    
}

//Get all maintenance of given user
exports.getMaintenance = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    Maintenance.find({"currentUser.id": req.params.currentUserId}, {month: 1, isPaid: 1})
    .then(maintenances => {
        const pendingMaintenance =[] ;
        if(maintenances){
        let promise = new Promise((resolve, reject) => {
            maintenances.forEach(maintenance => {
                resolve(maintenance)
                if(!maintenance.isPaid) {
                pendingMaintenance.push(maintenance.month)
                }
            })
        })
        
    }
    res.send(pendingMaintenance)
       
    })
}