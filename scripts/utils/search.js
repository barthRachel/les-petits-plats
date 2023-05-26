let model = new Model();
let recipeView = new RecipesView();

async function searchWithBar(){
    //console.log("Ouaiiiis")
    let sortByTitle, sortByDesc, sortByIngr;
    let finalSort = new Set()
    if(document.querySelector('.searchbar-input').value.length >= 3) {
        sortByTitle = await getRecipeByTitle(document.querySelector('.searchbar-input').value.toLowerCase())
        sortByDesc = await getRecipeByDesc(document.querySelector('.searchbar-input').value.toLowerCase())
        sortByIngr = await getRecipeByIngr(document.querySelector('.searchbar-input').value.toLowerCase())
        
        sortByTitle.forEach(recipe => {
            finalSort.add(recipe)
        });
        sortByDesc.forEach(recipe => {
            finalSort.add(recipe)
        });
        sortByIngr.forEach(recipe => {
            finalSort.add(recipe)
        })

        
        
        recipeView.displayRecipes(finalSort)
    } else {
        recipeView.displayRecipes(await model.getRecipes())
    }

    console.log(finalSort)
    //console.log(sortByTitle)
    //console.log(sortByDesc)
    //console.log(sortByIngr)
    //console.log(document.querySelector('.searchbar-input').value)
}

async function getRecipeByTitle(titleNeeded) {
    const allRecipes = await model.getRecipes();
    let recipesByName = new Set();

    allRecipes.forEach(recipe => {
        if(recipe.name.toLowerCase().includes(titleNeeded)){
            recipesByName.add(recipe)
        }
    });

    return(recipesByName)
}

async function getRecipeByDesc(wordNeeded) {
    const allRecipes = await model.getRecipes();
    let recipesByDesc = new Set();

    allRecipes.forEach(recipe => {
        if(recipe.description.toLowerCase().includes(wordNeeded)){
            recipesByDesc.add(recipe)
        }
    });

    return(recipesByDesc)
}

async function getRecipeByIngr(ingredientNeeded) {
    const allRecipes = await model.getRecipes();
    let recipesByIng = new Set();

    for (const recipe of allRecipes) {
        for (const ingredient of recipe.ingredients) {
            if(ingredient.ingredient.toLowerCase().includes(ingredientNeeded)){
                recipesByIng.add(recipe)
            }
        }
    }

    return(recipesByIng)
}

//window.onload = function () {
    /*let articles = document.querySelectorAll('.recipe');
    console.log(articles.length)*/

    let searchbarInput = document.querySelector('.searchbar-input');
    let searchButton = document.querySelector('.search-button');
    //console.log(searchbarInput)
    //console.log(searchButton);

    searchbarInput.addEventListener('keyup', searchWithBar); //event se déclenche quand on tape sur une touche
//}

//getRecipeByTitle('test')

