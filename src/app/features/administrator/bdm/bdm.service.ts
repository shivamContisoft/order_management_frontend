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
export class BdmService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {}

  public create(data) {
    return this.http.post<any>(`${environment.costplanner.host}/administrator/bdm/create`, { data })
      .pipe(map(result => {
        return result;
      }));
  }
  public addTarget(data) {
    return this.http.post<any>(`${environment.costplanner.host}/administrator/bdm/addTarget`, { data })
      .pipe(map(result => {
        return result;
      }));
  }

  public get() {
    return this.http.get<any[]>(`${environment.costplanner.host}/administrator/bdm/read`).pipe(map(result => {
      return result;
    }))
  }

  public update(data) {
    return this.http.post<any>(`${environment.costplanner.host}/administrator/bdm/update`, { data })
      .pipe(map(result => {
        return result;
      }));
  }

  public delete(id){
    return this.http.get<any>(`${environment.costplanner.host}/administrator/bdm/remove/?id=${id}`).pipe(map(result => {
      return result;
    }))
  }

  public getBdmYearData(year, bdmId) {
    return this.http.get<any>(`${environment.costplanner.host}/administrator/bdm/year/data/?year=${year}&bdmid=${bdmId}`).pipe(map(result => {
      return result;
    }))
  }

  public getBusinessUnit() {
    return this.http.get<any[]>(`${environment.costplanner.host}/administrator/bdm/read/business/unit`).pipe(map(result => {
      return result;
    }))
  }
 

}
