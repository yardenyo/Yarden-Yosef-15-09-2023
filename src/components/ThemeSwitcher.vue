<template>
	<div class="theme-switcher" @click="toggleTheme">
		<i :class="themeIcon"></i>
	</div>
</template>

<script>
import { useThemeStore } from "@/stores/theme.store";
import { storeToRefs } from "pinia";
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "ThemeSwitcher",
	setup() {
		const themeStore = useThemeStore();
		const { theme } = storeToRefs(themeStore);

		const themeIcon = computed(() => {
			return theme.value === "light" ? "pi pi-moon" : "pi pi-sun";
		});

		function toggleTheme() {
			themeStore.toggleTheme();
		}

		return {
			theme,
			themeIcon,
			toggleTheme,
		};
	},
});
</script>

<style lang="scss" scoped>
.theme-switcher {
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 50px;
	border-radius: 50%;
}
</style>
