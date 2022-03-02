searchBtn = document.getElementById("searchBtn");
var cityInput = document.querySelector("input");
var weatherCall = "api.openweathermap.org/data/2.5/weather?q=";
var weatherKey = "&APPID=70caa068c4969182efecd3dc706a38d9";

var lastCity = "";
var currentCity = "";

function getCity() {
    fetch(weatherCall + cityInput + weatherKey)
    .then(function (response) {
      console.log(response.status)
      return response.json
    })