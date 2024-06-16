const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const removeAll = document.getElementById('remove-all')

removeAll.addEventListener('click', getRemoveAll);
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
document.addEventListener('DOMContentLoaded', loadFavourites);

function addFavouriteButtons() { 
    const mealItems = document.querySelectorAll('.meal-item'); 
    mealItems.forEach(item => { 
        const mealId = item.dataset.id; 
        const mealName = item.querySelector('.meal-name h3').innerText;
        const mealImg = item.querySelector('.meal-img img').src;
        const favBtn = item.querySelector('.fav-btn'); 
        favBtn.addEventListener('click', function() { 
            toggleFavourite(mealId, favBtn, mealName, mealImg); 
        }); 
    }); 
}
function loadFavourites() { 

    let favourites = JSON.parse(localStorage.getItem('favourites')) || []; 
    const mealList = document.getElementById('meal'); 

    mealList.innerHTML = '';

    if (favourites.length > 0) {
        favourites.forEach(favourite => {
            mealList.innerHTML += `
                <div class="meal-item" data-id="${favourite.id}">
                    <div class="meal-img">
                        <img src="${favourite.img}" alt="${favourite.name}">
                    </div>
                    <div class="meal-name">
                        <h3>${favourite.name}</h3>
                    </div>
                    <div class = "title-1">
                    <a href = "#" class = "recipe-btn">Get Recipe</a>
                    <i class="fa-solid fa-trash fav btn-remove"></i>
                </div>
                </div>
            `;
        });
    }
    removeFavorite();
}

function removeFavorite() {  
    const favButtons = document.querySelectorAll('.meal-item .btn-remove');
    favButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mealItem = btn.closest('.meal-item');
            const mealId = mealItem.dataset.id;
            toggleFavourite(mealId, btn);
            mealItem.remove();
        });
    });
}
function getRemoveAll(){
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    localStorage.clear('favourites', JSON.stringify(favourites));
    loadFavourites();
}
function toggleFavourite(mealId, button) { 
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const index = favourites.findIndex(item => item.id === mealId);
    if (index > -1) {
        favourites.splice(index, 1);
        localStorage.setItem('favourites', JSON.stringify(favourites));
        loadFavourites();
    } 
}
//receip meal
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
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
                        </div>
                        <div class = "title-1">
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                            <i class="fa-solid fa-trash fav btn-remove"></i>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
        addFavouriteButtons();
    });
}

function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

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