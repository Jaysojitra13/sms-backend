var mongoose = require("mongoose");

var maintenanceSchema = new mongoose.Schema({
   
    currentUser: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SignUp"
        },
    },
    month: {type: String},
    isPaid: {type: Boolean, default: false}
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);