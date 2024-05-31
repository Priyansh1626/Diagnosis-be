const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { uploadImage } = require("../controller/services");

router.post("/uploadimage", uploadImage);

module.exports = router;
