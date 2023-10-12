const { model, Schema, default: mongoose } = require("mongoose");

const SensorDeviceSchema = new Schema({
  title: {
    type: String,
    default: "Sensor Device",
  },
  deviceId: {
    type: String,
    required: true,
    unique: true,
  },
  temperature: {
    type: Number,
    default: 30,
  },
  humidity: {
    type: Number,
    default: 30,
  },
  soilHumidity: {
    type: Number,
    default: 30,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("SensorDevice", SensorDeviceSchema);
