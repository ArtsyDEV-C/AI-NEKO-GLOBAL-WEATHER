const axios = require('axios');

// Function to get weather data from OpenWeather API
async function getWeatherDataFromOpenWeather(city, weatherAPIKey) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`;
    try {
        const response = await axios.get(weatherUrl);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from OpenWeather: ${error.message}`);
        throw error;
    }
}

// Function to get weather data from Open-Meteo API
async function getWeatherDataFromOpenMeteo(city) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`;
    try {
        const response = await axios.get(weatherUrl);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from Open-Meteo: ${error.message}`);
        throw error;
    }
}

// Function to get weather data from WeatherAPI
async function getWeatherDataFromWeatherAPI(city, weatherAPIKey) {
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${city}`;
    try {
        const response = await axios.get(weatherUrl);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from WeatherAPI: ${error.message}`);
        throw error;
    }
}

// Function to get weather data from Weatherbit API
async function getWeatherDataFromWeatherbit(city, weatherAPIKey) {
    const weatherUrl = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${weatherAPIKey}`;
    try {
        const response = await axios.get(weatherUrl);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from Weatherbit: ${error.message}`);
        throw error;
    }
}

// Function to get weather data from OpenWeather, Open-Meteo, WeatherAPI, or Weatherbit
exports.getWeatherData = async (req, res) => {
    const { city } = req.query;  // Get city from query parameter

    try {
        const weatherAPIKey = process.env.WEATHER_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`);
        
        if (response.status === 200) {
            const data = response.data;
            const weatherData = {
                temperature: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            };
            res.json(weatherData);
        } else {
            res.status(404).json({ message: 'City not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
};
