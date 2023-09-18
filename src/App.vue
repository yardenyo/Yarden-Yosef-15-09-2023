<template>
	<div id="application-view" :class="theme">
		<Navbar />
		<RouterView />
		<Footer />
	</div>
</template>

<script>
import { useThemeStore } from "@/stores/theme.store";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
	name: "App",
	components: {
		Footer,
		Navbar,
	},
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
