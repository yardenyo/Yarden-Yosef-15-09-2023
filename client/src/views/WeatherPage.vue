<template>
	<div v-if="showWelcomeMessage" class="welcome-page view">
		<Welcome @start="start" />
	</div>
	<div v-else class="weather-page view">
		<div class="search-component">
			<span class="p-float-label">
				<AutoComplete class="auto-complete" v-model="value" inputId="ac" :suggestions="items" @complete="search" />
				<label for="ac">Search For A City</label>
			</span>
		</div>
		<cityWeather :location="location" />
	</div>
</template>

<script>
import Welcome from "@/components/Welcome.vue";
import { useLocationStore } from "@/stores/location.store";
import { storeToRefs } from "pinia";
import { defineComponent, ref, computed } from "vue";
import cityWeather from "@/components/cityWeather.vue";
import AutoComplete from "primevue/autocomplete";

export default defineComponent({
	name: "WeatherPage",
	components: {
		Welcome,
		cityWeather,
		AutoComplete,
	},
	setup() {
		const locationStore = useLocationStore();
		const { location, error } = storeToRefs(locationStore);
		const value = ref("");
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

		async function start() {
			locationStore.getUserLocation();
		}

		async function search() {}

		return {
			location,
			showWelcomeMessage,
			showWeather,
			showDefaultWeather,
			error,
			value,
			items,
			start,
			search,
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
		justify-content: center;

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
</style>
