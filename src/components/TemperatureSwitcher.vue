<template>
	<div class="temperature-switcher" @click="toggleTemperature">
		{{ temperatureIcon }}
	</div>
</template>

<script>
import { useTemperatureStore } from "@/stores/temperature.store";
import { storeToRefs } from "pinia";
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "TemperatureSwitcher",
	setup() {
		const temperatureStore = useTemperatureStore();
		const { temperature } = storeToRefs(temperatureStore);

		const temperatureIcon = computed(() => {
			return temperature.value === "celsius" ? "°C" : "°F";
		});

		function toggleTemperature() {
			temperatureStore.toggleTemperature();
		}
		return {
			temperature,
			temperatureIcon,
			toggleTemperature,
		};
	},
});
</script>

<style lang="scss" scoped>
.temperature-switcher {
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 50px;
	border-radius: 50%;
}
</style>
