import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CardPlaceholderComponent } from "../../../shared/components/card-placeholder/card-placeholder.component";
import { FoodCardComponent } from "../../../shared/components/food-card/food-card.component";
import { FavoriteType } from "../../../shared/enums";
import { FavoriteService } from "../../favorites/services/favorite.service";
import { FoodsByCategoryService } from "../services/foods-by-category.service";
import { FoodDetailsComponent } from "./food-details/food-details.component";

@Component({
    selector: 'app-foods',
    templateUrl: './foods.component.html',
    styleUrl: './foods.component.scss',
    imports: [
        FoodDetailsComponent,
        FoodCardComponent,
        CardPlaceholderComponent],
    standalone: true
})
export class FoodsComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly favoriteService = inject(FavoriteService);
    private readonly foodsByCategoryService = inject(FoodsByCategoryService);
    readonly foods = this.foodsByCategoryService.foods;

    ngOnInit(): void {
        this.route.queryParams.subscribe(({ category }) => this.foodsByCategoryService.selectedFoodCategory.set(category))
    }

    onLikeBtnClicked(meal: any): void {
        this.favoriteService.setFavorite(FavoriteType.FOOD, meal);
    }
}