const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth");

const {
  registerSensorDevice,
  getSensorDevice,
  getSensorDeviceByDeviceId,
  updateSensorDevice,
  updateSensorDeviceByDeviceId,
  deleteSensorDevice,
} = require("../controllers/sensorDevice");

router.route("/").post(protect, registerSensorDevice);

router
  .route("/:id")
  .get(protect, getSensorDevice)
  .post(protect, updateSensorDevice)
  .delete(protect, deleteSensorDevice);

router
  .route("/deviceid/:deviceId")
  .get(getSensorDeviceByDeviceId)
  .post(updateSensorDevice);

module.exports = router;
