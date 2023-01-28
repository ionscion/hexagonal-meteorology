let tableBody = document.getElementById("weather-table");
let fetchButton = document.getElementById("fetch-button");
let day1 = document.getElementById("day-1");
let day2 = document.getElementById("day-2");
let day3 = document.getElementById("day-3");
let day4 = document.getElementById("day-4");
let day5 = document.getElementById("day-5");

function getApi() {
  //url one works for 5 day forecast, do I need a second fetch request?
  let forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=39.739&lon=-104.984&appid=326e6d35f7ebe093972477e3b80624aa&units=imperial";
  let requestUrl2 =
    "https://api.openweathermap.org/data/2.5/weather?lat=39.739&lon=-104.984&appid=326e6d35f7ebe093972477e3b80624aa&units=imperial";

  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.main.temp);
      //changed for loop to 1, data.length didn't work
      for (let i = 0; i < 1; i++) {
        let createTableRow = document.createElement("tr");
        let tempData = document.createElement("td");
        tempData.textContent = `Temperature: ${data.main.temp} F`;
        createTableRow.appendChild(tempData);

        let cityData = document.createElement("td");
        cityData.textContent = `City: ${data.name}`;
        createTableRow.appendChild(cityData);

        let descriptionData = document.createElement("td");
        descriptionData.textContent = `Conditions: ${data.weather[0].description}`;
        createTableRow.appendChild(descriptionData);

        tableBody.appendChild(createTableRow);
      }
    });

  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let filteredData = data.list.filter((item, index) => {
        return index > 0 && (index + 1) % 8 === 0 && index < 40;
      });
      console.log(filteredData);
      for (let i = 0; i < 5; i++) {
        // const element = data[i];
        let currentId = document.getElementById(`day-${i + 1}`);
        let createTableRow = document.createElement("tr");
        //date
        let createDateRow = document.createElement("tr");
        let createDate = document.createElement("td");
        createDate.textContent = `Date: ${filteredData[i].dt_txt.slice(0,11)}`;
        createDateRow.appendChild(createDate);
        createTableRow.appendChild(createDateRow);
        //icon 
        let createIconRow = document.createElement("tr");
        let getIconText = filteredData[i].weather[0].icon;
        let createIcon = document.createElement("img");
        createIcon.src = `http://openweathermap.org/img/wn/${getIconText}@2x.png`;
        createIconRow.appendChild(createIcon);
        createIconRow.appendChild(createIcon);
        createTableRow.appendChild(createIconRow);
        //temp
        let createTempRow = document.createElement("tr");
        let createTemp = document.createElement("td");
        createTemp.textContent = `Temperature: ${filteredData[i].main.temp} F`;
        createTempRow.appendChild(createTemp);
        createTableRow.appendChild(createTempRow);
        //wind speed
        let createWindRow = document.createElement("tr");
        let createWind = document.createElement("td");
        createWind.textContent = `Wind Speed: ${filteredData[i].wind.speed} mph`;
        createWindRow.appendChild(createWind);
        createTableRow.appendChild(createWindRow);
        //humidity
        let createHumidRow = document.createElement("tr");
        let createHumidity = document.createElement("td");
        createHumidity.textContent = `Humidity: ${filteredData[i].main.humidity} %`;
        createHumidRow.appendChild(createHumidity);
        createTableRow.appendChild(createHumidRow);

        currentId.appendChild(createTableRow);
      }
    });
}

fetchButton.addEventListener("click", getApi);
