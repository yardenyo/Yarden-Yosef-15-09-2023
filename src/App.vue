<template>
	<div id="application-view" :class="theme">
		<RouterView />
	</div>
</template>

<script>
import { useThemeStore } from "@/stores/theme.store";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
	name: "App",
	setup() {
		const themeStore = useThemeStore();
		const { theme } = storeToRefs(themeStore);

		return {
			theme,
		};
	},
});
</script>

<style scoped></style>
