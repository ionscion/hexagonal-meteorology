let tableBody = document.getElementById("weather-table");
let fetchButton = document.getElementById("fetch-button");
let searchButton = document.getElementById("search-submit");
let recentSearchSelect = document.getElementById("recent-searches");
let recentSearchButton = document.getElementById("recent-search-btn");
let day1 = document.getElementById("day-1");
let day2 = document.getElementById("day-2");
let day3 = document.getElementById("day-3");
let day4 = document.getElementById("day-4");
let day5 = document.getElementById("day-5");
let currentDay = dayjs().format("dddd, YYYY-MM-DD");
let lattitude = [];
let longitude = [];

function getApi() {
  clearPage();
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lattitude}&lon=${longitude}&appid=326e6d35f7ebe093972477e3b80624aa&units=imperial`;
  let requestUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=326e6d35f7ebe093972477e3b80624aa&units=imperial`;

  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < 1; i++) {
        let createTableRow = document.createElement("tr");
        let createCityRow = document.createElement("tr");
        let createCity = document.createElement("td");
        createCity.textContent = data.name;
        createCityRow.appendChild(createCity);
        createTableRow.appendChild(createCityRow);
        let createDateRow = document.createElement("tr");
        let createDate = document.createElement("td");
        createDate.textContent = currentDay;
        createDateRow.appendChild(createDate);
        createTableRow.appendChild(createDateRow);
        let createIconRow = document.createElement("tr");
        let getIconText = data.weather[0].icon;
        let createIcon = document.createElement("img");
        createIcon.src = `http://openweathermap.org/img/wn/${getIconText}@2x.png`;
        createIconRow.appendChild(createIcon);
        createIconRow.appendChild(createIcon);
        createTableRow.appendChild(createIconRow);
        let createTempRow = document.createElement("tr");
        let createTemp = document.createElement("td");
        createTemp.textContent = `Temperature: ${data.main.temp} F`;
        createTempRow.appendChild(createTemp);
        createTableRow.appendChild(createTempRow);

        let createWindRow = document.createElement("tr");
        let createWind = document.createElement("td");
        createWind.textContent = `Wind Speed: ${data.wind.speed} mph`;
        createWindRow.appendChild(createWind);
        createTableRow.appendChild(createWindRow);

        let createHumidRow = document.createElement("tr");
        let createHumidity = document.createElement("td");
        createHumidity.textContent = `Humidity: ${data.main.humidity} %`;
        createHumidRow.appendChild(createHumidity);
        createTableRow.appendChild(createHumidRow);

        tableBody.appendChild(createTableRow);
      }
    });

  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let filteredData = data.list.filter((item, index) => {
        return index >= 2 && index <= 35 && (index - 2) % 8 === 0;
      });
      for (let i = 0; i < 5; i++) {
        let date = filteredData[i].dt_txt.slice(0, 11);
        let newDate = dayjs(date).format("dddd");
        let currentId = document.getElementById(`day-${i + 1}`);
        let currentPlaceholder = document.getElementById(`day-place-${i + 1}`);
        let createDateHeader = document.createElement("p");
        createDateHeader.textContent = newDate;
        currentPlaceholder.appendChild(createDateHeader);
        let createTableRow = document.createElement("tr");
        let createDateRow = document.createElement("tr");
        let createDate = document.createElement("td");
        createDate.textContent = `Date: ${date}`;
        createDateRow.appendChild(createDate);
        createTableRow.appendChild(createDateRow);
        let createIconRow = document.createElement("tr");
        let getIconText = filteredData[i].weather[0].icon;
        let createIcon = document.createElement("img");
        createIcon.src = `http://openweathermap.org/img/wn/${getIconText}@2x.png`;
        createIconRow.appendChild(createIcon);
        createIconRow.appendChild(createIcon);
        createTableRow.appendChild(createIconRow);
        let createTempRow = document.createElement("tr");
        let createTemp = document.createElement("td");
        createTemp.textContent = `Temperature: ${filteredData[i].main.temp} F`;
        createTempRow.appendChild(createTemp);
        createTableRow.appendChild(createTempRow);
        let createWindRow = document.createElement("tr");
        let createWind = document.createElement("td");
        createWind.textContent = `Wind Speed: ${filteredData[i].wind.speed} mph`;
        createWindRow.appendChild(createWind);
        createTableRow.appendChild(createWindRow);
        let createHumidRow = document.createElement("tr");
        let createHumidity = document.createElement("td");
        createHumidity.textContent = `Humidity: ${filteredData[i].main.humidity} %`;
        createHumidRow.appendChild(createHumidity);
        createTableRow.appendChild(createHumidRow);

        currentId.appendChild(createTableRow);
      }
    });
  lattitude = [];
  longitude = [];
}

function getCityApi(evt) {
  evt.preventDefault();
  let cityInput = document.getElementById("city-input");
  let selectedState = document.getElementById("state-input");

  cityInput = cityInput.value;
  selectedState = selectedState.value;

  if (cityInput === "New York" || cityInput === "new york") {
    cityInput = "City of New York";
  }

  let cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},${selectedState},US&limit=1&appid=326e6d35f7ebe093972477e3b80624aa`;

  fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        const returnedName = data[i].name.toLowerCase();
        if (cityInput.toLowerCase().includes(returnedName)) {
          console.log("city matches exactly");
          lattitude.push(data[0].lat);
          longitude.push(data[0].lon);
          console.log(`${lattitude},${longitude}`);
        } else {
          console.log("no city was found!");
        }
      }
      getApi(lattitude, longitude);
    })
    .catch(function (error) {
      console.error("There was a problem with the fetch operation:", error);
    });
  searchSave(cityInput, selectedState);
  cityInput.value = "";
  selectedState.value = "";
}

function clearPage() {
  tableBody.textContent = "";
  for (let i = 0; i < 5; i++) {
    let currentId = document.getElementById(`day-${i + 1}`);
    currentId.textContent = "";
    let currentPlaceholder = document.getElementById(`day-place-${i + 1}`);
    currentPlaceholder.textContent = "";
  }
}

function searchSave(city, state) {
  let citySearches = JSON.parse(localStorage.getItem("city-searches")) || [];
  citySearches.push(`${city}, ${state}`);
  localStorage.setItem("city-searches", JSON.stringify(citySearches));
}

function renderSearch() {
  let storedData = JSON.parse(localStorage.getItem("city-searches"));
  let uniqueData = [...new Set(storedData.map((x) => x.toUpperCase()))];

  for (let i = 0; i < uniqueData.length; i++) {
    let recentSearchOption = document.createElement("option");
    recentSearchOption.textContent = uniqueData[i];
    recentSearchSelect.appendChild(recentSearchOption);
  }
}
searchButton.addEventListener("click", getCityApi);

recentSearchButton.addEventListener("click", function () {
  let selectedIndex = recentSearchSelect.selectedIndex;
  let selectedOption = recentSearchSelect.options[selectedIndex];
  let searchTarget = selectedOption.textContent;
  let [city, state] = searchTarget.split(", ");
  let cityNewUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=1&appid=326e6d35f7ebe093972477e3b80624aa`;

  fetch(cityNewUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        const returnedName = data[i].name.toLowerCase();
        if (city.toLowerCase().includes(returnedName)) {
          lattitude.push(data[0].lat);
          longitude.push(data[0].lon);
        } else {
          console.log("no city was found!");
        }
      }
      getApi(lattitude, longitude);
    })
    .catch(function (error) {
      console.error("There was a problem with the fetch operation:", error);
    });
  city.value = "";
  state.value = "";
});

function init() {
  renderSearch();
}

init();