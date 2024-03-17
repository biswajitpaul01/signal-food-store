import { Component } from "@angular/core";
import { MatTabsModule } from '@angular/material/tabs';
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

}