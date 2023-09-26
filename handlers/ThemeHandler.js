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

    this.darkMode1 = () => this.themeHandler("#F4F4F4", "#1C2657", "night-background.webp", "90deg, #1C2657, #3F81CC");
    this.darkMode2 = () => this.themeHandler("#F4F4F4", "#1C2657", "night-background.webp", "#1C2657, #3F81CC");
    this.lightMode1 =() => this.themeHandler("#000", "#8FCBE5", "day-background.webp", "90deg, #8FCBE5, #3F81CC");
    this.lightMode2 =() => this.themeHandler("#000", "#8FCBE5", "day-background-landscape.webp", "#8FCBE5, #3F81CC");
    this.lightMode3 =() => this.themeHandler("#000", "#8FCBE5", "day-background.webp", "#8FCBE5, #3F81CC");
  }

  initiate() {
    const isDesktop = window.innerWidth > 949, isLandscape = window.innerHeight < window.innerWidth,
    isPortrait = window.innerHeight > window.innerWidth, isDay = this.hour > 6 && this.hour < 20,
    isNight = this.hour <= 6 || this.hour > 19;

    if (isDesktop && isPortrait && isNight) { this.darkMode2() }
    else if (isDesktop && isNight) { this.darkMode1() }
    else if (isNight) this.darkMode2();
    
    if (isDesktop && isPortrait && isDay) { this.lightMode3() }
    else if (isDesktop && isDay) { this.lightMode1() }
    else if (isLandscape && isDay) { this.lightMode2() }
    else if (isDay) this.lightMode3();
    
    window.addEventListener("orientationchange", () => {
      if (isDesktop && isLandscape && isDay) { this.lightMode1() }
      else if (isLandscape && isDay) { this.lightMode2() }
      else if (isPortrait && isDay) this.lightMode3();
  
      if (isDesktop && isLandscape && isNight) { this.darkMode1() }
      else if (isNight) this.darkMode2();
    });
  }
}
