<template>
	<div class="navbar">
		<div class="logo-section">
			<router-link class="logo" to="/">
				<div class="navbar-logo">
					<img src="/img/logo.png" alt="logo" />
				</div>
				<div class="navbar-logo-text">Yarden's Weather App</div>
			</router-link>
		</div>
		<div class="hamburger-menu" @click="toggleMenu">
			<span class="bar"></span>
			<span class="bar"></span>
			<span class="bar"></span>
		</div>
		<div class="toggles-section">
			<ThemeSwitcher />
			<TemperatureSwitcher />
		</div>
		<div class="navbar-links">
			<router-link class="nav-link" to="/">Home</router-link>
			<router-link class="nav-link" to="/favorites">Favorites</router-link>
		</div>
		<div v-if="isMenuOpen" class="mobile-menu">
			<div class="close-button" @click="toggleMenu">×</div>
			<div class="mobile-menu-links">
				<router-link class="navbar-link" to="/">Home</router-link>
				<router-link class="navbar-link" to="/favorites">Favorites</router-link>
				<ThemeSwitcher class="navbar-link" :isMobile="true" />
				<TemperatureSwitcher class="navbar-link" :isMobile="true" />
			</div>
		</div>
	</div>
</template>

<script>
import { ref, defineComponent } from "vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import TemperatureSwitcher from "@/components/TemperatureSwitcher.vue";

export default defineComponent({
	name: "Navbar",
	components: {
		ThemeSwitcher,
		TemperatureSwitcher,
	},
	setup() {
		const isMenuOpen = ref(false);

		function toggleMenu() {
			isMenuOpen.value = !isMenuOpen.value;
		}

		return {
			isMenuOpen,
			toggleMenu,
		};
	},
});
</script>

<style lang="scss" scoped>
.navbar {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 1rem;

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

	.toggles-section {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.hamburger-menu {
		display: none;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;

		.bar {
			width: 25px;
			height: 3px;
			margin: 2px 0;
			transition: 0.4s;
		}
	}

	.mobile-menu {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 0;
		transform-origin: top;

		.mobile-menu-links {
			padding-top: 2rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;

			.navbar-link {
				padding: 0.5rem;
				border-radius: 0.5rem;
				cursor: pointer;
				transition: all 0.2s ease-in-out;
				text-decoration: none;
			}
		}
	}

	.close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		cursor: pointer;
		font-size: 2rem;
		color: $white;
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

@media screen and (max-width: 768px) {
	.navbar {
		.hamburger-menu {
			display: flex;
		}
		.navbar-links,
		.toggles-section {
			display: none;
		}
		.mobile-menu {
			display: flex;
		}
	}
}
</style>
