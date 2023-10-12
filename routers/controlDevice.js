const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth");

const {
  registerControlDevice,
  getControlDeviceByDeviceId,
  getControlDevice,
  updateControlDevice,
  deleteControlDevice,
} = require("../controllers/controlDevice");

// router.post("/", protect, registerControlDevice);

router.route("/").post(protect, registerControlDevice, getControlDevice);

router.get("/deviceid/:deviceId", getControlDeviceByDeviceId);

router.get("/:id", protect, getControlDevice);

router.post("/:id", protect, updateControlDevice);

router.delete("/:id", protect, deleteControlDevice);

module.exports = router;
