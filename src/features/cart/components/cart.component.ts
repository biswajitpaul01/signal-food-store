import { CurrencyPipe, JsonPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from "@angular/router";
import { range, toArray } from "rxjs";
import { ImgFigureComponent } from "../../../shared/components/img-figure/img-figure.component";
import { CartItem } from "../../../shared/interfaces/cart-item.interface";
import { CartService } from "../services/cart.service";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
    imports: [JsonPipe, CurrencyPipe, MatButtonModule, MatIconModule, ImgFigureComponent, RouterLink, MatTableModule],
    standalone: true
})
export class CartComponent {
    cartService = inject(CartService);
    totalQuantities = toSignal(range(1, 20).pipe(toArray()));
    cartItems = this.cartService.cartItems;
    cartSubtotal = this.cartService.cartSubTotal;
    tax = this.cartService.tax;
    shippingCharge = this.cartService.shippingCharge;
    cartTotal = this.cartService.cartTotal;

    displayedColumns: string[] = ['preview', 'price', 'quantity', 'totalPrice', 'actions'];
    dataSource = this.cartService.cartItems;

    cartQtyChange(event: any, item: CartItem): void {
        this.cartService.updateQuantity(item, event.target.value)
    }

    removeCartItem(item: CartItem): void {
        this.cartService.removeItemFromCart(item)
    }

}