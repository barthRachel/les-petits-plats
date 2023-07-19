//let model = new Model();
//let recipeView = new RecipesView();

class Controller {
    constructor() {
        this.model = new Model();
        this.recipeView = new RecipesView();
    }

    async init() {
        const recipes = await this.model.getRecipes();

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

    // fonction de recherche de la grande barre
    async searchWithBar(){
        if(document.querySelector('.searchbar-input').value.length >= 3) {
            let finalSort = this.model.getBrowseList(document.querySelector('.searchbar-input').value.toLowerCase(), await this.model.getRecipes());

            this.recipeView.displayRecipes(finalSort)

            this.recipeView.listOfRecipes = [...finalSort]
            
            let showSpecificElements = this.model.getBrowseListForSpecificSort('ingredient', "", finalSort)
            console.log(showSpecificElements)

            this.recipeView.displaySpecificFilter(showSpecificElements.finalSortIngredient, 'ingredient');
            this.recipeView.displaySpecificFilter(showSpecificElements.finalSortAppliance, 'appliance');
            this.recipeView.displaySpecificFilter(showSpecificElements.finalSortUstensils, 'ustensil');
            
            if(finalSort.size == 0) {
                this.recipeView.displayNoResults()
            }
        } else {
            let allRecipe = await this.model.getRecipes()
            this.recipeView.displayRecipes(allRecipe);

            this.recipeView.listOfRecipes = [...allRecipe]
        }
       
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

        this.recipeView.listOfRecipesCopy = listOfRecipes;

        let allListSorted = this.model.getBrowseListForSpecificSort(categoryOfTag, tag.toLowerCase(), listOfRecipes)

        this.recipeView.listOfRecipes = [...allListSorted.allRecipesNeeded];

        this.recipeView.displayRecipes(allListSorted.allRecipesNeeded)

        this.recipeView.displaySpecificFilter(await this.model.getIngredients(allListSorted.allRecipesNeeded), "ingredient")
        this.recipeView.displaySpecificFilter(await this.model.getAppliance(allListSorted.allRecipesNeeded), "appliance")
        this.recipeView.displaySpecificFilter(await this.model.getUstensils(allListSorted.allRecipesNeeded), "ustensil")
    }

    async searchWithDeleteTag() {
        let listOfRecipes = await this.model.getRecipes()

        let tagList = document.querySelectorAll('.tag')
        let recipeNeededBeforeSort = []
        let recipeNeededAfterSort = new Set()
        let recipeInCommon = new Set();
        let sortedStep;

        if(tagList.length === 0) {
            this.searchWithBar()
        } else {
            tagList.forEach(tag => {
                if(tag.classList.contains("ingredient-bg")) {
                    sortedStep = this.model.getBrowseListForSpecificSort("ingredient", tag.innerText.toLowerCase(), listOfRecipes)
                    sortedStep = sortedStep.allRecipesNeeded                   
                    recipeNeededBeforeSort.push(sortedStep)
                } else if(tag.classList.contains("appliance-bg")) {
                    sortedStep = this.model.getBrowseListForSpecificSort("appliance", tag.innerText.toLowerCase(), listOfRecipes)
                    sortedStep = sortedStep.allRecipesNeeded
                    recipeNeededBeforeSort.push(sortedStep)
                } else if(tag.classList.contains("ustensil-bg")) {
                    sortedStep = this.model.getBrowseListForSpecificSort("ustensil", tag.innerText.toLowerCase(), listOfRecipes)
                    sortedStep = sortedStep.allRecipesNeeded
                    recipeNeededBeforeSort.push(sortedStep)
                }
                
            })
        }

        if(recipeNeededBeforeSort.length > 1){
            for(let recipe of recipeNeededBeforeSort[0]) {
                for(let recipeBis of recipeNeededBeforeSort[1]) {
                    if(recipe.name === recipeBis.name && recipeNeededAfterSort.has(recipe) === false) {
                        recipeNeededAfterSort.add(recipe)
                    }
                }
            }

            for(let recipeTer of recipeNeededAfterSort) {
                for(let i = 2 ; i < recipeNeededBeforeSort.length ; i++) {
                    for(let recipeQ of recipeNeededBeforeSort[i]) {
                        if(recipeTer.name === recipeQ.name && recipeInCommon.has(recipeQ) == false) {
                            recipeInCommon.add(recipeQ)
                        }
                    }
                }
            }
        } else {
            if(recipeNeededBeforeSort[0]){
                for(let recipe of recipeNeededBeforeSort[0]) {
                    recipeNeededAfterSort.add(recipe)
                }
            }

        }

        this.recipeView.displayRecipes(recipeNeededAfterSort)

        if(recipeNeededAfterSort.size === 0){
            this.searchWithBar()

            this.recipeView.displaySpecificFilter(await this.model.getIngredients(listOfRecipes), "ingredient")
            this.recipeView.displaySpecificFilter(await this.model.getAppliance(listOfRecipes), "appliance")
            this.recipeView.displaySpecificFilter(await this.model.getUstensils(listOfRecipes), "ustensil")
        } else {
            this.recipeView.displaySpecificFilter(await this.model.getIngredients(recipeNeededAfterSort), "ingredient")
            this.recipeView.displaySpecificFilter(await this.model.getAppliance(recipeNeededAfterSort), "appliance")
            this.recipeView.displaySpecificFilter(await this.model.getUstensils(recipeNeededAfterSort), "ustensil")
    
        }
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
}
