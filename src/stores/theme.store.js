import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("useThemeStore", () => {
	const theme = ref(localStorage.getItem("theme") || "light");

	async function toggleTheme() {
		theme.value = theme.value === "light" ? "dark" : "light";
		localStorage.setItem("theme", theme.value);
	}

	return {
		theme,
		toggleTheme,
	};
});
