import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, computed, inject, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { EMPTY, catchError, filter, map, switchMap } from "rxjs";
import { formatToCartItem } from "../../../shared/helpers/food-details.helper";
import { FoodResult } from "../../../shared/interfaces/food-result.interface";
import { ApiService } from "../../../shared/services/api.service";
import { NotificationService } from "../../../shared/services/notification.service";

@Injectable({
    providedIn: 'root'
})
export class FoodsDetailsService extends ApiService {
    private readonly http = inject(HttpClient);
    private readonly notificationService = inject(NotificationService);
    selectedFood = signal<string | undefined>(undefined);

    private foodResult$ = toObservable(this.selectedFood)
        .pipe(
            filter(Boolean),
            switchMap(category => this.http.get<FoodResult>(`${this.baseUrl}/lookup.php?i=${category}`)),
            map(result => formatToCartItem(result.meals[0])),
            catchError((err: HttpErrorResponse) => {
                this.notificationService.show(err.message);
                return EMPTY;
            })
        );

    private foodResult = toSignal(this.foodResult$);
    foodDetails = computed(() => this.foodResult())
}