import { Injectable, inject, signal } from "@angular/core";
import { FavoriteType } from "../../../shared/enums";
import { FoodCategory } from "../../../shared/interfaces/food-category.interface";
import { Meal } from "../../../shared/interfaces/meal.interface";
import { NotificationService } from "../../../shared/services/notification.service";
import { StorageService } from "../../../shared/services/storage.service";

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    private readonly _categoryStorageKey = 'favoriteCategoryItems';
    private readonly _foodStorageKey = 'favoriteFoodItems';
    private readonly notificationService = inject(NotificationService);
    private readonly storageService = inject(StorageService);
    private _favoriteCategoriesMap = new Map<string, FoodCategory>();
    favoriteCategories = signal<FoodCategory[]>([]);
    private _favoriteFoodsMap = new Map<string, Meal>();
    favoriteFoods = signal<Meal[]>([]);

    constructor() {
        const favoriteCategoriesFromSessionStorage = this.storageService.get(this._categoryStorageKey);
        const favoriteFoodsFromSessionStorage = this.storageService.get(this._foodStorageKey);

        if (favoriteCategoriesFromSessionStorage) {
            const categories: FoodCategory[] = favoriteCategoriesFromSessionStorage;

            categories.forEach(category => {
                this._favoriteCategoriesMap.set(category.idCategory, category);
            });

            this.favoriteCategories.set([...this._favoriteCategoriesMap.values()]);
        }

        if (favoriteFoodsFromSessionStorage) {
            const foods: Meal[] = favoriteFoodsFromSessionStorage;

            foods.forEach(food => {
                this._favoriteFoodsMap.set(food.idMeal, food);
            });

            this.favoriteFoods.set([...this._favoriteFoodsMap.values()]);
        }
    }

    setFavorite(type: FavoriteType, item: FoodCategory | Meal): void {
        if (type === FavoriteType.CATEGORY) {
            const elem = item as FoodCategory;

            if (!this._favoriteCategoriesMap.has(elem.strCategory)) {
                this._favoriteCategoriesMap.set(elem.strCategory, elem);
                this.favoriteCategories.set([...this._favoriteCategoriesMap.values()]);
                this.storageService.set(this._categoryStorageKey, this.favoriteCategories());
                this.notificationService.show(`🎉 ${elem.strCategory} has been added to favorites.`);
            } else {
                this.notificationService.show(`🔔 ${elem.strCategory} is already added as favorites.`);
            }
        } else if (type === FavoriteType.FOOD) {
            const elem = item as Meal;

            if (!this._favoriteFoodsMap.has(elem.idMeal)) {
                this._favoriteFoodsMap.set(elem.idMeal, elem);
                this.favoriteFoods.set([...this._favoriteFoodsMap.values()]);
                this.storageService.set(this._foodStorageKey, this.favoriteFoods());
                this.notificationService.show(`🎉 ${elem.strMeal} has been added to favorites.`);
            } else {
                this.notificationService.show(`🔔 ${elem.strMeal} is already added as favorites.`);
            }
        }
    }

    removeFavorite(type: FavoriteType, item: FoodCategory | Meal): void {
        if (type === FavoriteType.CATEGORY) {
            const elem = item as FoodCategory;
            this._favoriteCategoriesMap.delete(elem.idCategory);
            this.favoriteCategories.set([...this._favoriteCategoriesMap.values()]);
            this.storageService.set(this._categoryStorageKey, this.favoriteCategories());
            this.notificationService.show(`🔔 ${elem.strCategory} has been removed from favorites.`);
        } else if (type === FavoriteType.FOOD) {
            const elem = item as Meal;
            this._favoriteFoodsMap.delete(elem.idMeal);
            this.favoriteFoods.set([...this._favoriteFoodsMap.values()]);
            this.storageService.set(this._foodStorageKey, this.favoriteFoods());
            this.notificationService.show(`🎉 ${elem.strMeal} has been removed from favorites.`);
        }
    }
}