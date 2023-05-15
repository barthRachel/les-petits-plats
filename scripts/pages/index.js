async function getRecipes() {
    let data = await fetch('data/recipes.json');
    let dataJson = await data.json();
    let recipes = dataJson.recipes;

    console.log({recipes: [...recipes]});
    return({recipes: [...recipes]});
};

async function displayRecipes(recipes) {
    const recipeSection = document.querySelector('.recipe_section');

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipeSection.appendChild(recipeCardDOM);
    });
}

async function init() {
    const {recipes} = await getRecipes();
    displayRecipes(recipes);
};

init();