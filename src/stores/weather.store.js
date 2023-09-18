import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import helpers from "@/helpers/app.helpers";
import locationsApi from "@/api/locations.api";

export const useWeatherStore = defineStore("useWeatherStore", () => {
	const city = ref({});
	const weather = ref({});
	const weatherConditions = ref({});
	const weatherForecast = ref({});
	const weatherForecastDaily = ref({});
	const weatherForecastHourly = ref({});

	async function getCity(city) {
		const response = await locationsApi.getCitySearch(city);
		city.value = response.data;
	}

	async function getWeatherConditions(latitude, longitude) {
		const response = await locationsApi.getWeatherConditionsByGeoPosition(latitude, longitude);
		weatherConditions.value = response.data;
	}
	return {
		city,
		weather,
		weatherConditions,
		getCity,
		getWeatherConditions,
	};
});
