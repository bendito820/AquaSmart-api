const SensorDevice = require("../models/SersorDevice");

// @desc      Register Sensor device
// @route     POST  /api/v1/sensordevice
// @access    Private   req.user
exports.registerSensorDevice = async (req, res, next) => {
  const { deviceId } = req.body;

  try {
    const device = await SensorDevice.create({
      deviceId,
      user: req.user.userId,
    });

    // responds to the client
    console.log(device);
    res.send({ success: true, data: device });
  } catch (err) {
    console.error("Error Registering Control device\n\n", err);
    res.status(400).send({ error: "Error Registering Control device" });
  }
};
// registerSensorDevice({
//   deviceId: "0002",
//   user: "651282557f4a76e06677b9b1",
// });

// @desc      Get sensor device by device Id
// @route     GET /api/v1/sensordevice/deviceid/:deviceId
// @access    Public
exports.getSensorDeviceByDeviceId = async (req, res, next) => {
  const { deviceId } = req.params;

  try {
    const sensorDevice = await SensorDevice.findOne({
      deviceId,
    });

    if (!sensorDevice) {
      return res.status(400).send({ error: "bad request" });
    }

    console.log(sensorDevice);
    res.send({ success: true, data: sensorDevice });
  } catch (err) {
    console.error("Error\n\n", err);
    res.status(500).send({ error: "something went wrong." });
  }
};
// getSensorDeviceByDeviceId({
//   deviceId: "0001",
// });

// @desc      Get sensor device
// @route     GET /api/v1/sensordevice/:id
// @access    private
exports.getSensorDevice = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sensorDevice = await SensorDevice.findOne({ _id: id });

    console.log(sensorDevice);
    res.send({ success: true, data: sensorDevice });
  } catch (err) {
    console.log("Getting Sensor Device\n\n", err);
    res.status(500).send({ error: "something went wrong." });
  }
};
// getSensorDevice({
//   id: "6512c158603d37509b1c8818",
// });

// @desc      Update sensor device
// @route     POST  /api/v1/sensordevice/:id
// @access    Private   req.user
exports.updateSensorDevice = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await SensorDevice.updateOne(
      { _id: id },
      {
        $set: req.body,
      }
    );

    res.send({ success: true, data: result });
  } catch (err) {
    console.error(`Error Updating Sensor Object With _id: ${id} \n\n`, err);
    res.status(500).send({ error: "something went wrong." });
  }
};

// updateSensorDevice(
//   { id: "6512c158603d37509b1c8818" },
//   {
//     // This is the object with the proprietis you want to update
//     temperature: 50,
//     humidity: 50,
//     soilHumidity: 50,
//     // ...
//   }
// );

// @desc      Update sensor device
// @route     POST  /api/v1/sensordevice/deviceid/:deviceId
// @access    public   req.user
exports.updateSensorDeviceByDeviceId = async (req, res, next) => {
  const { deviceId } = req.params;

  try {
    const result = await SensorDevice.updateOne(
      { deviceId },
      {
        $set: req.body,
      }
    );
    console.log(result);
    res.send({ success: true, data: result });
  } catch (err) {
    console.error(
      `Error Updating Sensor Object With _id: ${deviceId} \n\n`,
      err
    );
    res.status(500).send({ error: "something went wrong." });
  }
};
// updateSensorDeviceByDeviceId(
//   { deviceId: "0001" },
//   {
//     // This is the object with the proprietis you want to update
//     temperature: 60,
//     humidity: 60,
//     soilHumidity: 60,
//     // ...
//   }
// );

// @desc      Delete sensor device
// @route     DELETE  /api/v1/sensordevice/:id
// @access    Private
exports.deleteSensorDevice = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await SensorDevice.deleteOne({ _id: id });

    console.log(result);
    res.send({ success: true, data: result });
  } catch (err) {
    console.error(`Error Deleting Control Device With _id: ${id}\n\n`, err);
    res.status(400).send({ error: "Something Went Wrong" });
  }
};
// deleteSensorDevice({
//   id: "6512d5f9ae76bce325ff88da",
// });
