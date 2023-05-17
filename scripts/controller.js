class Controller {
    async init() {
        let model = new Model();
        const recipes = await model.getRecipes();

        let recipeView = new RecipesView();
        recipeView.displayRecipes(recipes);
    };
}
