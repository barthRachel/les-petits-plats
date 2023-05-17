//accès aux données 
class Model{
    constructor() {
        this.recipes = null;
        this.ingredients = null;
    }

    async getRecipes() {
        if(this.recipes == null) {
            let data = await fetch('data/recipes.json');
            let dataJson = await data.json();
            this.recipes = dataJson.recipes;
        }

        return(this.recipes);
    };

    async getIngredients() {
        if(this.ingredients == null){
            this.recipes.forEach(recipe => {

            });
        }

        return(this.ingredients);
    }
}

