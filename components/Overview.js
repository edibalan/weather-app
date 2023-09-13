"use strict";
import { CE } from "../app.js";
import { menuContainer } from "./CitySelector.js";
export const overview = document.createElement("section");
export default class Overview {
  render(data) {
    const overviewContent = CE("div");

    overviewContent.innerHTML = `
      <div class="date-location-container">
        <h1 class="city | fs-medium fw-bold" id="city">${data.location.name}</h1>
        <p class="fs-small" id="date">
          ${new Date(data.location.localtime).toLocaleDateString("en-GB", {
            "weekday": "short",
            "month": "short",
            "day": "numeric",
            "hour": "2-digit",
            "minute": "2-digit"
          }).valueOf()}
        </p>
      </div>
      <img alt="overcast-icon" class="overcast-icon" id="overcast-icon" src=${data.current.condition.icon} />
      <div class="temp-container | container">
        <p class="temperature | fs-x-large" id="temp-value">${(data.current.temp_c).toFixed()}</p>
        <button class="units-button | fs-large fw-bold" id="units-button" type="button">\xB0C</button>
      </div>
      <p class="overcast | fw-sm-bold" id="overcast">${data.current.condition.text}</p>
    `;

    overviewContent.insertAdjacentElement("afterbegin", menuContainer);
    overviewContent.setAttribute("class", "overview-content | container");

    overview.appendChild(overviewContent);
    overview.setAttribute("class", "overview-container | container");
  }
}