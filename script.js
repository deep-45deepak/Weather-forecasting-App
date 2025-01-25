// Some styling for the body tag.

// Get the root element of the document
const root = document.documentElement;

// Define CSS variables using JavaScript
root.style.setProperty('--secondary-color', '#f0f0f0'); 
root.style.setProperty('--text-color', '#333'); 

// Apply styles to the body
document.body.style.fontFamily = '"Baloo Bhai 2", "Roboto", sans-serif';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.backgroundColor = 'var(--secondary-color)';
document.body.style.color = 'var(--text-color)';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.minHeight = '100vh';


//  Programming logic starts from here

document.addEventListener('DOMContentLoaded', () => {
    const stringFor = process.env.API_KEY;
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    function substring(input) { return input.replace(/dp/g, ''); }
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
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
        console.log(typeof response);
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
