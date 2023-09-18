import api from "@/api/Api.js";

const resource = "/locations";

export default {
	getCitySearch(query) {
		return api.get(`${resource}/getCitySearch`, { params: { q: query } });
	},
	getAutoCompleteCities(query) {
		return api.get(`${resource}/getAutoCompleteCities`, { params: { q: query } });
	},
	getWeatherConditionsByGeoPosition(latitude, longitude) {
		return api.get(`${resource}/getWeatherConditionsByGeoPosition`, { params: { latitude, longitude } });
	},
};
