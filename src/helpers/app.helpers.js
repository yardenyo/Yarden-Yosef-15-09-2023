import { toast } from "vue3-toastify";
import { useThemeStore } from "@/stores/theme.store";

const Helpers = {
	isNil(value) {
		return value === undefined || value === null;
	},
	isNumpty(value, _objectsOnly = false) {
		return typeof value === "number"
			? false
			: this.isNil(value) ||
					(this.getType(value) === "array" && value.length === 0 && !_objectsOnly) ||
					(this.getType(value) === "object" && this.emptyObject(value)) ||
					(typeof value === "string" && value.trim().length === 0);
	},

	sendSuccessMessage(message = "Success") {
		const themeStore = useThemeStore();
		const currentTheme = themeStore.theme;

		toast.success(message, {
			position: "bottom-right",
			timeout: 3000,
			hideProgressBar: false,
			newestOnTop: false,
			closeOnClick: true,
			rtl: false,
			pauseOnFocusLoss: true,
			draggable: true,
			pauseOnHover: true,
			theme: currentTheme,
		});
	},

	sendInfoMessage(message = "Info") {
		const themeStore = useThemeStore();
		const currentTheme = themeStore.theme;

		toast.info(message, {
			position: "bottom-right",
			timeout: 3000,
			hideProgressBar: false,
			newestOnTop: false,
			closeOnClick: true,
			rtl: false,
			pauseOnFocusLoss: true,
			draggable: true,
			pauseOnHover: true,
			theme: currentTheme,
		});
	},

	sendErrorMessage(message = "Error") {
		const themeStore = useThemeStore();
		const currentTheme = themeStore.theme;

		toast.error(message, {
			position: "bottom-right",
			timeout: 3000,
			hideProgressBar: false,
			newestOnTop: false,
			closeOnClick: true,
			rtl: false,
			pauseOnFocusLoss: true,
			draggable: true,
			pauseOnHover: true,
			theme: currentTheme,
		});
	},
};

export default Helpers;
