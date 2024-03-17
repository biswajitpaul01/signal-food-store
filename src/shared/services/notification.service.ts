import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    snackbarConfig: MatSnackBarConfig = {
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
        duration: 5000
    };


    constructor(
        private _snackBar: MatSnackBar
    ) { }

    show(message: string): void {
        this._snackBar.open(message, '❌', this.snackbarConfig);
    }
}