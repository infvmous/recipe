

let mealBox= document.getElementById('meal-result');
let errorMsg = document.getElementById('error');
let searchBTN = document.getElementById('search-btn');
let mealNotFount = document.getElementById('meal-not-found');
let recipeCont = document.getElementById('res-container')

searchBTN.addEventListener('click', e => {
    e.preventDefault()
    
let seacrhInput = document.getElementById('Elmeal').value;

fetch (`https://themealdb.com/api/json/v1/1/search.php?s=${seacrhInput}`)
 .then (res => res.json ())
 .then (data => {
   
    errorMsg.innerHTML = `<h2>Search results for '${seacrhInput}':</h2>`;
    if (data.meals === null) {
        mealNotFount.innerHTML = `<p>There are no search results. Try again!<p>`;
      } else {
        mealBox.innerHTML = data.meals
          .map(
            meal => `
          <div class="meal" data-id="${meal.idMeal}">
          <span class="checked"><i class="fa-solid fa-heart"></i></span>
            <img class="food-image" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="meal-Info">
              <h3>${meal.strMeal}</h3>
              <button class="viewall" id="viewrecipe">View Recipe</button>
            </div>
          </div>
        `
          )
          .join('');
      }  

      let liked = 1;
      
      let likedEl = document.getElementById('yourlikes');
      let checked = document.querySelectorAll('.checked');

      checked.forEach(function(likes){
          likes.addEventListener('click', e => {
            likes.classList.toggle ('color');
             if (liked < 0){
                liked += 1;
                
             }  else {
                likedEl.innerHTML = `<i class="fa-solid fa-heart"></i> ${liked ++}`;
            }
           
          })  
        })

      let viewResBTN = document.querySelectorAll('.viewall');
      viewResBTN.forEach(function(Btns){
        Btns.addEventListener('click', e => {
            if (recipeCont.style.display = 'none') {
                recipeCont.style.display = 'block';
            }
            e.preventDefault()
            if (e.target.classList.contains('viewall')) {
                let mealItem = e.target.parentElement.parentElement;
                fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
                .then(res => res.json())
                .then(data => {
                  const meal = data.meals[0];

                  addMealToDOM(meal);

                  function addMealToDOM (meal) {
                    const ingredients = [];

                    for (let i=1; i<=20; ++i) {
                      if (meal[`strIngredient${i}`]) {
                        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
                      }
                      else {
                        break;
                      }
                    
                      recipeCont.innerHTML =  `
                     <div class="recipe" id="recipe-box">
                     <span class="close-btn"><i class="fa-sharp fa-regular fa-circle-xmark"></i></span>
                     <h2>${meal.strMeal}</h2>
                     <img class="modal-img" src="${meal.strMealThumb}"  alt="${meal.strMeal}">
                     <div class="ingredients-box">
                         <p class="category">Category: ${meal.strCategory}</p>
                         <p class="area">${meal.strArea}</p>
                     </div>
                     <div class="ingridients">
                     <h2>Ingridients</h2>
                     <ul>
                     ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                   </ul>
                     </div>
                     <div class="instruction-box">
                     <h2>Instruction</h2>
                         <p class="instruction">${meal.strInstructions}</p>
                         <a class="youtube-link" href="${meal.strYoutube}" >Watch Video</a>
                     </div>
                     
                 </div>
                     `;
                    }
                    let closeModal = document.querySelectorAll('.close-btn');
                    closeModal.forEach(function(closed){
                      closed.addEventListener('click', e => {
                        recipeCont.style.display = 'none';
                      })
                    })
                  }
                });
              
            }
        })
      })
    }); 
  
}); 





