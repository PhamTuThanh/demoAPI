
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function addFavouriteButtons() { 
    const mealItems = document.querySelectorAll('.meal-item'); 
    mealItems.forEach(item => { 
        const mealId = item.dataset.id; 
        const mealName = item.querySelector('.meal-name h3').innerText;
        const mealImg = item.querySelector('.meal-img img').src;
        const favBtn = item.querySelector('.fav-btn'); 
        // ...
        favBtn.addEventListener('click', function() { 
            toggleFavourite(mealId, favBtn, mealName, mealImg); 
        }); 
    }); 
}


function toggleFavourite(mealId, button, mealName, mealImg) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    
    const index = favourites.findIndex(item => item.id === mealId); //để lấy vị trí
    const isFavourite = index > -1;
    
    if(isFavourite) {
        favourites.splice(index, 1);   //xóa 1 phần từ ở vị trí index
        button.classList.remove('fav');
        button.textContent = 'Add';
    } else {
        favourites.push({
            id: mealId,
            name: mealName,
            img: mealImg
        });
        button.classList.add('fav');
        button.textContent = 'Added';
    }
    
    localStorage.setItem('favourites', JSON.stringify(favourites));
}
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https:/www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                            <button class = "fav-btn add-btn">Add</button>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');        
        } else{
            html = "NOT FOUND";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
        addFavouriteButtons();
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

