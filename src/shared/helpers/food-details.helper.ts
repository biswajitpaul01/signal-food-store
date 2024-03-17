import { FoodItem } from "../interfaces/food-item.interface";
import { MealDetails, ingredientKey, ingredientMeasureKey } from "../interfaces/meal-details.interface";

export const formatToCartItem = (food: MealDetails): FoodItem => {
    const ingredientImageBaseUrl = 'https://www.themealdb.com/images/ingredients';

    const ingredients = [];

    for (let index = 1; index <= 20; index++) {
        const ingredientkey = `strIngredient${index}` as ingredientKey;
        const measureKey = `strMeasure${index}` as ingredientMeasureKey;
        const ingredientName = food[ingredientkey];
        const measure = food[measureKey];

        if (ingredientName) {
            ingredients.push({
                name: `${measure} ${[ingredientName]}`,
                imageUrl: `${ingredientImageBaseUrl}/${ingredientName}.png`,
                thumbUrl: `${ingredientImageBaseUrl}/${ingredientName}-small.png`
            });
        }
    }

    const item: FoodItem = {
        id: food.idMeal,
        title: food.strMeal,
        thumb: food.strMealThumb,
        category: food.strCategory,
        price: (Number(food.idMeal) / 1000).toFixed(2),
        area: food.strArea,
        instructions: food.strInstructions,
        tags: food.strTags ? food.strTags.split(',') : [],
        ingredients
    }

    return item;
}