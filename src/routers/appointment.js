const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { requestAppointment } = require("../controller/appointment");

router.post("/requestappointment", requestAppointment);

module.exports = router;