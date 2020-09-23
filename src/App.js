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
      {/* <div className="search-container">
        <GooglePlacesAutocomplete
          apiKey={`API-KEY-HERE`}
          selectProps={{
            query,
            onChange: setQuery,
            placeholder: 'Search city here...',
            onKeyPress: { search },
          }}
        />
      </div> */}
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
          <p>
            Feels like: {Math.round(weather.main.feels_like)}
            <sup>&deg;C</sup>
          </p>
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
