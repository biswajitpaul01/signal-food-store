import { Component, OnInit, inject } from "@angular/core";
import { CartService } from "../../cart/services/cart.service";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss',
    imports: [],
    standalone: true
})
export class CheckoutComponent implements OnInit {
    private readonly cartService = inject(CartService);

    ngOnInit(): void {
        this.cartService.clearCart();
    }

}