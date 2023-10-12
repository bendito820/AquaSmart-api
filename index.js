const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const DBconnection = require("./config/db");

const usersRoutes = require("./routers/users");
const authRoutes = require("./routers/auth");
const controlDeviceRoutes = require("./routers/controlDevice");
const sensorDeviceRoutes = require("./routers/sensorDevice");

DBconnection();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

const versinOne = (routeName) => `/api/v1/${routeName}`;

app.use(versinOne("users"), usersRoutes);
app.use(versinOne("auth"), authRoutes);
app.use(versinOne("controldevice"), controlDeviceRoutes);
app.use(versinOne("sensordevice"), sensorDeviceRoutes);

const port = 3000;
app.listen(port, () => {
  console.log("App running on port: ", port);
});
