function recipeFactory(data) {
    const {name, ingredients, time, description} = data;

    function getRecipeCardDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.src = "https://dummyimage.com/500x400/c7bebe/c7bebe";

        const titleAndTimeDiv = document.createElement('div');

        const title = document.createElement('h1');
        title.innerText = name;

        const timeParagraph = document.createElement('p');
        timeParagraph.innerHTML = `<i class="fa fa-clock-o" aria-hidden="true"></i> ${time} min `

        const ingredientsAndDescriptionDiv = document.createElement('div');

        const ingredientsList = document.createElement('ul');
        ingredients.forEach(ing => {
            const li = document.createElement('li');
            const ingredientSpan = document.createElement('span');
            ingredientSpan.innerText = ing.ingredient;
            li.appendChild(ingredientSpan);

            let unitIngredient;
            if(ing.unit === "grammes") {
                unitIngredient = "g";
            } else if(ing.unit === "cl" || ing.unit === "ml") {
                unitIngredient = ing.unit;
            } else {
                unitIngredient = " " + ing.unit;
            }

            li.innerText = li.innerText + `${ing.quantity ? " : " + ing.quantity : ""}${ing.unit ? unitIngredient : ""}`;

            ingredientsList.appendChild(li);
            
        });


        const descriptionText = document.createElement('p');
        descriptionText.innerText = description


        titleAndTimeDiv.appendChild(title);
        titleAndTimeDiv.appendChild(timeParagraph);

        ingredientsAndDescriptionDiv.appendChild(ingredientsList);
        ingredientsAndDescriptionDiv.appendChild(descriptionText);

        article.appendChild(img);
        article.appendChild(titleAndTimeDiv);
        article.appendChild(ingredientsAndDescriptionDiv);

        console.log(ingredients)

        return(article)
    }

    return { getRecipeCardDOM }
}