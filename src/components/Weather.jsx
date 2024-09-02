import React, { useState, useEffect } from 'react'
import search from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import windIcon from '../assets/wind.png'
import './weather.css'

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('Kakkanad');
    const [searchInput, setSearchInput] = useState('');

    const fetchWeatherData = async (location) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`);
            const result = await response.json();

            if (result.cod === 200) {
                setWeatherData(result);
            } else {
                alert("Location not found. Please enter a valid location.");
                setWeatherData(null); // Clear previous data if location is invalid
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchWeatherData(location);
    }, [location]);

    const handleSearchClick = () => {
        if (searchInput) {
            setLocation(searchInput);
        }
    };

    const weatherIcons = {
        Clear: clear,
        Clouds: cloud,
        Drizzle: drizzle,
        Rain: rain,
        Snow: snow,
        Thunderstorm: rain, 
        Mist: drizzle, 
    };

    return (
        <div className='weather'>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder='Search'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <img
                    src={search}
                    alt="Search"
                    onClick={handleSearchClick}
                />
            </div>
            {weatherData && (
                <>
                    <img src={weatherIcons[weatherData.weather[0].main] || clear} alt="Weather Icon" className='weatherIcon' />
                    <p className='temp'>{weatherData.main.temp}°C</p>
                    <p className='location'>{weatherData.name}</p>
                    <div className='row'>
                        <div className="col">
                            <img src={humidityIcon} alt="Humidity Icon" />
                            <div>
                                <p>{weatherData.main.humidity} %</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={windIcon} alt="Wind Icon" />
                            <div>
                                <p>{weatherData.wind.speed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Weather;
