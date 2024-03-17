import { FoodItem } from "./food-item.interface";

export interface CartItem extends FoodItem {
    quantity: number;
    totalPrice: string;
}