import React, { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';
import { useSpring, animated } from 'react-spring';
import useDeviceOrientation from '@rehooks/device-orientation';
import moment from 'moment';
import './App.css';

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / 10 - 0}px,${y / 10 - 0}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 6 - 0}px,${y / 6 - 300}px,0)`;
const trans3 = (x, y) => `translate3d(${x / 5 - 0}px,${y / 5 + 240}px,0)`;
const trans4 = (x, y) => `translate3d(${x / 5 - 270}px,${y / 5 - 0}px,0)`;
const trans5 = (x, y) => `translate3d(${x / 6 + 250}px,${y / 5 - 0}px,0)`;
const trans6 = (x, y) => `translate3d(${x / 7 - 290}px,${y / 7 - 280}px,0)`;
const trans7 = (x, y) => `translate3d(${x / 8 - 280}px,${y / 8 + 260}px,0)`;
const trans8 = (x, y) => `translate3d(${x / 5 + 270}px,${y / 5 - 280}px,0)`;
const trans9 = (x, y) => `translate3d(${x / 8 + 240}px,${y / 8 + 240}px,0)`;

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  //React Spring animation
  const value = useDeviceOrientation();
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 20, tension: 750, friction: 250 },
  }));
  set({ xy: calc(value.beta, value.gamma) });
  const [clicked, click] = useState(false);
  const { scale } = useSpring({ scale: clicked ? 0.8 : 1 });

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
    }
  };

  return (
    <div
      className="main-container"
      rel="preload"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
    >
      <animated.div
        className="card1"
        style={{ transform: props.xy.interpolate(trans1) }}
      />
      <animated.div
        className="card2"
        style={{ transform: props.xy.interpolate(trans2) }}
      />
      <animated.div
        className="card3"
        style={{ transform: props.xy.interpolate(trans3) }}
      />
      <animated.div
        className="card4"
        style={{ transform: props.xy.interpolate(trans4) }}
      />
      <animated.div
        className="card5"
        style={{ transform: props.xy.interpolate(trans5) }}
      />
      <animated.div
        className="card6"
        style={{ transform: props.xy.interpolate(trans6) }}
      />
      <animated.div
        className="card7"
        style={{ transform: props.xy.interpolate(trans7) }}
      />
      <animated.div
        className="card8"
        style={{ transform: props.xy.interpolate(trans8) }}
      />
      <animated.div
        className="card9"
        style={{ transform: props.xy.interpolate(trans9) }}
      />
      <animated.input
        onMouseDown={() => click(true)}
        onMouseUp={() => click(false)}
        onTouchStart={() => click(true)}
        onTouchEnd={() => click(false)}
        style={{
          transform: scale.interpolate((s) => `scale(${s})`),
        }}
        type="text"
        title="search"
        aria-required="true"
        className="search"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <animated.div
          className="city"
          // style={{
          //   transform: scale.interpolate((s) => `scale(${s})`),
          // }}
        >
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
          {/* <div className="min_max_temp">
            <p>
              Min: {Math.round(weather.main.temp_min)}
              <sup>&deg;C</sup>
            </p>
            <p>
              Max: {Math.round(weather.main.temp_max)}
              <sup>&deg;C</sup>
            </p>
          </div> */}
          <div className="sun_rise_set">
            <p>
              Sunrise:
              {moment(weather.sys.sunrise, 'X').format('h:mm a')}
            </p>
            <p>Sunset: {moment(weather.sys.sunset, 'X').format('h:mm a')}</p>
            {/* <p>
              Sunrise:{' '}
              {
                new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                  timeStyle: 'short',
                })
                // .slice(12, 16)
              }
            </p>
            <p>
              Sunset:{' '}
              {
                new Date(
                  weather.dt * 1000 +
                    weather.timezone * 1000 +
                    weather.sys.sunrise * 1000
                ).toLocaleTimeString([], { timeStyle: 'short' })
                //   ,
                // console.log(
                //   'timezone',
                //   new Date(weather.dt * 1000 + weather.timezone * 1000)
                //   )
              }
            </p> */}
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p className="weather_description">
              {weather.weather[0].description}
            </p>
            <p>Wind: {weather.wind.speed}m/s</p>
          </div>
        </animated.div>
      )}
    </div>
  );
};

export default App;
