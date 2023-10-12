const express = require("express");

const User = require("../models/User");

// @desc      Register user
// @route     POST  api/v1/users
// @access    Public
exports.registerUser = async (req, res, next) => {
  let { name, email, password } = req.body;

  email = email.toLowerCase();

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    // Send response to the client
    res.send({ success: true, data: user });
    // console.log(user);
  } catch (err) {
    console.error("Email Already Registered\n\n", err);
    res.status(404).send({ error: "User Already Registered" });
  }
};

// registerUser({
//   name: "Antonio Costa",
//   email: "antonio@gmail.com",
//   password: "123456",
// });

// @desc      Add Control Device
// @route     PUT   /api/v1/users/addcontroldevice
// @access    private   req.user
exports.addControlDevice = async (req, res, next) => {
  const id = req.user.userId;
  const { deviceId } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      // sends an error response to the client
      console.log("Invalid User");
      return res.status(400).send({ error: "Invalid User" });
    }

    user.controlDevice = deviceId;
    user.save();
    res.send({ success: true });
  } catch (err) {
    console.error("Error Updating Data");
    res.status(500).send({ error: "Error Updating Data" });
  }
};

// addControlDevice(
//   {
//     id: "651282557f4a76e06677b9b1",
//   },
//   {
//     deviceId: "65128e5b1313140da3d386ed",
//   }
// );

// @desc      Add Sensor Device
// @route     PUT   /api/v1/users/addsensordevice
// @access    private   req.user
exports.addSensorDevice = async (req, res, next) => {
  const id = req.user.userId;
  const { deviceId } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      // sends an error response to the client
      console.log("Invalid User");
      return res.status(400).send({ error: "Invalid User" });
    }

    user.sensorDevice = deviceId;
    user.save();
    res.send({ success: true });
  } catch (err) {
    console.error("Error Updating Data");
    res.status(500).send({ error: "something went wrong" });
  }
};

// addSensorDevice(
//   {
//     id: "651282557f4a76e06677b9b1",
//   },
//   {
//     deviceId: "6512c158603d37509b1c8818",
//   }
// );
