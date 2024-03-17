import { Injectable, signal } from "@angular/core";
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
    private _favoriteCategoriesMap = new Map<string, FoodCategory>();
    favoriteCategories = signal<FoodCategory[]>([]);
    private _favoriteFoodsMap = new Map<string, Meal>();
    favoriteFoods = signal<Meal[]>([]);

    constructor(
        private readonly notificationService: NotificationService,
        private readonly storageService: StorageService

    ) {
        const favoriteCategoriesFromSessionStorage = storageService.get(this._categoryStorageKey);
        const favoriteFoodsFromSessionStorage = storageService.get(this._foodStorageKey);

        if (favoriteCategoriesFromSessionStorage) {
            const items: FoodCategory[] = favoriteCategoriesFromSessionStorage;

            items.forEach(element => {
                this._favoriteCategoriesMap.set(element.idCategory, element);
            });

            this.favoriteCategories.set([...this._favoriteCategoriesMap.values()]);
        }

        if (favoriteFoodsFromSessionStorage) {
            const items: Meal[] = favoriteFoodsFromSessionStorage;

            items.forEach(element => {
                this._favoriteFoodsMap.set(element.idMeal, element);
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
            this._favoriteCategoriesMap.delete(elem.strCategory);
            this.favoriteCategories.set([...this._favoriteCategoriesMap.values()]);
            this.storageService.set(this._categoryStorageKey, [...this.favoriteCategories()]);
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