import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { tap, debounceTime, switchMap, delay, map } from 'rxjs/operators';
import { tableData } from 'src/app/pages/tables/advancedtable/data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApproveOrderService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {}

  public get(id) {
    return this.http.get<any[]>(`${environment.costplanner.host}/approval/read/?id=${id}`).pipe(map(result => {
      return result;
    }))
  }

  public markAsApproval(orderid, productType,approveComment) {
    return this.http.get<any[]>(`${environment.costplanner.host}/approval/markasapproval/read/?orderid=${orderid}&producttype=${productType}&approveComment=${approveComment}`).pipe(map(result => {
      return result;
    }))
  }

  public markAsRejected(orderid, approveComment) {
    return this.http.get<any[]>(`${environment.costplanner.host}/approval/markasreject/read/?orderid=${orderid}&approveComment=${approveComment}`).pipe(map(result => {
      return result;
    }))
  }

  public downloadFile(fileName,orderId) 
  { 
  window.location.assign(`${environment.costplanner.host}/approval/downloadFile/?orderId=${orderId}&document_name=${fileName}`);
    
}
public getApprovedByMe(userId) {
  return this.http.get<any[]>(`${environment.costplanner.host}/order/getApprovedByMeOrders/?userId=${userId}`).pipe(map(result => {
    return result;
  }))
}
 
}
