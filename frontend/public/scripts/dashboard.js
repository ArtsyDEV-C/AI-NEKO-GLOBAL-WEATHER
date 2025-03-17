document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');
    const userData = await fetchUserData(token);

    document.getElementById("user-name").innerText = userData.name;
    document.getElementById("user-email").innerText = userData.email;

    // Fetch user preferences (e.g., preferred unit)
    const userPreferences = await fetchUserPreferences(token);
    document.getElementById("preferred-unit").innerText = userPreferences.unit;
    document.getElementById("weather-unit").innerText = userPreferences.unit;

    // Fetch weather data
    const weatherData = await fetchWeatherData(userData.city, userPreferences.unit);
    document.getElementById("weather-city").innerText = userData.city;
    document.getElementById("weather-temp").innerText = weatherData.temperature;
    document.getElementById("weather-desc").innerText = weatherData.description;

    // Fetch weather alerts
    const weatherAlerts = await fetchWeatherAlerts(userData.city);
    const alertsList = document.getElementById("alerts-list");
    weatherAlerts.forEach(alert => {
        const listItem = document.createElement("li");
        listItem.innerText = alert;
        alertsList.appendChild(listItem);
    });
});

// Fetch user data (simulate an API call)
async function fetchUserData(token) {
    document.getElementById("loading-indicator").style.display = "block";
    // Simulate fetching user data
    await new Promise(resolve => setTimeout(resolve, 2000));
    document.getElementById("loading-indicator").style.display = "none";
    return {
        name: "John Doe",
        email: "john.doe@example.com",
        city: "New York"
    };
}

// Fetch user preferences (simulate an API call)
async function fetchUserPreferences(token) {
    // Simulate fetching user preferences
    return {
        unit: "C"
    };
}

// Fetch weather data (simulate an API call)
async function fetchWeatherData(city, unit) {
    // Simulate fetching weather data
    return {
        temperature: 25,
        description: "Sunny"
    };
}

// Fetch weather alerts (simulate an API call)
async function fetchWeatherAlerts(city) {
    // Simulate fetching weather alerts
    return [
        'Thunderstorm warning',
        'Flood alert'
    ];
}