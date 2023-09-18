<template>
	<div class="footer">
		<div class="copyright">
			<div class="footer-text">© {{ getCurrentYear() }} Yarden Yosef. All rights reserved.</div>
			<div class="footer-text">Designed & Developed by Yarden Yosef.</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "Footer",
	setup() {
		function getCurrentYear() {
			return new Date().getFullYear();
		}
		return {
			getCurrentYear,
		};
	},
});
</script>

<style lang="scss" scoped>
.footer {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 1rem;
}
</style>
