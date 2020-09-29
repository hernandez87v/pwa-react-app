import React, { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';
import { useSpring, animated } from 'react-spring';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import './App.css';

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / 5 - 200}px,${y / 5 - 10}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`;
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`;
const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`;

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  //React Spring animation
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 750, friction: 140 },
  }));

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
    }
  };

  return (
    <Parallax
      pages={2}
      scrolling={false}
      horizontal
      // ref={(ref) => (this.parallax = ref)}
    >
      <div
        className="main-container"
        rel="preload"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
        // onTouchMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      >
        <ParallaxLayer
          offset={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
          speed={0.5}
        >
          <animated.div
            className="card1"
            style={{ transform: props.xy.interpolate(trans1) }}
          />
        </ParallaxLayer>
        <ParallaxLayer
          offset={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
          speed={0.5}
        >
          <animated.div
            className="card2"
            style={{ transform: props.xy.interpolate(trans2) }}
          />
        </ParallaxLayer>
        <animated.div
          className="card3"
          style={{ transform: props.xy.interpolate(trans3) }}
        />
        <animated.div
          className="card4"
          style={{ transform: props.xy.interpolate(trans4) }}
        />
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
                Sunrise:{' '}
                {new Date(weather.sys.sunrise * 1000)
                  .toLocaleString('en-US')
                  .slice(10)}
                {/* Sunrise: {new Date(weather.sys.sunrise * 1000).toTimeString()} */}
              </p>
              <p>
                Sunset:{' '}
                {new Date(weather.sys.sunset * 1000)
                  .toLocaleString('en-US')
                  .slice(10)}
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
    </Parallax>
  );
};

export default App;
