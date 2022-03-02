var searchBtnEl = document.getElementById("searchBtn");
var cityInputEl = document.querySelector("#userInput");
var currentWeather = document.querySelector(".current-weather");
var weatherCall = "https://api.openweathermap.org/data/2.5/weather?q=";
var weatherKey = "&appid=70caa068c4969182efecd3dc706a38d9";
var lastCity = [];
var currentCityEl = document.querySelector("#current-city");
var weatherConditionEl = document.querySelector(".weather-conditions");
var forecastEl = document.querySelector(".forecastday");
var lat = "";
var lon = "";

// var dateEl = new Date();
// var day = dateEl.getDate();
// let dayFormat = day.toLocaleString("en-US", {
//   minimumIntegerDigits: 2,
//   useGrouping: false,
// });

// var monthNumbers = [
//   "01",
//   "02",
//   "03",
//   "04",
//   "05",
//   "06",
//   "07",
//   "08",
//   "09",
//   "10",
//   "11",
//   "12",
// ];
// let month = monthNumbers[dateEl.getMonth()];
// let year = dateEl.getFullYear();
// console.log(month);
// console.log(dayFormat);
// console.log(year);

function getCity() {
  var city = cityInputEl.value;
  lastCity.push(city);
  localStorage.setItem("city", JSON.stringify(lastCity));
  fetch(weatherCall + city + "&units=imperial" + weatherKey)
    .then(function (response) {
      // console.log(response.status);
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      lat = data.coord.lat;
      lon = data.coord.lon;
      var weatherIcon = data.weather[0].icon;
      weatherIconEl = document.createElement("img");
      weatherIconEl.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      );
      weatherConditionEl.appendChild(weatherIconEl);
      currentTempEl = document.createElement("li");
      currentTempEl.textContent = "Current Temp: " + data.main.temp.toFixed(0);
      weatherConditionEl.appendChild(currentTempEl);
      maxTempEl = document.createElement("li");
      maxTempEl.textContent = "High: " + data.main.temp_max.toFixed(0);
      weatherConditionEl.appendChild(maxTempEl);
      minTempEl = document.createElement("li");
      minTempEl.textContent = "Low: " + data.main.temp_min.toFixed(0);
      weatherConditionEl.appendChild(minTempEl);
      function getForecast() {
        fetch(
          "https://api.openweathermap.org/data/2.5/forecast?lat=" +
            lat +
            "&lon=" +
            lon +
            "&units=imperial" +
            weatherKey
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            for (var i = 0; i < 5; i++) {
              forecastTemp = document.createElement("div");
              forecastTemp.textContent = data.list[i].main.temp;
              forecastEl.appendChild(forecastTemp);
            }
          });
      }
      getForecast();
      function getUV() {
        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lat +
            "&lon=" +
            lon +
            "&exclude=hourly,daily&" +
            weatherKey
        )
          .then(function (response) {
            console.log(response);
            console.log(response.status);
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            uvIndexEl = document.createElement("li");
            uvIndexEl.textContent = "UV Index: " + data.current.uvi;
            weatherConditionEl.appendChild(uvIndexEl);
          });
      }
      getUV();
    });
}

searchBtnEl.addEventListener("click", getCity);
