const mongoose = require("mongoose");

// mongoose.set("strictQuery", true);

const DBconnection = async () => {
  mongoose
    .connect(
      "mongodb+srv://bendito820:bendito@cluster0.feybn39.mongodb.net/esp32-backend-db",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));
};

module.exports = DBconnection;
