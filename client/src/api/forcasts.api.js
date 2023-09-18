import api from "@/api/Api.js";

const resource = "/forecasts";

export default {
	getFiveDayForecast(locationId, displayMetric = true) {
		return api.get(`${resource}/getFiveDayForecast`, { params: { locationId, displayMetric } });
	},
};
