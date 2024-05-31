const mongoose = require("mongoose");
const schema = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    },
    expectedDate: {
        type: String
    },
    confirmedDate: {
        type: String
    }
}

const appointmentSchema = new mongoose.Schema(schema);
const appointment = new mongoose.model("Appointment", appointmentSchema);
module.exports = appointment;

