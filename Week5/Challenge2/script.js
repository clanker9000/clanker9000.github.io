// DO NOT MODIFY THIS METHOD
//   Except if you need to modify the api_endpoint (e.g. using a different HTTP port such as 8888)
function get_all() {

    console.log("**** [START] get_all() *****");

    let api_endpoint = 'http://localhost/krazydating/api/profile/read.php';

    axios.get(api_endpoint).
    then(response => {
        // 1) Inspect response.data
        console.log(response.data);

        // 2) Populate result HTML
        populate_cards(response.data.records); // Array of profiles

    })
    .catch(error => {
        console.log(error.message);
    })

    console.log("**** [END] get_all() *****");
}


async function populate_cards(profile_array) {

    console.log("**** [START] populate_cards() *****");

    //============================================================================
    // Task 1
    // In this task, for convenience and simplicity, use Template Literals to
    //   craft a String that contains HTML code.
    // 
    // This means - you do NOT have to use create element, create text node,
    //   append child methods.
    //============================================================================


    // DO NOT MODIFY THIS
    const weather_api_key = 'd481d0d002d1b256c15fb1306774090a';
    
    let result_str = '';

    if (Array.isArray(profile_array) && profile_array.length > 0) {
        for (const p of profile_array) {
            const gender = (p.gender && String(p.gender).toLowerCase() === 'f') ? 'pink' : 'blue';
            const photo = p.photo_url
            const name = p.name;
            const occupation = p.occupation;
            const quote = p.quote;
            const age = p.age;
            const city = p.city;
            let temp = null;

            try {
                const weather_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_api_key}&units=metric`;
                const response = await axios.get(weather_api);
                temp = response.data.main.temp;
            } catch (error) {
                console.log(error.message);
            }

            result_str += `
            <div class="col">
                <div class="card h-100 ${gender}">
                    <span class="age-pill badge rounded-pill bg-warning text-black position-absolute top-0 end-0 m-2">${age}</span>
                    <img src="${photo}" class="card-img-top" alt="${name}">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <h6><span class="badge text-bg-info">${occupation}</span></h6>
                        <p class="card-text fst-italic">${quote}</p>
                        <p class="card-text">City: ${city}</p>
                        <p class="card-text">Temperature: ${temp}°C</p>
                    </div>
                </div>
            </div>
            `;
        };
    } else {
        result_str = `<div class="col-12"><p>No profiles found.</p></div>`;
    }

    // DO NOT MODIFY THIS LINE (USE THIS AS IS)
    document.getElementById('my-cards').innerHTML = result_str;

    console.log("**** [END] populate_cards() *****");
}


// Parameter gender can take on the value of:
//   'f' for females
//   'm' for males
function get_by_gender(gender) {
    console.log("**** [START] get_by_gender() *****");

    //============================================================================
    // Task 2
    // In this task, use Axios to make an asynchronous API call.
    // Go to the Krazy Dating API documentation and find out which API endpoint
    //   is the most suitable one to use in this case.
    // Make use of the code from get_all() function.
    //============================================================================

    // YOUR CODE GOES HERE
    let api_endpoint = `http://localhost/krazydating/api/profile/search.php?g=${gender}`;


    axios.get(api_endpoint).
    then(response => {
        // 1) Inspect response.data
        console.log(response.data);

        // 2) Populate result HTML
        populate_cards(response.data.records); // Array of profiles

    })
    .catch(error => {
        console.log(error.message);
    })

    console.log("**** [END] get_by_gender() *****");
}

// Task 3
window.onload = function() {
    get_all();
};