import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'columnFilter',
    pure: false
})
export class ColumnFilterPipe implements PipeTransform {
    transform(columns: any): any {
        return columns.filter((col: any) => col.isEnabled);
    }
}