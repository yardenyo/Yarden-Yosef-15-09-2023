<template>
	<div class="five-day-forecast">
		<div v-for="day in cityForecast.DailyForecasts" :key="day.EpochDate" class="forecast-day">
			<div class="day-info-wrapper">
				<div class="day-info">
					<h4>Day</h4>
					<div class="day-icon">
						<img v-if="day.Day.Icon <= 9" :src="`https://developer.accuweather.com/sites/default/files/0${day.Day.Icon}-s.png`" alt="day weather-icon" />
						<img v-else :src="`https://developer.accuweather.com/sites/default/files/${day.Day.Icon}-s.png`" alt="day weather-icon" />
					</div>
					<div class="day-info">
						<span>{{ day.Day.IconPhrase }}</span>
						<span>{{ day.Temperature.Maximum.Value }}°{{ day.Temperature.Maximum.Unit }}</span>
					</div>
				</div>
				<div class="night-info">
					<h4>Night</h4>
					<div class="night-icon">
						<img v-if="day.Night.Icon <= 9" :src="`https://developer.accuweather.com/sites/default/files/0${day.Night.Icon}-s.png`" alt="night weather-icon" />
						<img v-else :src="`https://developer.accuweather.com/sites/default/files/${day.Night.Icon}-s.png`" alt="night weather-icon" />
					</div>
					<div class="night-info">
						<span>{{ day.Night.IconPhrase }}</span>
						<span>{{ day.Temperature.Minimum.Value }}°{{ day.Temperature.Minimum.Unit }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "ForeCast",
	props: {
		cityForecast: {
			type: Object,
			required: true,
		},
	},
	setup() {
		return {};
	},
});
</script>

<style lang="scss" scoped>
$spacing-unit: 1rem;
$glass-bg: rgba(255, 255, 255, 0.1);
$glass-backdrop: blur(10px);

.five-day-forecast {
	display: flex;
	flex-wrap: wrap;
	gap: $spacing-unit;

	.forecast-day {
		flex: 1;
		border-radius: 0.25rem;
		padding: $spacing-unit;
		min-width: calc(20% - $spacing-unit);
		display: flex;
		flex-direction: column;
		align-items: center;
		background: $glass-bg;
		backdrop-filter: $glass-backdrop;
		border-radius: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.day-info-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: $spacing-unit;
	}

	.day-info,
	.night-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: calc($spacing-unit / 2);

		h4 {
			margin-bottom: calc($spacing-unit / 2);
		}

		.day-icon,
		.night-icon {
			margin-bottom: calc($spacing-unit / 4);
		}
	}
}

@media (max-width: $large-desktop) {
	.five-day-forecast {
		.forecast-day {
			min-width: 100%;
		}
	}
}
</style>
