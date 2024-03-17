import { Component, inject } from "@angular/core";
import { CategoryCardComponent } from "../../../../shared/components/category-card/category-card.component";
import { FavoriteType } from "../../../../shared/enums";
import { FavoriteService } from "../../services/favorite.service";

@Component({
    selector: 'app-favorite-categories',
    templateUrl: './favorite-categories.component.html',
    styleUrl: './favorite-categories.component.scss',
    imports: [
        CategoryCardComponent
    ],
    standalone: true
})
export class FavoriteCategoriesComponent {
    private readonly favoriteService = inject(FavoriteService);
    readonly favoriteCategories = this.favoriteService.favoriteCategories;

    onLikeBtnClicked(meal: any): void {
        this.favoriteService.removeFavorite(FavoriteType.CATEGORY, meal);
    }
}