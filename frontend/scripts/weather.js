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

// Call getWeather function on page load
window.onload = () => {
    getWeather("New York"); // Default city
};

// Event listener for search button
document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    getWeather(city);
});
