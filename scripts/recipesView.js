//affichage liée aux recettes
class RecipesView {
    async displayRecipes(recipes) {
        document.querySelector('.no-results_section').innerHTML = "";
        const recipeSection = document.querySelector('.recipe_section');
        recipeSection.innerHTML = ""
        recipes.forEach((recipe) => {
            const recipeCard = this.getRecipeCard(recipe);
            recipeSection.appendChild(recipeCard);
        });

        //this.addListenerBonjour() 
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

        if(whichSort == "ingredient") {
            DOMElement = document.querySelector('.ingredients-container');
        } else if(whichSort == "appliance") {
            DOMElement = document.querySelector('.appliance-container');
        } else if(whichSort == "ustensils") {
            DOMElement = document.querySelector('.ustensils-container')
        }

        DOMElement.innerHTML = "";
        specificList.forEach(element => {
            //console.log(element.charAt(0).toUpperCase() + element.slice(1))
            const elementSpan = this.getElementsFilteredSpan(element.charAt(0).toUpperCase() + element.slice(1));
            //const elementSpan = this.getElementsFilteredSpan(element)

            DOMElement.appendChild(elementSpan)
        })
    }

    getElementsFilteredSpan(specificElement) {
        let span = document.createElement('span')
        span.classList.add('result-item');
        span.innerText = specificElement;

        return(span)
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
        let searchbarIngredientsInput = document.querySelector('.searchbar-ingredients');

        searchbarIngredientsInput.addEventListener('keyup', () => {
            controller.resetOthersSpecificBar(".searchbar-appliance", ".searchbar-ustensils");
            controller.searchWithIngredientBar();
        })
    }

    addListenerSearchbarAppliance() {
        let searchbarApplianceInput = document.querySelector('.searchbar-appliance');

        searchbarApplianceInput.addEventListener('keyup', () => {
            controller.resetOthersSpecificBar(".searchbar-ingredients", ".searchbar-ustensils");
            controller.searchWithApplianceBar();
        })
    }

    addListenerSearchbarUstensils() {
        let searchbarUstensilsInput = document.querySelector('.searchbar-ustensils');

        searchbarUstensilsInput.addEventListener('keyup', () => {
            controller.resetOthersSpecificBar(".searchbar-appliance", ".searchbar-ingredients");
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
                if(filter.classList.contains('sort-ingredients')) {
                    this.toHide(sortSpecific[1], sortSpecific[2]);
                    this.toShow(filters[1], filters[2]);

                    document.querySelector('.sort-ingredients-specific').classList.remove('hide-sort-specific');

                    filter.classList.add('hide-sort-specific');

                    //this.addListenerTagElements();
                } else if(filter.classList.contains('sort-appliance')) {
                    this.toHide(sortSpecific[0], sortSpecific[2]);
                    this.toShow(filters[0], filters[2]);

                    document.querySelector('.sort-appliance-specific').classList.remove('hide-sort-specific');

                    filter.classList.add('hide-sort-specific');

                    //this.addListenerTagElements();
                } else if(filter.classList.contains('sort-ustensils')) {
                    this.toHide(sortSpecific[0], sortSpecific[1]);
                    this.toShow(filters[0], filters[1]);

                    document.querySelector('.sort-ustensils-specific').classList.remove('hide-sort-specific');

                    filter.classList.add('hide-sort-specific');

                    //this.addListenerTagElements();
                }
                this.addListenerTagElements();
            })
        })

        toCloseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                console.log(e.target.parentNode.parentNode)
                if(button.parentNode.parentNode.classList.contains('sort-ingredients-specific')) {
                    button.parentNode.parentNode.classList.add('hide-sort-specific');
                    document.querySelector('.sort-ingredients').classList.remove('hide-sort-specific');
                } else if(button.parentNode.parentNode.classList.contains('sort-appliance-specific')) {
                    button.parentNode.parentNode.classList.add('hide-sort-specific');
                    document.querySelector('.sort-appliance').classList.remove('hide-sort-specific');
                } else if(button.parentNode.parentNode.classList.contains('sort-ustensils-specific')) {
                    button.parentNode.parentNode.classList.add('hide-sort-specific');
                    document.querySelector('.sort-ustensils').classList.remove('hide-sort-specific');
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

    addListenerTagElements() {
        let futureTagElements = document.querySelectorAll('.result-item');
        let tagBloc = document.querySelector('.taglist');
        let color;
        //console.log(tagElements)

        futureTagElements.forEach(futureTag => {
            futureTag.addEventListener('click', (e) => {
                let allTags = document.querySelectorAll('.tag');

                console.log(e.target.parentNode)

                if(e.target.parentNode.classList.contains("ingredients-bg")) {
                    color = "ingredients-bg";
                } else if(e.target.parentNode.classList.contains("appliance-bg")) {
                    color = "appliance-bg"
                } else {
                    color = "ustensils-bg"
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
                            tagBloc.appendChild(this.createTag(futureTag.innerText, "ingredients-bg"));
                        }*/
                    })
                }
                          
                console.log(document.querySelectorAll('.tag'))
                
            })
        })
    }

}
