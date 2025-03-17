// weather.js - Fetch and display weather data on the frontend

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

// Function to fetch weather data from the backend
async function getWeather(city) {
    try {
        const response = await fetch(`/api/weather/current?city=${city}`);
        const data = await response.json();
        
        if (data.temperature) {
            document.getElementById("weather-temp").innerText = `${data.temperature}°C`;
            document.getElementById("weather-desc").innerText = data.description;
            document.getElementById("weather-humidity").innerText = `Humidity: ${data.humidity}%`;
            document.getElementById("weather-wind").innerText = `Wind Speed: ${data.windSpeed} m/s`;
            document.getElementById("weather-icon").src = data.icon;
        } else {
            alert("City not found.");
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

async function getWeatherForecast(city) {
    try {
        const response = await fetch(`/api/weather/forecast?city=${city}`);
        const data = await response.json();

        if (data.forecast) {
            updateForecastUI(data.forecast);
        } else {
            alert("City not found.");
        }
    } catch (error) {
        console.error("Error fetching weather forecast:", error);
    }
}

function updateForecastUI(forecast) {
    const forecastContainer = document.getElementById("weather-forecast");
    forecastContainer.innerHTML = ""; // Clear previous forecast

    forecast.forEach(day => {
        const dayElement = document.createElement("div");
        dayElement.className = "forecast-day";
        dayElement.innerHTML = `
            <p>Date: ${day.date}</p>
            <p>Temperature: ${day.temperature}°C</p>
            <p>Description: ${day.description}</p>
            <p>Humidity: ${day.humidity}%</p>
            <p>Wind Speed: ${day.windSpeed} m/s</p>
            <img src="${day.icon}" alt="Weather icon">
        `;
        forecastContainer.appendChild(dayElement);
    });
}

// Call getWeather function on page load
window.onload = () => {
    getWeather("New York"); // Default city
    getWeatherForecast("New York"); // Default city forecast
};

// Event listener for search button
document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    getWeather(city);
    getWeatherForecast(city);
});
