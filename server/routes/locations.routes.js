const express = require("express");
const locationsController = require("../controllers/locations.controller");

const router = express.Router();

router.get("/getCitySearch", locationsController.getCitySearch);
router.get("/getAutoCompleteCities", locationsController.getAutoCompleteCities);
router.get(
  "/getWeatherConditionsByGeoPosition",
  locationsController.getWeatherConditionsByGeoPosition
);

module.exports = router;
