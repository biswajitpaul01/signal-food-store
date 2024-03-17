import { Component, inject } from "@angular/core";
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CartService } from "../../../features/cart/services/cart.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [
        RouterLink,
        RouterLinkActive,
        MatIconModule,
        MatBadgeModule
    ],
    standalone: true
})
export class HeaderComponent {
    private cartService = inject(CartService);
    cartTotal = this.cartService.cartItemsCount;
}