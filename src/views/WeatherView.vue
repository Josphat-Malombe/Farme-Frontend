<template>
  <div class="weather-dashboard">
    <!-- HEADER -->
    <header class="weather-header">
      <h1>Weather for {{ user.county_name }}, {{ user.constituency_name }}</h1>
      <p class="updated">Updated: {{ new Date().toLocaleString() }}</p>
    </header>

    <!-- HERO CURRENT WEATHER -->
    <section class="hero">
      <img :src="weather.icon" alt="Weather Icon" class="hero-icon" />
      <h2>{{ weather.temperature }}°C</h2>
      <p class="description">{{ weather.description }}</p>
    </section>

    <!-- METRIC CARDS -->
    <section class="metrics">
      <div class="metric-card">Humidity: {{ weather.humidity }}%</div>
      <div class="metric-card">Wind: {{ weather.wind_speed }} m/s</div>
      <div class="metric-card">Pressure: {{ weather.pressure }} hPa</div>
      <div class="metric-card">Rain: {{ weather.rain || '0' }} mm</div>
    </section>

    <!-- 7-DAY FORECAST -->
    <section class="forecast">
      <h3>7-Day Forecast</h3>
      <div class="forecast-grid">
        <div v-for="day in forecast" :key="day.dt" class="forecast-day">
          <p>{{ formatDay(day.dt) }}</p>
          <img :src="getIcon(day.weather[0].icon)" class="forecast-icon" />
          <p>{{ Math.round(day.temp.day) }}°C</p>
        </div>
      </div>
    </section>

    <!-- TEMP TREND GRAPH (OPTIONAL) -->
    <section class="trend">
      <canvas id="tempChart"></canvas>
    </section>
  </div>
</template>

<script>
import { getProfile } from "@/services/profileService";
import { getWeather } from "@/services/WeatherService";
import Chart from "chart.js/auto";

export default {
  name: "WeatherDashboard",
  data() {
    return {
      user: {},
      weather: {},
      forecast: [],
    };
  },
  async mounted() {
    try {
      const res = await getProfile();
      this.user = res.data;

      const { county_name, constituency_name, ward_name } = this.user;
      this.weather = await getWeather(county_name, constituency_name, ward_name);
      //this.forecast = await getForecast(county, constituency, ward);

      this.renderChart();
    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  },
  methods: {
    formatDay(ts) {
      return new Date(ts * 1000).toLocaleDateString("en-US", { weekday: "short" });
    },
    getIcon(icon) {
      return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    },
    renderChart() {
      const ctx = document.getElementById("tempChart");
      const temps = this.forecast.map((day) => day.temp.day);
      const labels = this.forecast.map((day) => this.formatDay(day.dt));

      new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Daily Temp (°C)",
              data: temps,
              borderColor: "#2d6a4f",
              backgroundColor: "rgba(74, 192, 192, 0.2)",
              fill: true,
              tension: 0.3,
            },
          ],
        },
      });
    },
  },
};
</script>

<style scoped>
.weather-dashboard {
  padding: 10px;
  background: #f5fff5;
  border-radius: 16px;
}
.weather-header {
  text-align: center;
  background: #0f172a;
  color: #fff;
  padding: 16px;
  border-radius: 12px;
}
.hero {
  text-align: center;
  margin-top: 20px;
}
.hero-icon {
  width: 120px;
}
.metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 20px 0;
}
.metric-card {
  background: #d8f3dc;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}
.forecast {
  margin-top: 24px;
}
.forecast-grid {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}
.forecast-day {
  text-align: center;
}
.forecast-icon {
  width: 50px;
}
.trend {
  margin-top: 24px;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .weather-dashboard{
    width: 100vw;
    height: 100vh;
  }
}
</style>



