const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
// const resetPass = require("../middleware/resetPass");
const { userSignup,
    userSignin,
    isUserGoogleSignin,
    signout,
    resetPasswordRequestController,
    resetPasswordController,
    isUser } = require("../controller/user");

router.post("/signup", userSignup);

router.post("/signin", userSignin);

router.post("/fromGoogle", isUserGoogleSignin);

router.get("/signout", auth, signout);

router.post("/resetPassword", resetPasswordRequestController);

router.put("/resetPassCon", resetPasswordController);

router.get("/isuser", auth, isUser)

module.exports = router;