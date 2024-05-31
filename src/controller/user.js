const DiagnosisUser = require("../models/newUser");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// controllers/auth.controller.js
const { requestPasswordReset, resetPassword } = require("../middleware/resetPass");


const resetPasswordRequestController = async (req, res) => {
    console.log(req.body.email);
    const requestPasswordResetService = await requestPasswordReset(
        req.body.email
    );

    return res.json(requestPasswordResetService);
};

const resetPasswordController = async (req, res, next) => {
    const resetPasswordService = await resetPassword(
        req.body.userId,
        req.body.token,
        req.body.password
    );
    return res.json(resetPasswordService);
};

const isUser = asyncHandler(async (req, res) => {
    if (req.user) {
        res.send({ user: req.user }).status(201);
    } else {
        res.send({ message: "User loged out please login again" }).status(201);
    }
})

const userSignup = asyncHandler(async (req, res) => {
    const { fname, email, password, cpassword, lname, fromGoogle, pic, date } = req.body;
    if (!fname || !email || !password || !lname) {
        res.status(400);
        throw new Error("Please Enter Mandatory fields")
    }
    try {
        DiagnosisUser.findOne({ email: email }, async (err, user) => {
            if (user) {
                res.send({
                    message: "User already regestered",
                    id: user.id
                });
            } else {
                if (password === cpassword) {
                    try {
                        const user = new DiagnosisUser({ fname, email, password, lname, fromGoogle, pic, date });
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

// const userSignin = (req, res) => {
//     const { email, password } = req.body;
//     try {
//         DiagnosisUser.findOne({ email: email }, async (err, user) => {
//             if (user) {
//                 const isMatch = await bcrypt.compare(password, user.password);
//                 if (isMatch) {

//                     const token = await user.generateAuthToken();
//                     // creating cookie
//                     res.cookie('jwt', token, { httpOnly: true, sameSite: true });

//                     console.log(token);
//                     res.send({ message: "Signin successful", user: user, cookie: req.cookies.jwt });
//                 }
//                 else {
//                     res.send({ message: "Invalid credentials" }).status(401);
//                 }
//             }
//             else {
//                 res.send({ message: "User not found" }).status(401);
//             }
//         })
//     } catch (error) {
//         res.send(error).status(404);
//     }
// };

const userSignin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await DiagnosisUser.findOne({ email: email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = await user.generateAuthToken();
                // creating cookie
                res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: true,
                });

                console.log(token);
                res.send({ message: "Signin successful", user: user, cookie: req.cookies.jwt });
            } else {
                res.status(401).send({ message: "Invalid credentials" });
            }
        } else {
            res.status(401).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(404).send(error);
    }
};


const isUserGoogleSignin = (req, res) => {
    const { email } = req.body;
    try {
        DiagnosisUser.findOne({ email: email }, async (err, user) => {
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
};

const signout = asyncHandler(async (req, res) => {
    try {
        res.clearCookie("jwt");

        //logout only from single device
        req.user.tokens = req.user.tokens.filter((currElm) => {
            return currElm.token !== req.token;
        })

        await req.user.save();
        res.send({ message: "logedout" }).status(200);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = {
    userSignup,
    userSignin,
    isUserGoogleSignin,
    signout,
    resetPasswordRequestController,
    resetPasswordController,
    isUser,
}
