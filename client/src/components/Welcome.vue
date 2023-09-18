<template>
	<div class="welcome">
		<h1 class="text">Welcome to Yarden's Weather App</h1>
		<h4 class="text">Please click the button below to start</h4>
		<h6 class="text">Pay Attention: You will be asked to allow location access</h6>
		<Button class="btn" label="Lets Get Started" :severity="severityBasedOnTheme" @click="start" />
	</div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useThemeStore } from "@/stores/theme.store";
import { storeToRefs } from "pinia";
import Button from "primevue/button";

export default defineComponent({
	name: "Welcome",
	components: {
		Button,
	},
	setup(_, { emit }) {
		const themeStore = useThemeStore();
		const { theme } = storeToRefs(themeStore);

		const severityBasedOnTheme = computed(() => {
			return theme.value === "light" ? "secondary" : "success";
		});

		function start() {
			emit("start");
		}
		return {
			severityBasedOnTheme,
			start,
		};
	},
});
</script>

<style lang="scss" scoped>
.welcome {
	display: flex;
	flex-direction: column;
	text-align: center;
	gap: 1rem;

	.btn {
		width: 50%;
		margin: 0 auto;
	}
}
</style>
