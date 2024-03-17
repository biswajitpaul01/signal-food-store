import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    protected baseUrl = 'https://www.themealdb.com/api/json/v1/1';
    protected ingredientImageBaseUrl = 'https://www.themealdb.com/images/ingredients';
}