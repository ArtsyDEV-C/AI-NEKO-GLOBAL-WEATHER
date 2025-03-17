// traffic.js - Fetch and display traffic data on the frontend

async function getTrafficData(lat, lon) {
    try {
        const response = await fetch(`/api/traffic/data?lat=${lat}&lon=${lon}`);
        const data = await response.json();

        if (data.status === 'OK') {
            // Update UI with fetched traffic data
            document.getElementById("traffic-info").innerText = JSON.stringify(data, null, 2);
        } else if (data.status === 'INVALID_COORDINATES') {
            alert("Invalid coordinates provided.");
        } else {
            alert("Unable to fetch traffic data.");
        }
    } catch (error) {
        console.error("Error fetching traffic data:", error);
        document.getElementById("traffic-info").innerText = "Error fetching traffic data.";
    }
}

// Example usage: Fetch traffic data for a specific location
getTrafficData(51.505, -0.09); // Default location (London)
