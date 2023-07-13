//affichage liée aux recettes
class RecipesView {

    constructor() {
        this.listIngredientSelected = new Set();
        this.listApplianceSelected = new Set();
        this.listUstensilSelected = new Set();

        this.listOfRecipes ;
    }

    async displayRecipes(recipes) {
        document.querySelector('.no-results_section').innerHTML = "";
        const recipeSection = document.querySelector('.recipe_section');
        recipeSection.innerHTML = ""
        recipes.forEach((recipe) => {
            const recipeCard = this.getRecipeCard(recipe);
            recipeSection.appendChild(recipeCard);
        });

        //this.addListenerBonjour() 

        console.log(this.listOfRecipes)
    }

    displayNoResults() {
        document.querySelector('.recipe_section').innerHTML = "";
        const noResultsSection = document.querySelector('.no-results_section');
        noResultsSection.innerHTML = ""
        
        const divMessage = document.createElement('div');
        const message = document.createElement('p');
        message.innerText = "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson » ou autre..."
        
        divMessage.appendChild(message)
        noResultsSection.appendChild(divMessage);
    }

    getRecipeCard(data) {
        const {name, ingredients, time, description} = data;
        
        const article = document.createElement('article');
        article.classList.add('recipe');
        
        const img = document.createElement('img');
        img.src = "https://dummyimage.com/500x400/c7bebe/c7bebe";

        const titleAndTimeDiv = document.createElement('div');
        titleAndTimeDiv.classList.add('titleAndTime')

        const title = document.createElement('h1');
        title.innerText = name;

        const timeParagraph = document.createElement('p');
        timeParagraph.innerHTML = `<i class="fa fa-clock-o" aria-hidden="true"></i> ${time} min `

        const ingredientsAndDescriptionDiv = document.createElement('div');
        ingredientsAndDescriptionDiv.classList.add('ingredientsAndDescription')

        const ingredientsList = document.createElement('ul');
        ingredients.forEach(ing => {
            const li = document.createElement('li');


            let unitIngredient;
            if(ing.unit === "grammes") {
                unitIngredient = "g";
            } else if(ing.unit === "cl" || ing.unit === "ml") {
                unitIngredient = ing.unit;
            } else {
                unitIngredient = " " + ing.unit;
            }

            li.innerHTML = `<span class="ingredientSpan">${ing.ingredient}</span> ${ing.quantity ? " : " + ing.quantity : ""}${ing.unit ? unitIngredient : ""}`;

            ingredientsList.appendChild(li);
            
        });

        const descriptionText = document.createElement('p');
        descriptionText.innerText = description.substr(0, 150).concat("...");

        titleAndTimeDiv.appendChild(title);
        titleAndTimeDiv.appendChild(timeParagraph);

        ingredientsAndDescriptionDiv.appendChild(ingredientsList);
        ingredientsAndDescriptionDiv.appendChild(descriptionText);

        article.appendChild(img);
        article.appendChild(titleAndTimeDiv);
        article.appendChild(ingredientsAndDescriptionDiv);

        //console.log(ingredients)

        return(article)
    }

    displaySpecificFilter(specificList, whichSort) {
        let DOMElement;
        let classToSearch = `.${whichSort}-container`
        let category = `${whichSort}`

        DOMElement = document.querySelector(classToSearch)

        DOMElement.innerHTML = "";
        specificList.forEach(element => {
            const elementSpan = this.getElementsFilteredSpan(element.charAt(0).toUpperCase() + element.slice(1));

            elementSpan.addEventListener('click', (event) => {
                if(whichSort == "ingredient") {
                    this.listIngredientSelected.add(event.target.innerText)
                } else if(whichSort == "appliance") {
                    this.listApplianceSelected.add(event.target.innerText)
                } else if(whichSort == "ustensil") {
                    this.listUstensilSelected.add(event.target.innerText)
                }

                //lancement de recherche sur cette ligne
                controller.searchWithTag(this.listOfRecipes, elementSpan.innerText, category)
                this.displaySelectedItem()
            })

            DOMElement.appendChild(elementSpan)
        })

    }

    createTag(elementText, colorBackground) {
        let div = document.createElement('div');
        let span = document.createElement('span');
        let i = document.createElement('i');

        div.classList.add('tag');
        div.classList.add(colorBackground);

        span.innerText = elementText;

        i.classList.add('fa');
        i.classList.add('fa-times-circle-o');

        div.appendChild(span);
        div.appendChild(i);

        console.log(deleteTag(div))

        return(div)
    }

    deleteTag() {
        let tagList = document.querySelectorAll(".tag")

        tagList.forEach(tag => {
            tag.addEventListener('click', () => {
                if(tag.classList.contains('ingredient-bg')) {
                    this.listIngredientSelected.delete(tag.innerText);
                } else if(tag.classList.contains('appliance-bg')) {
                    this.listApplianceSelected.delete(tag.innerText)
                } else {
                    this.listUstensilSelected.delete(tag.innerText)
                }

                this.displaySelectedItem()
            })
        })

    }

    displaySelectedItem() {
        //fonction qui affiche le tag à partir des listes
        console.log("=========================")
        console.log(this.listIngredientSelected)
        console.log(this.listApplianceSelected)
        console.log(this.listUstensilSelected)

        let tagBloc = document.querySelector('.taglist');
        tagBloc.innerHTML = "";

        this.listIngredientSelected.forEach(ingredient => {
            tagBloc.appendChild(this.createTag(ingredient, 'ingredient-bg'));
            //this.deleteTag(this.createTag(ingredient, 'ingredient-bg'))
        })

        this.listApplianceSelected.forEach(appliance => {
            tagBloc.appendChild(this.createTag(appliance, 'appliance-bg'));
        })

        this.listUstensilSelected.forEach(ustensil => {
            tagBloc.appendChild(this.createTag(ustensil, 'ustensil-bg'));
        })

        this.deleteTag();
    }

    getElementsFilteredSpan(specificElement) {
        let p = document.createElement('p')
        p.classList.add('parahraphItem')

        let span = document.createElement('span')
        span.classList.add('item');
        span.innerText = specificElement;
        
        p.appendChild(span)

        return(p)
    }

    /*addListenerBonjour() {
        let btnBonjour = document.querySelector('#btnBonjour')

        btnBonjour.addEventListener('click', () => {
            controller.direBonjour();
        })
    }*/

    addListenerSearchbar() {
        let searchbarInput = document.querySelector('.searchbar-input');

        searchbarInput.addEventListener('click', () => {
            let allSortBloc = document.querySelectorAll('.sort');
            let allSortElementsBloc = document.querySelectorAll('.sort-specific');

            let allSearchbars = document.querySelectorAll('.searchbars');

            allSortBloc.forEach(sortBloc => {
                sortBloc.classList.remove('hide-sort-specific');
            })
            allSortElementsBloc.forEach(sortSpecific => {
                sortSpecific.classList.add('hide-sort-specific');
            })

            allSearchbars.forEach(searchbar => {
                if(searchbar.value != ""){
                    searchbar.value = "";
                }
            })

            controller.searchWithIngredientBar();
            controller.searchWithApplianceBar();
            controller.searchWithUstensilsBar();
        })

        searchbarInput.addEventListener('keyup', () => { //event se déclenche quand on tape sur une touche
            controller.searchWithBar();
        })
    }

    addListenerSearchbarIngredients() {
        let searchbarIngredientsInput = document.querySelector('.searchbar-ingredient');

        searchbarIngredientsInput.addEventListener('keyup', () => {
            controller.resetOthersSpecificBar(".searchbar-appliance", ".searchbar-ustensil");
            controller.searchWithIngredientBar();
        })
    }

    addListenerSearchbarAppliance() {
        let searchbarApplianceInput = document.querySelector('.searchbar-appliance');

        searchbarApplianceInput.addEventListener('keyup', () => {
            controller.resetOthersSpecificBar(".searchbar-ingredient", ".searchbar-ustensil");
            controller.searchWithApplianceBar();
        })
    }

    addListenerSearchbarUstensils() {
        let searchbarUstensilsInput = document.querySelector('.searchbar-ustensil');

        searchbarUstensilsInput.addEventListener('keyup', () => {
            controller.resetOthersSpecificBar(".searchbar-appliance", ".searchbar-ingredient");
            controller.searchWithUstensilsBar();
        })
    }

    // fonction pour cacher les 2 filtres avancés passer en paramètre
    toHide(firstElement, secondElement) {
        firstElement.classList.add('hide-sort-specific');
        secondElement.classList.add('hide-sort-specific');
    }

    // fonction pour montrer les 2 filtres avancés passer en paramètre
    toShow(firstElement, secondElement) {
        firstElement.classList.remove('hide-sort-specific');
        secondElement.classList.remove('hide-sort-specific');
    }

    addListenerSpecificFilter() {
        let filters = document.querySelectorAll('.sort');
        let sortSpecific = document.querySelectorAll('.sort-specific');
        let toCloseButtons = document.querySelectorAll('.toClose');

        console.log(toCloseButtons)

        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                if(filter.classList.contains('sort-ingredient')) {
                    this.toHide(sortSpecific[1], sortSpecific[2]);
                    this.toShow(filters[1], filters[2]);

                    document.querySelector('.sort-ingredient-specific').classList.remove('hide-sort-specific');

                    filter.classList.add('hide-sort-specific');

                    //this.addListenerTagElements();
                } else if(filter.classList.contains('sort-appliance')) {
                    this.toHide(sortSpecific[0], sortSpecific[2]);
                    this.toShow(filters[0], filters[2]);

                    document.querySelector('.sort-appliance-specific').classList.remove('hide-sort-specific');

                    filter.classList.add('hide-sort-specific');

                    //this.addListenerTagElements();
                } else if(filter.classList.contains('sort-ustensil')) {
                    this.toHide(sortSpecific[0], sortSpecific[1]);
                    this.toShow(filters[0], filters[1]);

                    document.querySelector('.sort-ustensil-specific').classList.remove('hide-sort-specific');

                    filter.classList.add('hide-sort-specific');

                    //this.addListenerTagElements();
                }
                //this.addListenerTagElements();
            })
        })

        toCloseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                console.log(e.target.parentNode.parentNode)
                if(button.parentNode.parentNode.classList.contains('sort-ingredient-specific')) {
                    button.parentNode.parentNode.classList.add('hide-sort-specific');
                    document.querySelector('.sort-ingredient').classList.remove('hide-sort-specific');
                } else if(button.parentNode.parentNode.classList.contains('sort-appliance-specific')) {
                    button.parentNode.parentNode.classList.add('hide-sort-specific');
                    document.querySelector('.sort-appliance').classList.remove('hide-sort-specific');
                } else if(button.parentNode.parentNode.classList.contains('sort-ustensil-specific')) {
                    button.parentNode.parentNode.classList.add('hide-sort-specific');
                    document.querySelector('.sort-ustensil').classList.remove('hide-sort-specific');
                }
            })
        })
    }

    createTag(elementText, colorBackground) {
        let div = document.createElement('div');
        let span = document.createElement('span');
        let i = document.createElement('i');

        div.classList.add('tag');
        div.classList.add(colorBackground);

        span.innerText = elementText;

        i.classList.add('fa');
        i.classList.add('fa-times-circle-o');

        div.appendChild(span);
        div.appendChild(i);

        return(div)
    }

    /*addListenerTagElements() {
        console.log("addListenerTagElmnt")
        let futureTagElements = document.querySelectorAll('.item');
        let tagBloc = document.querySelector('.taglist');
        let color;
        //console.log(tagElements)

        futureTagElements.forEach(futureTag => {
            futureTag.addEventListener('click', (e) => {
                let allTags = document.querySelectorAll('.tag');

                console.log(e.target.parentNode)

                if(e.target.parentNode.classList.contains("ingredient-bg")) {
                    color = "ingredient-bg";
                } else if(e.target.parentNode.classList.contains("appliance-bg")) {
                    color = "appliance-bg"
                } else {
                    color = "ustensil-bg"
                }

                if(allTags.length == 0){
                    tagBloc.appendChild(this.createTag(futureTag.innerText, color));
                } else {
                    allTags.forEach(tag => {
                        console.log(tag.innerText)
                        console.log(futureTag.innerText)
                        if(tag.innerText != futureTag.innerText){
                            tagBloc.appendChild(this.createTag(futureTag.innerText, color));
                        }
                        /*if(tag.innerText != futureTag.innerText){
                            tagBloc.appendChild(this.createTag(futureTag.innerText, "ingredient-bg"));
                        }*/
                    /*})
                }
                          
                console.log(document.querySelectorAll('.tag'))
                
            })
        })
    }*/

}
