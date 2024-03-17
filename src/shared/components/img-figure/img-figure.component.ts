import { Component, input } from "@angular/core";

@Component({
    selector: 'app-img-figure',
    templateUrl: './img-figure.component.html',
    styleUrl: './img-figure.component.scss',
    standalone: true
})
export class ImgFigureComponent {
    src = input.required<string>();
    caption = input<string>();
    size = input<number>();
    align = input<string>('center');
}