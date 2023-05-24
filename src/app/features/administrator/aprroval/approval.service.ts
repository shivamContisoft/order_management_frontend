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
export class ApprovalService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {}

  public getUserByDepartment(departmentId) {
    return this.http.get<any[]>(`${environment.costplanner.host}/administrator/user/bydepartment/?departmentId=${departmentId}`).pipe(map(result => {
      return result;
    }))
  }

  public create(data) {
    return this.http.post<any>(`${environment.costplanner.host}/administrator/approval/create`, { data })
      .pipe(map(result => {
        return result;
      }));
  }

  public get() {
    return this.http.get<any[]>(`${environment.costplanner.host}/administrator/approval/read`).pipe(map(result => {
      return result;
    }))
  }
  // public get() {
  //   return this.http.get<any[]>(`${environment.costplanner.host}/administrator/approval/getProducts`).pipe(map(result => {
  //     return result;
  //   }))
  // }
  public getApproval() {
    return this.http.get<any[]>(`${environment.costplanner.host}/administrator/approval/read`).pipe(map(result => {
      return result;
    }))
  }
  public delete(id) {
    return this.http.get<any>(`${environment.costplanner.host}/administrator/approval/remove/?id=${id}`).pipe(map(result => {
      return result;
    }))
  }

  public getByProductId(id) {
    return this.http.get<any>(`${environment.costplanner.host}/administrator/approval/byproduct/?id=${id}`).pipe(map(result => {
      return result;
    }))
  }

}
