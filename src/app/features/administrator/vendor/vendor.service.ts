import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { tap, debounceTime, switchMap, delay, map } from 'rxjs/operators';
import { tableData } from 'src/app/pages/tables/advancedtable/data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {}

  public create(data) {
    return this.http.post<any>(`${environment.costplanner.host}/administrator/vendor/create`, { data })
      .pipe(map(result => {
        return result;
      }));
  }
  public createBulk(data) {
    return this.http.post<any>(`${environment.costplanner.host}/administrator/vendor/create/bulk`, { data })
      .pipe(map(result => {
        return result;
      }));
  }
  public get() {
    return this.http.get<any[]>(`${environment.costplanner.host}/administrator/vendor/read`).pipe(map(result => {
      return result;
    }))
  }

  public update(data) {
    return this.http.post<any>(`${environment.costplanner.host}/administrator/vendor/update`, { data })
      .pipe(map(result => {
        return result;
      }));
  }

  public delete(id){
    return this.http.get<any>(`${environment.costplanner.host}/administrator/vendor/remove/?id=${id}`).pipe(map(result => {
      return result;
    }))
  }

}
