import { defineStore } from "pinia";
import { ref } from "vue";

export const useTemperatureStore = defineStore("useTemperatureStore", () => {
	const temperature = ref(localStorage.getItem("temperature") || "celsius");

	function toggleTemperature() {
		temperature.value = temperature.value === "celsius" ? "fahrenheit" : "celsius";
		localStorage.setItem("temperature", temperature.value);
	}

	return {
		temperature,
		toggleTemperature,
	};
});
