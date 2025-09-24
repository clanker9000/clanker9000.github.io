/* Task 6 - API call */
function get_all_drinks() {
    console.log("[START] get_all_drinks()");

    const api_endpoint_url = 'http://localhost/DrinksAPI/api/drink/read.php'; // local file

    axios.get(api_endpoint_url).
    then(response => {
        console.log("Axios call completed successfully!");

        let section_results = document.getElementById('results');

        // Build a string of Bootstrap cards
        let result_str = ``;
        let drinks_array = response.data.records; // Array of drink objects
        console.log(drinks_array); // Array of drink objects

        // Task 4 - Display Drinks
        //   Each drink is a Bootstrap card
        // Replace all the hard-coded strings with actual values as read from the JSON file
        for(let drink of drinks_array) {
            result_str += `
                <div class="col">
                    <div class="card h-100">
                        <img src="/DrinksAPI/${drink.photo_url}" 
                             class="card-img-top"
                             alt="${drink.name}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${drink.name}
                            </h5>
                            <p class="card-text small text-muted mb-0">
                                ${drink.category} •
                                ${drink.alcoholic}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }

        section_results.innerHTML = result_str;
    }).
    catch(error => {
        console.log(error.message);

        // Task 5 - Data can't be loaded, display alert
        //   "Failed to load drinks data."
        const results = document.getElementById('results');
        results.innerHTML = '<div class="alert alert-danger w-100">Failed to load drinks data.</div>';
    });

    console.log("[END] get_all_drinks()");
}


/* Task 7 - Category Dropdown Menu */
function populate_category_dropdown() {
    console.log("[START] populate_category_dropdown()");

    const api_endpoint_url = 'http://localhost/DrinksAPI/api/drink/category.php'; // API endpoint

    axios.get(api_endpoint_url).
    then(response => {

        console.log("Axios call completed successfully!");

        // YOUR CODE GOES HERE
        let category_array = response.data.records;
        const categoryDropdown = document.getElementById('category');

        for (let category of category_array) {
            let option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryDropdown.appendChild(option);
        }

    }).
    catch(error => {
        console.log(error.message);
    });

    console.log("[END] populate_category_dropdown()");
}


/* Task 8 - Category Dropdown Event Listener */
/* Task 9 - Alcoholic Dropdown Event Listener */
/* Task 10 - Name search input Event Listener */

function get_drinks_filtered(category = '', alcoholic = '', name = '') {
    console.log(`[START] get_drinks_filtered(category=${category}, alcoholic=${alcoholic}), name=${name})`);

    let api_endpoint_url = 'http://localhost/DrinksAPI/api/drink/search.php?';

    const params = new URLSearchParams();
    if (category) params.append('c', category);
    if (alcoholic) params.append('a', alcoholic);
    if (name) params.append('n', name);

    api_endpoint_url += params.toString();

    axios.get(api_endpoint_url)
    .then(response => {
        console.log("Axios call completed successfully!");

        let section_results = document.getElementById('results');

        let drinks_array = response.data.records;
        console.log(drinks_array);

        let result_str = ``;
        for(let drink of drinks_array) {
            result_str += `
                <div class="col">
                    <div class="card h-100">
                        <img src="/DrinksAPI/${drink.photo_url}" 
                             class="card-img-top"
                             alt="${drink.name}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${drink.name}
                            </h5>
                            <p class="card-text small text-muted mb-0">
                                ${drink.category} •
                                ${drink.alcoholic}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }
        section_results.innerHTML = result_str;
    })
    .catch(error => {
        console.log(error.message);
        const results = document.getElementById('results');
        results.innerHTML = '<div class="alert alert-danger w-100">Failed to load drinks data.</div>';
    });

    console.log(`[END] get_drinks_filtered()`);
}

const categorySelect = document.getElementById('category');
const alcoholicSelect = document.getElementById('alcoholic');
const nameSearch = document.getElementById('name_search');

function handleFilterChange() {
    const selectedCategory = categorySelect.value; 
    const selectedAlcoholic = alcoholicSelect.value;
    const selectedName = nameSearch.value;

    if (!selectedCategory && !selectedAlcoholic && !selectedName) {
        get_all_drinks();
    } else {
        get_drinks_filtered(selectedCategory, selectedAlcoholic, selectedName);
    }
}

categorySelect.addEventListener('change', handleFilterChange);
alcoholicSelect.addEventListener('change', handleFilterChange);
nameSearch.addEventListener('change', handleFilterChange);





// DO NOT MODIFY THE BELOW LINES
get_all_drinks();
populate_category_dropdown();