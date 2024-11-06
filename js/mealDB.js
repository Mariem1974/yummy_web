import { Render } from "./render.js";
export class MealDB extends Render {
  constructor(baseUrl) {
    super();
    this.baseUrl = baseUrl;
  }

  async #fetchData(endpoint) {
    let response = await fetch(`${this.baseUrl}${endpoint}`);
    response = await response.json();
    return response;
  }

  //get all meals NumOfCards is empty string return all result
  async SearchByMealName(name) {
    const dataResponse = await this.#fetchData(
      `search.php?s=${name ? name : ""}`
    );
    return super.renderMealCards(dataResponse, 20);
  }

  //get all meals NumOfCards is empty string return all result
  async SearchMealByLetter(char) {
    const dataResponse = await this.#fetchData(
      `search.php?f=${char ? char : "a"}`
    );
    return super.renderMealCards(dataResponse, 20);
  }

  //get all meals categories
  async allMealsCategories(numberOfMeals) {
    const dataResponse = await this.#fetchData("categories.php");
    return super.renderMealsCatagories(dataResponse, numberOfMeals);
  }

  //get all areas
  async allAreas() {
    const dataResponse = await this.#fetchData("list.php?a=list");
    return super.renderAreas(dataResponse);
  }

  //get all meals  ingredients
  async allIngredients(numberOfIngredients) {
    const dataResponse = await this.#fetchData(`list.php?i=list`);
    return super.renderIngredients(dataResponse, numberOfIngredients);
  }

  //get specific meal by meal id
  async mealDetails(mealId) {
    const dataResponse = await this.#fetchData(`lookup.php?i=${mealId}`);
    return super.renderMealDetails(dataResponse);
  }

  //get all meals in specific area
  async filterByAreas(area) {
    const dataResponse = await this.#fetchData(`filter.php?a=${area}`);
    return super.renderMealCards(dataResponse, 20);
  }

  //get all meals by specific ingredient
  async filterByIngredients(ingredient) {
    const dataResponse = await this.#fetchData(`filter.php?i=${ingredient}`);
    return super.renderMealCards(dataResponse, 20);
  }

  //get all meals by specific category
  async filterByCategory(category) {
    const dataResponse = await this.#fetchData(`filter.php?c=${category}`);
    return super.renderMealCards(dataResponse, 20);
  }
}
