exports.getIndustryWeatherData = (req, res) => {
    const { industry } = req.query;

    // Simulate fetching industry-specific weather data
    const industryData = getIndustryData(industry);

    if (industryData) {
        res.json({
            success: true,
            analytics: industryData
        });
    } else {
        res.json({ success: false });
    }
};

function getIndustryData(industry) {
    const data = {
        agriculture: {
            industry: "Agriculture",
            averageTemperature: 25,
            rainfall: 1200,
            windSpeed: 15,
            recommendedActions: "Plant crops that thrive in moderate temperatures."
        },
        logistics: {
            industry: "Logistics",
            averageTemperature: 30,
            rainfall: 800,
            windSpeed: 20,
            recommendedActions: "Optimize delivery routes based on weather forecasts."
        },
        tourism: {
            industry: "Tourism",
            averageTemperature: 28,
            rainfall: 1000,
            windSpeed: 10,
            recommendedActions: "Encourage outdoor activities during dry periods."
        },
        construction: {
            industry: "Construction",
            averageTemperature: 32,
            rainfall: 500,
            windSpeed: 25,
            recommendedActions: "Schedule construction work in cooler months."
        }
    };

    return data[industry];
}
