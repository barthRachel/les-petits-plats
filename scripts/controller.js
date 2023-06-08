//let model = new Model();
//let recipeView = new RecipesView();

class Controller {
    constructor() {
        this.model = new Model();
        this.recipeView = new RecipesView();
    }

    async init() {
        //let model = new Model();
        const recipes = await this.model.getRecipes();
        
        //let listIngredient = await model.getAppliance();
        //console.log(listIngredient)
        
        //let recipeView = new RecipesView();
        this.recipeView.displayRecipes(recipes);
        this.recipeView.addListenerSearchbar();

    };

    async searchWithBar(){
        if(document.querySelector('.searchbar-input').value.length >= 3) {
            //let finalSort = finalSortSet(await this.model.getRecipeByTitle(document.querySelector('.searchbar-input').value.toLowerCase()), await this.model.getRecipeByDesc(document.querySelector('.searchbar-input').value.toLowerCase()), await this.model.getRecipeByIngr(document.querySelector('.searchbar-input').value.toLowerCase()))
            let finalSort = this.model.getBrowseList(document.querySelector('.searchbar-input').value.toLowerCase(), await this.model.getRecipes());

            this.recipeView.displayRecipes(finalSort)
            if(finalSort.size == 0) {
                this.recipeView.displayNoResults()
            }
        } else {
            this.recipeView.displayRecipes(await this.model.getRecipes())
        }
    
        //console.log(finalSort)
    }

    async showIngredients(listIngredient = null) {
        if(listIngredient == null){
            listIngredient = await this.model.getIngredients()
        }

        this.recipeView.displaySpecificFilter(listIngredient, 'ingredient')
        console.log(listIngredient)
    }

    /*direBonjour() {
        console.log("Bonjour")
    }
        //Function pour test - à retirer après
    */
}
