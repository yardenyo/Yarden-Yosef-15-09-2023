<template>
	<div class="not-found view">
		<h1>404</h1>
		<h2>Page not found</h2>
		<p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
		<router-link to="/">Go to Home</router-link>
	</div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
	name: "NotFoundPage",
	setup() {
		return {};
	},
});
</script>
<style lang="scss" scoped>
.not-found {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	h1 {
		font-size: 10rem;
		margin: 0;
	}
	h2 {
		font-size: 2rem;
		margin: 0;
	}
	p {
		font-size: 1.5rem;
		margin: 0;
	}
	& > * {
		margin: 1rem 0;
	}
}
</style>
