const apiKey = "144f290761e76bb34156a51a004b52e6"; 
const city = "Surat";

async function getTemperature() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        const data = await response.json();

        const temp = Math.round(data.main.temp);
        const cityName = data.name;

        document.querySelector(".temp-badge").innerText = `${cityName} • ${temp}°C`;

    } catch (error) {
        console.log(error);
        document.querySelector(".temp-badge").innerText = "Temp not available";
    }
}

getTemperature();