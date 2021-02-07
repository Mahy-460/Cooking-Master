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
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
            <button onclick="displayCountryDetail('${meal.name}')">Details</button>
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
submit.addEventListener("submit", searchMeal);



// fetch('https://restcountries.eu/rest/v2/all')
// .then(res => res.json())
// .then(data => displayCountry(data))


// const displayCountry = countries =>{
//     const cDiv = document.getElementById('countris');
//     countries.forEach(country=> {
        
//        const countryDiv = document.createElement('div');  
//         countryDiv.className = 'country';
//         const info = `
//            <h3 class="country-name">${country.name}</h3>
//            <p>${country.capital}</p>
//            <button onclick="displayCountryDetail('${country.name}')">Details</button>
           
//         `;
//         countryDiv.innerHTML = info;
//         cDiv.appendChild(countryDiv);
//     });


// const displayCountryDetail = name=>{
//     const url = `https://restcountries.eu/rest/v2/name/${name}`
//     fetch(url)
//     .then(res => res.json())
//     .then(data => renderCountryInfo(data[0]));
// }

// const renderCountryInfo = country =>{
//     console.log(country)
//     const countryDiv = document.getElementById('countryDetail');
//     let ful = countryDiv.innerHTML =`
//         <h1>Country-Name :  ${country.name}</h1>
//         <h3>Capital :  ${country.capital}</h3>
//         <p>Population :  ${country.population}</p>
//         <p>Area :  ${country.area}<p>
//         <p>Time : ${country.timezones}</p>
//         <img src="  ${country.flag}">
        
//     `
// }
