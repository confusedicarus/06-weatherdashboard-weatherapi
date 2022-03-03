var searchBtnEl = document.getElementById("searchBtn");
var cityInputEl = document.querySelector("#userInput");
var currentWeather = document.querySelector(".current-weather");
var weatherCall = "https://api.openweathermap.org/data/2.5/weather?q=";
var weatherKey = "&appid=70caa068c4969182efecd3dc706a38d9";
var lastCity = [];
var currentCityEl = document.querySelector("#current-city");
var weatherConditionEl = document.querySelector(".weather-conditions");
var forecastEl = document.querySelector(".forecastday");
var forecastWrapper = document.querySelector(".weather-forecast");
var lat = "";
var lon = "";

function getCity() {
  var city = cityInputEl.value;
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
      weatherIconEl = document.createElement("img");
      weatherIconEl.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      );
      weatherIconEl.setAttribute("id", "largeIcon");
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
            var forecastIndex = [4, 12, 20, 28, 36];
            for (var i = 0; i < forecastIndex.length; i++) {
              var forecastIcon = data.list[forecastIndex[i]].weather[0].icon;
              forecastIconEl = document.createElement("img");
              forecastIconEl.setAttribute(
                "src",
                "https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png"
              );
              forecastWrapper.children[i].appendChild(forecastIconEl);
              forecastTemp = document.createElement("div");
              forecastTemp.textContent =
                "Temp: " + data.list[forecastIndex[i]].main.temp;
              console.log(forecastWrapper.children);
              forecastWrapper.children[i].appendChild(forecastTemp);
              windEl = document.createElement("div");
              windEl.textContent =
                "Wind Speed: " + data.list[forecastIndex[i]].wind.speed;
              forecastWrapper.children[i].appendChild(windEl);
              humidityEl = document.createElement("div");
              humidityEl.textContent =
                "Humidity: " + data.list[forecastIndex[i]].main.humidity;
              forecastWrapper.children[i].appendChild(humidityEl);
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
