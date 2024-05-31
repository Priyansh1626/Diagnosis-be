const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { findNearByDoc } = require("../controller/nearBy");

router.post("/nearBy", findNearByDoc);

module.exports = router;