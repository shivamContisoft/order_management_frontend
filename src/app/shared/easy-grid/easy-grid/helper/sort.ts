import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class SortClass {

    // Function to sort the data in ascending and descending order with every column available in dataColumns with [sortable = true]
    public sort(sortKey: string, sortOrder: Number, dataArray: any, callback: any) {
        if (sortOrder == 0) {
            dataArray.sort((a: any, b: any) => (a[sortKey] > b[sortKey]) ? 1 : ((b[sortKey] > a[sortKey]) ? -1 : 0));
            sortOrder = 1;
        } else if (sortOrder == 1) {
            dataArray.sort((a: any, b: any) => (a[sortKey] > b[sortKey]) ? -1 : ((b[sortKey] > a[sortKey]) ? 1 : 0));
            sortOrder = 2;
        } else {
            dataArray.sort((a: any, b: any) => (a[sortKey] > b[sortKey]) ? 1 : ((b[sortKey] > a[sortKey]) ? -1 : 0));
            sortOrder = 1;
        }
        callback(dataArray, sortOrder)
    }

}