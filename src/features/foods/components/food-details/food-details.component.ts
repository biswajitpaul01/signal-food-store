import { CurrencyPipe } from "@angular/common";
import { Component, OnInit, computed, effect, inject } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { ImgFigureComponent } from "../../../../shared/components/img-figure/img-figure.component";
import { FoodItem } from "../../../../shared/interfaces/food-item.interface";
import { CartService } from "../../../cart/services/cart.service";
import { FoodsDetailsService } from "../../services/food-details.service";

@Component({
    selector: 'app-food-details',
    templateUrl: './food-details.component.html',
    styleUrl: './food-details.component.scss',
    imports: [
        MatChipsModule,
        MatIconModule,
        MatButtonModule,
        CurrencyPipe,
        ImgFigureComponent
    ],
    standalone: true
})
export class FoodDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private foodDetailsService = inject(FoodsDetailsService);
    private cartService = inject(CartService);
    food = this.foodDetailsService.foodDetails;
    pageTitle = computed(() => this.food()?.title);


    constructor(
        private title: Title
    ) {
        effect(() => this.title.setTitle(this.pageTitle() ?? 'Food Details'))

    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.foodDetailsService.selectedFood.set(id);
        }
    }

    addToCart(food: FoodItem): void {
        this.cartService.setCartItem(food);
    }
}