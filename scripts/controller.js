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
        
        /*let test = document.querySelector('.taglist');
        let test2 = this.recipeView.createTag("Patate", "ingredient-bg");
        test.appendChild(test2)*/

    };

    // fonction de recherche de la grande barre
    async searchWithBar(){
        if(document.querySelector('.searchbar-input').value.length >= 3) {
            //let finalSort = finalSortSet(await this.model.getRecipeByTitle(document.querySelector('.searchbar-input').value.toLowerCase()), await this.model.getRecipeByDesc(document.querySelector('.searchbar-input').value.toLowerCase()), await this.model.getRecipeByIngr(document.querySelector('.searchbar-input').value.toLowerCase()))
            let finalSort = this.model.getBrowseList(document.querySelector('.searchbar-input').value.toLowerCase(), await this.model.getRecipes());

            this.recipeView.displayRecipes(finalSort)

            // test
            this.recipeView.listOfRecipes = finalSort
            
            //fin test

            //console.log(finalSort)

            /* PARTIE TEST POUR LES FILTRES */

            let showSpecificElements = this.model.getBrowseListForSpecificSort('ingredient', "", finalSort)
            console.log(showSpecificElements)

            this.recipeView.displaySpecificFilter(showSpecificElements.finalSortIngredient, 'ingredient');
            this.recipeView.displaySpecificFilter(showSpecificElements.finalSortAppliance, 'appliance');
            this.recipeView.displaySpecificFilter(showSpecificElements.finalSortUstensils, 'ustensil');
            
            /* FIN TEST */

            if(finalSort.size == 0) {
                this.recipeView.displayNoResults()
            }
        } else {
            let allRecipe = await this.model.getRecipes()
            this.recipeView.displayRecipes(allRecipe);

            this.recipeView.listOfRecipes = allRecipe
        }

        console.log(this.recipeView.listOfRecipes)
       
    }

    // fonction qui efface les caractères tapés dans les 2 inputs de filtres avancés passé en paramètre 
    resetOthersSpecificBar(searchbar1, searchbar2) {
        let bar1 = document.querySelector(searchbar1);
        let bar2 = document.querySelector(searchbar2);

        if(bar1.value !== ""){
            bar1.value = "";
        }

        if(bar2.value !== ""){
            bar2.value = "";
        }
    }

    // fonction de recherche du filtre sur les ingrédients
    async searchWithIngredientBar(listOfRecipes = null) {
        if(listOfRecipes == null && document.querySelector('.searchbar-input').value == "") {
            listOfRecipes = await this.model.getRecipes()
        } else {
            listOfRecipes = this.model.getBrowseList(document.querySelector('.searchbar-input').value.toLowerCase(), await this.model.getRecipes());
        }
        
        if(document.querySelector('.searchbar-ingredient').value.length >= 2) {
            let listOfRecipesWhichMatch = this.model.getBrowseListForSpecificSort("ingredient", document.querySelector('.searchbar-ingredient').value.toLowerCase(), listOfRecipes)
            console.log(listOfRecipesWhichMatch.finalSortIngredient)

            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortIngredient, "ingredient");

            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortAppliance, "appliance");
            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortUstensils, "ustensil");
        } else {
            let listRecipeInCaseOfNoWords = this.model.getBrowseListForSpecificSort("ingredient", "", listOfRecipes)

            this.recipeView.displaySpecificFilter(listRecipeInCaseOfNoWords.finalSortIngredient, 'ingredient');

            this.recipeView.displaySpecificFilter(listRecipeInCaseOfNoWords.finalSortAppliance, 'appliance');
            this.recipeView.displaySpecificFilter(listRecipeInCaseOfNoWords.finalSortUstensils, 'ustensil');
            //console.log("nan")
        }
    }

    // fonction de recherche du filtre sur les appareils
    async searchWithApplianceBar(listOfRecipes = null) {
        if(listOfRecipes == null && document.querySelector('.searchbar-input').value == "") {
            listOfRecipes = await this.model.getRecipes()
        } else {
            listOfRecipes = this.model.getBrowseList(document.querySelector('.searchbar-input').value.toLowerCase(), await this.model.getRecipes());
        }

        if(document.querySelector('.searchbar-appliance').value.length >= 2) {
            let listOfRecipesWhichMatch = this.model.getBrowseListForSpecificSort("appliance", document.querySelector('.searchbar-appliance').value.toLowerCase(), listOfRecipes)
            console.log(listOfRecipesWhichMatch.finalSortAppliance)
            
            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortAppliance, "appliance")

            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortIngredient, "ingredient")
            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortUstensils, "ustensil");
        } else {
            let listRecipeInCaseOfNoWords = this.model.getBrowseListForSpecificSort("appliance", "", listOfRecipes)
            
            this.recipeView.displaySpecificFilter(listRecipeInCaseOfNoWords.finalSortAppliance, 'appliance');

            this.recipeView.displaySpecificFilter(listRecipeInCaseOfNoWords.finalSortIngredient, 'ingredient');
            this.recipeView.displaySpecificFilter(listRecipeInCaseOfNoWords.finalSortUstensils, 'ustensil');
        }
    }

    // fonction de recherche du filtre sur les ustensiles
    async searchWithUstensilsBar(listOfRecipes = null) {
        if(listOfRecipes == null && document.querySelector('.searchbar-input').value == "") {
            listOfRecipes = await this.model.getRecipes()
        } else {
            listOfRecipes = this.model.getBrowseList(document.querySelector('.searchbar-input').value.toLowerCase(), await this.model.getRecipes());
        }

        if(document.querySelector('.searchbar-ustensil').value.length >= 2) {
            let listOfRecipesWhichMatch = this.model.getBrowseListForSpecificSort("ustensil", document.querySelector('.searchbar-ustensil').value.toLowerCase(), listOfRecipes);
            console.log(listOfRecipesWhichMatch)

            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortUstensils, "ustensil");

            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortAppliance, "appliance");
            this.recipeView.displaySpecificFilter(listOfRecipesWhichMatch.finalSortIngredient, "ingredient");        
        } else {
            let listRecipeInCaseOfNoWords = this.model.getBrowseListForSpecificSort("ustensil", "", listOfRecipes)

            this.recipeView.displaySpecificFilter(listRecipeInCaseOfNoWords.finalSortUstensils, 'ustensil');

            this.recipeView.displaySpecificFilter(listRecipeInCaseOfNoWords.finalSortAppliance, 'appliance');
            this.recipeView.displaySpecificFilter(listRecipeInCaseOfNoWords.finalSortIngredient, 'ingredient');
        }
    }

    async searchWithTag(listOfRecipes = null, tag, categoryOfTag) {
        if(listOfRecipes == null) {
            listOfRecipes = await this.model.getRecipes()
        }

        let allListSorted = this.model.getBrowseListForSpecificSort(categoryOfTag, tag.toLowerCase(), listOfRecipes)

        let recipeSorted = allListSorted.allRecipesNeeded
        this.recipeView.listOfRecipes = recipeSorted;
        this.recipeView.displayRecipes(recipeSorted)

        this.recipeView.displaySpecificFilter(allListSorted.finalSortIngredient, "ingredient")
        this.recipeView.displaySpecificFilter(allListSorted.finalSortAppliance, "appliance")
        this.recipeView.displaySpecificFilter(allListSorted.finalSortUstensils, "ustensil")

        console.log("=========")
        console.log(listOfRecipes)
        console.log(tag)
        console.log(categoryOfTag)
    }

    // fonction pour afficher les ingrédients - filtres avancés
    async showIngredients(listIngredient = null) {
        if(listIngredient == null){
            listIngredient = await this.model.getIngredients()
        }

        this.recipeView.displaySpecificFilter(listIngredient, 'ingredient')
        console.log(listIngredient)
    }

    // fonction pour afficher les appareils - filtres avancés
    async showAppliance(listAppliance = null) {
        if(listAppliance == null){
            listAppliance = await this.model.getAppliance()
        }

        this.recipeView.displaySpecificFilter(listAppliance, 'appliance')
        console.log(listAppliance)
    }

    // fonction pour afficher les ustensiles - filtres avancés
    async showUstensils(listUstensils = null) {
        if(listUstensils == null){
            listUstensils = await this.model.getUstensils()
        }

        this.recipeView.displaySpecificFilter(listUstensils, 'ustensil')
        console.log(listUstensils)
    }



    /*direBonjour() {
        console.log("Bonjour")
    }
        //Function pour test - à retirer après
    */
}
