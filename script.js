var key = "71a47e531d4c080f7770f0bd1e588da9";
var BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=71a47e531d4c080f7770f0bd1e588da9";
var locUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var coordinates = [];
var latitude;
var longitude;

var inputEl = $("#searchBtn");

function getLocation(city) {
    locUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
    locUrl = locUrl + city + "&appid=71a47e531d4c080f7770f0bd1e588da9";
    fetch(locUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            latitude = data[0].lat;
            longitude = data[0].lon;
        });
}

inputEl.on('click', function(e) {
    e.preventDefault();
    var city = inputEl.parent().children("#cityInput").val();
    getLocation(city);
    console.log(city);
    setTimeout(() => {
        console.log(latitude);
    }, 1000);
})

