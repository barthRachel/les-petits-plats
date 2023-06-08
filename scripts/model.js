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
                allIngredient.add(ingredient.ingredient)
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
                allUstensil.add(ustensil);
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
            allAppliance.add(appliance.appliance)
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
}

