import { toast } from "vue3-toastify";
import { useThemeStore } from "@/stores/theme.store";
import moment from "moment";
import { isNaN, isNumber } from "lodash";

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

	getType(variable, asTypeOf = false) {
		if (asTypeOf) return typeof variable;
		if (variable === true) return true;
		else if (variable === false) return false;
		else if (variable === null || variable === undefined) return null;
		else if (this.isDate(variable)) return "date";
		else if (Array.isArray(variable)) return "array";
		else if (isNumber(variable) || !isNaN(Number(variable))) return "number";
		else if (typeof variable === "string") return "string";
		else if ({}.toString.call(variable) === "[object Function]") return "function";
		else return "object";
	},

	isDate(value) {
		const regExp = /[a-zA-Z]/g;
		const v = value.toString();
		const verify = v.length > 8 ? v.substring(0, value.length - 6) : v;
		const validDate = moment(verify, "DD/MM/YY", true).isValid();
		const validMonth = moment(verify, "MM/YYYY", true).isValid();
		return (validDate || validMonth) && !regExp.test(verify) && verify.toString().includes("/");
	},

	emptyObject(value) {
		let empty_object = true;
		if (this.getType(value) !== "object") {
			empty_object = false;
			return empty_object;
		}
		if (Object.keys(value).length === 0) {
			empty_object = true;
			return empty_object;
		}
		for (const k in value) {
			if (!this.isNil(value[k]) && value[k] !== "") {
				empty_object = false;
			}
		}
		return empty_object;
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
