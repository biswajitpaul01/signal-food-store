import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/components/home.component';

export const routes: Routes = [{
    path: '',
    title: 'Welcome to Food Arena',
    component: HomeComponent
}, {
    path: '',
    loadChildren: () => import('../features/features.routes').then(f => f.featureRoutes)
}];
