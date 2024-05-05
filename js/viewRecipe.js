document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const recipeId = urlParams.get('id');

    if (recipeId) {
        fetchRecipeDetails(recipeId);
    } else {
        redirectToMainPage();
    }
});

async function fetchRecipeDetails(recipeId) {
    const apiKey = '728537f2fcb84a238aa357fbc14640d6';
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayRecipeDetails(data);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        alert('Failed to fetch recipe details. Please try again later.');
    }
}

function displayRecipeDetails(recipe) {
    const recipeTitle = document.getElementById('recipeTitle');
    const recipeImage = document.getElementById('recipeImage');
    const ingredientList = document.getElementById('ingredientList');
    const recipeInstructions = document.getElementById('recipeInstructions');

    recipeTitle.textContent = recipe.title;
    recipeImage.src = recipe.image;

    // Display ingredients
    recipe.extendedIngredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = `${ingredient.original}`;
        ingredientList.appendChild(listItem);
    });

    // Display instructions
    if (recipe.instructions) {
        const instructions = recipe.instructions.split('\n');
        let instructionsText = '';
        instructions.forEach(step => {
            if (step.trim() !== '') {
                instructionsText += `${step.trim()}\n`;
            }
        });
        recipeInstructions.textContent = instructionsText.trim();
    } else {
        recipeInstructions.textContent = 'Instructions not available.';
    }
}
