import React, { useState, useEffect } from "react";
import axios from "axios";

function Forecast({ city }) {

    const [forecast, setForecast] = useState([]);

    const API_KEY = "feecd8684d6288612d44f449325072df";

    useEffect(() => {

        const fetchForecast = async () => {

            try {

                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
                );

                setForecast(response.data.list.slice(0, 5));

            } catch (error) {

                console.log("Forecast error");

            }
        };

        fetchForecast();

    }, [city]);

    return (
        <div>
            <h3>5 Day Forecast</h3>

            {forecast.map((item, index) => (
                <div key={index}>
                    <p>{item.dt_txt}</p>
                    <p>{item.main.temp} °C</p>
                    <p>{item.weather[0].description}</p>
                </div>
            ))}

        </div>
    );
}

export default Forecast;