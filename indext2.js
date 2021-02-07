const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");
function searchMeal(e) {
  e.preventDefault();
  resultHeading.innerHTML = "";
  const term = search.value;
  console.log(term);
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2 class="h2">Search results for '${term}':</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<h2 class="h2">There are no search results. Try again!</h2>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
           
            <h3>${meal.strMeal}</h3></div>
            </div>`
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
      
}
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
      .then((res) => res.json())
      .then((data) => {
        const meal = data.meals[0];
        addMealToDOM(meal);
      });
  }
  function addMealToDOM(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    single_mealEl.innerHTML = `
    <div class="single-meal">
               
               <h4>Ingredients</h4>
          <ul>
              ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
          </ul>
      </div>
    </div>`;
  }
submit.addEventListener("submit", searchMeal);
mealsEl.addEventListener('click', (event) => {
    const mealInfo = event.path.find((item) => {
        if(item.classList){
            return item.classList.contains('meal-info')
        }
        else{
            return false;
        }
    })
    if(mealInfo){
      
        const mealID = mealInfo.getAttribute('data-mealid')
        getMealById(mealID);
    }
})


