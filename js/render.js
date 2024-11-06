export class Render {
  //shorten the description coming from api to any length
  #shortenDescription(description, length) {
    const newDes = description.split(" ");
    length = Math.min(length, newDes.length);
    return newDes.splice(0, length).join(" ");
  }

  //get all meals from response as html
  renderMealCards(dataResponse, maxCardNumber) {
    let content = "";
    for (let i = 0; i < dataResponse.meals?.length && i < maxCardNumber; i++) {
      content += `<div class="item col-md-6 col-xl-3" onclick="mealInfo('${dataResponse.meals[i].idMeal}')">
            <div class="inner position-relative overflow-hidden rounded-3">
              <img
                src="${dataResponse.meals[i].strMealThumb}"
                alt="${dataResponse.meals[i].strMeal} image"
              />
              <div
                class="over-lay position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center p-2"
              >
                <h2>${dataResponse.meals[i].strMeal}</h2>
              </div>
            </div>
          </div>`;
    }

    return content;
  }

  //get all catagories from response as html
  renderMealsCatagories(dataResponse, maxCardNumber) {
    let content = "";
    for (
      let i = 0;
      i < maxCardNumber && i < dataResponse.categories.length;
      i++
    ) {
      content += `<div class="item col-md-6 col-xl-3" onclick="categoryClicked('${
        dataResponse.categories[i].strCategory
      }')" >
            <div class="inner  position-relative overflow-hidden rounded-3">
              <img
                src="${dataResponse.categories[i].strCategoryThumb}"
                alt="${dataResponse.categories[i].strCategory} image"
              />
              <div
                class="over-lay rounded-3 position-absolute top-0 start-0 end-0 bottom-0 text-center p-2"
              >
                <h2>${dataResponse.categories[i].strCategory}</h2>
                <p>
                ${this.#shortenDescription(
                  dataResponse.categories[i].strCategoryDescription.replace(
                    /\[.*?\]/g,
                    ""
                  ),
                  20
                )}
                </p>
              </div>
            </div>
          </div>`;
    }

    return content;
  }

  //render specific meal details
  renderMealDetails(dataResponse) {
    const res = dataResponse.meals[0];

    function getRecipe() {
      let content = '<ul class="list-unstyled d-flex flex-wrap">';
      for (let i = 1; i <= 20; i++) {
        if (res[`strIngredient${i}`]) {
          content += `<li class="alert alert-info m-2 p-1">${
            res[`strMeasure${i}`]
          }${res[`strIngredient${i}`]}</li>`;
        }
      }
      content += "</ul>";
      return content;
    }

    function getTags() {
      let content = '<ul class="list-unstyled d-flex">';
      const arr = res.strTags?.split(",");
      if (!arr) {
        content += `<li class="alert alert-info m-2 p-1">No Tags</li>`;
        return content + "</ul>";
      }
      for (let i = 0; i < arr.length; i++) {
        content += `<li class="alert alert-info m-2 p-1">${arr[i]}</li>`;
      }
      return content + "</ul>";
    }

    return `<div class="col-md-4">
            <div class="inner rounded-2 py-4">
              <img
                src="${res.strMealThumb}"
                class="rounded-3"
                alt="${res.strMeal} image"
              />
              <h2 class="text-white">${res.strMeal}</h2>
            </div>
          </div>
          <div class="col-md-8 text-white py-4">
            <h2>Instructions</h2>
            <p>
            ${res.strInstructions}
            </p>
            <h3>Area : ${res.strArea}</h3>
            <h3>Category : ${res.strCategory}</h3>
            <h3>Recipes :</h3>
            ${getRecipe()}
            <h3>Tags :</h3>
            ${getTags()}
            <div>
              <a class="text-decoration-none text-white btn btn-success" href="https://www.bbcgoodfoodme.com/"
                >source</a
              >
              <a class="text-decoration-none text-white btn btn-danger" href="${
                res.strYoutube
              }"
                >Youtube</a
              >
            </div>
          </div>`;
  }

  //all areas
  renderAreas(dataResponse) {
    let content = "";
    for (let i = 0; i < dataResponse.meals.length; i++) {
      content += `<div class="item col-md-6 col-xl-3 mb-4" onclick="areaClicked('${dataResponse.meals[i].strArea}')">
            <div class="inner text-white text-center">
              <i class="fa-solid fa-house-laptop fa-4x"></i>
              <h2>${dataResponse.meals[i].strArea}</h2>
            </div>
          </div>`;
    }
    return content;
  }

  //render all ingredients
  renderIngredients(dataResponse, maxNumber) {
    let content = "";
    for (let i = 0; i < dataResponse.meals.length && i < maxNumber; i++) {
      content += `<div class="item col-md-6 col-xl-3 mb-4" onclick="ingredientClicked('${
        dataResponse.meals[i].strIngredient
      }')">
            <div class="inner text-white text-center">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h3>${dataResponse.meals[i].strIngredient}</h3>
              <p>
                ${this.#shortenDescription(
                  dataResponse.meals[i].strDescription,
                  20
                )}
              </p>
            </div>
          </div>`;
    }
    return content;
  }

  //render form
  toggleForm() {
    if ($(".form").css("display") == "none") {
      $(".form").fadeIn();
    }
    $("#data-container").html("");
  }

  toggleSearch() {
    if ($(".search-page").css("display") == "none") {
      $(".search-page").fadeIn();
    }
    $("#data-container").html("");
  }

  //toggle alert message in form
  getAlert(triggerAlert, element) {
    if (triggerAlert) {
      $(element).addClass("d-block");
      $(element).removeClass("d-none");
    } else {
      $(element).removeClass("d-block");
      $(element).addClass("d-none");
    }
  }
}
