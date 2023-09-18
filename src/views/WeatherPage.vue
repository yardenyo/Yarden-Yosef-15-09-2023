<template>
	<div v-if="showWelcomeMessage" class="welcome-page view">
		<Welcome @start="start" />
	</div>
	<div v-else class="weather-page view">
		<h1 class="text">Weather Page</h1>
		<div v-if="showDefaultWeather">
			<p>Default Weather</p>
		</div>
		<div v-else-if="showWeather">
			<p>Weather</p>
		</div>
		<div v-else-if="error">
			<p>{{ error }}</p>
		</div>
	</div>
</template>

<script>
import Welcome from "@/components/Welcome.vue";
import { useLocationStore } from "@/stores/location.store";
import { storeToRefs } from "pinia";
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
	name: "WeatherPage",
	components: {
		Welcome,
	},
	setup() {
		const locationStore = useLocationStore();
		const { location, error } = storeToRefs(locationStore);

		const showWelcomeMessage = computed(() => {
			return locationStore.showWelcomeMessage;
		});

		const showWeather = computed(() => {
			return locationStore.showWeather;
		});

		const showDefaultWeather = computed(() => {
			return locationStore.showDefaultWeather;
		});

		function start() {
			locationStore.getUserLocation();
		}

		return {
			location,
			showWelcomeMessage,
			showWeather,
			showDefaultWeather,
			error,
			start,
		};
	},
});
</script>

<style lang="scss" scoped></style>
