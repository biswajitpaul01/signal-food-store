import { Component, inject } from "@angular/core";
import { CategoryCardComponent } from "../../../shared/components/category-card/category-card.component";
import { FavoriteType } from "../../../shared/enums";
import { FavoriteService } from "../../favorites/services/favorite.service";
import { FoodCategoryService } from "../services/food-category.service";

@Component({
    selector: 'app-food-categories',
    templateUrl: './food-categories.component.html',
    styleUrl: './food-categories.component.scss',
    imports: [
        CategoryCardComponent
    ],
    standalone: true
})
export class FoodCategoriesComponent {
    private readonly favoriteService = inject(FavoriteService);
    foodCategoryService = inject(FoodCategoryService);
    foodCategories = this.foodCategoryService.foodCategories;

    onLikeBtnClicked(meal: any): void {
        this.favoriteService.setFavorite(FavoriteType.CATEGORY, meal);
    }

}