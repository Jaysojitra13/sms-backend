var mongoose = require("mongoose");

var maintenanceSchema = new mongoose.Schema({
    datePaid: Date,
    currentUser: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SignUp"
        },
        firstname: String,
        lastname: String
    },
    months: [{monthName: String, isPaid: Boolean}]
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);