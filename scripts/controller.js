class Controller {
    async init() {
        let model = new Model();
        const recipes = await model.getRecipes();
        
        //let listIngredient = await model.getAppliance();
        //console.log(listIngredient)
        
        let recipeView = new RecipesView();
        recipeView.displayRecipes(recipes);

    };

    direBonjour() {
        console.log("Bonjour")
    }
}
