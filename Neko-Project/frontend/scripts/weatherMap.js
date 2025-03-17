// weatherMap.js - Display weather data on a map using Leaflet.js

const map = L.map('weather-map').setView([51.505, -0.09], 13); // Set default view to London

// Add OpenStreetMap tiles as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Fetch weather data for the map center
async function fetchWeatherForMap(lat, lon) {
    const apiKey = "YOUR_API_KEY";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await fetch(weatherUrl);
    const data = await response.json();

    if (data.cod === 200) {
        const temp = data.main.temp;
        const description = data.weather[0].description;

        // Add marker and popup to the map
        L.marker([lat, lon]).addTo(map)
            .bindPopup(`<b>${description}</b><br>Temperature: ${temp}°C`)
            .openPopup();
    }
}

// Update map with weather data when it's clicked
map.on('click', function (e) {
    fetchWeatherForMap(e.latlng.lat, e.latlng.lng); // Fetch weather for the clicked location
});
