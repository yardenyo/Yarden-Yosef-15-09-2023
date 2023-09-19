import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import helpers from "@/helpers/app.helpers";

export const useLocationStore = defineStore("useLocationStore", () => {
	const location = ref(JSON.parse(localStorage.getItem("location")) || {});
	const error = ref(false);
	const permissionStatus = ref(null);

	const locationIsSet = computed(() => location.value.latitude && location.value.longitude);

	const showWeather = computed(() => locationIsSet.value && grantedAccess.value);

	const showDefaultWeather = computed(() => !locationIsSet.value || deniedAccess.value);

	const grantedAccess = computed(() => permissionStatus.value === "granted");

	const deniedAccess = computed(() => permissionStatus.value === "denied");

	const promptAccess = computed(() => permissionStatus.value === "prompt");

	async function getCurrentPosition() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
	}

	async function getUserLocation() {
		if (!navigator.geolocation) {
			error.value = true;
			helpers.sendErrorMessage("Geolocation is not supported by your browser");
			return;
		}

		try {
			const position = await getCurrentPosition();
			error.value = false;
			location.value = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			};
			localStorage.setItem("location", JSON.stringify(location.value));
		} catch (err) {
			error.value = true;
			localStorage.removeItem("location");
			helpers.sendErrorMessage(err.message);
		}
	}

	async function getPermissionStatus() {
		if (!navigator.permissions) {
			error.value = true;
			helpers.sendErrorMessage("Permissions API is not supported by your browser");
			return;
		}

		const result = await navigator.permissions.query({ name: "geolocation" });
		permissionStatus.value = result.state;

		result.onchange = () => {
			permissionStatus.value = result.state;
			if (result.state === "granted") {
				window.location.reload();
				getUserLocation();
			} else {
				localStorage.removeItem("location");
			}
		};
	}

	onMounted(async () => {
		await getPermissionStatus();
	});

	return {
		location,
		error,
		permissionStatus,
		grantedAccess,
		showWeather,
		showDefaultWeather,
		getUserLocation,
		getPermissionStatus,
	};
});
