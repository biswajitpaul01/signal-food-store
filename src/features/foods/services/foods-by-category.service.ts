import { HttpClient } from "@angular/common/http";
import { Injectable, computed, inject, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { filter, map, switchMap } from "rxjs";
import { FoodsByCategoryResult } from "../../../shared/interfaces/foods-by-category-result.interface";
import { ApiService } from "../../../shared/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class FoodsByCategoryService extends ApiService {
    private http = inject(HttpClient);
    selectedFoodCategory = signal(undefined);

    private foodsByCategoryResult$ = toObservable(this.selectedFoodCategory)
        .pipe(
            filter(Boolean),
            switchMap(category => this.http.get<FoodsByCategoryResult>(`${this.baseUrl}/filter.php?c=${category}`)),
            map(result => result.meals)
        );

    private foodsByCategoryResult = toSignal(this.foodsByCategoryResult$);
    foods = computed(() => this.foodsByCategoryResult())
}