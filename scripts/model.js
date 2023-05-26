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
}

