import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, computed, inject, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { EMPTY, catchError, filter, map, switchMap } from "rxjs";
import { FoodsByCategoryResult } from "../../../shared/interfaces/foods-by-category-result.interface";
import { ApiService } from "../../../shared/services/api.service";
import { NotificationService } from "../../../shared/services/notification.service";

@Injectable({
    providedIn: 'root'
})
export class FoodsByCategoryService extends ApiService {
    private readonly http = inject(HttpClient);
    private readonly notificationService = inject(NotificationService);
    selectedFoodCategory = signal(undefined);

    private foodsByCategoryResult$ = toObservable(this.selectedFoodCategory)
        .pipe(
            filter(Boolean),
            switchMap(category => this.http.get<FoodsByCategoryResult>(`${this.baseUrl}/filter.php?c=${category}`)),
            map(result => result.meals),
            catchError((err: HttpErrorResponse) => {
                this.notificationService.show(err.message);
                return EMPTY;
            })
        );

    private foodsByCategoryResult = toSignal(this.foodsByCategoryResult$);
    foods = computed(() => this.foodsByCategoryResult())
}