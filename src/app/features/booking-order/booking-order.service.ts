import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { tap, debounceTime, switchMap, delay, map } from 'rxjs/operators';
import { tableData } from 'src/app/pages/tables/advancedtable/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class BookingOrderService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  // public EventValue=new Subject<any>;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public getEntity() {
    return this.http.get<any[]>(`${environment.costplanner.host}/administrator/entity/read`).pipe(map(result => {
      return result;
    }))
  }

  public getBdmById(buId) {
    return this.http.get<any[]>(`${environment.costplanner.host}/administrator/bdm/byid/?buId=${buId}`).pipe(map(result => {
      return result;
    }))
  }

  public getCustomer(entityId) {
    return this.http.get<any[]>(`${environment.costplanner.host}/administrator/customer/read/entity/?entityId=${entityId}`).pipe(map(result => {
      return result;
    }))
  }

  public getOrderType(orderType){
    return this.http.get<any[]>(`${environment.costplanner.host}/administrator/product/read/ordertype/?orderType=${orderType}`).pipe(map(result => {
      return result;
    }))
  }

  public create(data) {
    let Token = this.authService.currentUserValue.token;
    const headers = new HttpHeaders({});
    return this.http.post(`${environment.costplanner.host}/order/create`, data, { headers: headers });
  }

  public UpdateFullyApprovedData(data) {
    return this.http.post<any>(`${environment.costplanner.host}/order/createdata`, { data })
      .pipe(map(result => {
        return result;
      }));
  }
  public AddPurchasedInvoice(data) {
    return this.http.post<any>(`${environment.costplanner.host}/order/purchaseInvoice`, { data })
      .pipe(map(result => {
        return result;
      }));
  }
  public AddPaymentData(data) {
    return this.http.post<any>(`${environment.costplanner.host}/order/paymentData`, { data })
      .pipe(map(result => {
        return result;
      }));
  }
  public AddPurchasePaymentData(data) {
    return this.http.post<any>(`${environment.costplanner.host}/order/paymentPurchaseData`, { data })
      .pipe(map(result => {
        return result;
      }));
  }
  public AddVendorData(data) {
    return this.http.post<any>(`${environment.costplanner.host}/order/vendorData`, { data })
      .pipe(map(result => {
        return result;
      }));
  }
  public getInvoice() {
    return this.http.get<any[]>(`${environment.costplanner.host}/order/readInvoice`).pipe(map(result => {
      return result;
    }))
  }
  public getPurchaseInvoice() {
    return this.http.get<any[]>(`${environment.costplanner.host}/order/readPurchaseInvoice`).pipe(map(result => {
      return result;
    }))
  }
  public getInvoiceByOrder(orderid) {
    console.log(orderid);

    return this.http.get<any[]>(`${environment.costplanner.host}/order/readInvoiceByOrder?orderid=${orderid}`).pipe(map(result => {
      return result;
    }))
  }

  public getPurchaseInvoiceByOrder(orderid) {

    return this.http.get<any[]>(`${environment.costplanner.host}/order/readPurchaseInvoiceByOrder?orderid=${orderid}`).pipe(map(result => {
      return result;
    }))
  }
  public getVendorPoByOrder(orderid) {

    return this.http.get<any[]>(`${environment.costplanner.host}/order/readVendorPoByOrder?orderid=${orderid}`).pipe(map(result => {
      return result;
    }))
  }
  public getPaymentInvoiceById(invoiceid) {

    return this.http.get<any[]>(`${environment.costplanner.host}/order/readInvoicePayment?invoiceid=${invoiceid}`).pipe(map(result => {
      return result;
    }))
  }
  public getPurchasePaymentInvoiceById(invoiceid) {
    console.log(invoiceid, "invoiceid");

    return this.http.get<any[]>(`${environment.costplanner.host}/order/readPurchaseInvoicePayment?invoiceid=${invoiceid}`).pipe(map(result => {
      return result;
    }))
  }
  public getOrder() {
    let userId = this.authService.currentUserValue.user.id;
    //console.log("userid==>",userId);
    return this.http.get<any[]>(`${environment.costplanner.host}/order/read`).pipe(map(result => {
      return result;
    }))
  }

  public getOrdersforXL() {
    let userId = this.authService.currentUserValue.user.id;
    //console.log("userid==>",userId);
    return this.http.get<any[]>(`${environment.costplanner.host}/order/getOrdersforXL`).pipe(map(result => {
      return result;
    }))
  }

  public getOrderAM() {
    let userId = this.authService.currentUserValue.user.id;
    //console.log("userid==>",userId);
    return this.http.get<any[]>(`${environment.costplanner.host}/order/readAM/?userId=${userId}`).pipe(map(result => {
      return result;
    }))
  }
  public getOrderBDM() {
    let userId = this.authService.currentUserValue.user.id;
    //console.log("userid==>",userId);
    return this.http.get<any[]>(`${environment.costplanner.host}/order/readBDM/?userId=${userId}`).pipe(map(result => {
      return result;
    }))
  }
  public downloadFile(fileName, orderId) {
    window.location.assign(`${environment.costplanner.host}/approval/downloadFile/?orderId=${orderId}&document_name=${fileName}`);

  }

  // public getFullyApprovedOrder(userId) 
  // { 
  //   return this.http.get<any[]>(`${environment.costplanner.host}/order/getFullyApprovedOrder/?userId=${userId}`).pipe(map(result => {
  //     return result;
  //   }))
  // }
  public getFullyApprovedOrder() {
    return this.http.get<any[]>(`${environment.costplanner.host}/order/getFullyApprovedOrder`).pipe(map(result => {
      return result;
    }))
  }

  public getBdmUser(userId) {
    console.log(userId);

    return this.http.get<any[]>(`${environment.costplanner.host}/administrator/bdm/getuser/?userId=${userId}`).pipe(map(result => {
      return result;
    }))
  }
  public getYearData(year) {
    // console.log(year,"year");

    return this.http.get<any[]>(`${environment.costplanner.host}/administrator/bdm/year/?year=${year}`).pipe(map(result => {
      return result;
    }))
  }
  public dateFilter(data) {
    let fromDate = data.fromDate;
    let toDate = data.toDate;
    console.log(data, "Data")
    return this.http.get<any[]>(`${environment.costplanner.host}/order/dateFilter/?fromDate=${fromDate}&toDate=${toDate}`);
  }

  public dateFilterPurchase(data) {
    let fromDate = data.fromDate;
    let toDate = data.toDate;
    console.log(data, "Data")
    return this.http.get<any[]>(`${environment.costplanner.host}/order/dateFilterPurchase/?fromDate=${fromDate}&toDate=${toDate}`);

  }
  public deletePurchesInvoice(purchaseInvoiceId) {
    return this.http.get<any>(`${environment.costplanner.host}/order/removePurchaseInvoice/?id=${purchaseInvoiceId}`).pipe(map(result => {
      return result;
    }))
  }
  public deleteSaleInvoice(invoiceId) {
    return this.http.get<any>(`${environment.costplanner.host}/order/remove/?id=${invoiceId}`).pipe(map(result => {
      return result;
    }))
  }

  public deleteFullOrderbyId(orderId){
    return this.http.get<any>(`${environment.costplanner.host}/order/removeFullOrder/?id=${orderId}`).pipe(map(result => {
      return result;
    }))
  }


  public updatePurchaseInvoice(data) {
    console.log("00000")
    return this.http.post<any>(`${environment.costplanner.host}/order/purchaseinvoiceupdate`, { data })
      .pipe(map(result => {
        return result;
      }));
  }

  public updateSaleInvoice(data) {
    console.log(data, "dsfdsfsfd")
    return this.http.post<any>(`${environment.costplanner.host}/order/saleinvoiceupdate`, { data })
      .pipe(map(result => {
        return result;
      }));
  }

  public updateCustomerPayment(data) {
    return this.http.post<any>(`${environment.costplanner.host}/order/UpdatecustomerPayment`, { data })
      .pipe(map(result => {
        return result;
      }));
  }

  public updateCustomerPaymentInvoice(id, data) {
    return this.http.post<any>(`${environment.costplanner.host}/order/updateCustomerPaymentInvoice`, { id, data })
      .pipe(map(result => {
        return result;
      }));
  }


  public updateVendorPaymentInvoice(id, data) {
    return this.http.post<any>(`${environment.costplanner.host}/order/updateVendorPaymentInvoice`, { id, data })
      .pipe(map(result => {
        return result;
      }));
  }

  public deleteSalePaymentInvoice(id) {
    console.log(id);

    return this.http.get<any>(`${environment.costplanner.host}/order/deleteSalePaymentInvoice?id=${id}`)
      .pipe(map(result => {
        return result;
      }));
  }

  public deleteVendorPaymentInvoice(id) {
    return this.http.get<any>(`${environment.costplanner.host}/order/deleteVendorPaymentInvoice?id=${id}`)
      .pipe(map(result => {
        return result;
      }));
  }
}
