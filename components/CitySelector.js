"use strict";
export const menuContainer = document.createElement("div"), menu = document.createElement("select");
export default class CitySelector {
  async render() {
    const response = await fetch(`/data/cities.json`, {method: "GET"}), data = await response.json(),
    option = document.createElement("option");

    option.innerText = "Choose a city";
    option.style.display = "none";

    menu.id = "menu";
    menu.appendChild(option);
    menu.setAttribute("class", "menu | fw-sm-bold");

    try {
      if (response.status === 200) {
        data.forEach(city => menu.innerHTML += `
          <option class="fs-x-small fw-normal" value="${city}">${city}</option>`
        );
      } else {
        console.log(`Something went wrong... Status code: ${response.status}`);
      }
    } catch (error) {
      console.log(`Fetch Error: ${error}`);
    }

    menuContainer.appendChild(menu);
    menuContainer.setAttribute("class", "menu-container");
  }
}