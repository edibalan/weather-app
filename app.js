"use strict";
import CitySelector, { menu } from "./components/CitySelector.js";
import Overview, { overview } from "./components/Overview.js";
import Forecast, { forecast } from "./components/Forecast.js";
import Conditions, { conditions } from "./components/Conditions.js";
import DataHandler from "./handlers/DataHandler.js";
import ThemeHandler from "./handlers/ThemeHandler.js";

export const main = document.createElement("main"), extra = document.createElement("section"),
CE = element => document.createElement(element), QS = element => document.querySelector(element),
QSAll = element => document.querySelectorAll(element);

class App {
  constructor() {
    this.city = "Abu Dhabi";
    this.elements = [menu, overview, forecast, conditions];
    this.key = "38aed6571d944af2ada200228222204";

    this.initApp = function() {
      document.body.insertAdjacentElement("afterbegin", main);

      main.setAttribute("class", "app-container");
      extra.setAttribute("class", "extra-container | container");

      App.render(this.city, this.key);
  
      extra.append(forecast, conditions);
      main.append(overview, extra);
    }

    this.changeData = function(event) {
      const city = event.target.value;

      this.elements.forEach(element => element.innerHTML = "");
      
      App.render(city, this.key);
    };
  }

  static async render(city, key) {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3&aqi=no&alerts=no`, {method: "GET"}
    ),
    data = await response.json();

    try {
      if(response.status === 200) {
        new CitySelector().render();
        new Overview().render(data);
        new Forecast().render(data);
        new Conditions(data).render();
        setTimeout(() => {
          new ThemeHandler(data).initiate();
          new DataHandler(data).initiate();
        }, 50);
      } else {
        console.log(`Something went wrong... Status code: ${response.status}`);
      }
    } catch (error) {
      console.log(`Fetch Error: ${error}`);
    }
  };
}
const app = new App();
app.initApp();
window.addEventListener("change", event => app.changeData(event));