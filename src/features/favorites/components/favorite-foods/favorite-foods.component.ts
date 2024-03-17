import { Component, inject } from "@angular/core";
import { FoodCardComponent } from "../../../../shared/components/food-card/food-card.component";
import { FavoriteType } from "../../../../shared/enums";
import { FavoriteService } from "../../services/favorite.service";

@Component({
    selector: 'app-favorite-foods',
    templateUrl: './favorite-foods.component.html',
    styleUrl: './favorite-foods.component.scss',
    imports: [
        FoodCardComponent
    ],
    standalone: true
})
export class FavoriteFoodsComponent {
    private readonly favoriteService = inject(FavoriteService);
    readonly favoriteFoods = this.favoriteService.favoriteFoods;

    onLikeBtnClicked(meal: any): void {
        this.favoriteService.removeFavorite(FavoriteType.FOOD, meal);
    }
}