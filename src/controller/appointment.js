const Appointment = require("../models/appointment");
const asyncHandler = require("express-async-handler");
// const DiagnosisUser = require("../models/newUser");

const requestAppointment = asyncHandler(async (req, res) => {
    const { userId, docId, expDate,expTime } = req.body;
    try {
        const appointmentData = {
            user: userId,
            doctor: docId,
            expectedDate: expDate,
            expectedTime: expTime,
        }
        
        
        const newAppointment = await Appointment.create(appointmentData);
        const fullAppointment = await Appointment.findOne({ _id: newAppointment.id }).populate("user", "_id fname lname email").populate("doctor", "_id fname lname email department")

        await fullAppointment.save();
        res.send(fullAppointment).status(201);

    } catch (error) {
        res.send("Error: " + error.message)
    }
})

module.exports = {
    requestAppointment
}