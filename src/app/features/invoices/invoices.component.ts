import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
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
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  navStyle = 'padding: 20px;';
  userId = 0;

  makePaymentEditable: boolean = false;
  makeVendorPaymentEditable: boolean = false;



  PurchaseInvoice: any = [];
  SaleInvoice: any = [];
  saleInvoice: any = [];
  userAccountType: any;
  datePipe: any;
  bdmFormGroup: FormGroup;
  Bdms: any = [];
  businessUnit: any = [];
  bdmCount = 0;
  bdmId = 0;
  bdmArray: any = [];
  AmArray: any = [];
  Years: any = [];
  bdmYears: any = [];
  totlAchieved = 0;
  bdmFullName = '';
  total: any;
  TotalValue = 0
  target: any;
  error = '';
  BdmsData: any = [];
  Ams: any = [];
  ans: any;
  Orders: any = [];
  invoiceFormGroup: FormGroup;
  SalePaymentFormGroup: FormGroup;
  paymentPurchaseFormGroup: FormGroup;
  vendorFormGroup: FormGroup;
  PerchaseInvoiceFormGroup: FormGroup;
  invoicePerchaseFormGroup: FormGroup;
  orderFormGroup: FormGroup;
  orderId: any;
  invoiceId: any;
  id:any;
  history = [];
  AMuser = [];
  tabledata: any = [];
  Entitys: any = [];
  poValueArray: any = [];
  Oems: any = [];
  Customers: any = [];
  Vendors: any = [];
  Products: any = [];
  form: FormGroup;
  totalPovalue = 0;
  AmUserArray: any = [];
  bdmUserArray: any = [];
  invoice: any = [];
  payment: any = [];
  salePayment: any = [];
  purchasePayment: any = [];
  invoiceOrder: any = [];





  purchaseInvoice: any = [];
  vendorPoOrder: any = [];
  selectedPoValue: any = 0;
  selectedPoPurchaseValue: any = 0;
  selectedPoReceivedValue: any = 0;
  selectedPoPurchaseReceivedValue: any = 0;
  selectedPurchaseInvoiceValue: any = 0;
  selectedPurchaseInvoiceReceivedValue: any = 0;
  purchaseInvoiceId: any;
  res = 0;
  //vOrderId:any=0;
  selectedInvoiceValue: any = 0;
  selectedInvoiceReceivedValue: any = 0;
  // allInvoices: any[];
  // saleInvoice: any[];
  // data: any;
  // data1: any;
  ActiondeletePerformed: any = [];
  ActionPerformed: any = [];
  invoiceArray: any = [];
  purchaseInvoiceOrder: any = [];
  paymentValue: any;


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

    this.form = this.formBuilder.group({
      file: ['']
    })
    this.orderFormGroup = this.formBuilder.group({
      orderId: [''],
      saleOrpurchase: ['']
    })
    this.getFullyApprovedOrder();
    this.getVendor();
    //this.getOrder();
    this.getInvoice();
    this.getPurchaseInvoice();
    this.getAllInvoices();
    

    this.SalePaymentFormGroup = this.formBuilder.group({
      paymentDate: [''],
      paymentMethod: [''],
      paymentBuy: [''],
      paymentReference: [''],
      paymentCollection: [''],
      amount: ['', [Validators.required, this.paymentAmountValidator()]],
      details: [''],
      orderId: [''],
      invoiceId: [''],
    })

    this.paymentPurchaseFormGroup = this.formBuilder.group({
      paymentDate: [''],
      paymentMethod: [''],
      paymentBuy: [''],
      paymentReference: [''],
      paymentCollection: [0],
      amount: ['', [Validators.required, this.paymentAmountOfPurchaseValidator()]],
      details: [''],
      orderId: [''],
      purchaseInvoiceId: [''],
    })

    this.invoicePerchaseFormGroup = this.formBuilder.group({
      purchaseInvoiceDate: [''],
      invoiceNumber: [''],
      invoiceAmount: ['', [Validators.required,this.invoicePurchaseAmountValidator()]],
      invoiceRecievedDate: [''],
      orderId: [''],
      receivedAmount: [0, [Validators.required, this.paymentAmountOfPurchaseValidator()]],
      poPurchaseValue: [''],
      purchaseInvoiceId: ['']

    })

    // this.PerchaseInvoiceFormGroup = this.formBuilder.group({
    //   purchaseInvoiceDate: [''],
    //   invoiceNumber: [''],
    //   invoiceAmount: ['', [Validators.required, this.invoicePurchaseAmountValidator()]],
    //   invoiceRecievedDate: [''],
    //   orderId: [''],
    //   poPurchaseValue: [''],

    // })

    this.invoiceFormGroup = this.formBuilder.group({
      invoiceRaisedDate: [''], // [Validators.required]
      tiplInvoiceNo: [''],
      invoiceSalesAmount: ['', [Validators.required, this.invoiceAmountValidator()]],
      dueDate: [''],
      receivedAmount: ['',[Validators.required,]],
      // vendorName: [''],
      // tiplPoNumber: [''],
      // tiplPoDate: ['',[Validators.required]],
      purchaseInvoiceDate: [''],
      invoiceNumber: [''],
      invoiceAmount: [''],
      invoiceRecievedDate: [''],
      orderId: [''],
      qre: [''],
      poValue: [''],
      invoiceId: ['']

    })

  }
  paymentAmountValidator(): ValidatorFn {
    console.log("-----------------paymentAmountValidator");
    
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || (parseFloat(control.value) + parseFloat(this.selectedInvoiceReceivedValue)) > parseFloat(this.selectedInvoiceValue))) {
        return { 'paymentAmount': true };
      }
      return null;
    };
  }
  paymentAmountOfPurchaseValidator(): ValidatorFn {
    console.log("paymentAmountOfPurchaseValidator-----------------");
    
    
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || (parseFloat(control.value) + parseFloat(this.selectedPurchaseInvoiceReceivedValue)) > parseFloat(this.selectedPurchaseInvoiceValue))) {
        return { 'paymentAmount': true };
      }
      return null;
    };
  }

  invoicePurchaseAmountValidator(): ValidatorFn {
 
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || (parseFloat(control.value) + parseFloat(this.selectedPoPurchaseReceivedValue)) > parseFloat(this.selectedPoPurchaseValue))) {
        return { 'invAmount': true };
      }
      return null;
    };
  }

  invoiceAmountValidator(): ValidatorFn {
   
    
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || (parseFloat(control.value) + parseFloat(this.selectedPoReceivedValue)) > parseFloat(this.selectedPoValue))) {
        return { 'invAmount': true };
      }
      return null;
    };
  }

  // customerPaymentAmountValidator(): ValidatorFn {
  //  console.log("--------------- customerPaymentAmountValidator")
    
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
  //     if (control.value !== undefined && (isNaN(control.value) || ((this.checkPaymentAmount(this.paymentValue)) + parseFloat(this.selectedPoReceivedValue)) > parseFloat(this.selectedPoValue))) {
  //       return { 'invAmount': true };
  //     }
  //     return null;
  //   };
  // }
  // checkPaymentAmount(paymentValue)
  // {
  
  //   return paymentValue;
  // } 



  resetForm() {

    this.vendorFormGroup.reset();
    this.orderFormGroup.reset();
    this.invoiceFormGroup.reset();
    this.invoicePerchaseFormGroup.reset();
    this.SalePaymentFormGroup.reset();
    this.PerchaseInvoiceFormGroup.reset();
    this.paymentPurchaseFormGroup.reset();
  }
  successmsg() {
    Swal.fire('Saved successfully!', 'You clicked the button!', 'success');
  }
  createmsg() {
    Swal.fire('Please create vendor Po First for this order Id', this.orderFormGroup.value.orderId);
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  get getInvoiceFormControls() {
    return this.invoiceFormGroup.controls;
  }
  get getInvoicePerchaseFormControls() {
    return this.invoicePerchaseFormGroup.controls;
  }
  get getPaymentFormControls() {
    return this.SalePaymentFormGroup.controls;
  }
  get getPaymentPurchaseFormControls() {
    return this.paymentPurchaseFormGroup.controls;
  }



  InvoiceArray: Array<any> = []
  Columns1: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    // { name: 'order_id', value: 'OrderID', sortable: true, isEnabled: true },
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
    // { name: 'invoiceType', value: 'Invoice Type', sortable: true, isEnabled: true, },
    { name: 'remainingAmount', value: 'Remaining Amount', sortable: true, isEnabled: true },
  ];

  Actions1: Array<any>
  // { name: '1', value: 'Add Customer payment', icon: 'eye', multiple: false },
  // { name: '2', value: 'View Customer Invoice', icon: 'eye', multiple: false },
  // { name: '3' , value: 'Edit Customer invoice', icon: 'eye', multiple:false},
  // { name: '4', value: 'Delete Customer invoice', icon: 'eye', multiple:false},

  LightBlue1: any = "#3f51b5";


  // purchaseInvoiceArray: Array<any> = []
  // Columns3: Array<any> = [
  //   { name: 'id', value: 'ID', sortable: false, isEnabled: false },
  //   // { name: 'order_id', value: 'OrderID', sortable: true, isEnabled: true },
  //   { name: 'poNo', value: 'Po No', sortable: true, isEnabled: true },
  //   { name: 'poValue', value: 'PoValue', sortable: true, isEnabled: true },
  //   { name: 'invoiceNumber', value: 'TIPL Invoice No', sortable: true, isEnabled: true },
  //   //   { name: 'orderdate', value: 'Order Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
  //   { name: 'invoiceRaisedDate', value:' Invoice Raised Date',sortable:true, isEnabled:true, isDate: true, dateFormat: 'MM-dd-yyyy' },
  //   { name: 'invoiceAmount', value: 'Invoice Amount', sortable: true, isEnabled: true },
  //   { name: 'dueDate', value:'Payment Due Date',sortable:true, isEnabled:true, isDate: true, dateFormat: 'MM-dd-yyyy' },
  //   { name: 'receivedAmount', value: 'Payment Received', sortable: true, isEnabled: true },
  //   // { name: 'productdescription', value: 'Product Description', sortable: true, isEnabled: true },
  //   // { name: 'remainingAmount', value: 'Remaining Amount', sortable: true, isEnabled: true },
  //   { name: 'invoiceType', value: 'Invoice Type', sortable: true, isEnabled: true, },
  //   { name: 'remainingAmount', value: 'Remaining Amount', sortable: true, isEnabled: true },
  // ];
  // Actions3: Array<any> = [
  //   { name: '1', value: 'Add Purchase Invoice payment', icon: 'eye', multiple: false },
  //   { name: '2', value: 'View Purchase Invoice', icon: 'eye', multiple: false },
  //   { name: '3' , value: 'Edit Purchase Invoice', icon: 'eye', multiple:false},
  //   { name: '4', value: 'Delete Purchase Invoice', icon: 'eye', multiple:false},
  // ];
  // LightBlue3: any = "#3f51b5";



  setId(id){
    this.id = id;
  }
  setElementId(id) {
    this.orderId = id;
  }

  setElementInvoiceId(id) {
    this.invoiceId = id
  }
  setElementPurchaseInvoiceId(id) {
    this.purchaseInvoiceId = id
  }

  addSaleInvoicePayment(event, addPaymentData: any) {

    if (event.action == 1) {
      this.setElementInvoiceId(event.value);
      this.showAddPaymentModal(addPaymentData);
    }
  }
  showAddPaymentModal(addPaymentData: any) {
    console.log(this.invoice);
    console.log(this.invoiceId, "addSaleInvoicePayment");
    console.log(addPaymentData)

    const invoice = this.invoice.find(inv => inv.id === this.invoiceId);
    console.log(invoice);

    this.selectedInvoiceValue = invoice['invoiceSalesAmount']
    this.selectedInvoiceReceivedValue = invoice['receivedAmount']

    this.modalService.open(addPaymentData, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
      });
  }

  addPurchaseInvoicePayment(event, addPurchasePaymentData) {

    if (event.action == 5) {
      this.setElementPurchaseInvoiceId(event.value);
      this.showAddPurchasePaymentModal(addPurchasePaymentData);
    }
  }
  showAddPurchasePaymentModal(addPurchasePaymentData) {
    console.log(this.purchaseInvoiceId);
    console.log(this.purchaseInvoice);

    const invoice = this.purchaseInvoice.find(inv => inv.id === this.purchaseInvoiceId);

    console.log(invoice, "invoice");

    this.selectedPurchaseInvoiceValue = invoice['invoiceAmount']
    this.selectedPurchaseInvoiceReceivedValue = invoice['receivedAmount']

    this.modalService.open(addPurchasePaymentData, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
      });
  }

  ViewPurchaseInvoiceFull(event, viewPurchaseFullInvoice: any) {
    if (event.action == 6) {
      this.setElementPurchaseInvoiceId(event.value);
      this.openFullViewPurchaseInvoiceData(event.value, viewPurchaseFullInvoice);
    }
  }

  openFullViewPurchaseInvoiceData(id, viewPurchaseFullInvoice: any) {
    this.getPurchasePaymentInvoiceById(id);

    const viewPurchaseInvoice = this.purchaseInvoice.find(invoicePurchaseData => invoicePurchaseData.id === id);
    // console.log(this.purchaseInvoice,"394");
    console.log(viewPurchaseInvoice, "viewPurchaseFullInvoice");

    this.invoicePerchaseFormGroup.controls.invoiceAmount.setValue(viewPurchaseInvoice['invoiceAmount']);
    this.invoicePerchaseFormGroup.controls.invoiceNumber.setValue(viewPurchaseInvoice['invoiceNumber']);

    var dueDate1 = viewPurchaseInvoice['invoiceRecievedDate']
    let dueDate = dueDate1.split("T")[0];
    this.invoicePerchaseFormGroup.controls.invoiceRecievedDate.setValue(dueDate);

    var purchaseInvoiceDate1 = viewPurchaseInvoice['purchaseInvoiceDate']
    let purchaseInvoiceDate = purchaseInvoiceDate1.split("T")[0];
    this.invoicePerchaseFormGroup.controls.purchaseInvoiceDate.setValue(purchaseInvoiceDate);

    this.invoicePerchaseFormGroup.controls.receivedAmount.setValue(viewPurchaseInvoice['receivedAmount']);
    //this.invoicePerchaseFormGroup.controls.tiplInvoiceNo.setValue(viewPurchaseInvoice['tiplInvoiceNo']);

    //var tiplPoDate1 = viewPurchaseInvoice['tiplPoDate']
    //let tiplPoDate = tiplPoDate1.split("T")[0];
    //this.invoiceFormGroup.controls.tiplPoDate.setValue(tiplPoDate);
    // this.invoiceFormGroup.controls.tiplPoNumber.setValue(viewPurchaseInvoice['tiplPoNumber']);

    this.modalService.open(viewPurchaseFullInvoice, { size: 'lg', windowClass: 'modal-holder', centered: true });

  }

  ViewInvoiceFull(event, viewFullInvoice: any) {
    if (event.action == 2) {
      console.log(event.value, "id");

      this.setElementInvoiceId(event.value);
      this.openFullViewInvoiceData(event.value, viewFullInvoice);
    }
  }
  openFullViewInvoiceData(id, viewFullInvoice: any) {
    this.getPaymentInvoiceById(id);
    console.log(this.invoiceOrder, "11111")

    const viewCustomerInvoice = this.invoiceOrder.find(invoiceData => invoiceData.id === id);
    console.log(viewCustomerInvoice, "viewCustomerInvoice");
    console.log(id, "customerID");




    // this.invoiceFormGroup.controls.invoiceAmount.setValue(viewCustomerInvoice ['invoiceAmount']);
    // this.invoiceFormGroup.controls.invoiceNumber.setValue(viewCustomerInvoice ['invoiceNumber']);
    this.invoiceFormGroup.controls.invoiceSalesAmount.setValue(viewCustomerInvoice['invoiceSalesAmount']);

    var invoiceRaisedDate1 = viewCustomerInvoice['invoiceRaisedDate']
    let invoiceRaisedDate = invoiceRaisedDate1.split("T")[0];
    this.invoiceFormGroup.controls.invoiceRaisedDate.setValue(invoiceRaisedDate);

    var dueDate1 = viewCustomerInvoice['dueDate']
    let dueDate = dueDate1.split("T")[0];
    this.invoiceFormGroup.controls.dueDate.setValue(dueDate);

    // var invoiceRecievedDate1 = viewCustomerInvoice ['invoiceRecievedDate']
    // let invoiceRecievedDate = invoiceRecievedDate1.split("T")[0];
    // this.invoiceFormGroup.controls.invoiceRecievedDate.setValue(invoiceRecievedDate);

    // var purchaseInvoiceDate1 = viewCustomerInvoice ['purchaseInvoiceDate']
    // let purchaseInvoiceDate = purchaseInvoiceDate1.split("T")[0];
    // this.invoiceFormGroup.controls.purchaseInvoiceDate.setValue(purchaseInvoiceDate);

    this.invoiceFormGroup.controls.receivedAmount.setValue(viewCustomerInvoice['receivedAmount']);
    this.invoiceFormGroup.controls.tiplInvoiceNo.setValue(viewCustomerInvoice['tiplInvoiceNo']);

    //var tiplPoDate1 = viewCustomerInvoice ['tiplPoDate']
    //let tiplPoDate = tiplPoDate1.split("T")[0];
    //this.invoiceFormGroup.controls.tiplPoDate.setValue(tiplPoDate);
    // this.invoiceFormGroup.controls.tiplPoNumber.setValue(viewCustomerInvoice ['tiplPoNumber']);


    this.modalService.open(viewFullInvoice, { size: 'lg', windowClass: 'modal-holder', centered: true });

  }




  onSubmit() {

    if (this.orderFormGroup.value.saleOrpurchase == "sale invoice") {
      this.res = 1;
      console.log(this.res, "ifififififififif")
      this.bookingOrderService.getInvoiceByOrder(this.orderFormGroup.value.orderId).subscribe(result => {
        if (result['status'] == 200) {
          this.invoiceOrder = result['data']
          console.log(this.invoiceOrder);

          var totalGp = 0;
          this.Actions1 = [];
          console.log(this.Actions1, "customer action");

          // this.Actions1.length = 0;
          this.Actions1.push({ name: '1', value: 'Add Customer payment', icon: 'eye', multiple: false },
            { name: '2', value: 'View Customer Invoice', icon: 'eye', multiple: false },
            { name: '3', value: 'Edit Customer invoice', icon: 'eye', multiple: false },
            { name: '4', value: 'Delete Customer invoice', icon: 'eye', multiple: false },
          )

          this.InvoiceArray = this.invoiceOrder.map((order: any) => {

            for (let index = 0; index < this.invoiceOrder.length; index++) {
              totalGp += parseFloat(order.tbl_order.salePaymentReceivedAmount);
              console.log(totalGp, "558585a8588585858")
              return {
                id: order?.id,
                poNo: order?.tbl_order.poNo,
                invoiceRaisedDate: order?.invoiceRaisedDate,
                invoiceAmount: order?.invoiceSalesAmount,
                receivedAmount: order?.receivedAmount,
                invoiceNumber: order?.tiplInvoiceNo,
                dueDate: order?.dueDate,
                InvoiceDate: order?.purchaseInvoiceDate,
                invoiceRecievedDate: order?.invoiceRecievedDate,
                poValue: order?.tbl_order.poValue,
                remainingAmount: order?.invoiceSalesAmount - order.receivedAmount,
                
                // remainingAmount: order?.tbl_order.receivedAmount - order.tbl_order.salePaymentReceivedAmount,
                // tiplPoNumber: order?.tiplPoNumber,

              }
            }
          });

        }
      },
      );

    }

    else {
      this.res = 2;
      console.log(this.res, "elseelseelseelse");

      this.bookingOrderService.getPurchaseInvoiceByOrder(this.orderFormGroup.value.orderId).subscribe(result => {
        if (result['status'] == 200) {
          this.purchaseInvoiceOrder = result['data']
          console.log(this.purchaseInvoiceOrder);

          var totalGp = 0;
          this.Actions1 = [];
          console.log(this.Actions1, "vendor")
          this.Actions1.push({ name: '5', value: 'Add Vendor payment', icon: 'eye', multiple: false },
            { name: '6', value: 'View Vendor Invoice', icon: 'eye', multiple: false },
            { name: '7', value: 'Edit Vendor Invoice', icon: 'eye', multiple: false },
            { name: '8', value: 'Delete Vendor Invoice', icon: 'eye', multiple: false },

          )

          this.InvoiceArray = this.purchaseInvoiceOrder.map((order: any) => {

            for (let index = 0; index < this.purchaseInvoiceOrder.length; index++) {
              const element = order[index];

              totalGp = totalGp + parseFloat(order?.invoiceAmount);
              return {
                id: order?.id,
                // order_id:order?. order_id,
                poNo: order?.tbl_order.poNo,
                invoiceAmount: order?.invoiceAmount,
                invoiceNumber: order?.invoiceNumber,
                invoiceRaisedDate: order?.purchaseInvoiceDate,
                InvoiceDate: order?.purchaseInvoiceDate,
                receivedAmount: order?.receivedAmount,
                dueDate: order?.invoiceRecievedDate,
                // invoiceRecievedDate: order?.invoiceRecievedDate,
                poValue: order?.tbl_order.poPurchaseValue,
                remainingAmount: order?.invoiceAmount - order.receivedAmount,

              }
            }
          });
        }
      },
      );
    }


  }
  onSubmitPayment(addPaymentData) {

    console.log(this.orderFormGroup.value.orderId, "orderId");

    console.log(this.invoiceId, "invoiceId");


    this.SalePaymentFormGroup.controls.orderId.setValue(this.orderFormGroup.value.orderId);
    this.SalePaymentFormGroup.controls.invoiceId.setValue(this.invoiceId);



    this.bookingOrderService.AddPaymentData(this.SalePaymentFormGroup.value).subscribe(data => {
      if (data['status'] == 200) {
        this.modalService.dismissAll(addPaymentData);

        // this.resetForm();
        this.successmsg();
        this.onSubmit();




        // window.location.reload();
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
    // }

  }
  onSubmitPurchasePayment(addPaymentData) {

    this.paymentPurchaseFormGroup.controls.orderId.setValue(this.orderFormGroup.value.orderId);
    this.paymentPurchaseFormGroup.controls.purchaseInvoiceId.setValue(this.purchaseInvoiceId);

    this.bookingOrderService.AddPurchasePaymentData(this.paymentPurchaseFormGroup.value).subscribe(data => {
      if (data['status'] == 200) {
        this.successmsg();
        this.modalService.dismissAll(addPaymentData);
        // this.resetForm();
        this.onSubmit();
        // window.location.reload();
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
    // }

  }

  openCreateInvoiceModal(createInvoice) {
    console.log(this.orderFormGroup.value.orderId);
    this.bookingOrderService.getVendorPoByOrder(this.orderFormGroup.value.orderId).subscribe(result => {
      if (result['status'] == 200) {
        this.invoiceOrder = result['data']

      }
      if (this.invoiceOrder.length > 0) {
        const fullyApprovedOrder = this.Orders.find(fullyApproved => fullyApproved.id === this.invoiceOrder[0].order_id);
        console.log(fullyApprovedOrder);


        var paymentTerms = 0;
        var vendorpaymentTerms = 0;
        paymentTerms = parseInt(fullyApprovedOrder['companyPaymentTerms']);




        // vendorpaymentTerms = parseInt(fullyApprovedOrder['tbl_order_vendors'][0]['vendorPaymentValue']);


        const invoiceDate = new Date();
        let invoiceSaleDate = invoiceDate.toISOString().split("T")[0];
        invoiceDate.setDate(invoiceDate.getDate() + paymentTerms);

        const invoiceDate1 = new Date();
        let invoiceSaleDate1 = invoiceDate1.toISOString().split("T")[0];
        invoiceDate1.setDate(invoiceDate1.getDate() + paymentTerms);


        var dueDate = invoiceDate.getFullYear() + '-' + (invoiceDate.getMonth() + 1 + '').padStart(2, '0') + '-' + invoiceDate.getDate();
        var dueDate1 = invoiceDate1.getFullYear() + '-' + (invoiceDate1.getMonth() + 1 + '').padStart(2, '0') + '-' + invoiceDate1.getDate();


        this.invoiceFormGroup.controls.invoiceRaisedDate.setValue(invoiceSaleDate);
        this.invoiceFormGroup.controls.purchaseInvoiceDate.setValue(invoiceSaleDate1);
        this.invoiceFormGroup.controls.dueDate.setValue(dueDate);
        this.invoiceFormGroup.controls.invoiceRecievedDate.setValue(dueDate1);

        this.selectedPoValue = fullyApprovedOrder['poValue'];
        this.selectedPoReceivedValue = fullyApprovedOrder['receivedAmount'];
        this.invoiceFormGroup.controls.poValue.setValue(fullyApprovedOrder['poValue']);




        this.modalService.open(createInvoice, { size: 'lg', windowClass: 'modal-holder', centered: true })
          .result.then((result) => {
            return "Not Use";
          }, (reason) => {
            this.resetForm();
          });
      }
      else {
        this.createmsg();
        // console.log("Please Create Vendor PO");

      }
    })
  }
  openCreatePurchaseInvoiceModal(AddPurchaseInvoicedata: any) {
    console.log(this.orderFormGroup.value.orderId);
    this.bookingOrderService.getVendorPoByOrder(this.orderFormGroup.value.orderId).subscribe(result => {
      if (result['status'] == 200) {
        this.purchaseInvoice = result['data']

      }
      if (this.purchaseInvoice.length > 0) {

        const fullyApprovedOrder = this.Orders.find(fullyApproved => fullyApproved.id === this.purchaseInvoice[0].order_id);


        var paymentTerms = 0;
        var vendorpaymentTerms = 0;
        paymentTerms = parseInt(fullyApprovedOrder['companyPaymentTerms']);


        // vendorpaymentTerms = parseInt(fullyApprovedOrder['tbl_order_vendors'][0]['vendorPaymentValue']);


        const invoiceDate = new Date();
        let invoiceSaleDate = invoiceDate.toISOString().split("T")[0];
        invoiceDate.setDate(invoiceDate.getDate() + paymentTerms);

        const invoiceDate1 = new Date();
        let invoiceSaleDate1 = invoiceDate1.toISOString().split("T")[0];
        invoiceDate1.setDate(invoiceDate1.getDate() + paymentTerms);


        // var dueDate = invoiceDate.getFullYear() + '-' + (invoiceDate.getMonth() + 1 + '').padStart(2, '0') + '-' + invoiceDate.getDate();
        var dueDate1 = invoiceDate1.getFullYear() + '-' + (invoiceDate1.getMonth() + 1 + '').padStart(2, '0') + '-' + invoiceDate1.getDate();


        this.invoicePerchaseFormGroup.controls.purchaseInvoiceDate.setValue(invoiceSaleDate1);

        this.invoicePerchaseFormGroup.controls.invoiceRecievedDate.setValue(dueDate1);

        this.selectedPoPurchaseValue = fullyApprovedOrder['poPurchaseValue'];


        this.selectedPoPurchaseReceivedValue = fullyApprovedOrder['purchaseRecievedAmount'];


        this.invoicePerchaseFormGroup.controls.poPurchaseValue.setValue(fullyApprovedOrder['poPurchaseValue']);




        this.modalService.open(AddPurchaseInvoicedata, { size: 'lg', windowClass: 'modal-holder', centered: true })
          .result.then((result) => {
            return "Not Use";
          }, (reason) => {
            this.resetForm();
          });
      }
      else {
        this.createmsg();
        // console.log("Please Create Vendor PO");

      }
    })
  }

  onSubmitSaleInvoice(addFullyApprovedorderData) {
    console.log(this.invoiceFormGroup.value);
    console.log(this.orderFormGroup.value);

    console.log(this.orderId);

    this.invoiceFormGroup.controls.orderId.setValue(this.orderId);
    //this.invoiceFormGroup.controls.orderId.setValue(this.orderFormGroup.value.orderId);
    this.bookingOrderService.UpdateFullyApprovedData(this.invoiceFormGroup.value).subscribe(data => {
      if (data['status'] == 200) {
        this.successmsg();
        this.modalService.dismissAll(addFullyApprovedorderData);

        this.resetForm();
        this.onSubmit();
        // window.location.reload();

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
    // }

  }
  onSubmitPurchaseInvoice(AddPurchaseInvoicedata) {


    this.invoicePerchaseFormGroup.controls.orderId.setValue(this.orderFormGroup.value.orderId);
    this.bookingOrderService.AddPurchasedInvoice(this.invoicePerchaseFormGroup.value).subscribe(data => {
      if (data['status'] == 200) {
        this.successmsg();
        this.modalService.dismissAll(AddPurchaseInvoicedata);
        this.resetForm();
        this.onSubmit();

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
    // }

  }


  // for get sale invoive
  getInvoice() {
    this.bookingOrderService.getInvoice().subscribe(result => {
      if (result['status'] == 200) {
        this.invoice = result['data']

        //  console.log(this.invoice,"this.invoice");

        let l1 = this.invoice.length;

        for (let i = 0; i < l1; i++) {
          this.invoiceArray.push(this.invoice[i]);
        }
        // console.log(this.invoiceArray,"this.invoiceArray");
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
        // console.log(this.purchaseInvoice,"this.purchaseInvoice");
        let purchase = this.purchaseInvoice.length;
        for (let i = 0; i < purchase; i++) {
          this.invoiceArray.push(this.purchaseInvoice[i]);
        }
        // console.log(this.invoiceArray,"this.invoiceArray");
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
    console.log(this.invoiceArray, "this.invoiceArray");

  }


  getPaymentInvoiceById(id) {


    this.bookingOrderService.getPaymentInvoiceById(id).subscribe(result => {
      if (result['status'] == 200) {
        this.salePayment = result['data']
        console.log(this.salePayment, "salePayment")


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
  getPurchasePaymentInvoiceById(id) {


    this.bookingOrderService.getPurchasePaymentInvoiceById(id).subscribe(result => {
      if (result['status'] == 200) {
        this.purchasePayment = result['data']
        console.log(this.purchasePayment, "purchase Payment")



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
  getFullyApprovedOrder() {

    this.bookingOrderService.getFullyApprovedOrder().subscribe(result => {

      if (result['status'] == 200) {
        this.Orders = result['data'];


        // this.OrdersArray = this.Orders.map((order: any) => {

        //   return {
        //     id: order?.id,
        //     orderid: order?.orderCode,
        //     orderdate: order?.createdAt,
        //     customer: order?.['tbl_masters_customer.customerName'],
        //     producttype: order?.['tbl_masters_product.productName'],
        //     povalue: order?.poValue,
        //     podate: order?.poDate,

        //     status:(( order?.poValue == order?.salePaymentReceivedAmount) && (order?.poPurchaseValue == order?.purchasePaymentReceivedAmount)) ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: orange">Completed</span>') :'Inprogress'
        //   //  && (( order?.['tbl_invoice_datas']['invoiceSalesAmount'] == order?.['tbl_invoice_datas']['receivedAmount']) && (order?.['tbl_purchase_invoice_datas']['invoiceAmount'] == order?.['tbl_purchase_invoice_datas']['purchaseRecievedAmount']))

        //   }
        // });



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
  getVendor() {
    this.vendorService.get().subscribe(result => {
      if (result['status'] == 200) {
        this.Vendors = result['data']['rows']
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


  //----------------------------------------delete purchase invoice-----------------------------------------
  //--------------------------------------------------------------------------------------------------------


  deletePurchaseElement(event, deletePurchaseInvoice: any) {
    if (event.action == 8) {
      this.setElementPurchaseInvoiceId(event.value);
      this.openDeletePurchesInvoice(event.value, deletePurchaseInvoice);
    }
  }



  /**
  * Open modal
  * @param openDeletePurchesInvoice modal content
  */
  openDeletePurchesInvoice(id, deletePurchaseInvoice: any) {
    console.log("ppppppp");
    this.modalService.open(deletePurchaseInvoice, { size: 'sm', windowClass: 'modal-holder', centered: true });
  }

  deletePurchaseInvoice(deletePurchaseInvoice) {
    console.log(this.purchaseInvoiceId, " nnnnnnnnnnnnnnnnnnnn")


    this.bookingOrderService.deletePurchesInvoice(this.purchaseInvoiceId).subscribe(data => {

      if (data.status == 200) {
        this.successmsg();
        this.modalService.dismissAll(deletePurchaseInvoice);
        this.getPurchaseInvoice();
        window.location.reload();
      } else if (data.status == 201) {
        this.error = 'No credentials provided for authentication.';
      } else if (data.status == 202) {
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

  //-----------------------------Delete Sale Invoice-----------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------


  deleteSaleElement(event, deleteSaleInvoice: any) {
    if (event.action == 4) {
      this.setElementInvoiceId(event.value);
      this.openDeleteSaleInvoice(event.value, deleteSaleInvoice);
    }
  }

  /**
  * Open modal
  * @param openDeleteSaleInvoice modal content
  */
  openDeleteSaleInvoice(id, deleteSaleInvoice: any) {
    console.log(11111);

    this.modalService.open(deleteSaleInvoice, { size: 'sm', windowClass: 'modal-holder', centered: true });
  }

  deleteSalesInvoice(deleteSaleInvoice) {
    console.log(this.invoiceId, " nnnnnnnnnnnnnnnnnnnn")
    this.bookingOrderService.deleteSaleInvoice(this.invoiceId).subscribe(data => {

      if (data.status == 200) {
        this.successmsg();
        this.modalService.dismissAll(deleteSaleInvoice);
        this.getInvoice();
        window.location.reload();
      } else if (data.status == 201) {
        this.error = 'No credentials provided for authentication.';
      } else if (data.status == 202) {
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





  //---------------------------------edit Purchase Invoice--------------------------
  //-----------------------------------------------------------------------------

  EditPurchaseElement(event, editPurchaseInvoice: any) {
    if (event.action == 7) {
      this.setElementPurchaseInvoiceId(event.value);
      this.openEditPurchaseInvoice(event.value, editPurchaseInvoice);
    }
  }

  /**
   * Open modal
   * @param editPurchaseInvoice modal content
   */
  openEditPurchaseInvoice(id, editPurchaseInvoice: any) {
    //console.log(id,"id111");

    this.getPurchasePaymentInvoiceById(id);
    this.setElementInvoiceId(id);

    //const fullyApprovedOrder = this.Orders.find(fullyApproved => fullyApproved.id === this.invoiceOrder[0].order_id);
    //console.log(fullyApprovedOrder,'fullyApprovedOrder')
    const purchaseInvoice = this.purchaseInvoiceOrder.find(invoicePurchaseData => invoicePurchaseData.id === id);
    console.log(this.purchaseInvoice, " purchaesInvoice")
    // this.invoicePerchaseFormGroup.controls.purchaseInvoiceDate.setValue(purchaseInvoice['purchaseInvoiceDate']);
    this.invoicePerchaseFormGroup.controls.invoiceNumber.setValue(purchaseInvoice['invoiceNumber']);
    this.invoicePerchaseFormGroup.controls.invoiceAmount.setValue(purchaseInvoice['invoiceAmount']);
    //this.invoicePerchaseFormGroup.controls.poPurchaseValue.setValue(purchaseInvoice['poPurchaseValue']);
    var invoiceRecievedDate1 = purchaseInvoice['invoiceRecievedDate']
    let invoiceRecievedDate = invoiceRecievedDate1.split("T")[0];
    this.invoicePerchaseFormGroup.controls.invoiceRecievedDate.setValue(invoiceRecievedDate);
    this.invoicePerchaseFormGroup.controls.poPurchaseValue.setValue(purchaseInvoice['tbl_order']['poPurchaseValue'])


    var purchaseInvoiceDate1 = purchaseInvoice['purchaseInvoiceDate']
    let purchaseInvoiceDate = purchaseInvoiceDate1.split("T")[0];
    this.invoicePerchaseFormGroup.controls.purchaseInvoiceDate.setValue(purchaseInvoiceDate);

    // this.selectedPoPurchaseValue = purchaseInvoice['poPurchaseValue'];
 // this.selectedPoPurchaseReceivedValue = purchaseInvoice ['purchaseRecievedAmount'];


    this.selectedPoPurchaseReceivedValue = purchaseInvoice ['invoiceAmount']
    console.log("this.selectedPoPurchaseReceivedValue ",this.selectedPoPurchaseReceivedValue )

    this.selectedPoPurchaseValue = purchaseInvoice['tbl_order']['poPurchaseValue']
   console.log("this.selectedPoPurchaseValue",this.selectedPoPurchaseValue);
   

    
  //  this.selectedPoPurchaseValue = purchaseInvoice['poPurchaseValue'];
  //  console.log(" this.selectedPoPurchaseValue", this.selectedPoPurchaseValue);
   
  //  this.selectedPoPurchaseReceivedValue = purchaseInvoice['purchaseRecievedAmount'];
  //  console.log("this.selectedPoPurchaseReceivedValue",this.selectedPoPurchaseReceivedValue)



    this.modalService.open(editPurchaseInvoice, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }


  updatepurchaseInvoice(editPurchaseInvoice) {
    if (this.invoicePerchaseFormGroup.valid) {
      this.invoicePerchaseFormGroup.controls.purchaseInvoiceId.setValue(this.invoiceId);
      this.invoicePerchaseFormGroup.controls.orderId.setValue(this.orderFormGroup.value.orderId);

      this.bookingOrderService.updatePurchaseInvoice(this.invoicePerchaseFormGroup.value).subscribe(data => {
        if (data.status == 200) {
          this.successmsg();
          this.modalService.dismissAll(editPurchaseInvoice);
          this.getPurchaseInvoice();
          // this.resetForm();
        } else if (data.status == 201) {
          this.error = 'No credentials provided for authentication.';
        } else if (data.status == 202) {
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
  }


  //---------------------------------edit Sale Invoice--------------------------
  //-----------------------------------------------------------------------------

  EditSaleElement(event, editSaleInvoice: any) {
    if (event.action == 3) {
      this.setElementInvoiceId(event.value);
      this.openEditSaleInvoice(event.value, editSaleInvoice);
    }
  }

  /**
    * Open modal
    * @param openEditSaleInvoice modal content
    */
  openEditSaleInvoice(id, editSaleInvoice: any) {
    this.getPaymentInvoiceById(id);

    const fullyApprovedOrder = this.Orders.find(fullyApproved => fullyApproved.id === this.invoiceOrder[0].order_id);
    console.log(fullyApprovedOrder, 'fullyApprovedOrder')
    const saleInvoice = this.invoiceOrder.find(invoiceData => invoiceData.id === id);
    console.log(this.saleInvoice, "saleInvoice")

    this.invoiceFormGroup.controls.invoiceSalesAmount.setValue(saleInvoice['invoiceSalesAmount']);

    var invoiceRaisedDate1 = saleInvoice['invoiceRaisedDate']
    let invoiceRaisedDate = invoiceRaisedDate1.split("T")[0];
    this.invoiceFormGroup.controls.invoiceRaisedDate.setValue(invoiceRaisedDate);

    this.invoiceFormGroup.controls.poValue.setValue(fullyApprovedOrder['poValue'])

    var dueDate1 = saleInvoice['dueDate']
    let dueDate = dueDate1.split("T")[0];
    this.invoiceFormGroup.controls.dueDate.setValue(dueDate);


    this.invoiceFormGroup.controls.receivedAmount.setValue(saleInvoice['receivedAmount']);
    this.invoiceFormGroup.controls.tiplInvoiceNo.setValue(saleInvoice['tiplInvoiceNo']);


    this.selectedPoValue = fullyApprovedOrder['poValue'];
    console.log("selectedPoValue",this.selectedPoValue);
    
    this.selectedPoReceivedValue = fullyApprovedOrder['receivedAmount'];
    console.log("this.selectedPoReceivedValue",this.selectedPoReceivedValue);
    

   


    this.modalService.open(editSaleInvoice, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  updatesaleInvoice(editSaleInvoice) {
    console.log(this.invoiceFormGroup.value,"ttttt---------")
    // if (this.invoiceFormGroup.valid) {

    //   console.log(this.invoiceFormGroup.value);

      this.invoiceFormGroup.controls.invoiceId.setValue(this.invoiceId);
      this.invoiceFormGroup.controls.orderId.setValue(this.orderFormGroup.value.orderId);
      this.bookingOrderService.updateSaleInvoice(this.invoiceFormGroup.value).subscribe(data => {
        if (data.status == 200) {
          this.successmsg();
          this.modalService.dismissAll(editSaleInvoice);
          this.getInvoice();
          this.resetForm();
        } else if (data.status == 201) {
          this.error = 'No credentials provided for authentication.';
        } else if (data.status == 202) {
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
    // }
  }





  updateCustomerPayment(id, amount) {

      console.log("UPDATED AMOUNT - ", id, amount);
      console.log(amount,"amount");
      
      this.bookingOrderService.updateCustomerPaymentInvoice(id,amount).subscribe(data => {
        if (data.status == 200) {
          this.successmsg();

         // this.modalService.dismissAll(editSaleInvoice);
         // this.getInvoice();
          //this.resetForm();
        } else if (data.status == 201) {
          this.error = 'No credentials provided for authentication.';
        } else if (data.status == 202) {
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




  updateVendorPayment(id, amount) {
    console.log("UPDATED AMOUNT - ", id, amount);
    this.bookingOrderService.updateVendorPaymentInvoice(id,amount).subscribe(data => {
      if (data.status == 200) {
        this.successmsg();
        
       // this.modalService.dismissAll(editSaleInvoice);
       // this.getInvoice();
        //this.resetForm();
      } else if (data.status == 201) {
        this.error = 'No credentials provided for authentication.';
      } else if (data.status == 202) {
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

  deleteCustomerPaymentData(id)  {

    console.log(id);
  
    this.bookingOrderService.deleteSalePaymentInvoice(id).subscribe(data => {
      if (data.status == 200) {
        this.successmsg();
        
       // this.modalService.dismissAll(editSaleInvoice);
       // this.getInvoice();
        //this.resetForm();
      } else if (data.status == 201) {
        this.error = 'No credentials provided for authentication.';
      } else if (data.status == 202) {
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
  deleteVendorPaymentInvoice(id)  {

    console.log(id);
  
    this.bookingOrderService.deleteVendorPaymentInvoice(id).subscribe(data => {
      if (data.status == 200) {
        this.successmsg();
        
       // this.modalService.dismissAll(editSaleInvoice);
       // this.getInvoice();
        //this.resetForm();
      } else if (data.status == 201) {
        this.error = 'No credentials provided for authentication.';
      } else if (data.status == 202) {
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







}