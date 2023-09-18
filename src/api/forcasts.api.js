import api from "@/api/Api.js";

const resource = "/forecasts";
const api_key = import.meta.env.VITE_API_KEY;
const api_version = import.meta.env.VITE_API_VERSION;

export default {
	getFiveDayForecast(locationId, displayMetric = true) {
		return api.get(`${resource}/${api_version}/daily/5day/${locationId}?apikey=${api_key}&metric=${displayMetric}`);
	},
};
