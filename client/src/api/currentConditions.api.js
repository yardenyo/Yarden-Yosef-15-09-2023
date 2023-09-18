import api from "@/api/Api.js";

const resource = "/currentconditions";

export default {
	getCurrentConditions(locationId, displayMetric = true) {
		return api.get(`${resource}/getCurrentConditions`, { params: { locationId, displayMetric } });
	},
};
