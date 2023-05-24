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
export class BusinessCategoryService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {}

  public create(data) {
    return this.http.post<any>(`${environment.costplanner.host}/administrator/businessCategory/create`, { data })
      .pipe(map(result => {
        return result;
      }));
  }

  public get() {
    return this.http.get<any[]>(`${environment.costplanner.host}/administrator/businessCategory/read`).pipe(map(result => {
      return result;
    }))
  }

  public update(data) {
    return this.http.post<any>(`${environment.costplanner.host}/administrator/businessCategory/update`, { data })
      .pipe(map(result => {
        return result;
      }));
  }

  public delete(id){
    return this.http.get<any>(`${environment.costplanner.host}/administrator/businessCategory/remove/?id=${id}`).pipe(map(result => {
      return result;
    }))
  }

}
