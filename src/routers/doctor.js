// const { request } = require("express");
const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { docSignup, docSignin, isDocGoogleSignup, docSignout ,allDoctors , allDoctorsOfParticularDepartment} = require("../controller/doctor");

router.post("/dsignup", docSignup);

router.post("/dsignin", docSignin);

router.get("/doctors", allDoctors);

router.get("/doctor", allDoctorsOfParticularDepartment);

router.post("/dfromGoogle", isDocGoogleSignup);

module.exports = router;