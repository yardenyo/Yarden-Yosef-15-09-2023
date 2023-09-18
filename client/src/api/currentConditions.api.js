import api from "@/api/Api.js";

const resource = "/currentconditions";

export default {
	getCurrentConditions(locationId) {
		return api.get(`${resource}/getCurrentConditions`, { params: { locationId } });
	},
};
