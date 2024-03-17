import { Component, computed, inject } from "@angular/core";
import { MatTabsModule } from '@angular/material/tabs';
import { FavoriteService } from "../services/favorite.service";
import { FavoriteCategoriesComponent } from "./favorite-categories/favorite-categories.component";
import { FavoriteFoodsComponent } from "./favorite-foods/favorite-foods.component";

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.scss',
    imports: [
        FavoriteCategoriesComponent,
        FavoriteFoodsComponent,
        MatTabsModule
    ],
    standalone: true
})
export class FavoritesComponent {
    private readonly favoriteService = inject(FavoriteService);
    favoriteCategories = this.favoriteService.favoriteCategories;
    favoriteFoods = this.favoriteService.favoriteFoods;
    favoriteCategoriesLabel = computed(() => `Favorite Categories (${this.favoriteCategories().length})`);
    favoriteFoodsLabel = computed(() => `Favorite Foods (${this.favoriteFoods().length})`);

}