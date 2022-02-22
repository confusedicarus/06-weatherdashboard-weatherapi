searchBtn = document.getElementById("searchBtn");
var weatherHour = "api.openweathermap.org/data/2.5/weather?";
var weatherKey = "appid=70caa068c4969182efecd3dc706a38d9";
console.log()

searchBtn.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    var userLat = position.coords.latitude;
    var userLong = position.coords.longitude;
    console.log(userLat);
    console.log(userLong);
    var latShort = userLat.toFixed(2);
    var lonShort = userLong.toFixed(2);
        fetch(
        weatherHour + "lat=" + latShort + "&lon=" + lonShort + weatherKey
        ).then(function (response) {
        return response.jason();
    });
  });
});
