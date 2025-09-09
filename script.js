document.addEventListener('DOMContentLoaded', function() {
    // Replace with your actual API key from OpenWeatherMap
    const apiKey = "7a2109316f28378cf5bd8fbb9fadcd05";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city) {
        // Fetch weather data from the API
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        // Handle errors if the city is not found
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
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
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";

            // Add this line inside the checkWeather function, after other updates
            document.querySelector(".description").innerHTML = data.weather[0].description;
        }
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