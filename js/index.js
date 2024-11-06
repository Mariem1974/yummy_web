import { MealDB } from "./mealDB.js";
import { Render } from "./render.js";
import { Validation } from "./validation.js";

const apiLink = "https://www.themealdb.com/api/json/v1/1/";
const valid = new Validation();
const render = new Render();
const mealDb = new MealDB(apiLink);

//list animation
function listToggler(up, transitionTime) {
  let items = $(".side-nav .left ul > li");
  if (up) {
    for (let i = 0; i < items.length; i++) {
      items.eq(i).animate(
        {
          top: 0,
        },
        transitionTime + i * 100
      );
    }
  } else {
    items.animate({ top: 200 }, transitionTime);
  }
}

//nav animation
function toggleNav(duration) {
  const openClose = $(".side-nav .right #open-close");
  const leftWidth = $(".side-nav .left").outerWidth();
  if ($(openClose).hasClass("fa-align-justify")) {
    $(".side-nav").animate(
      {
        left: 0,
      },
      duration
    );
    listToggler(true, 500);
  } else {
    $(".side-nav").animate(
      {
        left: -leftWidth,
      },
      duration
    );
    listToggler(false, 500);
  }
  $(openClose).toggleClass("fa-align-justify");
  $(openClose).toggleClass("fa-x");
}

function closeNav(duration) {
  const leftWidth = $(".side-nav .left").outerWidth();
  $(".side-nav").animate(
    {
      left: -leftWidth,
    },
    duration
  );
  listToggler(false, 500);
  $(".side-nav .right #open-close").addClass("fa-align-justify");
  $(".side-nav .right #open-close").removeClass("fa-x");
}

// open and close nav
$(".side-nav .right #open-close").on("click", function () {
  toggleNav(500);
});

//on loading
$(document).ready(async function () {
  const initData = await mealDb.SearchByMealName();
  $("#data-container").html(initData);
  $(".pre-loading").fadeOut(500, function () {
    //move nav above the preloading page
    $(".side-nav").css("zIndex", 10000);
  });
  $(".side-nav .right").animate(
    {
      marginLeft: 0,
    },
    400
  );
});

//display preloading until fetch is done
async function preloadingData(getFunction) {
  $(".pre-loading").css("display", "flex");
  closeNav(600);
  const data = await getFunction(20);
  $("#data-container").html(data);
  $(".pre-loading").fadeOut(500);
}

//navigator
$(".side-nav .left ul > li").on("click", async function () {
  const id = $(this).attr("id");

  if (id != "nav-contact-us") {
    $(".form").css("display", "none");
  }
  if (id != "nav-search") {
    $(".search-page ").css("display", "none");
  }

  switch (id) {
    case "nav-search":
      //do not save last search if you go to another page
      $(".search-page input").val("");
      render.toggleSearch();
      closeNav(600);
      break;

    case "nav-categories":
      preloadingData(() => {
        return mealDb.allMealsCategories(20);
      });
      break;

    case "mav-area":
      preloadingData(() => {
        return mealDb.allAreas();
      });
      break;

    case "nav-Ingredients":
      preloadingData(() => {
        return mealDb.allIngredients(20);
      });
      break;

    case "nav-contact-us":
      render.toggleForm();
      closeNav(600);
  }
});

//form validation
$(".input-inner input").on("input", function () {
  const id = $(this).attr("id");
  const val = $(this).val();
  switch (id) {
    case "name":
      render.getAlert(!valid.nameValidation(val), $(this).siblings());
      break;

    case "email":
      render.getAlert(!valid.emailValidation(val), $(this).siblings());
      break;

    case "phone":
      render.getAlert(!valid.phoneValidation(val), $(this).siblings());
      break;

    case "age":
      render.getAlert(!valid.ageValidation(val), $(this).siblings());
      break;

    case "password":
      render.getAlert(!valid.passwordValidation(val), $(this).siblings());
      break;

    case "repassword":
      render.getAlert(
        !valid.repasswordValidation(val, $("#password").val()),
        $(this).siblings()
      );
  }

  if (
    valid.allDataValid(
      $("#name").val(),
      $("#email").val(),
      $("#phone").val(),
      $("#age").val(),
      $("#password").val(),
      $("#repassword").val()
    )
  ) {
    $("#form-submit").removeAttr("disabled");
  } else {
    $("#form-submit").prop("disabled", true);
  }
});

//ask questions why window
//filter by categories
window.categoryClicked = async function (category) {
  preloadingData(() => {
    return mealDb.filterByCategory(category);
  });
};

//filter by area
window.areaClicked = async function (area) {
  preloadingData(() => {
    return mealDb.filterByAreas(area);
  });
};

//filter by ingredients
window.ingredientClicked = async function (ingredient) {
  preloadingData(() => {
    return mealDb.filterByIngredients(ingredient);
  });
};

//open meal info
window.mealInfo = async function (mealId) {
  preloadingData(() => {
    return mealDb.mealDetails(mealId);
  });
};

//search by name
$("#search-name").on("input", function () {
  preloadingData(() => {
    return mealDb.SearchByMealName($(this).val());
  });
});

// search by char
$("#search-letter").on("input", function () {
  preloadingData(() => {
    return mealDb.SearchMealByLetter($(this).val());
  });
});
