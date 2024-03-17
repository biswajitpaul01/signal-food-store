import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'truncate',
    standalone: true
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit = 80) {
        const str = value ? value.slice(0, limit) : value;

        return value.length > limit ? `${str}...` : value;
    }
}