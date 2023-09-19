import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import helpers from "@/helpers/app.helpers";

export const useFavoritesStore = defineStore("useFavoritesStore", () => {
	const favorites = ref(JSON.parse(localStorage.getItem("favorites")) || []);

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

	return {
		favorites,
		favoritesExist,
		showFavorites,
		favoriteExists,
		addToFavorites,
		removeFromFavorites,
	};
});
