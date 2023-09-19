<template>
	<div :class="['loading-container', 'view']">
		<div class="loader">
			<div class="circle"></div>
			<div class="circle"></div>
			<div class="circle"></div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "LoadingComponent",
	setup() {
		return {};
	},
});
</script>

<style lang="scss" scoped>
.loading-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	position: relative;
}

.loader {
	display: flex;
	justify-content: center;
	align-items: center;
}

.circle {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	margin: 0 5px;
	animation: loading-animation 1.5s infinite ease-in-out;

	&:nth-child(1) {
		animation-delay: 0s;
	}

	&:nth-child(2) {
		animation-delay: 0.5s;
	}

	&:nth-child(3) {
		animation-delay: 1s;
	}
}

@keyframes loading-animation {
	0%,
	100% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.5);
	}
}
</style>
