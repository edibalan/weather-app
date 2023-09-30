"use strict";
import { CE } from "../app.js";
export const conditions = document.createElement("div");
export default class Conditions {
  constructor(data) {
    this.conditionsContent = CE("div");
    this.conditionsHeader = CE("div");

    this.weather_conditions = {
      labels: ["Clouds", "Feels like", "Gust", "Humidity", "Pressure", "Rainfall", "Sunrise", "Sunset", "UV Index", "Visibility", "Wind dir.", "Wind spd."],
      values: [
        data.current.cloud, data.current.feelslike_c, data.current.gust_kph, data.current.humidity,
        data.current.pressure_mb, data.current.precip_mm, data.forecast.forecastday[0].astro.sunrise,
        data.forecast.forecastday[0].astro.sunset, data.current.uv, data.current.vis_km,
        data.current.wind_dir, data.current.wind_kph
      ],
      
      symbols: ["", "\xb0C", "kph", "%", "hpa", "mm", "", "", "", "km", "", "kph"],
      icons: [
        "clouds-icon", "feels-icon", "gust-icon", "humidity-icon", "pressure-icon", "precip-icon",
        "sunrise-icon", "sunset-icon", "uv-icon", "visibility-icon", "direction-icon", "wind-icon"
      ]
    };
  }

  render() {
    this.conditionsContent.setAttribute("class", "conditions-content | container");
    this.conditionsHeader.setAttribute("class", "conditions-header");
    this.conditionsHeader.innerHTML = `<h2 class="conditions-title | fw-sm-bold">Today's weather conditions</h2>`;
    
    for(let i = 0; i < 12; i++) {
      this.conditionsContent.innerHTML += `
        <div class="conditions-element | container">
          <div class="conditions-element-content | container">
            <div class="conditions-element-header">
              <p class="conditions-element-label | fs-small">${this.weather_conditions.labels[i]}</p>
              <div class="conditions-element-value">
                <span class="conditions-value | fw-sm-bold">${this.weather_conditions.values[i]}</span>
                <span class="conditions-symbol | fw-sm-bold">${this.weather_conditions.symbols[i]}</span>
              </div>
            </div>
            <img alt="conditions-icon" class="conditions-icon" src="https://edibalan.github.io/weather-app/assets/${this.weather_conditions.icons[i]}.webp" />
          </div>
        </div>
      `;
      if(i > 12) break;
    };

    conditions.append(this.conditionsHeader, this.conditionsContent);
    conditions.setAttribute("class", "conditions-container");
  }
}
