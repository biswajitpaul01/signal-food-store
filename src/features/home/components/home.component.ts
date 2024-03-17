import { Component } from "@angular/core";
import { ErrorComponent } from "../../../shared/components/error/error.component";
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { FoodCategoriesComponent } from "../../food-categories/components/food-categories.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        FoodCategoriesComponent,
        LoaderComponent,
        ErrorComponent
    ],
    standalone: true
})
export class HomeComponent {

}