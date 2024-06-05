
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const Breakfast = document.getElementById('tab-1');
const Dessert = document.getElementById('tab-2');
const Vergan = document.getElementById('tab-3');
const Starter = document.getElementById('tab-4');
const button1= document.querySelector('.tab1');
const button2= document.querySelector('.tab2');
const button3= document.querySelector('.tab3');
const button4= document.querySelector('.tab4');
// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
button1.addEventListener('click', changeColor1);
button2.addEventListener('click', changeColor2);
button3.addEventListener('click', changeColor3);
button4.addEventListener('click', changeColor4);

Breakfast.addEventListener('click', BreakfastList);
Dessert.addEventListener('click', DessertList);
Vergan.addEventListener('click', VerganList);
Starter.addEventListener('click', StarterList);


function changeColor1(){
    button1.style.color = "var(--primary)";
    button1.style.borderBlockEnd = "2px solid var(--primary)";
}
function changeColor2(){
    button2.style.color = "var(--primary)";
    button2.style.borderBlockEnd = "2px solid var(--primary)";
}
function changeColor3(){
    button3.style.color = "var(--primary)";
    button3.style.borderBlockEnd = "2px solid var(--primary)";
}
function changeColor4(){
    button4.style.color = "var(--primary)";
    button4.style.borderBlockEnd = "2px solid var(--primary)";
}
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
function StarterList(){

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter`)
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
                        <div>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                            <i class="fa-regular fa-bookmark fav-btn add-btn "></i>
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

function VerganList(){
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian`)
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
                        <div>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                            <i class="fa-regular fa-bookmark fav-btn add-btn "></i>
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

function DessertList(){
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert`)
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
                        <div>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                            <i class="fa-regular fa-bookmark fav-btn add-btn "></i>
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

function BreakfastList(){
   
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast`)
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
                        <div>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                            <i class="fa-regular fa-bookmark fav-btn add-btn "></i>
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

function toggleFavourite(mealId, button, mealName, mealImg) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const index = favourites.findIndex(item => item.id === mealId);
    const isFavourite = index > -1;
    
    if(isFavourite) {    
        favourites.splice(index, 1);
        button.classList.remove('fa-solid');
        button.classList.add('fa-regular');
    } else {
        favourites.push({
            id: mealId, 
            name: mealName, 
            img: mealImg
        });
        button.classList.remove('fa-regular');
        button.classList.add('fa-solid');

    }   
    localStorage.setItem('favourites', JSON.stringify(favourites));
}

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
                        <div>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                            <i class="fa-regular fa-bookmark fav-btn add-btn "></i>
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
// Hàm kiểm tra xem một món ăn có trong danh sách yêu thích hay không
function isFavourite(mealId) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    return favourites.some(item => item.id === mealId);
}

function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <h2>${meal.strArea}</h2>
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
    
    // Điều chỉnh icon bookmark dựa trên tình trạng của món ăn trong danh sách yêu thích
    let bookmarkIcon = isFavourite(meal.idMeal) ?
        '<i class="fa-solid fa-bookmark"></i>' : // Nếu món ăn đã là yêu thích
        '<i class="fa-regular fa-bookmark"></i>'; // Nếu món ăn chưa có trong danh sách yêu thích

    // Thêm bookmark icon vào html
    html += `
        <div class="recipe-fav">
            ${bookmarkIcon}
        </div>
    `;

    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

