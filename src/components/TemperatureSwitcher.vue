<template>
	<div :class="isMobile ? 'temperature-switcher-mobile' : 'temperature-switcher'" @click="toggleTemperature">
		<span v-if="!isMobile">{{ temperatureIcon }}</span>
		<span v-else>Change Temperature</span>
	</div>
</template>

<script>
import { useTemperatureStore } from "@/stores/temperature.store";
import { storeToRefs } from "pinia";
import { computed, defineComponent } from "vue";
import helpers from "@/helpers/app.helpers";

export default defineComponent({
	name: "TemperatureSwitcher",
	props: {
		isMobile: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const temperatureStore = useTemperatureStore();
		const { temperature } = storeToRefs(temperatureStore);

		const temperatureIcon = computed(() => {
			return temperature.value === "celsius" ? "°C" : "°F";
		});

		async function toggleTemperature() {
			await temperatureStore.toggleTemperature();
			helpers.sendInfoMessage(`Temperature changed to ${temperature.value}`);
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

.temperature-switcher-mobile {
	padding: 0.5rem;
	border-radius: 0.5rem;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
}
</style>
