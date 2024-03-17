import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    // Set an item in session storage
    set(key: string, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    // Get an item from session storage
    get(key: string): any {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    // Remove an item from session storage
    remove(key: string): void {
        sessionStorage.removeItem(key);
    }

    // Clear all items from session storage
    clear(): void {
        sessionStorage.clear();
    }
}