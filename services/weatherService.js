const axios = require("axios");
const apiKey = "5f28d1fc3b99329a5afe0bea6bb35444";

async function fetchWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&apiKey=${apiKey}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = { fetchWeatherData };
