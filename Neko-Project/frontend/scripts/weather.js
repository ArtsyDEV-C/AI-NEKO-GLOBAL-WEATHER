// weather.js - Fetch and display weather data on the frontend

// Import Leaflet.js
import L from 'leaflet';

// Initialize the map
const map = L.map('weather-map').setView([51.505, -0.09], 13); // Set default view to London

// Add OpenStreetMap tiles as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to send SMS notifications using Twilio API
async function sendWeatherAlert(message) {
    try {
        const response = await fetch('/api/send-alert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        if (response.ok) {
            console.log("Alert sent successfully");
        } else {
            console.error("Failed to send alert");
        }
    } catch (error) {
        console.error("Error sending alert:", error);
    }
}

async function getWeather(city) {
    try {
        const response = await fetch(`/api/weather/current?city=${city}`);
        const data = await response.json();

        if (data.temperature) {
            // Update UI with fetched weather data
            document.getElementById("weather-temp").innerText = `${data.temperature}°C`;
            document.getElementById("weather-desc").innerText = data.description;
            document.getElementById("weather-humidity").innerText = `Humidity: ${data.humidity}%`;
            document.getElementById("weather-wind").innerText = `Wind Speed: ${data.windSpeed} m/s`;
            document.getElementById("weather-icon").src = data.icon;

            // Update map with weather data
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>${data.description}</b><br>Temperature: ${data.temperature}°C`)
                .openPopup();
            map.setView([lat, lon], 13);

            // Check for severe weather conditions and send alert
            if (data.alerts && data.alerts.length > 0) {
                const alertMessage = data.alerts.map(alert => alert.description).join('\n');
                sendWeatherAlert(alertMessage);
            }
        } else {
            alert("City not found.");
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

// Call getWeather function on page load
window.onload = () => {
    getWeather("New York"); // Default city
};

// Event listener for search input
document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    getWeather(city);
});

// Update map with weather data when it's clicked
map.on('click', function (e) {
    fetchWeatherForMap(e.latlng.lat, e.latlng.lng); // Fetch weather for the clicked location
});
