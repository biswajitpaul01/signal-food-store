import { Component } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-error',
    template: `<div class="error-wrapper">
        <p>Something went wrong! Please try again later.</p>
    </div>`,
    styleUrl: './error.component.scss',
    imports: [
        MatIconModule
    ],
    standalone: true
})
export class ErrorComponent {

}