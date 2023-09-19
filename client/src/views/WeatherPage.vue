<template>
	<div v-if="showWelcomeMessage" class="welcome-page view">
		<Welcome @start="start" />
	</div>
	<div v-else class="weather-page view">
		<div class="search-component">
			<span class="p-float-label">
				<AutoComplete class="auto-complete" optionLabel="LocalizedName" v-model="value" :suggestions="items" @complete="search" />
				<label for="ac">Search For A City</label>
			</span>
			<Button :disabled="buttonDisabled" type="submit" label="Submit" :severity="severityBasedOnTheme" @click="submit" />
		</div>
		<cityWeather :location="location" />
	</div>
</template>

<script>
import Welcome from "@/components/Welcome.vue";
import { useLocationStore } from "@/stores/location.store";
import { useWeatherStore } from "@/stores/weather.store";
import { useThemeStore } from "@/stores/theme.store";
import { storeToRefs } from "pinia";
import { defineComponent, ref, computed } from "vue";
import cityWeather from "@/components/cityWeather.vue";
import AutoComplete from "primevue/autocomplete";
import Button from "primevue/button";

export default defineComponent({
	name: "WeatherPage",
	components: {
		Welcome,
		cityWeather,
		AutoComplete,
		Button,
	},
	setup() {
		const locationStore = useLocationStore();
		const weatherStore = useWeatherStore();
		const themeStore = useThemeStore();
		const { location, error } = storeToRefs(locationStore);
		const { theme } = storeToRefs(themeStore);
		const value = ref();
		const items = ref([]);

		const showWelcomeMessage = computed(() => {
			return locationStore.showWelcomeMessage;
		});

		const showWeather = computed(() => {
			return locationStore.showWeather;
		});

		const showDefaultWeather = computed(() => {
			return locationStore.showDefaultWeather;
		});

		const severityBasedOnTheme = computed(() => {
			return theme.value === "light" ? "secondary" : "success";
		});

		const buttonDisabled = computed(() => {
			return !value.value || typeof value.value === "string";
		});

		async function start() {
			locationStore.getUserLocation();
		}

		async function search(event) {
			items.value = await weatherStore.getCityBySearch(event.query);
		}

		async function submit() {
			await weatherStore.getCurrentConditions(value.value.Key);
			await weatherStore.getCityForecast(value.value.Key);
		}

		return {
			location,
			showWelcomeMessage,
			showWeather,
			showDefaultWeather,
			severityBasedOnTheme,
			buttonDisabled,
			error,
			value,
			items,
			start,
			search,
			submit,
		};
	},
});
</script>

<style lang="scss" scoped>
.weather-page {
	display: flex;
	flex-direction: column;
	gap: 2rem;

	.search-component {
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;

		.p-float-label {
			width: 100%;

			:deep(.p-autocomplete) {
				width: 100% !important;
				.p-autocomplete-input {
					width: 100% !important;
				}
			}
		}
	}
}

@media (max-width: $large-desktop) {
	.weather-page {
		.search-component {
			width: 70%;
		}
	}
}
</style>
