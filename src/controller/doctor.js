const DiagnosisDoc = require("../models/NewDoc");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const docSignup = asyncHandler(async (req, res) => {
    const { fname, email, password, cpassword, lname, fromGoogle, location, qualifications, 
        department, pic, NoOfPatients, popularity, rating, patients, 
        date, registrationNumber,yearOfRegistration,medicalCouncil } = req.body;
    
    if (!lname || !fname || !email || !password || !qualifications || !department || location["city"],
        !location["state"] || !location["country"]|| !registrationNumber || !yearOfRegistration || !medicalCouncil) {
        res.status(400);
        throw new Error(err,"Please Enter Mandatory fields")
    }
    try {
        DiagnosisDoc.findOne({ email: email }, async (err, user) => {
            if (user) {
                res.send({ message: "User already regestered" ,
                            id: user.id,});
            } else {
                if (password === cpassword) {
                    try {
                        const user = new DiagnosisDoc({ fname, email, password, cpassword, lname, fromGoogle, location,
                             qualifications, department, pic, NoOfPatients, popularity, rating, patients, date,
                              registrationNumber,yearOfRegistration,medicalCouncil });
                        // creating token for user
                        const token = await user.generateAuthToken();
                        // creating cookie
                        res.cookie("jwt", token, { httpOnly: true, SameSite: false });

                        const createUser = await user.save();
                        res.send({ user: createUser }).status(201);
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    res.send({ cpasswordWrong: "Passwords doesnot match" }).status(201);
                }
            }
        })
    } catch (error) {
        res.send(error).status(400);
    }
});

const docSignin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please Enter Mandatory fields");
    }
    try {
        DiagnosisDoc.findOne({ email: email }, async (err, user) => {
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {

                    const token = await user.generateAuthToken();
                    // creating cookie
                    res.cookie("jwt", token, { httpOnly: true, SameSite: false });

                    res.send({ message: "Signin successful", user: user, cookie: req.cookies.jwt }).status(201);
                }
                else {
                    res.send({ message: "Invalid credentials" }).status(401);
                }
            }
            else {
                res.send({ message: "User not found" }).status(401);
            }
        })
    } catch (error) {
        res.send(error).status(400);
    }
});

const isDocGoogleSignup = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        DiagnosisDoc.findOne({ email: email }, async (err, user) => {
            if (user) {
                if (user.fromGoogle === true) {
                    res.send({ user: user }).status(201);
                } else {
                    res.send({ message: "Not connected with google" })
                }
            } else {
                res.send({ noUser: "No user found" }).status(401);
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

const allDoctors = asyncHandler(async (req, res) => {
    try {
        const allDoctors = await DiagnosisDoc.find();
        res.send(allDoctors).status(200);
    } catch (error) {
        res.status(500).send(error);
    }
})

const allDoctorsOfParticularDepartment = asyncHandler(async (req, res) => {
    const dept = req.query.department;
    console.log(dept)
    try {
        const doctors = await DiagnosisDoc.find({ department: dept });
        console.log(doctors);
        res.send(doctors).status(200);

    } catch (error) {
        res.send(error).status(400);
    }
})

module.exports = {
    docSignup,
    docSignin,
    isDocGoogleSignup,
    allDoctors,
    allDoctorsOfParticularDepartment,
}