"use strict";
import { QS, QSAll } from "../app.js";
export default class DataHandler {
  constructor(data) {
    this.contents = QSAll(".forecast-content, .conditions-content");
    this.conditionsDegrees = QSAll(".conditions-symbol");
    this.conditionsValues = QSAll(".conditions-value");
    this.forecastButton = QS("#forecast-button");
    this.forecastDegrees = QSAll(".temp-degree");
    this.forecastIcons = QSAll(".forecast-element-icon");
    this.forecastTitle = QS(".forecast-title");
    this.forecastValues = QSAll(".temp-value");
    this.temp = QS("#temp-value");
    this.tempContainer = QSAll("#temp-value, #units-button");
    this.unitsButton = QS("#units-button");

    this.toImperial = () => {
      const toFahrenheit = celsius => celsius * 1.8 + 32, toMiles = km => km / 1.609;
  
      this.unitsButton.innerText = " \xB0F";
      this.forecastDegrees.forEach(degree => degree.innerText = "\xb0F");
      this.conditionsDegrees[1].innerText = "\xb0F";
      this.conditionsDegrees[2].innerText = "mph";
      this.conditionsDegrees[5].innerText = "in";
      this.conditionsDegrees[9].innerText = "miles";
      this.conditionsDegrees[11].innerText = "mph";
  
      this.temp.innerText = toFahrenheit(this.temp.innerText).toFixed();
      this.forecastValues.forEach(value => value.innerText = toFahrenheit(value.innerText).toFixed());
      this.conditionsValues[1].innerText = toFahrenheit(this.conditionsValues[1].innerText).toFixed(1);
      this.conditionsValues[2].innerText = toMiles(this.conditionsValues[2].innerText).toFixed(1);
      this.conditionsValues[5].innerText = `${data.current.precip_in}`;
      this.conditionsValues[9].innerText = toMiles(this.conditionsValues[9].innerText).toFixed(1);
      this.conditionsValues[11].innerText = toMiles(this.conditionsValues[11].innerText).toFixed(1);
  
      this.tempContainer.forEach(element => element.removeEventListener("click", this.toImperial));
      this.tempContainer.forEach(element => element.addEventListener("click", this.toMetric));
    };

    this.toMetric = () => {
      const toCelsius = fahrenheit => (fahrenheit - 32) * 5 / 9, toKm = miles => miles * 1.609;
  
      this.unitsButton.innerText = " \xB0C";
      this.forecastDegrees.forEach(degree => degree.innerText = "\xb0C");
      this.conditionsDegrees[1].innerText = "\xb0C";
      this.conditionsDegrees[2].innerText = "kph";
      this.conditionsDegrees[5].innerText = "mm";
      this.conditionsDegrees[9].innerText = "km";
      this.conditionsDegrees[11].innerText = "kph";
  
      this.temp.innerText = toCelsius(this.temp.innerText).toFixed();
      this.forecastValues.forEach(value => value.innerText = toCelsius(value.innerText).toFixed());
      this.conditionsValues[1].innerText = toCelsius(this.conditionsValues[1].innerText).toFixed(1);
      this.conditionsValues[2].innerText = toKm(this.conditionsValues[2].innerText).toFixed(1);
      this.conditionsValues[5].innerText = `${data.current.precip_mm}`;
      this.conditionsValues[9].innerText = toKm(this.conditionsValues[9].innerText).toFixed();
      this.conditionsValues[11].innerText = toKm(this.conditionsValues[11].innerText).toFixed(1);
  
      this.tempContainer.forEach(element => element.removeEventListener("click", this.toMetric));
      this.tempContainer.forEach(element => element.addEventListener("click", this.toImperial));
    };

    this.forecastDayToCelsius = day => {
      this.forecastDegrees.forEach(elem => elem.innerText = "\xb0C");
      this.forecastIcons.forEach((icon, index) => icon.src = `${data.forecast.forecastday[day].hour[index].condition.icon}`);
      this.forecastValues.forEach((value, index) => value.innerText = `${(data.forecast.forecastday[day].hour[index].temp_c).toFixed()}`);
    };

    this.todayForecast = () => {
      if (this.unitsButton.innerText !== "°C") this.toMetric();
      this.forecastDayToCelsius(0);

      this.forecastTitle.innerText = "Today's hourly forecast";
      this.forecastButton.innerText = "Tomorrow's forecast";

      this.forecastButton.removeEventListener("click", this.todayForecast);
      this.forecastButton.addEventListener("click", this.tomorrowForecast);
    };

    this.tomorrowForecast = () => {
      if (this.unitsButton.innerText !== "°C") this.toMetric();
      this.forecastDayToCelsius(1);

      this.forecastTitle.innerText = "Tomorrow's hourly forecast";
      this.forecastButton.innerText = "Overmorrow's forecast";

      this.forecastButton.removeEventListener("click", this.tomorrowForecast);
      this.forecastButton.addEventListener("click", this.afterTomorrowForecast);
    };

    this.afterTomorrowForecast = () => {
      if (this.unitsButton.innerText !== "°C") this.toMetric();
      this.forecastDayToCelsius(2);

      this.forecastTitle.innerText = "Overmorrow's hourly forecast";
      this.forecastButton.innerText = "Today's forecast";

      this.forecastButton.removeEventListener("click", this.afterTomorrowForecast);
      this.forecastButton.addEventListener("click", this.todayForecast);
    };
  }

  initiate() {
    this.forecastDayToCelsius(0);
    
    this.tempContainer.forEach(element => element.addEventListener("click", this.toImperial));
    this.forecastButton.addEventListener("click", this.tomorrowForecast);
  }
}
