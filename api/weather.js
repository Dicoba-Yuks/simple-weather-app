// File: api/weather.js

// fetch is now native to Node.js, so we don't need to require it.
module.exports = async (req, res) => {
    const { city } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    // Check if API Key is configured
    if (!apiKey) {
        return res.status(500).json({ message: "API key is not configured on the server." });
    }

    if (!city) {
        return res.status(400).send('City parameter is missing');
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        
        // Handle 404 (City not found) from OpenWeatherMap
        if (response.status === 404) {
             return res.status(404).json({ message: "Invalid city name or city not found." });
        }

        const data = await response.json();
        
        // Forward the successful response
        res.status(200).json(data);

    } catch (error) {
        // Catch any network or other unexpected errors
        res.status(500).json({ message: "Server Error during fetch operation.", error: error.message });
    }
};
