"use strict";
import { extra, QS, QSAll } from "../app.js";
import { menu } from "../components/CitySelector.js";
import { overview } from "../components/Overview.js";

export default class ThemeHandler {
  constructor(data) {
    this.dateLocation = QS(".date-location-container");
    this.hour = new Date(data.location.localtime).getHours();
    this.titlesArr = QSAll(".forecast-title, .conditions-title");
    this.unitsButton = QS("#units-button");

    this.themeHandler = (color, background, image, gradient) => {
      const elements = [menu, overview, this.dateLocation, this.unitsButton];

      elements.forEach(element => element.style.color = color);
      this.titlesArr.forEach(title => title.style.color = color);

      overview.style.backgroundColor = background;
      overview.style.backgroundImage = `url(https://edibalan.github.io/weather-app/media/${image})`;
      menu.style.borderBottomColor = color;
      extra.style.backgroundImage = `linear-gradient(${gradient})`;
    };

    this.darkModeOne = () => this.themeHandler("#F4F4F4", "#1C2657", "night-background.webp", "90deg, #1C2657, #3F81CC");
    this.darkModeTwo = () => this.themeHandler("#F4F4F4", "#1C2657", "night-background.webp", "#1C2657, #3F81CC");
    this.lightModeOne = () => this.themeHandler("#000", "#8FCBE5", "day-background.webp", "90deg, #8FCBE5, #3F81CC");
    this.lightModeTwo = () => this.themeHandler("#000", "#8FCBE5", "day-background-landscape.webp", "#8FCBE5, #3F81CC");
    this.lightModeThree = () => this.themeHandler("#000", "#8FCBE5", "day-background.webp", "#8FCBE5, #3F81CC");
  }

  initiate() {
    if (screen.width > 949 && screen.orientation.type === "portrait-primary" && (this.hour <= 6 || this.hour > 18)) {
      this.darkModeTwo();
    } else if (screen.width > 949 && (this.hour <= 6 || this.hour > 18)) {
      this.darkModeOne();
    } else if (this.hour <= 6 || this.hour > 18) {
      this.darkModeTwo();
    }
    
    if (screen.width > 949 && screen.orientation.type === "portrait-primary" && (this.hour > 6 && this.hour < 19)) {
      this.lightModeThree();
    } else if (screen.width > 949 && (this.hour > 6 && this.hour < 19)) {
      this.lightModeOne();
    } else if (screen.orientation.type === "landscape-primary" && (this.hour > 6 && this.hour < 19)) {
      this.lightModeTwo();
    } else if (this.hour > 6 && this.hour < 19) {
      this.lightModeThree();
    }

    window.addEventListener("orientationchange", () => {
      if ((screen.width > 949 && screen.orientation.type === "landscape-primary") && (this.hour > 6 && this.hour < 19)) {
        this.lightModeOne();
      } else if (screen.orientation.type === "landscape-primary" && (this.hour > 6 && this.hour < 19)) {
        this.lightModeTwo();
      } else if (screen.orientation.type === "portrait-primary" && (this.hour > 6 && this.hour < 19)) {
        this.lightModeThree();
      }
  
      if ((screen.width > 949 && screen.orientation.type === "landscape-primary") && (this.hour <= 6 || this.hour > 18)) {
        this.darkModeOne();
      } else if (this.hour <= 6 || this.hour > 18) {
        this.darkModeTwo();
      }
    });
  }
}
