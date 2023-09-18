import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import helpers from "@/helpers/app.helpers";
import locationsApi from "@/api/locations.api";
import currentConditionsApi from "@/api/currentConditions.api";
import { getLocationByQuery, getLocationById, getLocationByGeoPosition, getLocationForcastById } from "@/helpers/localWeather.js";

export const useWeatherStore = defineStore("useWeatherStore", () => {
	const defaultCityInfo = ref({
		Version: 0,
		Key: "",
		Type: "",
		Rank: 0,
		LocalizedName: "",
		EnglishName: "",
		PrimaryPostalCode: "",
		Region: {
			ID: "",
			LocalizedName: "",
			EnglishName: "",
		},
		Country: {
			ID: "",
			LocalizedName: "",
			EnglishName: "",
		},
		AdministrativeArea: {
			ID: "",
			LocalizedName: "",
			EnglishName: "",
			Level: 0,
			LocalizedType: "",
			EnglishType: "",
			CountryID: "",
		},
		TimeZone: {
			Code: "",
			Name: "",
			GmtOffset: 0,
			IsDaylightSaving: true,
			NextOffsetChange: "",
		},
		GeoPosition: {
			Latitude: 0,
			Longitude: 0,
			Elevation: {
				Metric: {
					Value: 0,
					Unit: "",
					UnitType: 0,
				},
				Imperial: {
					Value: 0,
					Unit: "",
					UnitType: 0,
				},
			},
		},
		IsAlias: false,
		SupplementalAdminAreas: [],
		DataSets: [],
	});

	const locationCityInfo = ref({
		Version: 0,
		Key: "",
		Type: "",
		Rank: 0,
		LocalizedName: "",
		EnglishName: "",
		PrimaryPostalCode: "",
		Region: {
			ID: "",
			LocalizedName: "",
			EnglishName: "",
		},
		Country: {
			ID: "",
			LocalizedName: "",
			EnglishName: "",
		},
		AdministrativeArea: {
			ID: "",
			LocalizedName: "",
			EnglishName: "",
			Level: 0,
			LocalizedType: "",
			EnglishType: "",
			CountryID: "",
		},
		TimeZone: {
			Code: "",
			Name: "",
			GmtOffset: 0,
			IsDaylightSaving: false,
			NextOffsetChange: "",
		},
		GeoPosition: {
			Latitude: 0,
			Longitude: 0,
			Elevation: {
				Metric: {
					Value: 0,
					Unit: "",
					UnitType: 0,
				},
				Imperial: {
					Value: 0,
					Unit: "",
					UnitType: 0,
				},
			},
		},
		IsAlias: false,
		SupplementalAdminAreas: [],
		DataSets: [],
	});

	const cityCurrentConditions = ref({
		LocalObservationDateTime: "",
		EpochTime: 0,
		WeatherText: "",
		WeatherIcon: 0,
		HasPrecipitation: false,
		PrecipitationType: null,
		IsDayTime: true,
		Temperature: {
			Metric: {
				Value: 0,
				Unit: "C",
				UnitType: 0,
			},
			Imperial: {
				Value: 0,
				Unit: "F",
				UnitType: 0,
			},
		},
		MobileLink: "",
		Link: "",
	});

	async function getCityByQuery(city) {
		// const response = await locationsApi.getCitySearch(city);
		// defaultCityInfo.value = response.data[0];
		const response = getLocationByQuery(city);
		defaultCityInfo.value = response[0];
	}

	async function getCurrentConditions(locationId) {
		// const response = await currentConditionsApi.getCurrentConditions(locationId);
		// cityCurrentConditions.value = response.data[0];
		const response = getLocationById(locationId);
		cityCurrentConditions.value = response[0];
	}

	async function getCityByGeoPosition({ latitude, longitude }) {
		// const response = await locationsApi.getCityByGeoPosition(latitude, longitude);
		// defaultCityInfo.value = response.data;
		const response = getLocationByGeoPosition(latitude, longitude);
		locationCityInfo.value = response;
	}

	return {
		defaultCityInfo,
		locationCityInfo,
		cityCurrentConditions,
		getCityByQuery,
		getCurrentConditions,
		getCityByGeoPosition,
	};
});
