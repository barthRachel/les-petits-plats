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
        this.recipeView.addListenerSpecificFilter();

        this.showIngredients();
        this.showAppliance();
        this.showUstensils();
        
        this.recipeView.addListenerSearchbarIngredients();
        this.recipeView.addListenerSearchbarAppliance();
        this.recipeView.addListenerSearchbarUstensils();

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
            this.recipeView.displayRecipes(await this.model.getRecipes());
        }
    
        //console.log(finalSort)
    }

    resetOthersSpecificBar(searchbar1, searchbar2) {
        let bar1 = document.querySelector(searchbar1);
        let bar2 = document.querySelector(searchbar2);

        if(bar1.value !== ""){
            bar1.value = "";
        }

        if(bar2.value !== ""){
            bar2.value = "";
        }

        //console.log(bar1)
        //console.log(bar2)
    }

    async searchWithIngredientBar() {
        //console.log('ok')

        if(document.querySelector('.searchbar-ingredients').value.length >= 2) {
            let listOfRecipesWhichMatch = this.model.getBrowseListForSpecificSort("ingredient", document.querySelector('.searchbar-ingredients').value.toLowerCase(), await this.model.getRecipes())
            console.log(listOfRecipesWhichMatch.finalSortIngredient)

            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortIngredient, "ingredient");

            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortAppliance, "appliance");
            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortUstensils, "ustensils");
        } else {
            this.recipeView.displaySpecificFilter(await this.model.getIngredients(), 'ingredient');
            //console.log("nan")
        }
    }

    async searchWithApplianceBar() {
        if(document.querySelector('.searchbar-appliance').value.length >= 2) {
            let listOfRecipesWhichMatch = this.model.getBrowseListForSpecificSort("appliance", document.querySelector('.searchbar-appliance').value.toLowerCase(), await this.model.getRecipes())
            console.log(listOfRecipesWhichMatch.finalSortAppliance)
            
            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortAppliance, "appliance")

            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortIngredient, "ingredient")
            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortUstensils, "ustensils");
        } else {
            this.recipeView.displaySpecificFilter(await this.model.getAppliance(), 'appliance');
        }
    }

    async searchWithUstensilsBar() {
        if(document.querySelector('.searchbar-ustensils').value.length >= 2) {
            let listOfRecipesWhichMatch = this.model.getBrowseListForSpecificSort("ustensils", document.querySelector('.searchbar-ustensils').value.toLowerCase(), await this.model.getRecipes());
            console.log(listOfRecipesWhichMatch)

            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortUstensils, "ustensils");

            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortAppliance, "appliance");
            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortIngredient, "ingredient");        
        } else {
            this.recipeView.displaySpecificFilter(await this.model.getUstensils(), 'ustensils');
        }
    }

    async showIngredients(listIngredient = null) {
        if(listIngredient == null){
            listIngredient = await this.model.getIngredients()
        }

        this.recipeView.displaySpecificFilter(listIngredient, 'ingredient')
        console.log(listIngredient)
    }

    async showAppliance(listAppliance = null) {
        if(listAppliance == null){
            listAppliance = await this.model.getAppliance()
        }

        this.recipeView.displaySpecificFilter(listAppliance, 'appliance')
        console.log(listAppliance)
    }

    async showUstensils(listUstensils = null) {
        if(listUstensils == null){
            listUstensils = await this.model.getUstensils()
        }

        this.recipeView.displaySpecificFilter(listUstensils, 'ustensils')
        console.log(listUstensils)
    }

    /*direBonjour() {
        console.log("Bonjour")
    }
        //Function pour test - à retirer après
    */
}
