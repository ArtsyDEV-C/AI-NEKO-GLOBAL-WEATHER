// alerts.js - Send weather alerts to users

async function sendAlert(message) {
    try {
        // Send weather alert to the backend to trigger SMS
        const response = await fetch("/api/send-alert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        
        if (data.success) {
            alert("Alert sent successfully!");
        } else {
            alert("Failed to send alert.");
        }
    } catch (error) {
        console.error("Error sending alert:", error);
    }
}

// Event listener for send alert button
document.getElementById("send-alert-btn").addEventListener("click", () => {
    const message = document.getElementById("alert-message").value;
    sendAlert(message);
});

// Function to fetch weather data from the backend
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
        } else {
            alert("City not found.");
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

// Function to fetch weather forecast data from the backend
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

// Function to update the UI with the weather forecast
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

// Call getWeather and getWeatherForecast functions on page load
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
