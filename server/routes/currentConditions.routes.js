const express = require("express");
const currentConditionsController = require("../controllers/currentConditions.controller");

const router = express.Router();

router.get(
  "/getCurrentConditions",
  currentConditionsController.getCurrentConditions
);

module.exports = router;
