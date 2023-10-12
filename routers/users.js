const express = require("express");
const router = express.Router();

const {
  addControlDevice,
  addSensorDevice,
  registerUser,
} = require("../controllers/users");

const protect = require("../middlewares/auth");

// router.route("/").post(registerUser);
router.post("/", registerUser);

router.route("/addcontroldevice").put(protect, addControlDevice);

router.route("/addsensordevice").put(protect, addSensorDevice);

module.exports = router;
