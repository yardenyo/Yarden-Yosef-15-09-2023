const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const api_host = process.env.API_HOST;
const api_key = process.env.API_KEY;
const api_version = process.env.API_VERSION;

const resource = "forecasts";

const foreCastsController = {
  getFiveDayForecast: async (req, res) => {
    try {
      const locationId = req.query.locationId;
      const metric = req.query.metric;
      const link = `${api_host}/${resource}/${api_version}/daily/5day/${locationId}?apikey=${api_key}&metric=${metric}`;
      const response = await axios.get(link);
      res.json(response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = foreCastsController;
