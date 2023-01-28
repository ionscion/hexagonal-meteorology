let tableBody = document.getElementById("weather-table");
let fetchButton = document.getElementById("fetch-button");

function getApi() {
    //url one works for 5 day forecast, do I need a second fetch request?
  let requestUrl =
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
}

fetchButton.addEventListener("click", getApi);
