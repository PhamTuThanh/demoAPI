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
document.addEventListener('DOMContentLoaded', loadFavourites);

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

function loadFavourites() { 

    let favourites = JSON.parse(localStorage.getItem('favourites')) || []; 
    const mealList = document.getElementById('meal'); // Đảm bảo bạn có element này trong HTML của bạn

    // Xóa nội dung hiện tại của mealList
    mealList.innerHTML = '';

    // Kiểm tra nếu 'favourites' không rỗng
    if (favourites.length > 0) {
        // Duyệt qua từng phần tử trong mảng 'favourites'
        favourites.forEach(favourite => {
            // Tạo và thêm HTML cho mỗi món yêu thích vào mealList
            mealList.innerHTML += `
                <div class="meal-item" data-id="${favourite.id}">
                    <div class="meal-img">
                        <img src="${favourite.img}" alt="${favourite.name}">
                    </div>
                    <div class="meal-name">
                        <h3>${favourite.name}</h3>
                        <button class="fav-btn fav btn-remove">Remove</button> 
                    </div>
                </div>
            `;
        });
    } else {
        // Nếu 'favourites' là rỗng, hiển thị thông báo không tìm thấy món ăn yêu thích
        mealList.innerHTML = "<p>You have no favourite meals saved. Find some meals and add them to your favourites!</p>";
    }

    // Cuối cùng, gắn sự kiện cho các nút yêu thích mới
    checkFavouriteButtons();
}

function checkFavouriteButtons() {  
    // Chọn tất cả các nút yêu thích trong danh sách món ăn và thêm sự kiện click 
    const favButtons = document.querySelectorAll('.meal-item .btn-remove');
    favButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mealItem = btn.closest('.meal-item');
            const mealId = mealItem.dataset.id;
            toggleFavourite(mealId, btn);
            mealItem.remove(); // Xóa element của món ăn ra khỏi DOM sau khi xóa ra khỏi localStorage
        });
    });
}
function toggleFavourite(mealId, button) { 
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const index = favourites.findIndex(item => item.id === mealId);
    // Không cần kiểm tra isFavourite ở đây, vì chức năng này là xóa mục yêu thích
    if (index > -1) {
        favourites.splice(index, 1);
        localStorage.setItem('favourites', JSON.stringify(favourites));
        loadFavourites(); // Tải lại danh sách yêu thích sau khi xóa
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
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                            <button class = "fav-btn btn-remove">Remove</button>
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