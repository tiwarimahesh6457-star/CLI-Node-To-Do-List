import readline from 'readline';

const apiKey = 'ce67c8f281114afea7282333251310';
const  Base_url = 'https://www.weatherapi.com';

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

const getWeather = async (city) => {
    const url = `${Base_url}?=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new error('City not found.Please check the city name')
        }
        const weatherData = await response.json();   

            console.log(WeatherData)

            console.log('Wheather Information:');
            console.log(`City:{weatherData.name}`);
            console.log(`Temperature:${weatherData.main.temp}C`);
            console.log(`Description:${weatherData.weather[0].description}`);
            console.log(`Humidity:${weatherData.main.humidity}%`);
            console.log(`Wind speed:${weatherData.wind.speed} m/s\n`);
            
    } 
        catch (error) {
        console.log(error)
    }
}

const city = await rl.question('Enter a city name to get its wheather:');
await getWheather(city);
rl.close();