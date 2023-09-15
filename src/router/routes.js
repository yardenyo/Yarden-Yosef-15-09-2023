import { RouterView } from "vue-router";

const routes = [
	{
		path: "/:pathMatch(.*)*",
		name: "catchAll",
		component: () => import("@/views/NotFoundPage.vue"),
	},
	{
		path: "/",
		name: "WeatherPage",
		component: () => import("@/views/WeatherPage.vue"),
	},
	{
		path: "/favorites",
		name: "FavoritesPage",
		component: () => import("@/views/FavoritesPage.vue"),
	},
];

export default routes;
