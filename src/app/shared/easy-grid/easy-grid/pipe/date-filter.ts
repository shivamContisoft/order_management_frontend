import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFilter',
    pure: false
})
export class DateFilterPipe implements PipeTransform {
    transform(date: any, column: any): any {
        if (column.isDate) {
            date = new Date(date);  // if orginal type was a string=
            return new DatePipe('en-US').transform(date, column.dateFormat ? column.dateFormat : "yyyy-MM-dd");
        }
    }
}