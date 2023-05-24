import { Injectable } from "@angular/core";
import { CommonClass } from './common';

@Injectable({
    providedIn: 'root',
})

export class SearchClass {

    constructor(private commonClass: CommonClass) { }

    public search(searchQuery: string, searchBy: string, searchArray: any) {
        let results: any = [];
        if (searchBy === "1$2#3&") {
            searchArray.map((element: any) => {
                Object.keys(element).map((key) => {
                    if (String(element[key]).toLowerCase().indexOf(searchQuery.toLocaleLowerCase()) != -1)
                        if (!this.commonClass.itemExists(results, element)) results.push(element);
                });
            });
        } else {
            searchArray.map((element: any) => {
                if (String(element[searchBy]).toLowerCase().indexOf(searchQuery.toLocaleLowerCase()) != -1)
                    if (!this.commonClass.itemExists(results, element)) results.push(element);
            });
        }

        return results
    }

}