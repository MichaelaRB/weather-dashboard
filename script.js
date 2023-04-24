var key = "71a47e531d4c080f7770f0bd1e588da9";
var BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?lat=";
var locUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var coordinates = [];
var latitude;
var longitude;

var inputEl = $("#searchBtn");

function getLocation(city) {
    var geoUrl = locUrl + city + "&appid=71a47e531d4c080f7770f0bd1e588da9";
    fetch(geoUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            latitude = data[0].lat;
            longitude = data[0].lon;
        });
}

function getForecast(lat, lon) {
    var weatherUrl = BASE_URL + lat + "&lon=" + lon + "&units=imperial&appid=71a47e531d4c080f7770f0bd1e588da9";
    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}


inputEl.on('click', function(e) {
    e.preventDefault();
    var city = inputEl.parent().children("#cityInput").val();
    getLocation(city);
    setTimeout(() => {
        getForecast(latitude, longitude);
    }, 1000);
})

