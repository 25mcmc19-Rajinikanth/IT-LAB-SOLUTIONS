import React, { useState, useEffect } from "react";
import axios from "axios";
import Forecast from "./Forecast";

function Weather() {

    const [city, setCity] = useState("Hyderabad");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const API_KEY = "feecd8684d6288612d44f449325072df";

    const fetchWeather = async (cityName) => {
        try {

            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
            );

            setWeather(response.data);
            setError("");

        } catch (err) {

            setError("City not found or API error");
            setWeather(null);

        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeather(city);
    };

    return (
        <div>

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <button type="submit">Search</button>
            </form>

            {error && <p>{error}</p>}

            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp} °C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Weather: {weather.weather[0].description}</p>

                    <Forecast city={city} />
                </div>
            )}

        </div>
    );
}

export default Weather;