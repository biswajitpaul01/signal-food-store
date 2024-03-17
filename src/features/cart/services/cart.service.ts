import { Injectable, computed, signal } from "@angular/core";
import { CartItem } from "../../../shared/interfaces/cart-item.interface";
import { FoodItem } from "../../../shared/interfaces/food-item.interface";
import { ApiService } from "../../../shared/services/api.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { StorageService } from "../../../shared/services/storage.service";

@Injectable({
    providedIn: 'root'
})
export class CartService extends ApiService {
    private readonly _storageKey = 'cartItems';
    private _items = new Map<string, CartItem>();
    private _cartItems = signal<CartItem[]>([]);
    cartItems = computed(() => this._cartItems());
    cartItemsCount = computed(() => this.cartItems().length);
    cartSubTotal = computed(() => this.cartItems().reduce((prevTotal, item) => { return prevTotal + Number(item.totalPrice) }, 0));
    tax = computed(() => this.cartSubTotal() * 10 / 100);
    shippingCharge = computed(() => this.cartSubTotal() > 500 ? 0 : this.cartSubTotal() * 5 / 100);
    cartTotal = computed(() => this.cartSubTotal() + this.tax() + this.shippingCharge());

    constructor(
        private notificationService: NotificationService,
        private storageService: StorageService
    ) {
        super();
        const cartItemsFromSessionStorage = storageService.get(this._storageKey);

        if (cartItemsFromSessionStorage) {
            const items: CartItem[] = cartItemsFromSessionStorage;

            items.forEach(element => {
                this._items.set(element.id, element);
            });

            this._cartItems.set([...this._items.values()]);
        }
    }

    setCartItem(food: FoodItem): void {
        if (!this._items.has(food.id)) {
            this._items.set(food.id, { ...food, quantity: 1, totalPrice: food.price });
            this._cartItems.set([...this._items.values()]);
            this.notificationService.show('🎉 Food has been added to cart.');
            this.storageService.set(this._storageKey, [...this._items.values()]);
        } else {
            this.notificationService.show('🔔 Food is already in the cart.');
        }
    }

    updateQuantity(item: CartItem, quantity: number): void {
        const cartItems = this._cartItems()
            .map(cartItem => {
                if (cartItem.id === item.id) {
                    const updatedCartItem = {
                        ...cartItem,
                        quantity,
                        totalPrice: (quantity * Number(cartItem.price)).toFixed(2)
                    };
                    this._items.set(cartItem.id, updatedCartItem);

                    return updatedCartItem;
                } else {
                    return cartItem;
                }
            });

        this._cartItems.set(cartItems);
        this.storageService.set(this._storageKey, cartItems);
    }

    removeItemFromCart(item: CartItem): void {
        this._items.delete(item.id);
        this._cartItems.set([...this._items.values()]);
        this.storageService.set(this._storageKey, [...this._items.values()]);
        this.notificationService.show('🔔 Food has been removed from cart.');
    }

}