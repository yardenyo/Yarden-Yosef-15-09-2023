import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import helpers from "@/helpers/app.helpers";

export const useLocationStore = defineStore("useLocationStore", () => {
	const location = ref(JSON.parse(localStorage.getItem("location")) || {});
	const error = ref(false);
	const permissionStatus = ref(null);

	const locationIsSet = computed(() => {
		return location.value.latitude && location.value.longitude;
	});

	const showWelcomeMessage = computed(() => {
		return !locationIsSet.value && permissionStatus.value === "prompt";
	});

	const showWeather = computed(() => {
		return locationIsSet.value && grantedAccess.value;
	});

	const showDefaultWeather = computed(() => {
		return !locationIsSet.value || !grantedAccess.value;
	});

	const grantedAccess = computed(() => {
		return permissionStatus.value === "granted";
	});

	async function getUserLocation() {
		if (!navigator.geolocation) {
			error.value = true;
			helpers.sendErrorMessage("Geolocation is not supported by your browser");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				error.value = false;
				location.value = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				};
				localStorage.setItem("location", JSON.stringify(location.value));
			},
			(err) => {
				error.value = true;
				helpers.sendErrorMessage(err.message);
			},
		);
	}

	async function getPermissionStatus() {
		if (!navigator.permissions) {
			error.value = true;
			helpers.sendErrorMessage("Geolocation is not supported by your browser");
			return;
		}

		navigator.permissions.query({ name: "geolocation" }).then((result) => {
			permissionStatus.value = result.state;
		});
	}

	onMounted(async () => {
		await getPermissionStatus();
	});

	return {
		location,
		error,
		permissionStatus,
		grantedAccess,
		showWelcomeMessage,
		showWeather,
		showDefaultWeather,
		getUserLocation,
	};
});
