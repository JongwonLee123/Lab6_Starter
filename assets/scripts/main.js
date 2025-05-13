// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
    // Get the recipes from localStorage
    let recipes = getRecipesFromStorage();
    // Add each recipe to the <main> element
    addRecipesToDocument(recipes);
    // Add the event listeners to the form elements
    initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
    // A9.
    return JSON.parse(localStorage.getItem("recipes")) || [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
    // A10. TODO - Get a reference to the <main> element
    const main_element = document.querySelector("main");
    // A11. TODO - Loop through each of the recipes in the passed in array,
	//            create a <recipe-card> element for each one, and populate
	//            each <recipe-card> with that recipe data using element.data = ...
	//            Append each element to <main>
    recipes.forEach((recipe) => {
        const recipe_card = document.createElement("recipe-card");
        recipe_card.data = recipe;
        main_element.append(recipe_card);
    });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
    // B1. TODO - Complete the functionality as described in this function
	//            header. It is possible in only a single line, but should
	//            be no more than a few lines.
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
    // B2. Get a reference to the <form> element
    const form_element = document.querySelector("form");
    if (!form_element) {
        console.error("Form element not found.");
        return;
    }

    // B3. Add an event listener for the 'submit' event
    form_element.addEventListener("submit", (event) => {
        event.preventDefault();

        // B4. Create a new FormData object from the <form> element
        const form_data = new FormData(form_element);

        // B5. Create an empty object and populate it with key-value pairs from FormData
        const recipe_object = {};
        form_data.forEach((value, key) => {
            recipe_object[key] = value;
        });

        // B6. Create a new <recipe-card> element
        const recipe_card = document.createElement("recipe-card");

        // B7. Add the recipeObject data to <recipe-card> using element.data
        recipe_card.data = recipe_object;

        // B8. Append this new <recipe-card> to <main>
        const main_element = document.querySelector("main");
        main_element.append(recipe_card);

        // B9. Get the recipes array from localStorage, add this new recipe to it, and save it back
        let recipes = getRecipesFromStorage();
        recipes.push(recipe_object);
        saveRecipesToStorage(recipes);
    });

    // B10. Get a reference to the "Clear Local Storage" button
    const clear_button = document.querySelector(".danger");
    if (!clear_button) {
        console.error("Clear storage button not found.");
        return;
    }

    // B11. Add a click event listener to the clear storage button
    clear_button.addEventListener("click", () => {
        // B12. Clear the local storage
        localStorage.clear();

        // B13. Delete the contents of <main>
        const main_element = document.querySelector("main");
        main_element.innerHTML = "";
    });
}