const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  controlDevice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ControlDevice",
  },
  sensorDevice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SensorDevice",
  },
});

module.exports = model("User", userSchema);
