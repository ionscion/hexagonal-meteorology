let tableBody = document.getElementById("weather-table");
let fetchButton = document.getElementById("fetch-button");

function getApi() {
  let requestUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=Denver,CO,US&limit=1&appid=326e6d35f7ebe093972477e3b80624aa";
  let requestUrl2 =
    "https://api.openweathermap.org/data/2.5/weather?lat=39.739&lon=-104.984&appid=326e6d35f7ebe093972477e3b80624aa&units=imperial";

  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.main.temp);

      let createTableRow = document.createElement("tr");
      let tableData = document.createElement("td");
      tableBody.textContent = "";
      tableData.textContent = `Current temperature in Denver is: ${data.main.temp}F`;
      createTableRow.appendChild(tableData);
      tableBody.appendChild(createTableRow);
    });
}

fetchButton.addEventListener("click", getApi);
