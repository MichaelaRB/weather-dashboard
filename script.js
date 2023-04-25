var key = "71a47e531d4c080f7770f0bd1e588da9";
var BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?lat=";
var locUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var searchHistory = [];
var latitude;
var longitude;

var historyEl = $("#history")
var inputEl = $("#searchBtn");
var todayWeather = $(".todayForecast");
var fiveDays = $(".fiveDays");

setTimeout(()=> {
    if(localStorage.getItem("history") !== null) renderHistory();
}, 500);

function renderHistory() {
    historyEl.empty();
    var saveHistory = JSON.parse(localStorage.getItem("history"));
    for(var i = 0; i < saveHistory.length; i++) {
        var histBtn = document.createElement("button");
        histBtn.setAttribute("class","histBtn");
        histBtn.textContent = saveHistory[i];
        historyEl.append(histBtn);
    }
}

//get the latitude and longitude so we can get weather data
function getLocation(city) {
    var geoUrl = locUrl + city + "&appid=71a47e531d4c080f7770f0bd1e588da9";
    fetch(geoUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            latitude = data[0].lat;
            longitude = data[0].lon;
        });
}

//create a card with the forecast for today
function getForecast(lat, lon, city) {
    var weatherUrl = BASE_URL + lat + "&lon=" + lon + "&units=imperial&appid=71a47e531d4c080f7770f0bd1e588da9";
    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
         
            var humidity = "Humidity: " + data.list[0].main.humidity + "%";
            var windSpeed = "Wind speed: " + data.list[0].wind.speed + "MPH";
            var temp = "Temperature: " + data.list[0].main.temp + "°F";
            var date = data.list[0].dt_txt.split(" ");
            var title = city + " (" + date[0] + ")";
           
            var cardEl = document.createElement('article');
            cardEl.setAttribute('class','mx-auto my-2 card');
            cardEl.setAttribute('style', 'width: 100%');
            cardEl.setAttribute('style','padding: 2vw');

            //add title to the card
            var titleEl = document.createElement('h5');
            titleEl.setAttribute('class', 'card-title');
            titleEl.textContent = title;
            cardEl.append(titleEl);

            //add weather icon to the card
            var icon = data.list[0].weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            var weatherIcon = document.createElement('img');
            weatherIcon.setAttribute('src', iconUrl);
            weatherIcon.setAttribute('alt','An icon depicting the expected weather conditions for the day');
            weatherIcon.setAttribute('class','card-img-top');
            weatherIcon.setAttribute('style','width: 50px')
            cardEl.append(weatherIcon);

            //add weather info to the card
            var infoEl = document.createElement('p');
            var listEl = document.createElement('ul');
            var humidEl = document.createElement('li');
            var windEl = document.createElement('li');
            var tempEl = document.createElement('li');

            listEl.setAttribute('style', 'list-style-type: none');
            humidEl.textContent = humidity;
            windEl.textContent = windSpeed;
            tempEl.textContent = temp;
            listEl.append(humidEl);
            listEl.append(windEl);
            listEl.append(tempEl);
            infoEl.append(listEl);
            cardEl.append(listEl);

            todayWeather.append(cardEl);
        });
}

inputEl.on('click', function(e) {
    e.preventDefault();
    todayWeather.empty();
    fiveDays.empty();
    var city = inputEl.parent().children("#cityInput").val();
    searchHistory.push(city);    
    localStorage.setItem("history",JSON.stringify(searchHistory));
    getLocation(city);
    setTimeout(() => {
        getForecast(latitude, longitude, city);
    }, 500);
    renderHistory();
})
