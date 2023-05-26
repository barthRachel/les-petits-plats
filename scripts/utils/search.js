let model = new Model();
let recipeView = new RecipesView();

async function searchWithBar(){
    if(document.querySelector('.searchbar-input').value.length >= 3) {
        let finalSort = finalSortSet(await getRecipeByTitle(document.querySelector('.searchbar-input').value.toLowerCase()), await getRecipeByDesc(document.querySelector('.searchbar-input').value.toLowerCase()), await getRecipeByIngr(document.querySelector('.searchbar-input').value.toLowerCase()))
        
        recipeView.displayRecipes(finalSort)
        if(finalSort.size == 0) {
            recipeView.displayNoResults()
        }
    } else {
        recipeView.displayRecipes(await model.getRecipes())
    }

    //console.log(finalSort)
}

//Fonction pour trier et supprimer les recettes doublons dans les différents tri fait
function finalSortSet(sortByTitle = null, sortByDesc = null, sortByIngr = null, sortByAppliance = null, sortByUstensils = null) {
    let finalSort = new Set();

    if(sortByTitle != null) {
        sortByTitle.forEach(recipe => {
            finalSort.add(recipe)
        });
    }
    if(sortByDesc != null) {
        sortByDesc.forEach(recipe => {
            finalSort.add(recipe)
        }); 
    }
    if(sortByIngr != null) {
        sortByIngr.forEach(recipe => {
            finalSort.add(recipe)
        })
    }
    if(sortByAppliance != null) {
        sortByAppliance.forEach(recipe => {
            finalSort.add(recipe)
        })
    }
    if(sortByUstensils != null) {
        sortByUstensils.forEach(recipe => {
            finalSort.add(recipe)
        })
    }

    return(finalSort)
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


let searchbarInput = document.querySelector('.searchbar-input');
let searchButton = document.querySelector('.search-button');

searchbarInput.addEventListener('keyup', searchWithBar); //event se déclenche quand on tape sur une touche
searchButton.addEventListener('click', searchWithBar);

