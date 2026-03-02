
type WeatherSuccess = {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
    }[];
};


type WeatherError = {
    message: string;
};


type WeatherResponse = WeatherSuccess | WeatherError;


const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const button = document.getElementById("getWeatherBtn") as HTMLButtonElement;
const resultDiv = document.getElementById("weatherResult") as HTMLDivElement;


const API_KEY = "feecd8684d6288612d44f449325072df";


button.addEventListener("click", () => {
    const city: string = cityInput.value;

    if (city === "") {
        resultDiv.innerText = "Please enter a city name";
        return;
    }

    fetchWeather(city);
});


function fetchWeather(city: string): void {
    const url: string =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then((data: WeatherResponse) => {
            displayWeather(data);
        })
        .catch(() => {
            resultDiv.innerText = "Network error. Please try again.";
        });
}


function displayWeather(data: WeatherResponse): void {

    if ("message" in data) {
        resultDiv.innerText = "Invalid city name";
    } else {
        resultDiv.innerHTML = `
      <h3>${data.name}</h3>
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Condition: ${data.weather[0].description}</p>
    `;
    }
}
