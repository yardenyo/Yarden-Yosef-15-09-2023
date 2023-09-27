<template>
	<div v-if="!loading" class="favorites-page view">
		<div class="favorites-container">
			<div class="favorites-header">
				<h1>Favorites</h1>
			</div>
			<div v-if="favoritesExist" class="favorites-list">
				<div class="favorites-list-item" v-for="(favorite, index) in favorites" :key="favorite.Key">
					<div class="favorites-list-item-header">
						<h2>{{ favorite.LocalizedName }}</h2>
						<div class="favorites-list-item-header-buttons">
							<Button type="button" icon="pi pi-trash" severity="danger" @click="removeFromFavorites(favorite.Key)" />
						</div>
					</div>
					<div class="favorites-list-item-body">
						<div class="favorites-list-item-body-weather">
							<div class="favorites-list-item-body-weather-icon">
								<div v-if="favoritesFullInfo[index]?.WeatherIcon <= 9">
									<img :src="`https://developer.accuweather.com/sites/default/files/0${favoritesFullInfo[index]?.WeatherIcon}-s.png`" alt="weather-icon" />
								</div>
								<div v-else>
									<img :src="`https://developer.accuweather.com/sites/default/files/${favoritesFullInfo[index]?.WeatherIcon}-s.png`" alt="weather-icon" />
								</div>
							</div>
							<div class="favorites-list-item-body-weather-text">
								<h3>{{ favorite.WeatherText }}</h3>
							</div>
						</div>
						<div class="favorites-list-item-body-temperature">
							<h3>{{ getTemperature(favoritesFullInfo[index]) }}</h3>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<h4>No Favorites Found</h4>
			</div>
		</div>
	</div>
	<LoadingComponent v-else />
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent.vue";
import { useFavoritesStore } from "@/stores/favorites.store";
import { useTemperatureStore } from "@/stores/temperature.store";
import { useThemeStore } from "@/stores/theme.store";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "FavoritesPage",
	components: {
		Button,
		LoadingComponent,
	},
	setup() {
		const router = useRouter();
		const favoritesStore = useFavoritesStore();
		const temperatureStore = useTemperatureStore();
		const themeStore = useThemeStore();
		const { favorites, favoritesFullInfo, favoritesExist } = storeToRefs(favoritesStore);
		const { temperature } = storeToRefs(temperatureStore);
		const { theme } = storeToRefs(themeStore);
		const loading = ref(false);

		const computedTemperature = computed(() => {
			return temperature.value === "celsius" ? "Metric" : "Imperial";
		});

		function getTemperature(favorite) {
			return `${favorite?.Temperature[computedTemperature.value].Value}°${favorite?.Temperature[computedTemperature.value].Unit}`;
		}

		function favoriteExists(key) {
			return favorites.value.some((favorite) => favorite.Key === key);
		}

		function removeFromFavorites(key) {
			favoritesStore.removeFromFavorites(key);
		}

		onMounted(async () => {
			loading.value = true;
			await favoritesStore.getFavoritesWeather();
			loading.value = false;
		});

		return {
			loading,
			favorites,
			favoritesExist,
			favoritesFullInfo,
			getTemperature,
			favoriteExists,
			removeFromFavorites,
		};
	},
});
</script>

<style lang="scss" scoped>
$spacing-unit: 1rem;
$glass-bg: rgba(255, 255, 255, 0.1);
$glass-backdrop: blur(10px);

.favorites-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;

	.favorites-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: $spacing-unit;
		padding: $spacing-unit;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 1600px;
		margin: 0 auto;
		background: $glass-bg;
		backdrop-filter: $glass-backdrop;
		border-radius: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.2);

		.favorites-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: $spacing-unit;
			padding: $spacing-unit;
			background: $glass-bg;
			backdrop-filter: $glass-backdrop;
			border-radius: 0.5rem;
			border: 1px solid rgba(255, 255, 255, 0.2);

			h1 {
				font-size: 2rem;
			}
		}

		.favorites-list {
			display: flex;
			flex-direction: column;
			gap: $spacing-unit;
			width: 100%;
			max-width: 1600px;
			margin: 0 auto;

			.favorites-list-item {
				display: flex;
				flex-direction: column;
				gap: $spacing-unit;
				padding: $spacing-unit;
				box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
				background: $glass-bg;
				backdrop-filter: $glass-backdrop;
				border-radius: 0.5rem;
				border: 1px solid rgba(255, 255, 255, 0.2);

				.favorites-list-item-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: $spacing-unit;

					h2 {
						font-size: 1.5rem;
					}

					.favorites-list-item-header-buttons {
						display: flex;
						align-items: center;
						justify-content: space-between;
						gap: $spacing-unit;
					}
				}

				.favorites-list-item-body {
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: $spacing-unit;

					.favorites-list-item-body-weather {
						display: flex;
						align-items: center;
						justify-content: space-between;
						gap: $spacing-unit;

						.favorites-list-item-body-weather-icon {
							width: 5rem;
							height: 5rem;

							img {
								width: 100%;
								height: 100%;
								object-fit: contain;
							}
						}

						.favorites-list-item-body-weather-text {
							h3 {
								font-size: 1.5rem;
							}
						}
					}

					.favorites-list-item-body-temperature {
						h3 {
							font-size: 1.5rem;
						}
					}
				}
			}
		}
	}
}

@media (max-width: $large-desktop) {
	.favorites-page {
		.favorites-container {
			.favorites-list {
				.favorites-list-item {
					.favorites-list-item-body {
						.favorites-list-item-body-weather {
							.favorites-list-item-body-weather-icon {
								width: 3rem;
								height: 3rem;
							}
						}
					}
				}
			}
		}
	}
}
</style>
