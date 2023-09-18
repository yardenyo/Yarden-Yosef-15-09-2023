<template>
	<div class="city-weather">
		<div class="container">
			<div class="header">
				<h1>Weather for {{ city }}</h1>
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
		const { city } = storeToRefs(weatherStore);

		const isLocationSet = computed(() => {
			return !helpers.isNumpty(props.location);
		});

		onMounted(() => {
			weatherStore.getCity("telaviv");
		});

		return {
			isLocationSet,
			city,
		};
	},
});
</script>

<style lang="scss" scoped>
.city-weather {
	display: flex;
	flex-direction: column;
	gap: 1rem;

	.container {
		background: red;
		max-width: 90%;
		margin: 0 auto;
	}
}
</style>
