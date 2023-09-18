const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const api_host = process.env.API_HOST;
const api_key = process.env.API_KEY;
const api_version = process.env.API_VERSION;

const resource = "currentconditions";

const currentConditionsController = {
  getCurrentConditions: async (req, res) => {
    try {
      const locationId = req.query.locationId;
      const link = `${api_host}/${resource}/${api_version}/${locationId}?apikey=${api_key}`;
      const response = await axios.get(link);
      res.json(response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = currentConditionsController;
