const axios = require('axios');

exports.getTrafficData = async (req, res) => {
    const { lat, lon } = req.query; // Get latitude and longitude from query

    try {
        const apiKey = process.env.TRAFFIC_API_KEY; // Ensure this key is in your .env file
        const url = `https://api.trafficservice.com/data?lat=${lat}&lon=${lon}&key=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
            res.json(data);
        } else {
            res.status(400).json({ error: 'Unable to fetch traffic data' });
        }
    } catch (error) {
        console.error("Error fetching traffic data:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
