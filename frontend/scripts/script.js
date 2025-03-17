// script.js - Handles Dynamic Weather UI Changes

// Weather condition mapping to assets (videos, images, audio)
const weatherAssets = {
    "Clear": {
        "day": { video: "videos/sunny/sunny-day-cat.mp4", image: "images/clear/clear-day.jpg", music: "music/sunny.mp3" },
        "evening": { video: "videos/sunny/sunny-evening-cat.mp4", image: "images/clear/clear-evening.jpg", music: "music/sunny.mp3" },
        "night": { video: "videos/sunny/sunny-night-cat.mp4", image: "images/clear/clear-night.jpg", music: "music/sunny.mp3" }
    },
    "Clouds": {
        "day": { video: "videos/cloudy/cloudy-day-cat.mp4", image: "images/cloudy/cloudy-day.jpg", music: "music/cloudy.mp3" },
        "evening": { video: "videos/cloudy/cloudy-evening-cat.mp4", image: "images/cloudy/cloudy-evening.jpg", music: "music/cloudy.mp3" },
        "night": { video: "videos/cloudy/cloudy-night-cat.mp4", image: "images/cloudy/cloudy-night.jpg", music: "music/cloudy.mp3" }
    },
    "Rain": {
        "day": { video: "videos/rainy/rainy-day-cat.mp4", image: "images/rain/rainy-day.jpg", music: "music/rain.mp3" },
        "evening": { video: "videos/rainy/rainy-evening-cat.mp4", image: "images/rain/rainy-evening.jpg", music: "music/rain.mp3" },
        "night": { video: "videos/rainy/rainy-night-cat.mp4", image: "images/rain/rainy-night.jpg", music: "music/rain.mp3" }
    },
    "Thunderstorm": {
        "day": { video: "videos/thunderstorm/thunderstorm-day-cat.mp4", image: "images/thunderstorm/thunderstorm-day.jpg", music: "music/thunderstorm.mp3" },
        "evening": { video: "videos/thunderstorm/thunderstorm-evening-cat.mp4", image: "images/thunderstorm/thunderstorm-evening.jpg", music: "music/thunderstorm.mp3" },
        "night": { video: "videos/thunderstorm/thunderstorm-night-cat.mp4", image: "images/thunderstorm/thunderstorm-night.jpg", music: "music/thunderstorm.mp3" }
    },
    "Snow": {
        "day": { video: "videos/snowy/snowy-day-cat.mp4", image: "images/snowy/snowy-day.jpg", music: "music/snow.mp3" },
        "evening": { video: "videos/snowy/snowy-evening-cat.mp4", image: "images/snowy/snowy-evening.jpg", music: "music/snow.mp3" },
        "night": { video: "videos/snowy/snowy-night-cat.mp4", image: "images/snowy/snowy-night.jpg", music: "music/snow.mp3" }
    }
};

// Function to fetch weather and update UI dynamically
async function fetchWeather(city) {
    try {
        const apiKey = "YOUR_OPENWEATHER_API_KEY"; // Replace with your OpenWeather API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found. Please try again.");
            return;
        }

        // Get weather condition
        let condition = data.weather[0].main; // Example: "Clear", "Rain", "Clouds"
        let time = getTimeOfDay(); // Get current time (day, evening, night)

        // Update UI based on condition
        updateWeatherUI(condition, time);

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to determine time of day
function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) return "day";
    else if (hour >= 18 && hour < 21) return "evening";
    else return "night";
}

// Function to update the UI dynamically
function updateWeatherUI(condition, time) {
    const videoElement = document.getElementById("weather-video");
    const backgroundElement = document.body;
    const audioElement = document.getElementById("background-audio");

    if (weatherAssets[condition] && weatherAssets[condition][time]) {
        // Set video, background image, and music
        videoElement.src = weatherAssets[condition][time].video;
        backgroundElement.style.backgroundImage = `url('${weatherAssets[condition][time].image}')`;
        audioElement.src = weatherAssets[condition][time].music;

        // Play video and audio
        videoElement.play();
        audioElement.play();
    } else {
        console.warn("Weather condition not found in assets:", condition);
    }
}

// Event listener for search button
document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    fetchWeather(city);
});

// Auto-fetch weather for default city on page load
window.onload = () => {
    fetchWeather("New York"); // Default city
};
