const axios = require('axios');

exports.getOptimizedRoute = async (req, res) => {
    const { start, destination } = req.query; // Get start and destination from query

    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Ensure this key is in your .env file
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${destination}&key=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
            const optimizedRoute = data.routes[0].overview_polyline.points;
            res.json({ route: optimizedRoute });
        } else {
            res.status(400).json({ error: 'Unable to optimize route' });
        }
    } catch (error) {
        console.error("Error fetching optimized route:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
