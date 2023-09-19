const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

const locationRoutes = require("../routes/locations.routes.js");
const forecastsRoutes = require("../routes/forecasts.routes.js");
const currentConditionsRoutes = require("../routes/currentConditions.routes.js");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/locations", locationRoutes);
app.use("/forecasts", forecastsRoutes);
app.use("/currentconditions", currentConditionsRoutes);

module.exports = app;
