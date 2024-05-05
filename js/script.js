async function searchRecipes() {
    const ingredientInput = document.getElementById('ingredientInput').value.trim();
    if (!ingredientInput) {
        alert('Please enter ingredients');
        return;
    }

    const apiKey = '728537f2fcb84a238aa357fbc14640d6';
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientInput}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayRecipes(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch recipes. Please try again later.');
    }
}

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt = recipe.title;

        const title = document.createElement('h2');
        title.textContent = recipe.title;

        const viewRecipeLink = document.createElement('a');
        viewRecipeLink.textContent = 'View Recipe';
        viewRecipeLink.href = `./view/view.html?id=${recipe.id}`; // Redirect to viewRecipe.html with recipe ID as query parameter
        viewRecipeLink.style.color = recipe.sourceUrl ? '#000' : '#999'; // Change link color to indicate availability

        recipeCard.appendChild(image);
        recipeCard.appendChild(title);
        recipeCard.appendChild(viewRecipeLink);

        recipeContainer.appendChild(recipeCard);
    });
}


