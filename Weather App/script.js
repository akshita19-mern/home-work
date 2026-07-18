const apiURL = "weather.json";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

// Change Background According to Weather
function changeBackground(condition) {

    condition = condition.toLowerCase();

    if (condition.includes("sunny") || condition.includes("hot")) {

        document.body.style.background =
        "linear-gradient(135deg,#f6d365,#fda085)";

    }

    else if (condition.includes("rain")) {

        document.body.style.background =
        "linear-gradient(135deg,#4e54c8,#8f94fb)";

    }

    else if (condition.includes("cloud")) {

        document.body.style.background =
        "linear-gradient(135deg,#757F9A,#D7DDE8)";

    }

    else if (condition.includes("clear")) {

        document.body.style.background =
        "linear-gradient(135deg,#56CCF2,#2F80ED)";

    }

    else if (condition.includes("wind")) {

        document.body.style.background =
        "linear-gradient(135deg,#89F7FE,#66A6FF)";

    }

    else {

        document.body.style.background =
        "linear-gradient(135deg,#4facfe,#00c6ff,#43e97b)";

    }

}

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {

        document.getElementById("weather").innerHTML = "";

        document.getElementById("error").innerHTML =
        "⚠️ Please enter a city name";

        return;

    }

    try {

        const response = await fetch(apiURL);

        const data = await response.json();

        const result = data.find(item =>
            item.city.toLowerCase() === city.toLowerCase()
        );

        if (result) {

            changeBackground(result.condition);

            const now = new Date();

            // Current Date of Selected City
            const currentDate = now.toLocaleDateString("en-GB", {

                timeZone: result.timezone,

                day: "2-digit",

                month: "long",

                year: "numeric"

            });

            // Current Time of Selected City
            const currentTime = now.toLocaleTimeString("en-US", {

                timeZone: result.timezone,

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit",

                hour12: true

            });

            document.getElementById("weather").innerHTML = `

                <h2>📍 ${result.city}, ${result.country}</h2>

                <h1>${result.temperature}</h1>

                <h3>${result.condition}</h3>

                <hr>

                <p>💧 Humidity : ${result.humidity}</p>

                <p>🌬️ Wind : ${result.wind}</p>

                <p>👀 Visibility : ${result.visibility}</p>

                <p>🕒 Local Time : ${currentTime}</p>

                <p>📅 Date : ${currentDate}</p>

            `;

            document.getElementById("error").innerHTML = "";

        }

        else {

            document.getElementById("weather").innerHTML = "";

            document.getElementById("error").innerHTML =
            "❌ City not found";

        }

    }

    catch (error) {

        console.log(error);

        document.getElementById("weather").innerHTML = "";

        document.getElementById("error").innerHTML =
        "⚠️ Cannot load weather data";

    }

}