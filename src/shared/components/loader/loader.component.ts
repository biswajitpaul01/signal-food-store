import { Component } from "@angular/core";

@Component({
    selector: 'app-loader',
    template: `<div class="loading-wrapper"><div class="loader"></div></div>`,
    standalone: true,
    styleUrl: './loader.component.scss'
})
export class LoaderComponent {

}