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
import { LogLevel } from '@angular/compiler-cli/private/localize';

@Component({
  selector: 'app-operational',
  templateUrl: './operational.component.html',
  styleUrls: ['./operational.component.scss']
})
export class OperationalComponent implements OnInit {

  navStyle = 'padding: 20px;';
  userId = 0;
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
  paymentFormGroup: FormGroup;
  paymentPurchaseFormGroup: FormGroup;
  vendorFormGroup: FormGroup;
  invoicePerchaseFormGroup:FormGroup;
  orderId: any;
  invoiceId: any;
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
  invoiceOrder: any = [];
  purchaseInvoice:any=[];
  vendorPoOrder:any=[];
  selectedPoValue: any = 0;
  selectedPoPurchaseValue:any=0;
  selectedPoReceivedValue: any = 0;
  selectedPoPurchaseReceivedValue:any=0;
  selectedPurchaseInvoiceValue:any=0;
  selectedPurchaseInvoiceReceivedValue:any=0;
  purchaseInvoiceId:any=0;
  date: Date;
  date1: Date;

  vOrderId:any=0;
  selectedInvoiceValue: any = 0;
  selectedInvoiceReceivedValue: any = 0;
  orderFullyApproved:any=[];



  OrdersArray: Array<any> = []
  Columns: Array<any> = [

    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'orderId', value: 'orderID', sortable: true, isEnabled: true },
    { name: 'orderdate', value: 'Order Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'customerName', value: 'Customer Name', sortable: true, isEnabled: true },
    { name: 'pono', value: 'Customer PO No. ', sortable: true, isEnabled: true },
    { name: 'povalue', value: 'Customer PO Value', sortable: true, isEnabled: true },
    // { name: 'productdescription', value: 'Product Description', sortable: true, isEnabled: true },
    { name: 'status', value: 'Status', sortable: true, isEnabled: true, },

    // { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    // { name: 'orderid', value: 'Order Id', sortable: true, isEnabled: true },
    // { name: 'orderdate', value: 'Order Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    // { name: 'customer', value: 'Customer Name', sortable: true, isEnabled: true },
    // // { name: 'producttype', value: 'Product Type', sortable: true, isEnabled: true },
    // { name: 'povalue', value: 'PO Value', sortable: true, isEnabled: true },
    // { name: 'podate', value: 'PO Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    // { name: 'status', value: 'Status', sortable: true, isEnabled: true},
  ];
  Actions: Array<any> = [
    { name: '1', value: 'Add Vendor PO', icon: 'eye', multiple: false },
    { name: '2', value: 'View vendor PO', icon: 'eye', multiple: false },
    //{ name: '3', value: 'Add Vendor Data', icon: 'eye', multiple: false },
  ];
  LightBlue: any = "#3f51b5";
  newdueDate: Date;


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

    this.invoicePerchaseFormGroup = this.formBuilder.group({
      purchaseInvoiceDate: [''],
      invoiceNumber: [''],
      invoiceAmount: ['', [Validators.required, this.invoicePurchaseAmountValidator()]],
      invoiceRecievedDate: [''],
      orderId: [''],
      receivedAmount: [0],
      poPurchaseValue:[''],
      purchasePaymentterm:['']

    })

    this.invoiceFormGroup = this.formBuilder.group({
      invoiceRaisedDate: [''], // [Validators.required]
      tiplInvoiceNo: ['',[Validators.required]],
      invoiceSalesAmount: ['', [Validators.required, this.invoiceAmountValidator()]],
      dueDate: [''],
      paymentTerm: number,
      receivedAmount: [0],
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


    })

    this.paymentFormGroup = this.formBuilder.group({
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

    this.paymentPurchaseFormGroup= this.formBuilder.group({
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

    this.vendorFormGroup = this.formBuilder.group({
      orderId: [''],
      vendorName: [''],
      tiplPoNumber: ['',[Validators.required]],
      tiplPoDate: ['',[Validators.required,pastDateValidator()]],
    })


    
    function pastDateValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const selectedDate = new Date(control.value);
        const currentDate = new Date();
    
        if (selectedDate > currentDate) {
          return { pastDate: true };
        }
    
        return null;
      };
    }



    this.getFullyApprovedOrder();
    this.getVendor();
    this.getOrder();
    this.getInvoice();
    this.getPurchaseInvoice();

    
  
    // let nientyDaysAfter = new Date(Date.now() + (8.64e+7 * 90)).toISOString()
  
    
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
    return this.paymentFormGroup.controls;
  }
  get getPaymentPurchaseFormControls() {
    return this.paymentPurchaseFormGroup.controls;
  }
  get getVendorFormControls() {
    return this.vendorFormGroup.controls;
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
      'Already Exit',
      'Vendor PO value Already Created!!)',
      'error'
    );
  }



  getFullyApprovedOrder() {

    this.bookingOrderService.getFullyApprovedOrder().subscribe(result => {
      console.log(result,"1200")
      if (result['status'] == 200) {
        this.orderFullyApproved = result['data'];
        console.log("orderFullyApproved.Orders",this.orderFullyApproved);
        
        this.OrdersArray = this.orderFullyApproved.map((order: any) => {
          console.log(this.OrdersArray)
          return {
            id: order?.id,
            orderId: order?.orderCode,
            orderdate: order?.createdAt,
            customerName: order?.['tbl_masters_customer']['customerName'],
            producttype: order?.['tbl_masters_product.productName'],
            pono:order?.poNo,

            // productdescription: order?.productDescription,
            povalue: order?.poValue,
            podate: order?.poDate,
            
            status:(( order?.poValue == order?.salePaymentReceivedAmount) && (order?.poPurchaseValue == order?.purchasePaymentReceivedAmount)) ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: orange">Completed</span>') :'Inprogress'
          //  && (( order?.['tbl_invoice_datas']['invoiceSalesAmount'] == order?.['tbl_invoice_datas']['receivedAmount']) && (order?.['tbl_purchase_invoice_datas']['invoiceAmount'] == order?.['tbl_purchase_invoice_datas']['purchaseRecievedAmount']))

          }
        });

       

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

  setElementId(id) {
    this.orderId = id;
  }

  setElementInvoiceId(id) {
    this.invoiceId = id
  }
  setElementPurchaseInvoiceId(id) {
    this.purchaseInvoiceId = id
  }

  addData(event, addFullyApprovedorderData: any) {
    if (event.action == 1) {
          this.setElementId(event.value);
          this.addInvoiceData(this.vOrderId, addFullyApprovedorderData);
    }
  }
  addPerchaseData(event, AddPurchasedata: any) {
    if (event.action == 2) {
      this.setElementId(event.value);
      this.AddPurchasedata(this.vOrderId, AddPurchasedata);
    }
  }
  viewInvoice(event, viewInvoiceData: any) {
    if (event.action == 3) {
      this.setElementId(event.value);
      this.openViewInvoiceData(this.vOrderId, viewInvoiceData);
    }
  }
  viewPuchaseInvoice(event, viewPurchaseInvoiceData: any) {
    if (event.action == 4) {
      this.setElementId(event.value);
      this.openViewPurchaseInvoiceData(this.vOrderId, viewPurchaseInvoiceData);
    }
  }
  addVendor(event, addVendorData: any) {
    if (event.action == 1) {
      this.vOrderId=event.value;
      this.setElementId(event.value);
      this.addVendorPoData(event.value, addVendorData);
    }
  }
  viewVendorPo(event, viewVendorData: any) {

    if (event.action == 2) {
      this.vOrderId=event.value;
      this.setElementId(event.value);
 
      
      this.showVendorPoModal(event.value,viewVendorData);
    }
  }
  // show AddPayment Model
  show(event, addPaymentData: any) {

    if (event.action == 1) {
      this.setElementInvoiceId(event.value);
      this.showAddPaymentModal(addPaymentData);
    }
  }
 // show addPurchase Invoice Payment model
  addPurchaseInvoicePayment(event, addPurchasePaymentData: any) {

    if (event.action == 1) {
      this.setElementPurchaseInvoiceId(event.value);
      this.showAddPurchasePaymentModal(addPurchasePaymentData);
    }
  }

  showAddPaymentModal (addPaymentData: any) {
    
    const invoice = this.invoice.find(inv => inv.id === this.invoiceId);

    this.selectedInvoiceValue = invoice['invoiceSalesAmount']
    this.selectedInvoiceReceivedValue = invoice['receivedAmount']

    this.modalService.open(addPaymentData, { size: 'lg', windowClass: 'modal-holder', centered: true })
    .result.then((result) => {
      return "Not Use";
    }, (reason) => {
    });
  }
  showAddPurchasePaymentModal (addPurchasePaymentData: any) {
    const invoice = this.purchaseInvoice.find(inv => inv.id === this.purchaseInvoiceId);

   
    
    this.selectedPurchaseInvoiceValue = invoice['invoiceAmount']
    this.selectedPurchaseInvoiceReceivedValue = invoice['receivedAmount']

    this.modalService.open(addPurchasePaymentData, { size: 'lg', windowClass: 'modal-holder', centered: true })
    .result.then((result) => {
      return "Not Use";
    }, (reason) => {
    });
  }
  invoiceAmountValidator(): ValidatorFn {
    console.log("invoiceAmountValidator");
    console.log(this.selectedPoReceivedValue,"this.selectedPoReceivedValue");
    console.log(this.selectedPoValue,"this.selectedPoValue");
    
    
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || (parseFloat(control.value) + parseFloat(this.selectedPoReceivedValue)) > parseFloat(this.selectedPoValue))) {
        return { 'invAmount': true };
      } else {
        return null;
      }
    };
  }
  invoicePurchaseAmountValidator():ValidatorFn {
    
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || (parseFloat(control.value) + parseFloat(this.selectedPoPurchaseReceivedValue)) > parseFloat(this.selectedPoPurchaseValue))) {
        console.log(control.value);
        console.log(this.selectedPoPurchaseReceivedValue);
        return { 'invAmount': true };
      } else {
        return null;
      }
    };
  }
  paymentAmountValidator(): ValidatorFn {
    console.log(this.selectedInvoiceValue,"this.selectedInvoiceValue");
    
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || (parseFloat(control.value) + parseFloat(this.selectedInvoiceReceivedValue)) > parseFloat(this.selectedInvoiceValue))) {
        return { 'paymentAmount': true };
      }
      return null;
    };
  }
  paymentAmountOfPurchaseValidator():ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || (parseFloat(control.value) + parseFloat(this.selectedPurchaseInvoiceReceivedValue)) > parseFloat(this.selectedPurchaseInvoiceValue))) {
        return { 'paymentAmount': true };
      }
      return null;
    };
  }
  ViewInvoiceFull(event, viewFullInvoice: any) {
    if (event.action == 2) {
      this.setElementInvoiceId(event.value);
      this.openFullViewInvoiceData(event.value, viewFullInvoice);
    }
  }
  ViewPurchaseInvoiceFull(event, viewPurchaseFullInvoice: any) {
    if (event.action == 2) {
      this.setElementPurchaseInvoiceId(event.value);
      this.openFullViewPurchaseInvoiceData(event.value, viewPurchaseFullInvoice);
    }
  }
  getOrder() {
    this.bookingOrderService.getOrder().subscribe(result => {
      if (result['status'] == 200) {
        this.Orders = result['data']
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

  getInvoice() {
    this.bookingOrderService.getInvoice().subscribe(result => {
      if (result['status'] == 200) {
        this.invoice = result['data']
   

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
  getPurchaseInvoice() {
    this.bookingOrderService.getPurchaseInvoice().subscribe(result => {
      if (result['status'] == 200) {
        this.purchaseInvoice = result['data']
    

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
  getPaymentInvoiceById(id) {


    this.bookingOrderService.getPaymentInvoiceById(id).subscribe(result => {
      if (result['status'] == 200) {
        this.payment = result['data']
 

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
        this.payment = result['data']
  

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
  onSubmit(addFullyApprovedorderData) {
   
    this.invoiceFormGroup.controls.orderId.setValue(this.vOrderId);
    this.bookingOrderService.UpdateFullyApprovedData(this.invoiceFormGroup.value).subscribe(data => {
      if (data['status'] == 200) {
        this.successmsg();
        this.modalService.dismissAll(addFullyApprovedorderData);

        this.resetForm();
        window.location.reload();

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
  onSubmitPurchase(AddPurchasedata) {


    this.invoicePerchaseFormGroup.controls.orderId.setValue(this.vOrderId);
    this.bookingOrderService.AddPurchasedInvoice(this.invoicePerchaseFormGroup.value).subscribe(data => {
      if (data['status'] == 200) {
        this.successmsg();
         this.modalService.dismissAll(AddPurchasedata);
       this.resetForm();
        window.location.reload();

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
  onSubmitPayment(addPaymentData) {


    this.paymentFormGroup.controls.orderId.setValue(this.vOrderId);
    this.paymentFormGroup.controls.invoiceId.setValue(this.invoiceId);
  


    this.bookingOrderService.AddPaymentData(this.paymentFormGroup.value).subscribe(data => {
      if (data['status'] == 200) {
  

        this.successmsg();

        this.modalService.dismissAll(addPaymentData);
        this.resetForm();
        window.location.reload();
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

    

    this.paymentPurchaseFormGroup.controls.orderId.setValue(this.vOrderId);
    this.paymentPurchaseFormGroup.controls.purchaseInvoiceId.setValue(this.purchaseInvoiceId);



    this.bookingOrderService.AddPurchasePaymentData(this.paymentPurchaseFormGroup.value).subscribe(data => {
      if (data['status'] == 200) {
        this.successmsg();
       this.modalService.dismissAll(addPaymentData);
        this.resetForm();
        window.location.reload();
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
  onSubmitVendor(addVendorData) {

     this.vendorFormGroup.controls.orderId.setValue(this.orderId);
  console.log(this.vendorFormGroup.value);
  
    this.bookingOrderService.AddVendorData(this.vendorFormGroup.value).subscribe(data => {
      if (data['status'] == 200) {
   

        this.successmsg();

        this.modalService.dismissAll(addVendorData);
        this.resetForm();
      } else if (data['status'] == 201) {
        this.error = 'No credentials provided for authentication.';
      } else if (data['status'] == 202) {
        this.errormsg();
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
  successmsg() {
    Swal.fire('Saved successfully!', 'You clicked the button!', 'success');
  }
  resetForm() {
    this.invoiceFormGroup.reset();
    this.invoicePerchaseFormGroup.reset();
    this.paymentFormGroup.reset();
    this.paymentPurchaseFormGroup.reset();
    this.paymentPurchaseFormGroup.reset();
  }

  addVendorPoData(id, addVendorData: any) {
    
    const fullyApprovedOrder = this.Orders.find(fullyApproved => fullyApproved.id === id);
  

    this.vendorFormGroup.controls.vendorName.setValue(fullyApprovedOrder ['tbl_order_vendors'][0]['tbl_masters_vendor']['vendorName']);


    this.modalService.open(addVendorData, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });

  }

  addInvoiceData(orderId, addFullyApprovedorderData: any) {
   console.log(this.orderFullyApproved);
   
    
    const fullyApprovedOrder = this.orderFullyApproved.find(fullyApproved => fullyApproved.id === orderId);
    console.log(fullyApprovedOrder,"saleInvoice");
    
    
     var paymentTerms = 0;
   
   
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
    //this.invoiceFormGroup.controls.dueDate.setValue(dueDate);
    this.invoiceFormGroup.controls.invoiceRecievedDate.setValue(dueDate1);

    this.selectedPoValue = fullyApprovedOrder['poValue'];
    console.log("selectedPoValue",this.selectedPoValue);
    
    this.selectedPoReceivedValue = fullyApprovedOrder['receivedAmount'];
    console.log("this.selectedPoReceivedValue",this.selectedPoReceivedValue);
    
    this.invoiceFormGroup.controls.poValue.setValue(fullyApprovedOrder['poValue']);
  

    

    this.modalService.open(addFullyApprovedorderData, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });

  }

  AddPurchasedata(orderId, addPurchasedata: any) {
   
    
    const fullyApprovedOrder = this.orderFullyApproved.find(fullyApproved => fullyApproved.id === orderId);

    
   // var paymentTerms = 0;
    var vendorpaymentTerms = 0;
   
   
    const invoiceDate = new Date();
   let invoiceSaleDate = invoiceDate.toISOString().split("T")[0];
    // invoiceDate.setDate(invoiceDate.getDate() + paymentTerms);

    const invoiceDate1 = new Date();
 let invoiceSaleDate1 = invoiceDate1.toISOString().split("T")[0];
  //   invoiceDate1.setDate(invoiceDate1.getDate() + paymentTerms);


   // var dueDate = invoiceDate.getFullYear() + '-' + (invoiceDate.getMonth() + 1 + '').padStart(2, '0') + '-' + invoiceDate.getDate();
    var dueDate1 = invoiceDate1.getFullYear() + '-' + (invoiceDate1.getMonth() + 1 + '').padStart(2, '0') + '-' + invoiceDate1.getDate();
    

   this.invoicePerchaseFormGroup.controls.purchaseInvoiceDate.setValue(invoiceSaleDate1);
 
   // this.invoicePerchaseFormGroup.controls.invoiceRecievedDate.setValue(dueDate1);

   this.selectedPoPurchaseValue = fullyApprovedOrder['poPurchaseValue'];

   
   this.selectedPoPurchaseReceivedValue = fullyApprovedOrder['purchaseRecievedAmount'];
 
   
    this.invoicePerchaseFormGroup.controls.poPurchaseValue.setValue(fullyApprovedOrder['poPurchaseValue']);


    

    this.modalService.open(addPurchasedata, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });

  }


  openViewInvoiceData(orderId, viewInvoiceData: any) {
     this.bookingOrderService.getInvoiceByOrder(orderId).subscribe(result => {
      if (result['status'] == 200) {
        this.invoiceOrder = result['data']
     

        this.InvoiceArray = this.invoiceOrder.map((order: any) => {
          return {
            id: order?.id,
            invoiceSalesAmount: order?.invoiceSalesAmount,
            receivedAmount: order?.receivedAmount,
            tiplInvoiceNo: order?.tiplInvoiceNo,
            // tiplPoNumber: order?.tiplPoNumber,

          }
        });
      }
    },
    );
    this.modalService.open(viewInvoiceData, { size: 'xl', windowClass: 'modal-holder', centered: true });

  }
  openViewPurchaseInvoiceData(orderId, viewInvoiceData: any) {
    this.bookingOrderService.getPurchaseInvoiceByOrder(orderId).subscribe(result => {
     if (result['status'] == 200) {
       this.invoiceOrder = result['data']
          this.purchaseInvoiceArray = this.invoiceOrder.map((order: any) => {
         return {
           id: order?.id,
           order_id:order?. order_id,
           invoiceNumber: order?.invoiceNumber,
           invoiceAmount:order?.invoiceAmount,
           purchaseInvoiceDate: order?.purchaseInvoiceDate,
           receivedAmount: order?.receivedAmount,
           invoiceRecievedDate:order?.invoiceRecievedDate
          // tiplInvoiceNo: order?.tiplInvoiceNo,
           // tiplPoNumber: order?.tiplPoNumber,

         }
       });
     }
   },
   );
   this.modalService.open(viewInvoiceData, { size: 'xl', windowClass: 'modal-holder', centered: true });

 }
  showVendorPoModal(orderId, viewVendorData: any) {

    this.bookingOrderService.getVendorPoByOrder(orderId).subscribe(result => {
      if (result['status'] == 200) {
        this.vendorPoOrder = result['data']
          
        this.vendorArray = this.vendorPoOrder.map((order: any) => {
    
          return {
            id: order?.id,
            tiplPoNumber: order?.tiplPoNumber,
            tiplPoDate: order?.tiplPoDate,

          }
        });
      }
    },
    );
    this.modalService.open(viewVendorData, { size: 'xl', windowClass: 'modal-holder', centered: true });

  }
  openFullViewInvoiceData(id, viewFullInvoice: any) {
       this.getPaymentInvoiceById(id);

    const viewInvoice = this.invoiceOrder.find(invoiceData => invoiceData.id === id);
   
    
    this.invoiceFormGroup.controls.invoiceAmount.setValue(viewInvoice['invoiceAmount']);
    this.invoiceFormGroup.controls.invoiceNumber.setValue(viewInvoice['invoiceNumber']);
    this.invoiceFormGroup.controls.invoiceSalesAmount.setValue(viewInvoice['invoiceSalesAmount']);

    var invoiceRaisedDate1 = viewInvoice['invoiceRaisedDate']
    let invoiceRaisedDate = invoiceRaisedDate1.split("T")[0];
    this.invoiceFormGroup.controls.invoiceRaisedDate.setValue(invoiceRaisedDate);

    var dueDate1 = viewInvoice['dueDate']
    let dueDate = dueDate1.split("T")[0];
    this.invoiceFormGroup.controls.dueDate.setValue(dueDate);

    var invoiceRecievedDate1 = viewInvoice['invoiceRecievedDate']
    let invoiceRecievedDate = invoiceRecievedDate1.split("T")[0];
    this.invoiceFormGroup.controls.invoiceRecievedDate.setValue(invoiceRecievedDate);

    var purchaseInvoiceDate1 = viewInvoice['purchaseInvoiceDate']
    let purchaseInvoiceDate = purchaseInvoiceDate1.split("T")[0];
    this.invoiceFormGroup.controls.purchaseInvoiceDate.setValue(purchaseInvoiceDate);

    this.invoiceFormGroup.controls.receivedAmount.setValue(viewInvoice['receivedAmount']);
    this.invoiceFormGroup.controls.tiplInvoiceNo.setValue(viewInvoice['tiplInvoiceNo']);

    //var tiplPoDate1 = viewInvoice['tiplPoDate']
    //let tiplPoDate = tiplPoDate1.split("T")[0];
    //this.invoiceFormGroup.controls.tiplPoDate.setValue(tiplPoDate);
   // this.invoiceFormGroup.controls.tiplPoNumber.setValue(viewInvoice['tiplPoNumber']);


    this.modalService.open(viewFullInvoice, { size: 'lg', windowClass: 'modal-holder', centered: true });

  }

  openFullViewPurchaseInvoiceData(id, viewPurchaseFullInvoice: any) {
    this.getPurchasePaymentInvoiceById(id);

 const viewInvoice = this.invoiceOrder.find(invoiceData => invoiceData.id === id);

 
 this.invoicePerchaseFormGroup.controls.invoiceAmount.setValue(viewInvoice['invoiceAmount']);
 this.invoicePerchaseFormGroup.controls.invoiceNumber.setValue(viewInvoice['invoiceNumber']);
 //this.invoicePerchaseFormGroup.controls.invoiceSalesAmount.setValue(viewInvoice['invoiceSalesAmount']);

//  var invoiceRaisedDate1 = viewInvoice['invoiceRaisedDate']
//  let invoiceRaisedDate = invoiceRaisedDate1.split("T")[0];
//  this.invoicePerchaseFormGroup.controls.invoiceRaisedDate.setValue(invoiceRaisedDate);

// var dueDate1 = viewInvoice['dueDate']
 //let dueDate = dueDate1.split("T")[0];
 //this.invoicePerchaseFormGroup.controls.dueDate.setValue(dueDate);

 var invoiceRecievedDate1 = viewInvoice['invoiceRecievedDate']
 let invoiceRecievedDate = invoiceRecievedDate1.split("T")[0];
 this.invoicePerchaseFormGroup.controls.invoiceRecievedDate.setValue(invoiceRecievedDate);

 var purchaseInvoiceDate1 = viewInvoice['purchaseInvoiceDate']
 let purchaseInvoiceDate = purchaseInvoiceDate1.split("T")[0];
 this.invoicePerchaseFormGroup.controls.purchaseInvoiceDate.setValue(purchaseInvoiceDate);

 this.invoicePerchaseFormGroup.controls.receivedAmount.setValue(viewInvoice['receivedAmount']);
 //this.invoicePerchaseFormGroup.controls.tiplInvoiceNo.setValue(viewInvoice['tiplInvoiceNo']);

 //var tiplPoDate1 = viewInvoice['tiplPoDate']
 //let tiplPoDate = tiplPoDate1.split("T")[0];
 //this.invoiceFormGroup.controls.tiplPoDate.setValue(tiplPoDate);
// this.invoiceFormGroup.controls.tiplPoNumber.setValue(viewInvoice['tiplPoNumber']);


 this.modalService.open(viewPurchaseFullInvoice, { size: 'lg', windowClass: 'modal-holder', centered: true });

}
  vendorArray: Array<any> = []
  Columns2: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
     
    { name: 'tiplPoNumber', value: 'TIPL PO No', sortable: true, isEnabled: true },
    { name: 'tiplPoDate', value: 'TIPL PO Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
  ];
  Actions2: Array<any> = [
    { name: '2', value: 'Add Vendor Invoice', icon: 'eye', multiple: false },
    { name: '1', value: 'Add Customer Invoice', icon: 'eye', multiple: false }, 
    
    // { name: '3', value: 'View Sale Invoices', icon: 'eye', multiple: false },
    // { name: '4', value: 'View Puchase Invoices', icon: 'eye', multiple: false },
  ];
  LightBlue2: any = "#3f51b5";




  InvoiceArray: Array<any> = []
  Columns1: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
   // { name: 'invoiceAmount', value: 'Invoice Amount', sortable: true, isEnabled: true },
    //{ name: 'invoiceNumber', value: 'Invoice Number', sortable: true, isEnabled: true },
    // { name: 'invoiceRaisedDate', value: 'Invoice Raised Date', sortable: true, isEnabled: true,dateFormat: 'MM-dd-yyyy'  },
    // { name: 'invoiceRecievedDate', value: 'Invoice Recieved Date', sortable: true, isEnabled: true ,dateFormat: 'MM-dd-yyyy' },
    { name: 'invoiceSalesAmount', value: 'Invoice Sales Amount', sortable: true, isEnabled: true },
    // { name: 'purchaseInvoiceDate', value: 'Purchase Invoice Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
     { name: 'receivedAmount', value: 'Received Amount', sortable: true, isEnabled: true, },
    { name: 'tiplInvoiceNo', value: 'TIPL Invoice No', sortable: true, isEnabled: true },
  ];
  Actions1: Array<any> = [
    { name: '1', value: 'Add payment', icon: 'eye', multiple: false },
    { name: '2', value: 'View Invoice', icon: 'eye', multiple: false },
  ];
  LightBlue1: any = "#3f51b5";

  purchaseInvoiceArray: Array<any> = []
  Columns3: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'invoiceNumber', value: 'Invoice Number', sortable: true, isEnabled: true },
   { name: 'invoiceAmount', value: 'Invoice Amount', sortable: true, isEnabled: true },
   {  name: 'purchaseInvoiceDate', value: 'Purchase Invoice Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'invoiceRecievedDate', value: 'Purchase Invoice Recieved Date', sortable: true, isEnabled: true ,isDate: true,dateFormat: 'MM-dd-yyyy' },
    //{ name: 'invoiceSalesAmount', value: 'Invoice Sales Amount', sortable: true, isEnabled: true },
   
     { name: 'receivedAmount', value: 'Received Amount', sortable: true, isEnabled: true, },
   // { name: 'tiplInvoiceNo', value: 'TIPL Invoice No', sortable: true, isEnabled: true },
  ];
  Actions3: Array<any> = [
    { name: '1', value: 'Add Purchase Invoice payment', icon: 'eye', multiple: false },
    { name: '2', value: 'View Purchase Invoice', icon: 'eye', multiple: false },
  ];
  LightBlue3: any = "#3f51b5";

  Paymentterm(days) { 
    this.date = new Date();
    this.date.setDate( this.date.getDate() + parseInt(days));
     this.invoiceFormGroup.controls.dueDate.setValue( this.date);
  }

  // newdate(){
  //   const dueDate = this.invoiceFormGroup.value['dueDate'];
  //   this.newdueDate = dueDate;
  //   this.invoiceFormGroup.controls['dueDate'].setValue(this.newdueDate);
  // }

  PurchasePaymentterm(days) { 
     this.date1 = new Date();
   this.date1.setDate( this.date1.getDate() + parseInt(days));
    this.invoicePerchaseFormGroup.controls.invoiceRecievedDate.setValue( this.date1);
 }

}



