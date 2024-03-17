import { Ingredient } from "./ingredient.interface";

export interface FoodItem {
    id: string;
    title: string;
    thumb: string;
    category: string;
    price: string;
    area: string;
    instructions: string;
    tags: string[];
    ingredients: Ingredient[];
}