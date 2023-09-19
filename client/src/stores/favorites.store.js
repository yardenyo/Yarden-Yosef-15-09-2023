import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import helpers from "@/helpers/app.helpers";
import { useWeatherStore } from "@/stores/weather.store";

export const useFavoritesStore = defineStore("useFavoritesStore", () => {
	const weatherStore = useWeatherStore();

	const favorites = ref(JSON.parse(localStorage.getItem("favorites")) || []);

	const favoritesFullInfo = ref([]);

	const favoritesExist = computed(() => favorites.value.length > 0);

	const showFavorites = computed(() => favoritesExist.value);

	function favoriteExists(favoriteKey) {
		return favorites.value.some((f) => f.Key === favoriteKey);
	}

	async function addToFavorites(favorite) {
		if (favorites.value.some((f) => f.Key === favorite.Key)) return;

		favorites.value.push({
			Key: favorite.Key,
			LocalizedName: favorite.LocalizedName,
		});
		localStorage.setItem("favorites", JSON.stringify(favorites.value));
	}

	async function removeFromFavorites(favorite) {
		const index = favorites.value.findIndex((f) => f.Key === favorite.Key);
		favorites.value.splice(index, 1);
		localStorage.setItem("favorites", JSON.stringify(favorites.value));
	}

	async function getFavoritesWeather() {
		if (!favoritesExist.value) return;

		const favoritesKeys = favorites.value.map((f) => f.Key);
		for (const key of favoritesKeys) {
			const response = await weatherStore.getCurrentConditions(key);
			favoritesFullInfo.value.push(response);
		}
	}

	return {
		favorites,
		favoritesExist,
		favoritesFullInfo,
		showFavorites,
		favoriteExists,
		addToFavorites,
		removeFromFavorites,
		getFavoritesWeather,
	};
});
