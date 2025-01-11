document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    function substring(input) { return input.replace(/dp/g, ''); }
    const stringFor = "2b2edp3cdp6305440dp2f490cccc2dpc2d3dp7ff9d";
    const description = document.getElementById("description");
    const errorMsg = document.getElementById("error-message");
    const weatherIcon = document.getElementById("weather-icon");
    const showTime = document.getElementById("time");

    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!city) return;
        // it may throw and error
        // server and database is always in another continent
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
            console.log(error);
        }
    });

    async function fetchWeatherData(city) {
        // get the weather data.
        const url = `http://api.weatherstack.com/current?access_key=${substring(stringFor)}&query=${city}`;
        const response = await fetch(url);
        // console.log(typeof response);
        // console.log('RESPONSE', response);
        if (!response.ok) {
            throw new Error("City not found.");
        }
        const data = await response.json();
        return data;
    }
    function displayWeatherData(data) {
        // display data.
        // console.log(data);
        // Destructuring the object.
        const { current, location, request } = data;
        // Add the destructured data.
        cityName.innerText = location.name;
        // add temperature.
        temperature.innerText = `Temperature is : ${current.temperature} °C`;
        // add description.
        description.innerText = `Weather is : ${current.weather_descriptions[0]}`;
        // add weather icon.
        weatherIcon.setAttribute("src", `${current.weather_icons[0]}`,
            'style', 'border-radius:2em;');
        // add time of the weather.
        showTime.innerText = `Observation time is : ${current.observation_time}`;
        // Remove the hidden class
        weatherInfo.classList.remove("hidden");
    };
    function showError() {
        weatherInfo.classList.add("hidden");
        errorMsg.classList.remove('hidden');
    }

});