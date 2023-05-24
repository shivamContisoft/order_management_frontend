import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class CommonClass {

    // this function helps to trim the string for searching
    public trimString(s: string) {
        var l = 0, r = s.length - 1;
        while (l < s.length && s[l] == ' ') l++;
        while (r > l && s[r] == ' ') r -= 1;
        return s.substring(l, r + 1).toLocaleLowerCase();
    }

    // this confirms there are no duplicate items in result array
    public itemExists(haystack: any = [], needle: any) {
        for (var i = 0; i < haystack.length; i++) if (this.compareObjects(haystack[i], needle)) return true;
        return false;
    }

    // helps to find duplicate items by comparing them
    private compareObjects(obj1: any = [], obj2: any = []) {
        var k = '';
        for (k in obj1) if (obj1[k] != obj2[k]) return false;
        for (k in obj2) if (obj1[k] != obj2[k]) return false;
        return true;
    }

}