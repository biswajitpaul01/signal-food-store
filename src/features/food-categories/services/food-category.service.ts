import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { map, shareReplay } from "rxjs";
import { FoodCategoriesResult } from "../../../shared/interfaces/food-categories-result.interface";
import { FoodCategory } from "../../../shared/interfaces/food-category.interface";
import { ApiService } from "../../../shared/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class FoodCategoryService extends ApiService {
    private http = inject(HttpClient);

    private foodCategoriesResult$ = this.http.get<FoodCategoriesResult>(`${this.baseUrl}/categories.php`)
        .pipe(
            map(result => result.categories),
            shareReplay(1)
        );

    foodCategories = toSignal(this.foodCategoriesResult$, { initialValue: [] as FoodCategory[] });

}