const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const api_host = process.env.API_HOST;
const api_key = process.env.API_KEY;
const api_version = process.env.API_VERSION;

const resource = "locations";

const locationsController = {
  getCitySearch: async (req, res) => {
    try {
      const query = req.query.q;
      const link = `${api_host}/${resource}/${api_version}/cities/search?apikey=${api_key}&q=${query}`;
      const response = await axios.get(link);
      res.json(response.data);
    } catch (error) {
      console.log(error);
    }
  },
  getAutoCompleteCities: async (req, res) => {
    try {
      const query = req.query.q;
      const link = `${api_host}/${resource}/${api_version}/cities/autocomplete?apikey=${api_key}&q=${query}`;
      const response = await axios.get(link);
      res.json(response.data);
    } catch (error) {
      console.log(error);
    }
  },
  getWeatherConditionsByGeoPosition: async (req, res) => {
    try {
      const latitude = req.query.latitude;
      const longitude = req.query.longitude;
      const link = `${api_host}/${resource}/${api_version}/cities/geoposition/search?apikey=${api_key}&q=${latitude},${longitude}`;
      const response = await axios.get(link);
      res.json(response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = locationsController;
