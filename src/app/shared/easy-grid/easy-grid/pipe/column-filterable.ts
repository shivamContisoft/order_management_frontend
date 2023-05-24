import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterable',
    pure: false
})
export class ColumnFilterablePipe implements PipeTransform {
    transform(columns: any): any {
        return columns.filter((col: any) => col.isEnabled && col.filterable);
    }
}