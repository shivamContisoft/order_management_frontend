import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
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
import * as XLSX from 'xlsx';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-booking-order',
  templateUrl: './booking-order.component.html',
  styleUrls: ['./booking-order.component.scss']
})
export class BookingOrderComponent implements OnInit {

  OrdersArray: Array<any> = []
  Columns: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'orderId', value: 'Order ID', sortable: true, isEnabled: true },
    { name: 'orderdate', value: 'Order Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'customername', value: 'Customer Name', sortable: true, isEnabled: true },
    { name: 'pono', value: 'Customer PO No. ', sortable: true, isEnabled: true },
    { name: 'povalue', value: 'Customer PO Value', sortable: true, isEnabled: true },
    // { name: 'productdescription', value: 'Product Description', sortable: true, isEnabled: true },
    { name: 'status', value: 'Status', sortable: true, isEnabled: true, },

  ];


  NewData: Array<any> = []
  columns: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'orderId', value: 'Order ID', sortable: true, isEnabled: true },
    { name: 'orderdate', value: 'Order Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'firstName', value: 'AM Name', sortable: true, isEnabled: true },
    // { name: 'lastName', value: 'AM lastName', sortable: true, isEnabled: true },
    { name: 'firstname', value: 'BDM Name', sortable: true, isEnabled: true },
    // { name: 'lastname', value: 'BDM lastName', sortable: true, isEnabled: true },
    { name: 'entityName', value: 'Entity Name', sortable: true, isEnabled: true },
    { name: 'customername', value: 'Customer Name', sortable: true, isEnabled: true },
    { name: 'pono', value: 'Customer PO No. ', sortable: true, isEnabled: true },
    { name: 'poDate', value: 'PO Date', sortable: true, isEnabled: true },
    { name: 'oem', value: 'Oem', sortable: true, isEnabled: true },
    { name: 'oemDealerId', value: 'Oem Dealer Id', sortable: true, isEnabled: true },
    { name: 'bdm', value: 'Bdm', sortable: true, isEnabled: true },
    { name: 'bdmPercentage', value: 'BDM Percentage', sortable: true, isEnabled: true },
    { name: 'productDescription', value: 'Product Description', sortable: true, isEnabled: true },
    { name: 'productType', value: 'Product Type', sortable: true, isEnabled: true },
    { name: 'duration', value: 'Duration', sortable: true, isEnabled: true },
    { name: 'povalue', value: 'Total EUP', sortable: true, isEnabled: true },
    { name: 'poPurchaseValue', value: 'Total TP', sortable: true, isEnabled: true },
    { name: 'POGM', value: 'POGM', sortable: true, isEnabled: true },
    { name: 'POGMPercent', value: 'POGMPercent', sortable: true, isEnabled: true },
    { name: 'PM', value: 'PM', sortable: true, isEnabled: true },
    { name: 'BR', value: 'BR', sortable: true, isEnabled: true },
    { name: 'externalCost', value: 'External Cost', sortable: true, isEnabled: true },
    { name: 'GP', value: 'GP', sortable: true, isEnabled: true },
    { name: 'GPPercent', value: 'GPPercent', sortable: true, isEnabled: true },
    { name: 'companyPaymentTerms', value: 'Company Payment Terms', sortable: true, isEnabled: true },
    { name: 'receivedAmount', value: 'Customer Invoice Amount', sortable: true, isEnabled: true },
    { name: 'salePaymentReceivedAmount', value: 'Customer Payment', sortable: true, isEnabled: true },
    { name: 'purchaseRecievedAmount', value: 'Vendor Invoice Amount', sortable: true, isEnabled: true },
    { name: 'purchasePaymentReceivedAmount', value: 'Vendor Payment', sortable: true, isEnabled: true },
    // { name: 'vendorName', value: 'vendorName', sortable: true, isEnabled: true },
  ]

  BDMOrdersXL: Array<any> = []
  Columns2: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'orderId', value: 'Order ID', sortable: true, isEnabled: true },
    { name: 'orderdate', value: 'Order Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'customername', value: 'Customer Name', sortable: true, isEnabled: true },
    { name: 'pono', value: 'Customer PO No. ', sortable: true, isEnabled: true },
    { name: 'bdmPercentage', value: 'BDM percentage', sortable: true, isEnabled: true },
    { name: 'povalue', value: 'Po Value', sortable: true, isEnabled: true, },
    { name: 'BDMValue', value: 'BDM EUP', sortable: true, isEnabled: true },
    { name: 'bdmTp', value: 'BDM TP', sortable: true, isEnabled: true },
    { name: 'POGM', value: 'BDM POGM', sortable: true, isEnabled: true },
    { name: 'POGMPercent', value: 'BDM POGMPercent', sortable: true, isEnabled: true },
    { name: 'PM', value: 'BDM PM', sortable: true, isEnabled: true },
    { name: 'BR', value: 'BDM BR', sortable: true, isEnabled: true },
    { name: 'bdmgp', value: 'BDM GP', sortable: true, isEnabled: true },
    // { name: 'GPPercent', value: 'BDM GPPercent', sortable: true, isEnabled: true },


  ]


  BDMOrdersArray: Array<any> = []
  Columns1: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'orderId', value: 'Order ID', sortable: true, isEnabled: true },
    { name: 'orderdate', value: 'Order Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'customername', value: 'Customer Name', sortable: true, isEnabled: true },
    { name: 'pono', value: 'Customer PO No. ', sortable: true, isEnabled: true },
    { name: 'totalPoValue', value: 'Total Po Value' ,sortable: true, isEnabled: true},
    { name: 'bdmPercentage', value: 'BDM Percentage', sortable: true, isEnabled: true },
    { name: 'BDMValue', value: 'BDM EUP', sortable: true, isEnabled: true },
    { name: 'bdmTp', value: 'BDM TP', sortable: true, isEnabled: true },
   
    // { name: 'POGM', value: 'BDM POGM', sortable: true, isEnabled: true },
    // { name: 'bdmgp', value: 'BDM GP', sortable: true, isEnabled: true },
    //  { name: 'povalue', value: 'Customer PO Value', sortable: true, isEnabled: true },
    //  { name: 'poPurchaseValue', value: 'Vendor po Value', sortable: true, isEnabled: true },
    { name: 'status', value: 'Status', sortable: true, isEnabled: true, },

  ];

  Actions: Array<any> = [
    { name: '1', value: 'View Order', icon: 'eye', multiple: false },
    { name: '2', value: 'View Approval', icon: 'eye', multiple: false },
    // { name: '3', value: 'Delete Order', icon: 'eye' , multiple: false},

  ];
  LightBlue: any = "#3f51b5";

  SelectedProductType: string = "";

  // bread crumb items
  breadCrumbItems: Array<{}>;
  searchText: '';
  searchname = '';
  orderFormGroup: FormGroup;
  oemFormGroup: FormGroup;
  phoneData: FormGroup;
  eachOemFormGroup: FormGroup;
  arrayFormGroup: FormGroup;
  form: FormGroup;

  Orders: any = [];
  // BDMOrdersArray:[];
  // BDMOrders: any = [];
  Entitys: any = [];
  Bdms: any = [];
  BdmsData: any = [];
  Oems: any = [];
  Customers: any = [];
  OrderType: any = [];
  Vendors: any = [];
  Ams: any = [];
  Products: any = [];

  businessUnit: any = [];
  myFiles: string[] = [];

  tableData: Array<any> = Array<any>();
  tableFileData: Array<any> = Array<any>();
  File_Name: any[];
  Document_Type: any[];
  File_Size: any[];
  dataFile: any = [];
  dataDocType: any = [];
  filecount: any = [];

  filesSelector = "";
  filesname = "";

  filebtn: boolean = true;
  file_name: string = "";
  viewstep: boolean = true;
  selectedFile: File = null;
  selectedFiles: any = [];
  selectedDocumentTypes: any = [];
  finalSelectedFiles: any = [];

  vendorSelectedFiles = [];
  addOnVendors: any = [];
  externalCost = [];
  history = [];
  userdata = [];
  orderCount = 0;
  orderId: any;
  userId = 0;
  userAccountType = 0;
  value = 0;
  error = '';
  productValue: any = 0;
  tiplService: any = 0;
  tiplServiceCost: any = 0;
  totalEUP: any = 0;
  productCost: any = 0;
  totalTp: any = 0;
  pogm: any = 0;
  pmvalue: any = 0;
  brValue: any = 0;
  poValue: any = 0;
  BDMValue: any = 0;
  pogmPer: any = 0;
  gpValue: any = 0;

  gpPer: any = 0;
  externalcost: any = 0;
  custmerPaymentTerm: any = 0;
  vendorpaymentTerm: any = 0;
  purchaseProductAttachVal: any = 0;
  totalvalue: any = 0;
  pName: any = 0;
  data: any = [];
  result: any = 0;
  ans: any;
  valuearray: any = 0;
  pType: any;
  oemList: any = [];
  // NewData: any=[];
  addBDMs: any = [];
  downloadxlSheet: any = [];
  productList: any = [];
  oemArray: any = [];
  orderFormControls: any;
  // downloadxlSheet: any = [];
  @ViewChild('studentDetailsExcel') orderExcelSheet: ElementRef
  @ViewChild('BdmDetailsExcel') BdmDetailsExcel: ElementRef
  constructor(private moduleService: ModuleService, private modalService: NgbModal, private amService: AmService, private vendorService: VendorService,
    private bdmService: BdmService, private oemService: OemService, private customerService: CustomerService, private productService: ProductService,
    private formBuilder: FormBuilder, private authService: AuthenticationService,
    private bookingOrderService: BookingOrderService,
    private domSanitizer: DomSanitizer) { }

  multipleOption: FlatpickrOptions = {
    mode: 'multiple',
  }

  ngOnInit(): void {




    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Booking order', active: true },
    ];
    if (this.authService.currentUserValue.user)
      this.userId = this.authService.currentUserValue.user.id;
    this.userAccountType = this.authService.currentUserValue.user.tbl_auth.accountType;
    if (this.userAccountType == 2) {
      this.getOrderAM();
    } else if (this.userAccountType == 3) {
      this.getOrderBDM();
    }
    else {
      this.getOrder();
    }

    if (this.userAccountType == 3) {
      this.getOrderBDM();
    }
    // this.getOrder();
    this.getEntity();
    this.getOem();
    this.getBdm();
    this.getAm();
    this.getProduct();
    this.getVendor();
    this.getBusinessUnit();

    this.form = this.formBuilder.group({
      file: ['']
    })



    this.orderFormGroup = this.formBuilder.group({
      amId: [''], // [Validators.required]
      entity: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyPaymentTerms: ['', [Validators.required]],
      // oem: [''],
      // oemDealerId: [],
      // bdm: [],
      // bdmPercentage: [0],
      // businessUnit: ['', [Validators.required]],
      // productDescription: ['', [Validators.required]],
      // productType: ['', [Validators.required]],
      saleProductValue: [0],
      saleProductAttachValue: [0],
      saleProductServiceValue: [0],
      purchaseProductValue: [0],
      purchaseProductAttachValue: [0],
      purchaseProductServiceValue: [0],
      poNo: ['', [Validators.required]],
      orderType: [''],
      poDate: ['', [Validators.required, pastDateValidator()]],
      poValue: ['', [Validators.required]],
      poPurchaseValue: ['', [Validators.required]],
      duration: [''],
      // addOnVendor: this.formBuilder.array([]),
      addOnOem: this.formBuilder.array([]),
      fileSelector: [''],
      documentName: [''],
      file: [''],
      id: [''],
      order_id: [''],
      externalCost: [],

    },
    )

    this.oemFormGroup = this.formBuilder.group({
      oem: [''],
      oemDealerId: [''],
      productDescription: ['', [Validators.required]],
      productType: ['', [Validators.required]],
      poValue: [''],
      saleProductValue: [''],
      saleProductAttachValue: [''],
      saleProductServiceValue: [''],
      // srno: [],
      bdm: [],
      bdmPercentage: [0],
      businessUnit: [],
      // vendorValue:[''],
      // vendorPaymentValue:[''],
      // vendorPoValue:[''],
      poPurchaseValue: [''],
      addOnVendor: this.formBuilder.array([]),
    });



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

    //this.addVendor();
    //this.addOem();
  }


  // getToday(): string {
  //   return new Date().toISOString().split('T')[0];
  // }

  get getOemFormArray() {
    return this.orderFormGroup.controls['addOnOem'] as FormArray;
  }

  get oemVendors() {
    return this.oemFormGroup.controls['addOnVendor'] as FormArray;
  }

  oemForm(obj) {
    return this.formBuilder.group({
      oem: [obj.oem],
      oemDealerId: [obj.oemDealerId],
      poValue: [obj.poValue],
      productType: [obj.productType],
      productDescription: [obj.productDescription],
      saleProductValue: [obj.saleProductValue],
      saleProductAttachValue: [obj.saleProductAttachValue],
      saleProductServiceValue: [obj.saleProductServiceValue],
      poPurchaseValue: [obj.poPurchaseValue],
      // srno: [obj.srno],
      bdm: [obj.bdm],
      bdmPercentage: [obj.bdmPercentage],
      businessUnit: [obj.businessUnit],
      // vendorValue:[obj.vendorValue],
      // vendorPaymentValue:[obj.vendorPaymentValue],
      // vendorPoValue:[obj.vendorPoValue],
      // addOnVendor: this.formBuilder.array([]),
      addOnVendor: this.formBuilder.array([obj.addOnVendor]),
    });

  }





  openOemModal(modal) {
    if (this.vendordata().length==0) {
      this.addVendor();
    }
    console.log(this.orderFormGroup.controls.addOnOem.value, "-addOnOem");
    this.modalService.open(modal, { size: "lg" })
  }

  get getOrderFormControls() {
    return this.orderFormGroup.controls;
  }

  get getOemFormControls() {
    return this.oemFormGroup.controls;
  }

  // get getEachOemFormGroup() {
  //   return this.eachOemFormGroup.controls;
  // }

  resetForm() {
    this.oemFormGroup.reset();
    this.orderFormGroup.reset();
    this.getOemFormArray.clear();

  }

  submitOem(createOEM) {

    let obj = this.oemFormGroup.value;

    this.getOemFormArray.push(this.oemForm(obj));
    console.log(this.orderFormGroup.controls['addOnOem'].value);

    // this.orderFormGroup.controls['addOnOem'].push(this.oemForm(obj));
    this.oemArray = this.getOemFormArray.value
    // this.modalService.dismissAll(createOEM);
    
    this.successmsg();
    this.oemFormGroup.reset();

  }
  //For Vendor Add on fly
  vendordata(): FormArray {
    return this.oemFormGroup.get('addOnVendor') as FormArray;
  }

  vendor(): FormGroup {
    return this.formBuilder.group({
      vendorValue: [''],
      vendorPaymentValue: [''],
      vendorPoValue: [''],
      vendorProductValue: [0],
      vendorProductAttachValue: [0],
      vendorProductServiceValue: [0],
    });
  }

  addVendor() {
    this.vendordata().push(this.vendor());
  }

  deleteoemData(i: number) {
    console.log(i);
    this.getOemFormArray.removeAt(i);
  }

  deleteVendor(i: number) {
    this.vendordata().removeAt(i);
  }


  vendorvaluesMatchwithservices(i) {
    let vendorProductValue = this.oemFormGroup.controls.addOnVendor.value[i].vendorProductValue;
    let vendorProductAttachValue = this.oemFormGroup.controls.addOnVendor.value[i].vendorProductAttachValue || 0;
    let vendorProductServiceValue = this.oemFormGroup.controls.addOnVendor.value[i].vendorProductServiceValue || 0;

    let valuearray = (+vendorProductValue) + (+vendorProductAttachValue) + (+vendorProductServiceValue);

    this.vendordata().controls[i]['controls'].vendorPoValue.setValue(valuearray);

    valuearray = 0;
    vendorProductValue = 0;
    vendorProductAttachValue = 0;
    vendorProductServiceValue = 0;
    let vendorPoValue = 0;

    this.setTotalPurchaseValue()
  }



  setTotalPurchaseValue() {

    var tVal = 0;
    var pValue = 0;
    var sValue = 0;
    var aValue = 0;
    for (let control of this.vendordata().controls) {
      tVal = tVal + parseInt(control.get('vendorPoValue').value);
      pValue = pValue + control.get('vendorProductValue').value ;
      aValue = aValue + control.get('vendorProductAttachValue').value;
      sValue = sValue + control.get('vendorProductServiceValue').value;
    }

    this.oemFormGroup.controls['poPurchaseValue'].setValue(tVal);
    this.oemFormGroup.controls['purchaseProductValue'].setValue(pValue);
    this.oemFormGroup.controls['purchaseProductAttachValue'].setValue(aValue);
    this.oemFormGroup.controls['purchaseProductServiceValue'].setValue(sValue);




  }



  // For File Attachment
  onClickText() {
    this.filebtn = false;
  }

  onFileChange(event) {
    let file = event.target.files[0];
    this.form.get('file').setValue(file);
    this.file_name = this.form.get('file').value['name'];
    this.selectedFile = event.target.files[0];
    //this.formData.append('file_' + num_of_recs, this.form.get('file').value);
  }



  valuesMatchwithservices() {
    const saleProductValue = this.oemFormGroup.value['saleProductValue'];
    const saleProductAttachValue = this.oemFormGroup.value['saleProductAttachValue'] || 0;
    const saleProductServiceValue = this.oemFormGroup.value['saleProductServiceValue'] || 0;

    this.totalvalue = (+saleProductValue) + (+saleProductAttachValue) + (+saleProductServiceValue);

    this.oemFormGroup.controls['poValue'].setValue(this.totalvalue);
  }
  purchasevaluesMatchwithservices() {
    const purchaseProductValue = this.oemFormGroup.value['purchaseProductValue'];
    const purchaseProductAttachValue = this.oemFormGroup.value['purchaseProductAttachValue'] || 0;
    const purchaseProductServiceValue = this.oemFormGroup.value['purchaseProductServiceValue'] || 0;

    this.totalvalue = (+purchaseProductValue) + (+purchaseProductAttachValue) + (+purchaseProductServiceValue);



    this.oemFormGroup.controls['poPurchaseValue'].setValue(this.totalvalue);
  }

  vendorsPOValues() {
    const vendorPoValue = this.oemFormGroup.value['vendorPoValue'];
    const vendorPoValue1 = this.oemFormGroup.value['vendorPoValue'] || 0;
    const vendorPoValue2 = this.oemFormGroup.value['vendorPoValue2'] || 0;

    this.totalvalue = (+vendorPoValue) + (+vendorPoValue1) + (+vendorPoValue2);



    this.oemFormGroup.controls['vendorPoValue'].setValue(this.totalvalue);
  }


  // customerPOValues() {
  //   const customerPoValues = this.oemFormGroup.value['customerPoValues'];
  //   const customerPoValues = this.oemFormGroup.value['customerPoValues'] || 0;
  //   const customerPoValues = this.oemFormGroup.value['customerPoValues'] || 0;

  //   this.totalvalue = (+customerPoValues) + (+customerPoValues) + (+customerPoValues);



  //   this.oemFormGroup.controls['customerPoValues'].setValue(this.totalvalue);
  // }



  /** Start Get All Required Data */
  getOrder() {
    this.bookingOrderService.getOrder().subscribe(result => {

      if (result['status'] == 200) {
        this.Orders = result['data']


        console.log(this.Orders, "this.Ordersssssssssssssssssss");

        this.OrdersArray = this.Orders.map((order: any) => {
          return {
            id: order?.id,
            orderId: order?.orderCode,
            orderdate: order?.createdAt,

            customername: order?.tbl_masters_customer['customerName'],
            // producttype: order?.tbl_masters_product['productName'],
            // productdescription: order?.tbl_order_oems[0]['productDescription'],
            pono: order?.poNo,
            povalue: order?.poValue,
            podate: order?.poDate,
            // podate: order?.poDate,
            status: order?.status == 'Pending' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: orange">Pending</span>') :
              order?.status == 'Approved' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: Green">Approved</span>') :
                order?.status == 'Rejected' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: red">Rejected</span>') :
                  order?.status == 'Fully Approved!!' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: Green">Fully Approved!!</span>') :
                    order?.status == 'Final Approved!!' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: Green">Fully Approved!!</span>') : ''
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
  getOrderAM() {
    this.bookingOrderService.getOrderAM().subscribe(result => {

      if (result['status'] == 200) {
        this.Orders = result['data'];

        console.log(this.Orders, "this.Orders11111111111111");



        this.OrdersArray = this.Orders.map((order: any) => {
          console.log(this.OrdersArray, " this.OrdersArray")
          return {
            id: order?.id,
            orderId: order?.orderCode,
            orderdate: order?.createdAt,

            customername: order?.tbl_masters_customer['customerName'],
            //producttype: order?.tbl_masters_product['productName'],
            // productdescription: order?.tbl_order_oems[0]['productDescription'],
            pono: order?.poNo,
            povalue: order?.poValue,
            podate: order?.poDate,
            status: order?.status == 'Pending' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: orange">Pending</span>') :
              order?.status == 'Approved' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: Green">Approved</span>') :
                order?.status == 'Rejected' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: red">Rejected</span>') :
                  order?.status == 'Fully Approved!!' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: Green">Fully Approved!!</span>') :
                    order?.status == 'Final Approved!!' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: Green">Fully Approved!!</span>') : ''
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

  getOrderBDM() {
    this.bookingOrderService.getOrderBDM().subscribe(result => {
      if (result['status'] == 200) {
        this.Orders = result['data'];
        // console.log(this.Orders, "bdm");
        let sum = 0;
        let bdm_perc = 0, customer_bdm_value = 0 , totalPoValue=0

        //  const sum = ['tbl_order_oems'];  ///.reduce((partialSum, a) => partialSum + a, 0);


        // console.log(sum,"orderSum")

        this.BDMOrdersArray = this.Orders.map((order: any) => {


          let oem_order_arr = order.tbl_order_oems.filter((e: any) => { return e.orderId = order.id });
          
          sum = oem_order_arr.reduce((partialSum, a) => partialSum + a.vendorPoValue, 0);
          
          customer_bdm_value = oem_order_arr.reduce((partialSum, a) => partialSum + a.customerPoValue, 0);

          let oem_order = order.tbl_order_oems.filter((e: any) => { return e.orderId = order.id });
          console.log(oem_order,"oem_order")


          totalPoValue = oem_order.reduce((partialSum, a) => partialSum + a.totalCustomerPoValue, 0)

          bdm_perc = (customer_bdm_value / totalPoValue ) * 100;

          return {
            id: order.id,
            orderId: order?.orderCode,
            orderdate: order?.createdAt,
            bdmPercentage: (bdm_perc).toFixed(0), //order?.tbl_order_oems.bdmPercentage,
            customername: order?.tbl_masters_customer['customerName'],
            gp: order?.GP,
            poPurchaseValue: order?.poPurchaseValue,
            bdmTp: (sum).toFixed(2),
            // vendorPovalueSum: sum, // add the sum to the object
            pono: order?.poNo,
            povalue: order?.poValue,
            totalPoValue: (totalPoValue).toFixed(2),
            BDMValue: (customer_bdm_value).toFixed(2),
            podate: order?.poDate,
            status: order?.status == 'Pending' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: orange">Pending</span>') :
              order?.status == 'Approved' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: Green">Approved</span>') :
                order?.status == 'Rejected' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: red">Rejected</span>') :
                  order?.status == 'Fully Approved!!' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: Green">Fully Approved!!</span>') :
                    order?.status == 'Final Approved!!' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: Green">Fully Approved!!</span>') : ''
          };
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







  getEntity() {
    this.bookingOrderService.getEntity().subscribe(result => {
      if (result['status'] == 200) {
        this.Entitys = result['data']['rows']
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

  getCustomer(entityId) {
    this.bookingOrderService.getCustomer(entityId).subscribe(result => {

      if (result['status'] == 200) {
        console.log(result['status'], "999999999999")
        if (result['message'] == 'Customers Found successfully!') {
          this.Customers = result['data']['rows']

        } else {
          this.errormsg();
        }
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

  getOrderType(orderType) {
    this.bookingOrderService.getOrderType(orderType).subscribe(result => {
      if (result['status'] == 200) {
        this.OrderType = result['data']['rows']

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


  // getOrderType(orderType) {

  //   this.bookingOrderService.getOrderType(orderType).subscribe(result => {
  //     if (result['status'] == 200) {
  //       if (result['message'] == 'OrderType Found successfully!') {
  //         this.OrderType = result['data']['rows']

  //       } else {
  //         this.errormsg();
  //       }
  //     } else if (result['status'] == 201) {
  //       this.error = 'No credentials provided for authentication.';
  //     } else if (result['status'] == 202) {
  //       this.error = 'You have invalid User Name.';
  //     } else {
  //       this.error = 'Unknown error!';
  //     }
  //     setTimeout(() => {
  //       this.error = '';
  //     }, 5000);
  //   },
  //     error => {
  //       this.error = error ? error : '';
  //       setTimeout(() => {
  //         this.error = '';
  //       }, 5000);
  //     });
  // }



  getBdm() {
    this.bdmService.get().subscribe(result => {
      if (result['status'] == 200) {
        this.Bdms = result['data']
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

  getBusinessUnit() {
    this.bdmService.getBusinessUnit().subscribe(result => {
      if (result['status'] == 200) {
        this.businessUnit = result['data']['rows']

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

  getBdmById(buId) {
    this.bookingOrderService.getBdmById(buId).subscribe(result => {

      if (result['status'] == 200) {
        if (result['message'] == 'BDM Not Found') {
          this.errormsg();
        } else {
          this.BdmsData = result['data']


        }
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

  getOem() {
    this.oemService.get().subscribe(result => {
      if (result['status'] == 200) {
        this.Oems = result['data']['rows']


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

  getAm() {
    this.amService.get().subscribe(result => {
      if (result['status'] == 200) {
        this.Ams = result['data']
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

  getProduct() {
    this.productService.get().subscribe(result => {
      if (result['status'] == 200) {
        this.Products = result['data']['rows']

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
        this.Vendors = result['data']['rows'];
        console.log(this.Vendors, "venders");

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
  viewElement(event, viewbookorder: any) {
    if (event.action == 1) {
      this.setElementId(event.value);
      this.openViewBookOrderModal(event.value, viewbookorder);
    }


  }
  viewApprovalFms(event, viewApprovalOrderFMS: any) {
    console.log(this.Orders, "this.Orders");
    this.setElementId(event.value);
    const approvalorders = this.Orders.find(approvalorder => approvalorder.id === event.value);
    // console.log(approvalorders,"approvalorders");

    // this.pType = approvalorders.tbl_order_oems.tbl_masters_product['productName']

    if (this.pType == 'FMS') {
      if (event.action == 2) {

        this.setElementId(event.value);
        this.openViewFmsApprovalModal(event.value, viewApprovalOrderFMS);
      }

    }
  }
  viewApprovalNonFms(event, viewApprovalOrderNONFMS: any) {
    console.log(this.Orders, "this.Orders");
    this.setElementId(event.value);
    const approvalorders = this.Orders.find(approvalorder => approvalorder.id === event.value);
    console.log(approvalorders,"approvalorders");
    this.pType = approvalorders.tbl_order_oems[0].tbl_masters_product['productName']
    // this.pType = (approvalorders['productType']);
    console.log(this.pType);
    if (this.pType == 'Product' || this.pType == 'Renewal' || this.pType == 'Product + Attach' || this.pType == 'Product + Attach + Service' || this.pType == 'Training' || this.pType == 'Standalone Services' || this.pType == 'ORC' || this.pType == 'Product + Services' || this.pType == 'kayboard') {
      if (event.action == 2) {
        //  if(this.pType==1)
        //  {
        //  this.setElementId(event.value);
        //  this.openViewFmsApprovalModal(event.value, viewApprovalOrderFMS);
        //  }

        this.setElementId(event.value);
        this.openViewNonFmsApprovalModal(event.value, viewApprovalOrderNONFMS);
      }
    }
  }

  /** End Get All Required Data */

  /** **************************************************************** */

  addProductType(productvalue) {
    if (productvalue == 4) {
      document.getElementById('Div1').style.display = 'block';
      document.getElementById('Div2').style.display = 'block';
      document.getElementById('Div3').style.display = 'none';
      document.getElementById('Div4').style.display = 'block';
      document.getElementById('Div5').style.display = 'block';
      document.getElementById('Div6').style.display = 'none';
      // document.getElementById('Div7').style.display = 'block';
      // document.getElementById('Div8').style.display = 'block';
      // document.getElementById('Div9').style.display = 'none';
      document.getElementById('Div10').style.display = 'block';
      document.getElementById('Div11').style.display = 'block';
      document.getElementById('Div12').style.display = 'none';
    } else if (productvalue == 9) {
      document.getElementById('Div1').style.display = 'block';
      document.getElementById('Div2').style.display = 'none';
      document.getElementById('Div3').style.display = 'block';
      document.getElementById('Div4').style.display = 'block';
      document.getElementById('Div5').style.display = 'none';
      document.getElementById('Div6').style.display = 'block';
      // document.getElementById('Div7').style.display = 'block';
      // document.getElementById('Div8').style.display = 'none';
      // document.getElementById('Div9').style.display = 'block';



    } else if (productvalue == 5) {
      document.getElementById('Div1').style.display = 'block';
      document.getElementById('Div2').style.display = 'block';
      document.getElementById('Div3').style.display = 'block';
      document.getElementById('Div4').style.display = 'block';
      document.getElementById('Div5').style.display = 'block';
      document.getElementById('Div6').style.display = 'block';
      // document.getElementById('Div7').style.display = 'block';
      // document.getElementById('Div8').style.display = 'block';
      // document.getElementById('Div9').style.display = 'block';

    } else {
      if (productvalue == 1 || productvalue == 2 || productvalue == 3 || productvalue == 6 || productvalue == 7 || productvalue == 8) {
        document.getElementById('Div1').style.display = 'none';
        document.getElementById('Div2').style.display = 'none';
        document.getElementById('Div3').style.display = 'none';
        document.getElementById('Div4').style.display = 'none';
        document.getElementById('Div5').style.display = 'none';
        document.getElementById('Div6').style.display = 'none';
        // document.getElementById('Div7').style.display = 'none';
        // document.getElementById('Div8').style.display = 'none';
        // document.getElementById('Div9').style.display = 'none';

      }
    }
  }


  /** **************************************************************** */


  addFiles(event) {
    if (this.selectedFile) {
      let Filerecord = {
        File_Name: this.selectedFile.name,
        Document_Type: this.form.value['filename'],
        File_Size: this.selectedFile.size
      }

      this.tableFileData.push(Filerecord);
      this.dataFile.push(this.form.get('file'));
      this.dataDocType.push(this.form.value['filename']);

      if (this.form.value['filename'] == null) {
        this.selectedDocumentTypes.push({ documentType: this.selectedFile.name, fileName: this.selectedFile.name });
      } else {
        this.selectedDocumentTypes.push({ documentType: this.form.value['filename'], fileName: this.selectedFile.name });
      }
      this.selectedFiles.push(this.selectedFile);
      this.filebtn = true;
      this.filesSelector = "";
      this.filesname = "";

    }
  }

  removeOEM(index) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          if (this.tableFileData.splice(index, 1)) {
            this.selectedFiles.splice(index, 1);
            this.selectedDocumentTypes.splice(index, 1);
            Swal.fire(
              'Removed!',
              'Record has been removed.',
              'success'
            );
          }
        }
      });
  }






  removeFiles(index) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          if (this.tableFileData.splice(index, 1)) {
            this.selectedFiles.splice(index, 1);
            this.selectedDocumentTypes.splice(index, 1);
            Swal.fire(
              'Removed!',
              'Record has been removed.',
              'success'
            );
          }
        }
      });
  }

  /**
  * Open modal
  * @param createorder modal content
  */
  openAddOrderModal(createorder: any) {

    //this.oemData();
    // this.vendordata();



    this.orderFormGroup.controls.amId.setValue(this.userId);
    //this.orderFormGroup.controls.amId.setValue(this.userId);
    this.modalService.open(createorder, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
        this.tableFileData = [];
        this.orderFormGroup.controls.addOnVendor.setValue([]);
      });
  }

  onSubmit(createorder, createOEM) {

    console.log(this.tableFileData.length);

    if (this.tableFileData.length != 0) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files[]', this.selectedFiles[i], this.selectedFiles[i].name);
      }
      formData.append('data', JSON.stringify(this.orderFormGroup.value));
      console.log("hello", formData.getAll('data'))

      this.bookingOrderService.create(formData).subscribe(data => {
        if (data['status'] == 200) {


          this.successmsg();
          this.modalService.dismissAll(createorder);
          this.modalService.dismissAll(createOEM);
          this.orderFormGroup.reset();
          this.oemFormGroup.reset();
          this.resetForm();
          this.getOrderAM();
          this.getEntity();
          this.getOem();
          this.getBdm();
          this.getAm();
          this.getProduct();
          this.getVendor();
          this.getBusinessUnit();
          this.tableFileData = [];
          this.orderFormGroup.controls.addOnVendor.setValue([]);
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
    else this.AddFilemsg();

  }

  successmsg() {
    Swal.fire('Saved successfully!', 'You clicked the button!', 'success');
  }
  AddFilemsg() {
    Swal.fire('Please add attachement File');
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




  downloadFile(item) {
    this.bookingOrderService.downloadFile(item.fileName, item.orderId);
  }
  /**
  * Open modal
  * @param viewbookorder modal content
  */
  openViewBookOrderModal(id, viewbookorder: any) {
    const approvalorders = this.Orders.find(approvalorder => approvalorder.id === id);
    console.log('approvalorders -', approvalorders);


    this.orderFormGroup.controls.id.setValue(approvalorders['id']);
    this.orderFormGroup.controls.amId.setValue(approvalorders['amId']);
    this.orderFormGroup.controls.amId.setValue(approvalorders['order_id']);
    this.orderFormGroup.controls.entity.setValue(approvalorders.tbl_masters_entity['entityName']);
    this.orderFormGroup.controls.companyName.setValue(approvalorders.tbl_masters_customer['customerName']);
    this.orderFormGroup.controls.companyPaymentTerms.setValue(approvalorders['companyPaymentTerms']);
    //this.orderFormGroup.controls.oem.setValue(approvalorders.tbl_masters_oem['oemName']);
    this.oemFormGroup.controls.oemDealerId.setValue(approvalorders.oemDealerId);
    this.oemFormGroup.controls.productDescription.setValue(approvalorders.productDescription);
    ((approvalorders.tbl_masters_bdm) != null) ? this.oemFormGroup.controls.bdm.setValue(approvalorders.tbl_masters_bdm['firstName'] + '' + approvalorders.tbl_masters_bdm['lastName']) : '';
    this.oemFormGroup.controls.bdmPercentage.setValue(approvalorders['bdmPercentage']);
    // this.oemFormGroup.controls.businessUnit.setValue(approvalorders.tbl_masters_business_unit['categoryName']);
    this.oemFormGroup.controls.productDescription.setValue(approvalorders['productDescription']);
    // this.oemFormGroup.controls.productType.setValue(approvalorders.tbl_masters_product['productName']);
    this.history = (approvalorders['tbl_approval_datas']);


    this.vendorSelectedFiles = approvalorders['tbl_order_file_datas'];

    this.addOnVendors = approvalorders['tbl_order_vendors'];

    this.addBDMs = approvalorders['tbl_order_oems'];
    console.log(this.addBDMs, "bdmbdmbdm***")

    this.oemList = approvalorders['tbl_order_oems'];
    // this.pType = approvalorders ['tbl_order_oems' ];

    this.productList = approvalorders['tbl_order_oems'];

    console.log(this.productList, "this.productType111111111111111111")


    this.orderFormGroup.controls.saleProductValue.setValue(approvalorders['tbl_order_sales'][0]['saleProductValue']);

    this.orderFormGroup.controls.saleProductAttachValue.setValue(approvalorders['tbl_order_sales'][0]['saleProductAttachValue']);

    this.orderFormGroup.controls.saleProductServiceValue.setValue(approvalorders['tbl_order_sales'][0]['saleProductServiceValue']);

    this.orderFormGroup.controls.purchaseProductValue.setValue(approvalorders['tbl_order_purchases'][0]['purchaseProductValue']);

    this.orderFormGroup.controls.purchaseProductAttachValue.setValue(approvalorders['tbl_order_purchases'][0]['purchaseProductAttachValue']);
    this.purchaseProductAttachVal = approvalorders['tbl_order_purchases'][0]['purchaseProductAttachValue']

    this.orderFormGroup.controls.purchaseProductServiceValue.setValue(approvalorders['tbl_order_purchases'][0]['purchaseProductServiceValue']);

    this.orderFormGroup.controls.poNo.setValue(approvalorders['poNo']);
    this.orderFormGroup.controls.orderType.setValue(approvalorders['orderType']);
    this.orderFormGroup.controls.externalCost.setValue(approvalorders['externalCost']);

    let podate;
    podate = approvalorders['poDate'];
    podate = podate.split('T');
    this.orderFormGroup.controls.poDate.setValue(podate[0]);
    this.orderFormGroup.controls.poValue.setValue(approvalorders['poValue']);
    this.orderFormGroup.controls.poPurchaseValue.setValue(approvalorders['poPurchaseValue']);
    this.orderFormGroup.controls.duration.setValue(approvalorders['duration']);

    this.pogm = (approvalorders['POGM']);
    this.pogmPer = (approvalorders['POGMPercent']);
    this.pmvalue = (approvalorders['PM']);
    this.brValue = (approvalorders['BR']);
    this.externalCost = approvalorders['externalCost'];
    this.gpValue = (approvalorders['GP']);
    this.gpPer = (approvalorders['GPPercent']);




    this.modalService.open(viewbookorder, { size: 'lg', windowClass: 'modal-holder', centered: true });
  }
  openViewFmsApprovalModal(id, viewApprovalOrderFMS: any) {

    const approvalorders = this.Orders.find(approvalorder => approvalorder.id === id);

    console.log(this.Oems, "oemsoems000000oemsoems")
    console.log(this.Orders, "this.Orders//////this.Orders/////this.Orders")

    console.log("order details", approvalorders);
    // this.pType = (approvalorders['productType']);
    this.productList = (approvalorders['productType'])
    // console.log((this.pType,"this.pType23232323"));

    // if(this.pType==1){
    //   this.viewstep=false;
    // }
    this.orderFormGroup.controls.id.setValue(approvalorders['id']);

    this.history = (approvalorders['order_approval']);
    console.log("Aprroval list", this.history);

    this.modalService.open(viewApprovalOrderFMS, { size: 'lg', windowClass: 'modal-holder', centered: true });

    let step_1 = document.getElementById('step_1').classList
    let step_2 = document.getElementById('step_2').classList
    let step_3 = document.getElementById('step_3').classList
    let step_4 = document.getElementById('step_4').classList
    let step_5 = document.getElementById('step_5').classList
    let allSteps = document.querySelectorAll(".progress-step")

    for (let i = 0; i < allSteps.length; i++) {
      allSteps[i].classList.remove("is-active");
    }

    this.history.forEach(element => {
      console.log(element.id, "1111");

      console.log(element.tbl_user.department);
      // HR Dept
      if (element.tbl_user.department == 4) {

        if (element.status == "Approved") {
          step_1.remove("is-reject");
          step_1.add("is-active");

        }
        else if (element.status == "Rejected") {
          step_1.add("is-reject");

        }
      }
      // Finance Dept
      if (element.tbl_user.department == 5) {
        console.log(element.status, "element.status");
        console.log("department==5");

        if (element.status == "Approved") {
          step_2.remove("is-reject");
          step_2.add("is-active");
        }
        else if (element.status == "Rejected") {

          step_2.add("is-reject");

        }
      }
      // Techincal Dept
      if (element.tbl_user.department == 6) {
        console.log(element.status, "element.status");
        console.log("department==6");

        if (element.status == "Approved") {
          step_2.remove("is-reject");
          step_2.add("is-active");
        }
        else if (element.status == "Rejected") {
          step_2.add("is-reject");

        }
      }
      // Sales head Dept
      if (element.tbl_user.department == 7) {
        console.log("department==7");
        console.log(element.status, "element.status");

        if (element.status == "Approved") {
          step_3.remove("is-reject");
          step_3.add("is-active");
        }
        else if (element.status == "Rejected") {
          step_3.add("is-reject");

        }
      }

      // Sale Delivery Dept
      if (element.tbl_user.department == 8) {
        console.log("department==8");

        if (element.status == "Approved") {
          step_4.remove("is-reject");
          step_4.add("is-active");
        }
        else if (element.status == "Rejected") {
          step_4.add("is-reject");

        }
      }
      // Final Approval Dept
      if (element.tbl_user.department == 9) {
        console.log("department==9............");

        if (element.status == "Approved") {
          step_5.remove("is-reject");
          step_5.add("is-active");
        }
        else if (element.status == "Rejected") {
          step_5.add("is-reject");

        }
        else if (element.status == "Fully Approved!!") {
          step_5.remove("is-reject");
          step_5.add("is-active");

        }
      }



    });


  }
  openViewNonFmsApprovalModal(id, viewApprovalOrderNONFMS: any) {

    const approvalorders = this.Orders.find(approvalorder => approvalorder.id === id);
    console.log("order details", approvalorders);
    // this.pType = (approvalorders['productType']);
    this.productList = (approvalorders['productType'])
    this.orderFormGroup.controls.id.setValue(approvalorders['id']);

    console.log(this.Oems, "oemsoems000000oemsoems")
    console.log(this.Orders, "this.Orders//////this.Orders/////this.Orders")

    this.history = (approvalorders['order_approval']);
    console.log("Aprroval list", this.history);
    this.modalService.open(viewApprovalOrderNONFMS, { size: 'lg', windowClass: 'modal-holder', centered: true });

    //let step_1 = document.getElementById('step_1').classList
    let step_1 = document.getElementById('step_1').classList
    let step_2 = document.getElementById('step_2').classList
    let step_3 = document.getElementById('step_3').classList
    let step_4 = document.getElementById('step_4').classList
    let allSteps = document.querySelectorAll(".progress-step")

    for (let i = 0; i < allSteps.length; i++) {
      allSteps[i].classList.remove("is-active");
    }

    this.history.forEach(element => {
      console.log(element.id, "1111");


      // Finance Dept
      if (element.tbl_user.department == 5) {
        console.log(element.status, "element.status");
        console.log("department==5");
        // for (let i = 0; i < allSteps.length; i++) {
        //   allSteps[i].classList.remove("is-active");
        // }
        if (element.status == "Approved") {
          step_1.remove("is-reject");
          step_1.add("is-active");
        }
        else if (element.status == "Rejected") {
          //step_1.remove("is-active");
          step_1.add("is-reject");

        }
      }
      // Techincal Dept
      if (element.tbl_user.department == 7) {
        console.log(element.status, "element.status");
        console.log("department==6");

        if (element.status == "Approved") {
          step_2.remove("is-reject");
          step_2.add("is-active");
        }
        else if (element.status == "Rejected") {
          // step_2.remove("is-active");
          step_2.add("is-reject");

        }
      }
      // Sales head Dept
      if (element.tbl_user.department == 8) {
        console.log("department==7");
        console.log(element.status, "element.status");
        // for (let i = 0; i < allSteps.length; i++) {
        //   allSteps[i].classList.remove("is-active");
        // }
        if (element.status == "Approved") {
          step_3.remove("is-reject");
          step_3.add("is-active");
        }
        else if (element.status == "Rejected") {
          step_3.add("is-reject");

        }
      }

      // Sale Delivery Dept
      if (element.tbl_user.department == 9) {
        console.log("department==8");
        // for (let i = 0; i < allSteps.length; i++) {
        //   allSteps[i].classList.remove("is-active");
        // }
        if (element.status == "Approved") {
          step_4.remove("is-reject");
          step_4.add("is-active");
        }
        else if (element.status == "Rejected") {
          step_4.add("is-reject");

        }
      }
      // Final Approval Dept
      if (element.tbl_user.department == 9) {
        console.log("department==9");
        // for (let i = 0; i < allSteps.length; i++) {
        //   allSteps[i].classList.remove("is-active");
        // }
        if (element.status == "Approved") {
          step_4.remove("is-reject");
          step_4.add("is-active");
        }
        else if (element.status == "Rejected") {
          step_4.add("is-reject");

        }
        else if (element.status == "Fully Approved!!") {
          step_4.remove("is-reject");
          step_4.add("is-active");

        }
      }



    });


  }


  //-------------------------delete order-----------------------------------------
  //-------------------------------------------------------------------------------

  deleteFullOrder(event, deleteFullOrderbyId: any) {
    if (event.action == 3) {
      this.setElementId(event.value);
      this.openDeleteFullOrder(event.value, deleteFullOrderbyId);
    }
  }

  openDeleteFullOrder(id, deleteFullOrderbyId: any) {
    this.modalService.open(deleteFullOrderbyId, { size: 'sm', windowClass: 'modal-holder', centered: true });
  }

  deleteFullOrderbyId(deleteFullOrderbyId) {
    this.bookingOrderService.deleteFullOrderbyId(this.orderId).subscribe(data => {
      console.log(this.orderId, "this.orderId00000000000")
      if (data.status == 200) {
        this.successmsg();
        this.modalService.dismissAll(deleteFullOrderbyId);
        this.getOrder();
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



  downloadXlOrderList() {
    this.bookingOrderService.getOrdersforXL().subscribe(result => {
      console.log(result, "result Xl")
      if (result['status'] == 200) {
        this.downloadxlSheet = result['data']
        console.log(this.downloadxlSheet,"this.downloadxlSheet")
        // this.downloadxlSheet = this.downloadxlSheet.map((order: any) => {
        const finalOrders = [];
        const vendorValue = [];
        this.downloadxlSheet.forEach(order => {
          order.tbl_order_oems.forEach(oem => {
            console.log(oem, "00000000")
            finalOrders.push({


              // poNo: order.poNo, 
              // oemName: oem.oemName, 
              id: order.id,
              orderId: order.orderCode,
              orderdate: order.createdAt,
              // lastName: order.tbl_masters_am.lastName,
              firstName: order.tbl_masters_am.firstName,

              // lastname: oem['tbl_masters_bdm'] ? oem['tbl_masters_bdm']['lastname'] : 0,
              firstname: oem['tbl_masters_bdm'] ? oem['tbl_masters_bdm']['firstName'] : 0,
              customername: order.tbl_masters_customer.customerName,
              pono: order.poNo,
              poDate: order.poDate,
              povalue: order.poValue,
              receivedAmount: order.receivedAmount,
              salePaymentReceivedAmount: order.salePaymentReceivedAmount,
              poPurchaseValue: order.poPurchaseValue,
              purchaseRecievedAmount: order.purchaseRecievedAmount,
              purchasePaymentReceivedAmount: order.purchasePaymentReceivedAmount,
              companyPaymentTerms: order.companyPaymentTerms,
              duration: order.duration,
              orderCode: order.orderCode,
              orderType: order.orderType,
              entityName: order.tbl_masters_entity.entityName,
              bdm: oem['tbl_masters_business_unit'] ? oem['tbl_masters_business_unit']['categoryName'] : 0,
              bdmPercentage: oem['bdmPercentage'],
              oem: oem['tbl_masters_oem']['oemName'],
              oemDealerId: oem['oemDealerId'],
              productType: oem['tbl_masters_product']['productName'],
              productDescription: oem['productDescription'],
              status: order.status,
              // vendorName:oem['tbl_masters_vendor']['vendorName'],
              // vendorPaymentValue:oem['tbl_order_vendors.vendorPaymentValue'],
              // vendorPoValue:oem['tbl_order_vendors.vendorPoValue'],
              // vendorValue:oem['tbl_order_vendors.vendorValue'],
              externalCost: order.externalCost,

              BR: order.BR,
              GP: order.GP,
              GPPercent: order.GPPercent,
              PM: order.PM,
              POGM: order.POGM,
              POGMPercent: order.POGMPercent,


            })
          })


          // const vendor = order.tbl_order_vendors.map(vendor => {
          //   vendorValue.push({

          //     vendorName:vendor['tbl_masters_vendor']['vendorName']



          //   })
          // })


        }); this.NewData = finalOrders
        //  this.NewData.push(finalOrders),
        // this.NewData.push(vendorValue)
        // this.NewData = finalOrders.concat(vendorValue)

        console.log(this.NewData, "newdata");

        console.log((this.downloadxlSheet, "Xl"));


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




  downloadXlBDMOrderList() {
    this.bookingOrderService.getOrderBDM().subscribe(result => {

      if (result['status'] == 200) {
        this.BDMOrdersXL = result['data']
        console.log(this.BDMOrdersXL, "bdm");


        const finalOrders = [];

        let sum=0;
        let customer_bdm_value= 0
        let totalPoValue= 0
        let bdm_perc= 0
        this.BDMOrdersXL.forEach(order => {
          console.log(order,"order")


          
          let oem_order_arr = order.tbl_order_oems.filter((e: any) => { return e.orderId = order.id });
          
          sum = oem_order_arr.reduce((partialSum, a) => partialSum + a.vendorPoValue, 0);
          
          customer_bdm_value = oem_order_arr.reduce((partialSum, a) => partialSum + a.customerPoValue, 0);

          let oem_order = order.tbl_order_oems.filter((e: any) => { return e.orderId = order.id });
          console.log(oem_order,"oem_order")


          totalPoValue = oem_order.reduce((partialSum, a) => partialSum + a.totalCustomerPoValue, 0)

          bdm_perc = (customer_bdm_value / totalPoValue ) * 100;

  

          finalOrders.push({


            id: order?.id,
            orderId: order?.orderCode,
            orderdate: order?.createdAt,
            bdmPercentage: (bdm_perc).toFixed(0),
            customername: order?.tbl_masters_customer['customerName'],
            gp: order?.GP,
            poPurchaseValue: order?.poPurchaseValue,
            bdmTp: order?.tbl_order_oems[0].vendorPoValue,
            POGM: order?.tbl_order_oems[0].BDM_POGM,
            PM: order?.tbl_order_oems[0].BDM_PM,
            BR: order?.tbl_order_oems[0].BDM_BR,
            GPPercent: order?.tbl_order_oems[0].BDM_GPPercent,
            POGMPercent: order?.tbl_order_oems[0].BDM_POGMPercent,

            pono: order?.poNo,
            povalue: totalPoValue,
            bdmgp: order?.tbl_order_oems[0].BDM_GP,
            BDMValue: customer_bdm_value,
          })


        }); this.BDMOrdersXL = finalOrders


        setTimeout(() => {

          const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.BdmDetailsExcel.nativeElement);//converts a DOM TABLE element to a worksheet
          const wb: XLSX.WorkBook = XLSX.utils.book_new();

          XLSX.utils.book_append_sheet(wb, ws, 'Order Details');


          XLSX.writeFile(wb, 'OrderDetails.xlsx');


        }, 1000);
      }
    });
  }



}









