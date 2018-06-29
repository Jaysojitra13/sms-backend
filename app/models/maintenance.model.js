var mongoose = require("mongoose");

var maintenanceSchema = new mongoose.Schema({
   
    currentUser: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SignUp"
        },
    },
    months: [{monthName: String, isPaid: Boolean}]
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);