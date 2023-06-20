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

        specificList.forEach(element => {
            const elementSpan = this.getElementsFilteredSpan(element);
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

        searchbarInput.addEventListener('keyup', () => { //event se déclenche quand on tape sur une touche
            controller.searchWithBar();
        })
    }

    addListenerSpecificFilter() {
        let filters = document.querySelectorAll('.sort');

        console.log(filters)

        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                if(filter.classList.contains('sort-ingredients')) {
                    document.querySelector('.sort-ingredients-specific').classList.remove('hide-sort-specific');
                    //document.querySelector('.sort-ingredients-specific').classList.add('show-sort-specific');

                    filter.classList.add('hide-sort-specific');
                } else if(filter.classList.contains('sort-appliance')) {
                    document.querySelector('.sort-appliance-specific').classList.remove('hide-sort-specific');
                    //document.querySelector('.sort-ingredients-specific').classList.add('show-sort-specific');

                    filter.classList.add('hide-sort-specific');
                } else if(filter.classList.contains('sort-ustensils')) {
                    document.querySelector('.sort-ustensils-specific').classList.remove('hide-sort-specific');
                    //document.querySelector('.sort-ingredients-specific').classList.add('show-sort-specific');

                    filter.classList.add('hide-sort-specific');
                }
            })
        })
    }
}
