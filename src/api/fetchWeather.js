import axios from 'axios';
const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'ef465a4fe0e1f90c6289a95dde0abdbc';

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: 'metric',
      APPID: API_KEY,
    },
  });
  return data;
};
