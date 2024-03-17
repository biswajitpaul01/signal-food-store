import { Routes } from "@angular/router";

export const featureRoutes: Routes = [{
    path: 'foods',
    title: 'Foods',
    loadComponent: () => import('./foods/components/foods.component').then(c => c.FoodsComponent)
}, {
    path: 'food/:id',
    loadComponent: () => import('./foods/components/food-details/food-details.component').then(c => c.FoodDetailsComponent)
}, {
    path: 'favorites',
    title: 'Favorites',
    loadComponent: () => import('./favorites/components/favorites.component').then(c => c.FavoritesComponent)
}, {
    path: 'cart',
    title: 'Cart',
    loadComponent: () => import('./cart/components/cart.component').then(c => c.CartComponent)
}, {
    path: 'checkout',
    title: 'Checkout',
    loadComponent: () => import('./checkout/components/checkout.component').then(c => c.CheckoutComponent)
}];