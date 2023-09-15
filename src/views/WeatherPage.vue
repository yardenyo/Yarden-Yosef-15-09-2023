<template>
	<div class="weather-page view">
		<h1>Weather Page</h1>
		<p>Current theme: {{ theme }}</p>
		<button @click="toggleTheme">Toggle Theme</button>
	</div>
</template>
<script>
import { useThemeStore } from "@/stores/theme.store";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
	name: "WeatherPage",
	setup() {
		const themeStore = useThemeStore();
		const { theme } = storeToRefs(themeStore);

		function toggleTheme() {
			themeStore.toggleTheme();
		}
		return {
			theme,
			toggleTheme,
		};
	},
});
</script>
<style lang="scss" scoped></style>
