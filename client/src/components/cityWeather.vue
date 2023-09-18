<template>
	<div class="city-weather">
		<div class="container">
			<div class="header">
				<div class="weather-icon">
					<img src="https://developer.accuweather.com/sites/default/files/02-s.png" alt="weather-icon" />
				</div>
				<div class="city-name">
					<h2>{{ cityInfo.LocalizedName }}</h2>
					<h3>{{ cityInfo.Country.LocalizedName }}</h3>
				</div>
				<div class="add-to-favorites">
					<i class="pi pi-heart-fill"></i>
				</div>
			</div>
			<div class="five-day-forecast">
				<div v-for="day in 5" :key="day" class="forecast-day">
					<div class="day-icon">
						<img :src="`https://developer.accuweather.com/sites/default/files/0${day}-s.png`" alt="weather-icon" />
					</div>
					<div class="day-info">
						<span>Day {{ day }}</span>
						<span>25°C</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, computed, onMounted } from "vue";
import { useWeatherStore } from "@/stores/weather.store";
import { storeToRefs } from "pinia";
import helpers from "@/helpers/app.helpers";

export default defineComponent({
	name: "cityWeather",
	props: {
		location: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		const weatherStore = useWeatherStore();
		const { defaultCityInfo, locationCityInfo } = storeToRefs(weatherStore);

		const isLocationSet = computed(() => {
			return !helpers.isNumpty(props.location);
		});

		const cityInfo = computed(() => {
			return isLocationSet.value ? locationCityInfo.value : defaultCityInfo.value;
		});

		onMounted(async () => {
			if (!isLocationSet.value) {
				await weatherStore.getCityByQuery("telaviv");
				await weatherStore.getCurrentConditions(defaultCityInfo.value.Key);
			} else {
				await weatherStore.getCityByGeoPosition(props.location);
			}
		});

		return {
			isLocationSet,
			defaultCityInfo,
			locationCityInfo,
			cityInfo,
		};
	},
});
</script>

<style lang="scss" scoped>
$font-family: "Helvetica Neue", sans-serif;
$spacing-unit: 1rem;

.city-weather {
	display: flex;
	flex-direction: column;
	gap: $spacing-unit;
	font-family: $font-family;
	background-color: #f9f9f9;
	padding: $spacing-unit * 2;
	border-radius: 0.5rem;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;

	.container {
		display: flex;
		flex-direction: column;
		gap: $spacing-unit;

		.header {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: $spacing-unit;
			padding: $spacing-unit;
			background-color: #eaeaea;
			border-radius: 0.25rem;
		}

		.five-day-forecast {
			display: flex;
			flex-wrap: wrap;
			gap: $spacing-unit;

			.forecast-day {
				flex: 1;
				background-color: #eaeaea;
				border-radius: 0.25rem;
				padding: $spacing-unit;
				min-width: calc(20% - $spacing-unit);
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}
	}

	@media (max-width: 768px) {
		.container {
			.header,
			.five-day-forecast {
				flex-direction: column;
				align-items: flex-start;
			}
			.five-day-forecast .forecast-day {
				min-width: 100%;
			}
		}
	}
}
</style>
