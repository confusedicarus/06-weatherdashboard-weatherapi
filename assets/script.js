searchBtn = document.getElementById("searchBtn");
var weatherCall = "https://api.openweathermap.org/data/2.5/weather?";
var weatherKey = "&appid=70caa068c4969182efecd3dc706a38d9";
var lastCity = "";
var currentCity = "";

function getCity(event) {
  var city = document.querySelector("input");
  

}


searchBtn.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    var userLat = position.coords.latitude;
    var userLong = position.coords.longitude;
    console.log(userLat);
    console.log(userLong);
    var requestUrl =
      weatherHour + "lat=" + userLat + "&lon=" + userLong + weatherKey;
    console.log(requestUrl);
    fetch(requestUrl).then(function (response) {
      return response.jason();
    });
  });
});
