import api from "@/api/Api.js";

const resource = "/forecasts";

export default {
	getCityForecast(locationId, metric = true) {
		return api.get(`${resource}/getCityForecast`, { params: { locationId, metric } });
	},
};
