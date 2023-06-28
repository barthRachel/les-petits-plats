//accès aux données 
class Model{
    constructor() {
        this.recipes = null;
    }

    async getRecipes() {
        if(this.recipes == null) {
            let data = await fetch('data/recipes.json');
            let dataJson = await data.json();
            this.recipes = dataJson.recipes;
        }

        return(this.recipes);
    };

    async getIngredients(listRecipe = null) { //tout les ingr d'une liste de recette
        if(listRecipe == null){
            listRecipe = await this.getRecipes();
        }
        let allIngredient = new Set();
        for (const recipe of listRecipe) {
            for (const ingredient of recipe.ingredients) {
                allIngredient.add(ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1))
            }
        }
        return(allIngredient);
    }

    async getUstensils(listRecipe = null) { //tout les ustensiles d'une liste de recette
        if(listRecipe == null){
            listRecipe = await this.getRecipes();
        }
        let allUstensil = new Set();
        for (const recipe of listRecipe) {
            for (const ustensil of recipe.ustensils) {
                allUstensil.add(ustensil.charAt(0).toUpperCase() + ustensil.slice(1));
            }
        }
        return(allUstensil)
    }

    async getAppliance(listRecipe = null) { //tout les appareils d'une liste de recette
        if(listRecipe == null) {
            listRecipe = await this.getRecipes();
        }
        let allAppliance = new Set();
        for (const appliance of listRecipe) {
            allAppliance.add(appliance.appliance.charAt(0).toUpperCase() + appliance.appliance.slice(1))
        }
        return(allAppliance)
    }

    /*async getRecipeByTitle(titleNeeded) {
        const allRecipes = await this.getRecipes();
        let recipesByName = new Set();
    
        allRecipes.forEach(recipe => {
            if(recipe.name.toLowerCase().includes(titleNeeded)){
                recipesByName.add(recipe)
            }
        });
    
        return(recipesByName)
    }
    
    async getRecipeByDesc(wordNeeded) {
        const allRecipes = await this.getRecipes();
        let recipesByDesc = new Set();
    
        allRecipes.forEach(recipe => {
            if(recipe.description.toLowerCase().includes(wordNeeded)){
                recipesByDesc.add(recipe)
            }
        });
    
        return(recipesByDesc)
    }
    
    async getRecipeByIngr(ingredientNeeded) {
        const allRecipes = await this.getRecipes();
        let recipesByIng = new Set();
    
        for (const recipe of allRecipes) {
            for (const ingredient of recipe.ingredients) {
                if(ingredient.ingredient.toLowerCase().includes(ingredientNeeded)){
                    recipesByIng.add(recipe)
                }
            }
        }
    
        return(recipesByIng)
    }*/

    getBrowseList(wordSearched, allRecipes) {
        //const allRecipes = await this.getRecipes();
        console.log(allRecipes)
        //console.log(wordSearched)
        let finalSort = new Set();
        allRecipes.forEach(recipe => {
            if(recipe.name.toLowerCase().includes(wordSearched)){
                finalSort.add(recipe)
            } else if(recipe.description.toLowerCase().includes(wordSearched)){
                finalSort.add(recipe)
            } else {
                (recipe.ingredients).forEach(ing => {
                    if(ing.ingredient.toLowerCase().includes(wordSearched)){
                        finalSort.add(recipe)
                    }
                })
            }
        })
        //console.log(finalSort)
        return(finalSort)
    }

    getBrowseListForSpecificSort(whichbar, wordSearched, allRecipes) {
        let finalSortIngredient = new Set();
        let finalSortAppliance = new Set();
        let finalSortUstensils = new Set();
        let allRecipesNeeded = new Set();

        if(wordSearched !== ""){
            if(whichbar == "ingredient"){
                allRecipes.forEach(recipe => {
                    recipe.ingredients.forEach(ingredient => {
                        if(ingredient.ingredient.toLowerCase().includes(wordSearched)){
                            finalSortIngredient.add(ingredient.ingredient)
                            finalSortAppliance.add(recipe.appliance)
                            recipe.ustensils.forEach(ustensil => {
                                finalSortUstensils.add(ustensil)
                            })
                            allRecipesNeeded.add(recipe)
    
                        }
                    })
                })
            } else if(whichbar == "appliance") {
                allRecipes.forEach(recipe => {
                    if(recipe.appliance.toLowerCase().includes(wordSearched)){
                        finalSortAppliance.add(recipe.appliance)
                        recipe.ingredients.forEach(ingredient => {
                            finalSortIngredient.add(ingredient.ingredient)
                        })
                        //console.log(recipe.ingredients)
                        recipe.ustensils.forEach(ustensil => {
                            finalSortUstensils.add(ustensil)
                        })
                        allRecipesNeeded.add(recipe)
                    }
                })
            } else if(whichbar == "ustensils") {
                allRecipes.forEach(recipe => {
                    recipe.ustensils.forEach(ustensil => {
                        if(ustensil.toLowerCase().includes(wordSearched)){
                            finalSortUstensils.add(ustensil);
                            recipe.ingredients.forEach(ingredient => {
                                finalSortIngredient.add(ingredient.ingredient);
                            })
                            finalSortAppliance.add(recipe.appliance)
                            allRecipesNeeded.add(recipe)
                        }
                    })
                })
            }
        } else {
            allRecipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    finalSortIngredient.add(ingredient.ingredient);
                })
                finalSortAppliance.add(recipe.appliance);
                recipe.ustensils.forEach(ustensil => {
                    finalSortUstensils.add(ustensil);
                })
            })
        }
        
        console.log("=================")
        console.log(finalSortIngredient)
        console.log("=================")
        console.log(finalSortAppliance)
        console.log("=================")
        console.log(finalSortUstensils)
        console.log("=================")
        console.log(allRecipesNeeded)
        //return("Oui")*/

        return({finalSortIngredient, finalSortAppliance, finalSortUstensils, allRecipesNeeded})
    }

    getIngredientsSorted(wordSearched, allRecipes) { //donne la liste des recettes dont les ingred correspond à la recherche
        let listOfMatchedIngredientsRecipes = new Set();
        allRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                if(ingredient.ingredient.toLowerCase().includes(wordSearched)){
                    listOfMatchedIngredientsRecipes.add(recipe);
                }
            })
        })
        console.log(listOfMatchedIngredientsRecipes)
        return(listOfMatchedIngredientsRecipes)
    }

    getApplianceSorted(wordSearched, allAppliance) {
        let listOfMatchedAppliance = new Set();
        allAppliance.forEach(appliance => {
            if(appliance.toLowerCase().includes(wordSearched)){
                listOfMatchedAppliance.add(appliance);
            }
        })

        return(listOfMatchedAppliance)
    }

    getUstensilsSrted(wordSearched, allUstensils) {
        let listOfMatchedUstensils = new Set();
        allUstensils.forEach(ustensil => {
            if(ustensil.toLowerCase().includes(wordSearched)){
                listOfMatchedUstensils.add(ustensil);
            }
        })

        return(listOfMatchedUstensils)
    }
}

