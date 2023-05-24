import { Component, OnInit } from '@angular/core';


import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { BookingOrderService } from '../booking-order/booking-order.service';
import { BdmService } from '../administrator/bdm/bdm.service';
import { OemService } from '../administrator/oem/oem.service';
import { CustomerService } from '../administrator/customer/customer.service';
import { AmService } from '../administrator/am/am.service';
import { ProductService } from '../administrator/product/product.service';
import { VendorService } from '../administrator/vendor/vendor.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { number } from 'echarts';
import { style } from '@angular/animations';
@Component({
  selector: 'app-all-invoices',
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.scss']
})
export class AllInvoicesComponent implements OnInit {

  navStyle = 'padding: 20px;';

  dateFormGroup: FormGroup;
  userId = 0;
  userAccountType: any;
  invoiceArray: any = [];
  invoice: any = [];
  error = '';
  purchaseInvoice: any = [];
  tempArray: any = [];
  saleInvoice: any;
  //saleInvoicesArray: any;
  // purchaseInvoicesArray: any;
  saleArray: any;
  purchaseArray: any;
  data: any = []
  data1: any = []
  invoicesArray: any = []
  active = 1;


  saleInvoicesArray: Array<any> = []
  Columns: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'order_id', value: 'OrderID', sortable: true, isEnabled: true },
    { name: 'customerName', value: 'Company Name', sortable: true, isEnable: true}, 
    { name: 'poNo', value: 'Po No', sortable: true, isEnabled: true },
    { name: 'poValue', value: 'PoValue', sortable: true, isEnabled: true },
    { name: 'invoiceNumber', value: 'TIPL Invoice No', sortable: true, isEnabled: true },
    //   { name: 'orderdate', value: 'Order Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'invoiceRaisedDate', value: 'Invoice Raised Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'invoiceAmount', value: 'Invoice Amount', sortable: true, isEnabled: true },
    { name: 'dueDate', value: 'Payment Due Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'receivedAmount', value: 'Payment Received', sortable: true, isEnabled: true },
    // { name: 'productdescription', value: 'Product Description', sortable: true, isEnabled: true },
    // { name: 'remainingAmount', value: 'Remaining Amount', sortable: true, isEnabled: true },
    { name: 'status', value: 'Status', sortable: true, isEnabled: true, },

  ];
  Actions: Array<any> = [
    { name: '1', value: 'View Order', icon: 'eye', multiple: false },
    { name: '2', value: 'View Approval', icon: 'eye', multiple: false },

  ];


  purchaseInvoicesArray: Array<any> = []
  Column: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'order_id', value: 'OrderID', sortable: true, isEnabled: true },
    { name: 'poNo', value: 'Po No', sortable: true, isEnabled: true },
    { name: 'poValue', value: 'PoValue', sortable: true, isEnabled: true },
    { name: 'invoiceNumber', value: 'TIPL Invoice No', sortable: true, isEnabled: true },
    //   { name: 'orderdate', value: 'Order Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'invoiceRaisedDate', value: 'Invoice Raised Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'invoiceAmount', value: 'Invoice Amount', sortable: true, isEnabled: true },
    { name: 'dueDate', value: 'Payment Due Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'receivedAmount', value: 'Payment Received', sortable: true, isEnabled: true },
    // { name: 'productdescription', value: 'Product Description', sortable: true, isEnabled: true },
    // { name: 'remainingAmount', value: 'Remaining Amount', sortable: true, isEnabled: true },
    { name: 'status', value: 'Status', sortable: true, isEnabled: true, },

  ];



  LightBlue: any = "#3f51b5";
  dateWisesaleInvoices: any;
  dateWisepurchaseInvoices: any;




  constructor(private moduleService: ModuleService, private modalService: NgbModal, private amService: AmService, private vendorService: VendorService,
    private bdmService: BdmService, private oemService: OemService, private customerService: CustomerService, private productService: ProductService,
    private formBuilder: FormBuilder, private authService: AuthenticationService,
    private bookingOrderService: BookingOrderService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue.user)
      this.userId = this.authService.currentUserValue.user.id;
    this.userAccountType = this.authService.currentUserValue.user.tbl_auth.accountType;
    console.log(this.userAccountType);

    this.getSaleInvoice();

    this.dateFormGroup = this.formBuilder.group({
      fromDate: [''],
      toDate: [''],
    })
  }

  getSaleInvoice() {

    this.bookingOrderService.getInvoice().subscribe(result => {
      console.log(result);

      if (result['status'] == 200) {
        this.saleInvoice = result['data']
        console.log(this.saleInvoice, "this.saleInvoice");
        this.invoiceArray.push(this.saleInvoice);

        this.getPurchaseInvoice();

      } else if (result['status'] == 201) {
        this.error = 'No credentials provided for authentication.';
      } else if (result['status'] == 202) {
        this.error = 'You have invalid invoice.';
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

  // for get Purchase invoice
  getPurchaseInvoice() {

    this.bookingOrderService.getPurchaseInvoice().subscribe(result => {
      if (result['status'] == 200) {
        this.purchaseInvoice = result['data']
        this.invoiceArray.push(this.purchaseInvoice);

        this.getAllInvoices();
      } else if (result['status'] == 201) {
        this.error = 'No credentials provided for authentication.';
      } else if (result['status'] == 202) {
        this.error = 'You have invalid invoice.';
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



  getAllInvoices() {
    console.log(this.invoiceArray);

    this.saleArray = this.invoiceArray[0];
    this.purchaseArray = this.invoiceArray[1];
    let l1 = this.saleArray.length;
    let l2 = this.purchaseArray.length;

    for (let i = 0; i < l1; i++) {
      this.data.push(this.saleArray[i]);
    }

    for (let i = 0; i < l2; i++) {
      this.data1.push(this.purchaseArray[i]);
    }

    this.saleInvoicesArray = this.data.map((order: any) => {

      return {
        id: order?.id,
        // order_id: order?.tbl_order.order_id,
        order_id: order?.tbl_order?.orderCode,
        customerName: order?.tbl_order?.tbl_masters_customer.customerName,
        invoiceNumber: order?.tiplInvoiceNo,
        invoiceRaisedDate: order?.invoiceRaisedDate,
        dueDate: order?.dueDate,
        poNo: order?.tbl_order?.poNo,
        poValue: order?.tbl_order?.poValue,
        receivedAmount: order?.receivedAmount,
        invoiceAmount: order?.invoiceSalesAmount,
        status:(( order?.receivedAmount == order?.invoiceSalesAmount) ) ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: orange">Completed</span>') :'Inprogress'


      }


    });

    this.purchaseInvoicesArray = this.data1.map((order: any) => {

      return {
        id: order?.id,
        // order_id: order?.tbl_order.order_id,
        order_id: order?.tbl_order?.['orderCode'],
        customerName: order?.tbl_order?.['tbl_masters_customer']['customerName'],
        invoiceNumber: order?.invoiceNumber,
        invoiceRaisedDate: order?.purchaseInvoiceDate,
        dueDate: order?.invoiceRecievedDate,

        poNo: order?.tbl_order?.['poNo'],
        poValue: order?.tbl_order?.['poValue'],
        receivedAmount: order?.receivedAmount,
        invoiceAmount: order?.invoiceAmount,
        status:(( order?.receivedAmount == order?.invoiceAmount) ) ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: orange">Completed</span>') :'Inprogress'

      }


    });

    // let sale = this.saleInvoicesArray.length;
    // for (let i = 0; i < sale; i++) {
    //   this.invoicesArray.push(this.saleInvoicesArray[i]);
    // }
    // let purchase = this.purchaseInvoicesArray.length;
    // for (let i = 0; i < purchase; i++) {
    //   this.invoicesArray.push(this.purchaseInvoicesArray[i]);
    // }



    // console.log(this.invoicesArray, "1111");

    // this.allInvoicesArray = this.invoicesArray.map((order: any) => {

    //   return {
    //     id: order?.id,
    //     order_id: order?.orderId,
    //     customerName: order?.customerName,
    //     poNo: order?.poNo,
    //     poValue: order?.poValue,
    //     invoiceRaisedDate: order?.invoiceRaisedDate,
    //     dueDate: order?.dueDate,
    //     // orderId: order?.['tbl_order']['orderCode'], 
    //     invoiceNumber: order?.invoiceNumber,
    //     receivedAmount: order?.receivedAmount,
    //     invoiceAmount: order?.invoiceAmount,
    //     invoiceType: order?.invoiceType
    //   }


    // });


    // console.log(this.allInvoicesArray);
  }

  onDateSubmit() {

    this.bookingOrderService.dateFilter(this.dateFormGroup.value).subscribe(data => {
      if (data['status'] == 200) {
        this.dateWisesaleInvoices = data['data']
        console.log(this.dateWisesaleInvoices, "sfdasdas")

        this.saleInvoicesArray = this.dateWisesaleInvoices.map((order: any) => {
          console.log(this.saleInvoicesArray,"saleinvoicearray")

          return {
            id: order?.id,
            // order_id: order?.tbl_order.order_id,
            order_id: order?.['tbl_order']['orderCode'],
            customerName: order?.['tbl_order']['tbl_masters_customer']['customerName'],
            invoiceNumber: order?.tiplInvoiceNo,
            invoiceRaisedDate: order?.invoiceRaisedDate,
            dueDate: order?.dueDate,
            poNo: order?.['tbl_order']['poNo'],
            poValue: order?.['tbl_order']['poValue'],
            receivedAmount: order?.receivedAmount,
            invoiceAmount: order?.invoiceSalesAmount,
            status:(( order?.receivedAmount == order?.invoiceSalesAmount) ) ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: orange">Completed</span>') :'Inprogress'


          }

        });

        this.bookingOrderService.dateFilterPurchase(this.dateFormGroup.value).subscribe(data1 => {
          if (data1['status'] == 200) {
            this.dateWisepurchaseInvoices = data1['data']
            console.log(this.dateWisepurchaseInvoices, "this.dateWisepurchaseInvoices")

            this.purchaseInvoicesArray = this.dateWisepurchaseInvoices.map((order: any) => {


              return {
                id: order?.id,
                // order_id: order?.tbl_order.order_id,
                order_id: order?.['tbl_order']['orderCode'],
                customerName: order?.['tbl_order']['tbl_masters_customer']['customerName'],
                invoiceNumber: order?.invoiceNumber,
                invoiceRaisedDate: order?.purchaseInvoiceDate,
                dueDate: order?.invoiceRecievedDate,

                poNo: order?.['tbl_order']['poNo'],
                poValue: order?.['tbl_order']['poValue'],
                receivedAmount: order?.receivedAmount,
                invoiceAmount: order?.invoiceAmount,
                status:(( order?.receivedAmount == order?.invoiceAmount) ) ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: orange">Completed</span>') :'Inprogress'
              }

            })


          }
        })


      } else if (data['status'] == 201) {
        this.error = 'No credentials provided for authentication.';
      } else if (data['status'] == 202) {
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

  resetForm() {

    this.dateFormGroup.reset();
  }

}

