const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload.middleware");
const { applyCareer } = require("../controllers/career.controller");

router.post("/apply", upload.single("resume"), applyCareer);

module.exports = router;
