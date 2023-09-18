import routes from "@/router/routes";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	next();
});

router.afterEach(() => {
	setTimeout(() => {
		window.scrollTo(0, 0);
	}, 100);
});

export default router;
