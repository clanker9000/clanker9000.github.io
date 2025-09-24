const weather_type_images = {
    "Clear": "images/clear.jpg",
    "Clouds": "images/clouds.jpg",
    "Haze": "images/haze.jpg",
    "Mist": "images/mist.jpg",
    "Rain": "images/rain.jpg",
    "Smoke": "images/smoke.jpg",
    "Snow": "images/snow.jpg",
    "Thunderstorm": "images/thunderstorm.jpg"
};

const temp_images = {
    "Hot": "images/hot.jpg",   // Celsius > 25
    "Okay": "images/okay.jpg", // Celsius 5-25
    "Cold": "images/cold.jpg"  // Celsius < 5
};


// DO NOT CHANGE THE FUNCTION SIGNATURE
function check_weather() {

    console.log("=== [START] check_weather() ===");

    //============================================================================
    // Task 1
    // Key in your own OpenWeatherMap.org API key (DO NOT SHARE IT WITH OTHERS)
    //============================================================================
    const weather_api_key = 'd481d0d002d1b256c15fb1306774090a';


    //============================================================================
    // Task 2
    // Retrieve the user input (city name) from <input>
    //============================================================================
    const city = document.getElementById('city').value;


    // DO NOT MODIFY THIS
    let api_endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_api_key}&units=metric`;


    axios.get(api_endpoint)
    .then(response => {
        // Inspect what's in the API response
        console.log(response.data);


        //============================================================================
        // Task 3
        // Retrieve the weather info (e.g. Rain, Clouds, etc.)
        //============================================================================
        
        // YOUR CODE GOES HERE
        // Make use of const weather_type_images (at the top)

        const temp = response.data.main.temp;
        const weatherArray = response.data.weather;
        console.log(temp); console.log(weatherArray);
        
        const weatherImagesDiv = document.getElementById('weather_images');
        weatherImagesDiv.innerHTML = '';

        if (Array.isArray(weatherArray) && weatherArray.length > 0) {
            weatherArray.forEach(w => {
                const main = w.main;
                const src = weather_type_images[main] || "images/question.jpg";
                const p = document.createElement('p');
                const img = document.createElement('img');
                img.src = src;
                p.appendChild(img);
                weatherImagesDiv.appendChild(p);
            });
        } else {
            const p = document.createElement('p');
            const img = document.createElement('img');
            img.src = "images/question.jpg";
            p.appendChild(img);
            weatherImagesDiv.appendChild(p);
        }


        //======================================================================================
        // Task 4
        // Perform JavaScript DOM to reflect weather info and temperature info in the HTML page.
        //======================================================================================

        // YOUR CODE GOES HERE
        // Make use of const temp_images (at the top)

        let tempCategory = (temp > 25) ? "Hot" : (temp >= 5 ? "Okay" : "Cold");
        const tempSrc = temp_images[tempCategory] || "images/question.jpg";
        const temperatureImage = document.getElementById('temperature_image');
        temperatureImage.src = tempSrc;
        
    })
    .catch(error => {
        console.log(error.message);
    })
    
    console.log("=== [END] check_weather() ===");
}
