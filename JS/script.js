const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal1');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const favoritesTableBody = document.querySelector('#favorites-container tbody');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
document.addEventListener('DOMContentLoaded', loadFavourites);


function loadFavourites() {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    
}
// Trong hàm addFavouriteButtons

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

// Sửa đổi object 'favourites' để lưu trữ các món ăn yêu thích dưới dạng một mảng
// của object chứa id, tên món ăn, và ảnh

function toggleFavourite(mealId, button, mealName, mealImg) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    
    const index = favourites.findIndex(item => item.id === mealId);
    const isFavourite = index > -1;
    
    if(isFavourite) {
        // Nếu đã có, xóa nó ra khỏi danh sách yêu thích và UI
        favourites.splice(index, 1);
        button.classList.remove('fav');
    } else {
        // Nếu chưa có, thêm vào danh sách yêu thích và UI
        favourites.push({
            id: mealId,
            name: mealName,
            img: mealImg
        });
        button.classList.add('fav');
    }
    
    // Lưu lại danh sách yêu thích
    localStorage.setItem('favourites', JSON.stringify(favourites));
}

// get meal list that matches with the ingredients
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
                            <button class = "fav-btn"><i class="fas fa-heart"></i></button>
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

function loadFavourites() { 
    // Lấy mảng 'favourites' từ 'localStorage' hoặc sử dụng mảng rỗng nếu chưa có
    let favourites = JSON.parse(localStorage.getItem('favourites')) || []; 
    const mealList = document.getElementById('meal1'); // Đảm bảo bạn có element này trong HTML của bạn

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
                        <button class="fav-btn fav"><i class="fas fa-heart"></i></button> 
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
    const favButtons = document.querySelectorAll('#favorites-container .fav-btn'); 
    favButtons.forEach(btn => { 
        btn.addEventListener('click', () => { 
            const mealId = btn.getAttribute('data-id'); 
            toggleFavourite(mealId, btn); 
        }); 
    }); 
}


// Bạn cần cung cấp đủ logic cho hàm toggleFavourite để nó có thể thêm/xóa mục ưa thích từ localStorage và cập nhật UI

