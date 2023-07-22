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

    /* fonction pour donner les recettes qui correspondent à la chaîne de caractères
    taper dans la grande barre de recherche*/
    getBrowseList(wordSearched, allRecipes) {

        let finalSort = allRecipes.filter(
            recipe => recipe.name.toLowerCase().includes(wordSearched) ||
            recipe.description.toLowerCase().includes(wordSearched)
        );
        
        allRecipes.map(recipe => {
            let ingredientsThatMatch = recipe.ingredients.filter(ingr => ingr.ingredient.toLowerCase().includes(wordSearched));
            if(ingredientsThatMatch.length && !finalSort.includes(recipe)) {
                finalSort.push(recipe)
            }
        })

        return(finalSort)
    }

    /* fonction pour donner les listes d'ingrédients, appareils, ustensiles et recettes qui correspondent à
    la chaîne de caractère tapés dans les barres de recherche des filtres avancés */
    getBrowseListForSpecificSort(whichbar, wordSearched, allRecipes) {
        let finalSortIngredient = new Set();
        let finalSortAppliance = new Set();
        let finalSortUstensils = new Set();
        let allRecipesNeeded = new Set();

        if(wordSearched == "") {
            allRecipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    finalSortIngredient.add(ingredient.ingredient);
                })
                finalSortAppliance.add(recipe.appliance);
                recipe.ustensils.forEach(ustensil => {
                    finalSortUstensils.add(ustensil);
                })
                allRecipesNeeded.add(recipe)
            })
        }else if(wordSearched !== ""){ // si la chaîne de caractère n'est pas vide
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
            } else if(whichbar == "ustensil") {
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
        }
        
        return({finalSortIngredient, finalSortAppliance, finalSortUstensils, allRecipesNeeded})
    }
}