import { Component, inject, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { FoodCategory } from "../../interfaces/food-category.interface";
import { TruncatePipe } from "../../pipes/truncate.pipe";

@Component({
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
    styleUrl: './category-card.component.scss',
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        TruncatePipe
    ],
    standalone: true
})
export class CategoryCardComponent {
    category = input.required<FoodCategory>();
    likeIcon = input<'remove' | 'favorite'>('favorite');
    likeBtnClicked = output<FoodCategory>();
    private router = inject(Router);

    viewDetails(category: FoodCategory): void {
        this.router.navigate(['/foods'], { queryParams: { category: category.strCategory } });
    }

    setFavorite(category: FoodCategory) {
        this.likeBtnClicked.emit(category);
    }
}