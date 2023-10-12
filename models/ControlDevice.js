const { model, Schema, default: mongoose } = require("mongoose");

const controlDeviceSchema = new Schema({
  title: {
    type: String,
    default: "Control device",
  },
  mode: {
    type: String,
    default: "manual",
  },
  criticalHumidity: {
    type: Number,
    default: 500,
  },
  pumpState: {
    type: String,
    default: "off",
  },
  deviceId: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("ControlDevice", controlDeviceSchema);
