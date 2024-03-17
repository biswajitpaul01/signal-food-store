import { Component, inject, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { Meal } from "../../interfaces/meal.interface";

@Component({
    selector: 'app-food-card',
    templateUrl: './food-card.component.html',
    styleUrl: './food-card.component.scss',
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    standalone: true
})
export class FoodCardComponent {
    meal = input.required<Meal>();
    likeIcon = input<'remove' | 'favorite'>('favorite');
    likeBtnClicked = output<Meal>();
    private router = inject(Router);

    viewDetails(meal: Meal): void {
        this.router.navigate(['/food', meal.idMeal]);
    }

    setFavorite(meal: Meal): void {
        this.likeBtnClicked.emit(meal);
    }
}