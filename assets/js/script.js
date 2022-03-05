var searchBtnEl = document.getElementById("searchBtn");
var cityInputEl = document.querySelector("#userInput");
var currentWeather = document.querySelector(".current-weather");
var currentCityEl = document.querySelector("#current-city");
var forecastEl = document.querySelector(".forecastday");
var forecastWrapper = document.querySelector(".weather-forecast");
var historyBtn = document.querySelector(".historyBtn");
var weatherCall = "https://api.openweathermap.org/data/2.5/weather?q=";
var weatherKey = "&appid=70caa068c4969182efecd3dc706a38d9";
var lastCity = [] || JSON.parse(localStorage.getItem("city"));
var lat = "";
var lon = "";

function getCity(city) {
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

      getForecast(lat, lon);

      getUV(lat, lon);
    });
}

function getUV(lat, lon) {
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

function getForecast(lat, lon) {
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
        console.log(lastCity);
        const [search1, search2, search3, search4, search5] = lastCity;
        console.log(search1);
        recentSearch1 = document.querySelector("#search1");
        recentSearch2 = document.querySelector("#search2");
        recentSearch3 = document.querySelector("#search3");
        recentSearch4 = document.querySelector("#search4");
        recentSearch5 = document.querySelector("#search5");
        recentSearch1.textContent = search1;
        recentSearch2.textContent = search2;
        recentSearch3.textContent = search3;
        recentSearch4.textContent = search4;
        recentSearch5.textContent = search5;

        fullDateEL = document.querySelectorAll(".date")[i];
        var dateTime = data.list[forecastIndex[i]].dt_txt;
        console.log(dateTime);
        fullDateEL.textContent = data.list[forecastIndex[i]].dt_txt;
        forecastIcon = data.list[forecastIndex[i]].weather[0].icon;
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

historyBtn.addEventListener("click", function (e) {
  let cityClicked = e.target.innerText;
  console.log(cityClicked);
  getCity(cityClicked);
});
searchBtnEl.addEventListener("click", function () {
  var city = cityInputEl.value;
  lastCity.push(city);
  localStorage.setItem("city", JSON.stringify(lastCity));
  getCity(city);
});
