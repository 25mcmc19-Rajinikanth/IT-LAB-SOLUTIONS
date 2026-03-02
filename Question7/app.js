
var cityInput = document.getElementById("cityInput");
var button = document.getElementById("getWeatherBtn");
var resultDiv = document.getElementById("weatherResult");

var API_KEY = "feecd8684d6288612d44f449325072df";

button.addEventListener("click", function () {
    var city = cityInput.value;
    if (city === "") {
        resultDiv.innerText = "Please enter a city name";
        return;
    }
    fetchWeather(city);
});

function fetchWeather(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=").concat(API_KEY, "&units=metric");
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        displayWeather(data);
    })
        .catch(function () {
        resultDiv.innerText = "Network error. Please try again.";
    });
}

function displayWeather(data) {
    
    if ("message" in data) {
        resultDiv.innerText = "Invalid city name";
    }
    else {
        resultDiv.innerHTML = "\n      <h3>".concat(data.name, "</h3>\n      <p>Temperature: ").concat(data.main.temp, " \u00B0C</p>\n      <p>Humidity: ").concat(data.main.humidity, "%</p>\n      <p>Condition: ").concat(data.weather[0].description, "</p>\n    ");
    }
}
