import React, {useState} from 'react';

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const API_KEY = "e94c51c209293690a18d6ddccd1b536d";
    
    const fetchWeather = async () => {
        if(!city) return;
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            if(response.ok) {
                setWeather(data);
                setError('');
            } else {
                setError(data.message);
                setWeather(null);
            }
        } catch (error) {
            setError("Failed to fetch data");
        }
    };

    return (
        <div className="weather-container">
            <input 
                type="text" 
                value={city} 
                placeholder="Enter city name" 
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>
                Get Weather
            </button>
            {error && <p className="error">{error}</p>}

            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p> 
                </div>
            )}
        </div>
    );
};

export default Weather;