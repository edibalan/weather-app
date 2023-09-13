"use strict";
import { CE } from "../app.js";
export const forecast = document.createElement("div");
export default class Forecast {
  render(data) {
    const forecastButton = CE("button"), forecastContent = CE("div"), forecastHeader = CE("div");

    forecastHeader.innerHTML = `<h2 class="forecast-title | fw-sm-bold">Today's hourly forecast</h2>`;
    forecastHeader.setAttribute("class", "forecast-header");
    forecastContent.setAttribute("class", "forecast-content | container");

    for(let i = 0; i < 24; i++) {
      forecastContent.innerHTML += `
        <div class="forecast-element | container">
          <p class="forecast-element-time">
            ${new Date(data.forecast.forecastday[0].hour[i].time).toLocaleTimeString("en-GB", {
              "hour": "2-digit",
              "minute": "2-digit"
            })}
          </p>
          <img alt="forecast-icon" class="forecast-element-icon"
            src="${data.forecast.forecastday[0].hour[i].condition.icon}" />
          <div class="forecast-element-temp">
            <span class="temp-value | fs-medium">
              ${(data.forecast.forecastday[0].hour[i].temp_c).toFixed()}
            </span>
            <span class="temp-degree">\xb0C</span>
          </div>
        </div>
      `;
      if (i > 24) break;
    };

    forecastButton.id ="forecast-button";
    forecastButton.innerText = `Tomorrow's forecast`;
    forecastButton.setAttribute("class", "forecast-button | fs-x-small fw-sm-bold");

    forecast.append(forecastHeader, forecastContent, forecastButton);
    forecast.setAttribute("class", "forecast-container");
  }
}