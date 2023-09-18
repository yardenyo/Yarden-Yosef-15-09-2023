import api from "@/api/Api.js";

const resource = "/locations";
const api_key = import.meta.env.VITE_API_KEY;
const api_version = import.meta.env.VITE_API_VERSION;

export default {
	getCitySearch(query) {
		return api.get(`${resource}/${api_version}/cities/search?apikey=${api_key}&q=${query}`);
	},
	getAutoCompleteCities(query) {
		return api.get(`${resource}/${api_version}/cities/autocomplete?apikey=${api_key}&q=${query}`);
	},
	getWeatherConditionsByGeoPosition(latitude, longitude) {
		return api.get(`${resource}/${api_version}/cities/geoposition/search?apikey=${api_key}&q=${latitude}%2C${longitude}`);
	},
};
