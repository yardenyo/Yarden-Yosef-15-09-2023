const express = require("express");
const forecastsController = require("../controllers/forecasts.controller");

const router = express.Router();

router.get("/getFiveDayForecast", forecastsController.getFiveDayForecast);

module.exports = router;
