import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { BookingOrderService } from '../booking-order/booking-order.service';
import * as XLSX from 'xlsx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent implements OnInit {


  Orders:any=[];
  NewData: any=[];
  error = '';
  downloadxlSheet:any=[];
  @ViewChild('studentDetailsExcel') orderExcelSheet:ElementRef
  constructor(private bookingOrderService:BookingOrderService ,private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getOrder();
  }


  getOrder() {
    this.bookingOrderService.getOrdersforXL().subscribe(result => {

      if (result['status'] == 200) {
        this.Orders = result['data']
        const finalOrders = [];
        this.Orders.forEach(order => {
            const ords = order.tbl_order_oems.map(oem => {finalOrders.push({
              // poNo: order.poNo, 
              // oemName: oem.oemName, 
              id: order.id,
              orderId: order.orderCode,
              orderdate: order.createdAt,
              customername: order.tbl_masters_customer.customerName,
              pono: order.poNo,
              povalue: order.poValue,
              podate: order.poDate,
              companyPaymentTerms:order.companyPaymentTerms,
              duration:order.duration,
              orderCode:order.orderCode,
              orderType:order.orderType,
              entityName:order.tbl_masters_entity.entityName,
              bdm:oem['tbl_masters_business_unit']['categoryName'],
              bdmPercentage:oem['bdmPercentage'],
              oem:oem['tbl_masters_oem']['oemName'],
              oemDealerId:oem['oemDealerId'],
              productType:oem['tbl_masters_product']['productName'],
              productDescription:oem['productDescription'],
              Status:order.status,
              // vendorName:oem['tbl_masters_vendor']['vendorName'],
              // vendorPaymentValue:oem['tbl_order_vendors.vendorPaymentValue'],
              // vendorPoValue:oem['tbl_order_vendors.vendorPoValue'],
              // vendorValue:oem['tbl_order_vendors.vendorValue'],
              externalCost:oem.externalCost,
              BR:order.BR,
              GP:order.GP,
              GPPercent:order.GPPercent,
              PM:order.PM,
              POGM:order.POGM,
              POGMPercent:order.POGMPercent,
            })})
        });
        this.NewData = finalOrders
        console.log(finalOrders,"finalOrders");
        console.log(this.NewData,"neworders");
        
        
      } else if (result['status'] == 201) {
        this.error = 'No credentials provided for authentication.';
      } else if (result['status'] == 202) {
        this.error = 'You have invalid User Name.';
      } else {
        this.error = 'Unknown error!';
      }
      setTimeout(() => {
        this.error = '';
      }, 5000);
    },
      error => {
        this.error = error ? error : '';
        setTimeout(() => {
          this.error = '';
        }, 5000);
      });
  }


  errormsg() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire(
      'Not Found',
      'Data is Not Found! Select another option:)',
      'error'
    );
  }

  downloadXlstudentList() {
    this.bookingOrderService.getOrder().subscribe(result => {
      console.log(result,"result Xl")
      if (result['status'] == 200) {
        this.downloadxlSheet = result['data']
        console.log((this.downloadxlSheet,"Xl"));
      
        setTimeout(() => {
          
          const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.orderExcelSheet.nativeElement);//converts a DOM TABLE element to a worksheet
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
         
          XLSX.utils.book_append_sheet(wb, ws, 'Order Details');
          /* save to file */

          XLSX.writeFile(wb, 'OrderDetails.xlsx');
          // this.isPrelimDownload = false;

        }, 1000);
      }
    });
  }





}
