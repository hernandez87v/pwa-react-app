import React, { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';
import './App.css';

// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
    }
  };

  return (
    <div className="main-container" rel="preload">
      <input
        type="text"
        title="search"
        aria-required="true"
        className="search"
        placeholder="Search city here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>
              {' '}
              <img
                className="country-flag"
                src={`https://openweathermap.org/images/flags/${weather.sys.country.toLowerCase()}.png`}
                alt={weather.sys.country}
              />
            </sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="feels-like">
            Feels like: {Math.round(weather.main.feels_like)}
            <sup>&deg;C</sup>
          </div>
          <div className="min_max_temp">
            <p>
            Min: {Math.round(weather.main.temp_min)}
            <sup>&deg;C</sup>
            </p>
            <p>
            Max: {Math.round(weather.main.temp_max)}
            <sup>&deg;C</sup>
            </p>
          </div>
          <div className="sun_rise_set">
            <p>
            Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleString('en-US').slice(10)}
            {/* Sunrise: {new Date(weather.sys.sunrise * 1000).toTimeString()} */}
            </p>
            <p>
            Sunset: {new Date(weather.sys.sunset * 1000).toLocaleString('en-US').slice(10)}
            </p>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
            <p>Wind: {weather.wind.speed}m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
