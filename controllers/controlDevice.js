const ControlDevice = require("../models/ControlDevice");

// @desc      Register Control device
// @route     POST  /api/v1/controldevice
// @access    Private   req.user
exports.registerControlDevice = async (req, res, next) => {
  const { deviceId } = req.body;
  // console.log(req.user);

  try {
    const device = await ControlDevice.create({
      deviceId,
      user: req.user.userId,
    });

    // responds to the client
    console.log(device);
    res.send({ success: true, data: device });
  } catch (err) {
    console.error("Error Registering Control device\n\n", err);
    res.status(400).send({ error: "Couldn't Rethrieve Data..." });
  }
};
// registerControlDevice({
//   deviceId: "0002",
//   user: "651282557f4a76e06677b9b1",
// });

// @desc      Get control device by device Id
// @route     GET /api/v1/controldevice/deviceid/:deviceId
// @access    public
exports.getControlDeviceByDeviceId = async (req, res, next) => {
  const { deviceId } = req.params;

  try {
    const controlDevice = await ControlDevice.find({
      deviceId,
    });

    if (!controlDevice) {
      return res.status(400).send({ error: "bad request" });
    }
  } catch (err) {
    console.error("Error\n\n", err);
    res.status(500).send({ error: "something went wrong." });
  }
};
// getControlDeviceByDeviceId({
//   deviceId: "0001",
// });

// @desc      Get control device
// @route     GET /api/v1/controldevice/:id
// @access    private
exports.getControlDevice = async (req, res, next) => {
  const { id } = req.params;
  try {
    const controlDevice = await ControlDevice.findOne({ _id: id });

    if (!controlDevice) {
      return res.status(400).send({ error: "Invalid Id" });
    }
    console.log(controlDevice);
    res.send({ success: true, data: controlDevice });
  } catch (err) {
    console.log("Getting Control Device\n\n", err);
    res.status(500).send({ error: "something went wrong" });
  }
};
// getControlDevice({
//   id: "65128e5b1313140da3d386ed",
// });

// @desc      Update Control device
// @route     POST  /api/v1/controldevice/:id
// @access    Private   req.user
exports.updateControlDevice = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await ControlDevice.updateOne(
      { _id: id },
      {
        $set: req.body,
      }
    );

    // se no object para upadate tem modo manual, busca o utilizador e o dispositivo de sensores, e retorna apenas a humidade do solo
    if (req.body?.mode === "auto") {
      // import user model
      const User = require("../models/User");
      // Find user with user id
      // populate it with Sensor device
      const result = await User.findOne({ _id: req.user.userId })
        .populate(
          "sensorDevice",
          "+soilHumidity -_id -user -temperature -humidity"
        )
        .select("soilHumidity");
      // return only the soil Humidity
      console.log(result);
      // responds to the client
    }

    res.send({ success: true, data: result });
  } catch (err) {
    console.error(`Error Updating Control Object With _id: ${id} \n\n`, err);
    res.status(500).send({ error: "Something Went Wrong" });
  }
};
// updateControlDevice(
//   { id: "65128e5b1313140da3d386ed" },
//   {
//     // This is the object with the proprietis you want to update
//     pumpState: "off",
//     mode: "manual"
//     // ...
//   }
// );

// @desc      Delete control device
// @route     DELETE  /api/v1/controldevice/:id
// @access    Private
exports.deleteControlDevice = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await ControlDevice.deleteOne({ _id: id });

    console.log(result);
    res.send({ success: true, data: result });
  } catch (err) {
    console.error(`Error Deleting Control Device With _id: ${id}\n\n`, err);
    res.status(400).send({ error: "Something Went Wrong" });
  }
};
// deleteControlDevice({
//   id: "6512b85db0ca2487201893a1",
// });
