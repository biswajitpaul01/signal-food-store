import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { EMPTY, catchError, map, shareReplay } from "rxjs";
import { FoodCategoriesResult } from "../../../shared/interfaces/food-categories-result.interface";
import { FoodCategory } from "../../../shared/interfaces/food-category.interface";
import { ApiService } from "../../../shared/services/api.service";
import { NotificationService } from "../../../shared/services/notification.service";

@Injectable({
    providedIn: 'root'
})
export class FoodCategoryService extends ApiService {
    private readonly http = inject(HttpClient);
    private readonly notificationService = inject(NotificationService);

    private foodCategoriesResult$ = this.http.get<FoodCategoriesResult>(`${this.baseUrl}/categories.php`)
        .pipe(
            map(result => result.categories),
            shareReplay(1),
            catchError((err: HttpErrorResponse) => {
                this.notificationService.show(err.message);
                return EMPTY;
            })
        );

    foodCategories = toSignal(this.foodCategoriesResult$, { initialValue: [] as FoodCategory[] });

}