import { HttpClient } from "@angular/common/http";
import { Injectable, computed, inject, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { filter, map, switchMap } from "rxjs";
import { formatToCartItem } from "../../../shared/helpers/food-details.helper";
import { FoodResult } from "../../../shared/interfaces/food-result.interface";
import { ApiService } from "../../../shared/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class FoodsDetailsService extends ApiService {
    private http = inject(HttpClient);
    selectedFood = signal<string | undefined>(undefined);

    private foodResult$ = toObservable(this.selectedFood)
        .pipe(
            filter(Boolean),
            switchMap(category => this.http.get<FoodResult>(`${this.baseUrl}/lookup.php?i=${category}`)),
            map(result => formatToCartItem(result.meals[0]))
        );

    private foodResult = toSignal(this.foodResult$);
    foodDetails = computed(() => this.foodResult())
}