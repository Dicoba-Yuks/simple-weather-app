document.addEventListener('DOMContentLoaded', function() {

    // URL ini sekarang akan mengarah ke server proxy Anda
    // Contoh: URL dari Vercel/Netlify Functions, atau server Express lokal
    const proxyUrl = "/api/weather?city=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");
    const errorDisplay = document.querySelector(".error");
    const weatherDisplay = document.querySelector(".weather");

    async function checkWeather(city) {
        // Fetch weather data from the API
        const response = await fetch(proxyUrl + city);

        // Handle errors if the city is not found
        if (!response.ok) { 
            errorDisplay.style.display = "block";
            weatherDisplay.style.display = "none";
            return; // Hentikan eksekusi lebih lanjut
        }

        const data = await response.json();

        // Update the HTML elements with the new data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".description").innerHTML = data.weather[0].description;

        // Change the weather icon based on weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }

        // Show the weather info section
        weatherDisplay.style.display = "block";
        errorDisplay.style.display = "none";
    }

    // Add event listener to the search button
    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });

    // Add event listener for "Enter" key press
    searchBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            checkWeather(searchBox.value);
        }
    });
});