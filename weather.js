const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Pastikan untuk menginstal dotenv di server Anda
    require('dotenv').config();

    // Dapatkan kota dari URL permintaan (misalnya: /api/weather?city=London)
    const { city } = req.query;
    
    // Gunakan token dari environment variable
    const apiKey = process.env.OPENWEATHER_API_KEY; 

    if (!city) {
        return res.status(400).send('City parameter is missing');
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Teruskan status response dari OpenWeatherMap
        res.status(response.status).json(data);

    } catch (error) {

        // Kirim error server jika terjadi masalah lain
        res.status(500).send('Server Error');
    }
};