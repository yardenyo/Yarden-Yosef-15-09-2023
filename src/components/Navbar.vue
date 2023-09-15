<template>
	<div class="navbar">
		<div class="logo-section">
			<router-link class="logo nav-link" to="/">
				<div class="navbar-logo">
					<img src="/img/logo.png" alt="logo" />
				</div>
				<div class="navbar-logo-text">Yarden's Weather App</div>
			</router-link>
		</div>
		<div class="toggles-section">
			<div class="navbar-theme-switcher">1234</div>
			<div class="navbar-measurement-switcher">1234</div>
		</div>
		<div class="navbar-links">
			<router-link class="nav-link" to="/">Home</router-link>
			<router-link class="nav-link" to="/favorites">Favorites</router-link>
		</div>
	</div>
</template>

<script>
import { ref, defineComponent } from "vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import MeasurementSwitcher from "@/components/MeasurementSwitcher.vue";

export default defineComponent({
	name: "Navbar",

	setup() {
		return {};
	},
});
</script>

<style lang="scss" scoped>
.navbar {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 1rem;

	.logo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-decoration: none;
		cursor: pointer;

		.navbar-logo {
			width: 50px;
			height: 50px;

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
				padding: 0.5rem;
			}
		}
	}

	.navbar-links {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.nav-link {
			padding: 0.5rem;
			border-radius: 0.5rem;
			cursor: pointer;
			transition: all 0.2s ease-in-out;
			text-decoration: none;
		}
	}
}
</style>
