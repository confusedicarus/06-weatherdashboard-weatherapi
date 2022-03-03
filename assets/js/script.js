var searchBtnEl = document.getElementById("searchBtn");
var cityInputEl = document.querySelector("#userInput");
var currentWeather = document.querySelector(".current-weather");
var currentCityEl = document.querySelector("#current-city");
var forecastEl = document.querySelector(".forecastday");
var forecastWrapper = document.querySelector(".weather-forecast");
var removeTool = document.querySelector(".remove");
var weatherCall = "https://api.openweathermap.org/data/2.5/weather?q=";
var weatherKey = "&appid=70caa068c4969182efecd3dc706a38d9";
var lastCity = [];
var lat = "";
var lon = "";

function getCity() {
  var city = cityInputEl.value;
  cityInputEl.setAttribute("class", "remove");
  lastCity.push(city);
  localStorage.setItem("city", JSON.stringify(lastCity));
  fetch(weatherCall + city + "&units=imperial" + weatherKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data.coord.lat;
      lon = data.coord.lon;
      currentCityEl.textContent = data.name;
      weatherIcon = data.weather[0].icon;
      weatherIconEl = document.querySelector("#currentWeatherIcon");
      weatherIconEl.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      );
      currentTempEl = document.querySelector("#currentTemp");
      maxTempEl = document.querySelector("#maxTemp");
      minTempEl = document.querySelector("#minTemp");
      currentTempEl.textContent =
        "Current Temp: " + data.main.temp.toFixed(0) + "\u00B0";
      maxTempEl.textContent =
        "High: " + data.main.temp_max.toFixed(0) + "\u00B0";
      minTempEl.textContent =
        "Low: " + data.main.temp_min.toFixed(0) + "\u00B0";
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
            var forecastIndex = [4, 12, 20, 28, 36];
            for (var i = 0; i < forecastIndex.length; i++) {
              var forecastIcon = data.list[forecastIndex[i]].weather[0].icon;
              forecastIconEl = document.querySelectorAll(".forecastIcon")[i];
              forecastIconEl.setAttribute(
                "src",
                "https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png"
              );
              forecastTemp = document.querySelectorAll(".forecastTemp")[i];
              forecastTemp.textContent =
                "Temp: " + data.list[forecastIndex[i]].main.temp + "\u00B0";
              windEl = document.querySelectorAll(".forecastWind")[i];
              windEl.textContent =
                "Wind Speed: " + data.list[forecastIndex[i]].wind.speed;
              humidityEl = document.querySelectorAll(".forecastHumid")[i];
              humidityEl.textContent =
                "Humidity: " + data.list[forecastIndex[i]].main.humidity;
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
            uvIndexEl = document.querySelector("#uvIndex");
            uvIndexEl.textContent = "UV Index: " + data.current.uvi;
          });
      }
      getUV();
    });
}

searchBtnEl.addEventListener("click", getCity);
