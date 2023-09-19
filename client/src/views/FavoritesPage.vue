<template>
	<div class="favorites-page view">
		<div class="favorites-container">
			<div class="favorites-header">
				<h1>Favorites</h1>
			</div>
			<div class="favorites-list">
				<div class="favorites-list-item" v-for="favorite in favorites" :key="favorite.Key">
					<div class="favorites-list-item-header">
						<h2>{{ favorite.LocalizedName }}</h2>
						<div class="favorites-list-item-header-buttons">
							<Button
								v-if="favoriteExists(favorite.Key)"
								type="button"
								icon="pi pi-star"
								:severity="severityBasedOnTheme"
								@click="removeFromFavorites(favorite.Key)" />
							<Button v-else type="button" icon="pi pi-star-o" :severity="severityBasedOnTheme" @click="addToFavorites(favorite)" />
						</div>
					</div>
					<div class="favorites-list-item-body">
						<div class="favorites-list-item-body-weather">
							<div class="favorites-list-item-body-weather-icon">
								<img :src="`/assets/weather-icons/${favorite.WeatherIcon}.png`" :alt="favorite.WeatherText" />
							</div>
							<div class="favorites-list-item-body-weather-text">
								<h3>{{ favorite.WeatherText }}</h3>
							</div>
						</div>
						<div class="favorites-list-item-body-temperature">
							<!-- <h3>{{ favorite.Temperature.Metric.Value }}°{{ favorite.Temperature.Metric.Unit }}</h3> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useFavoritesStore } from "@/stores/favorites.store";
import { useThemeStore } from "@/stores/theme.store";
import { storeToRefs } from "pinia";
import Button from "primevue/button";

export default defineComponent({
	name: "FavoritesPage",
	components: {
		Button,
	},
	setup() {
		const favoritesStore = useFavoritesStore();
		const { favorites } = storeToRefs(favoritesStore);
		const { theme } = storeToRefs(useThemeStore());

		const severityBasedOnTheme = computed(() => {
			return theme.value === "light" ? "secondary" : "success";
		});

		function favoriteExists(key) {
			return favoritesStore.favoriteExists(key);
		}

		function addToFavorites(favorite) {
			favoritesStore.addToFavorites(favorite);
		}

		function removeFromFavorites(key) {
			favoritesStore.removeFromFavorites(key);
		}

		return {
			favorites,
			severityBasedOnTheme,
			favoriteExists,
			addToFavorites,
			removeFromFavorites,
		};
	},
});
</script>

<style lang="scss" scoped>
.favorites-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
}
</style>
