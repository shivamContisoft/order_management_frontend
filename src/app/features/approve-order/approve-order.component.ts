import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ApproveOrderService } from '../approve-order/approve-order.service';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';






import Swal from 'sweetalert2';


@Component({
  selector: 'app-approve-order',
  templateUrl: './approve-order.component.html',
  styleUrls: ['./approve-order.component.scss']
})
export class ApproveOrderComponent implements OnInit {

  ApprovalOrdersArray: Array<any> = []
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
  Actions: Array<any> = [
    { name: '1', value: 'View', icon: 'eye', multiple: false },
  ];


  ApprovedOrderByMeArray: Array<any> = []
  Column: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'orderId', value: 'Order ID', sortable: true, isEnabled: true },
    { name: 'orderdate', value: 'Order Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'customername', value: 'Customer Name', sortable: true, isEnabled: true },
    { name: 'pono', value: 'Customer PO No. ', sortable: true, isEnabled: true },
    { name: 'povalue', value: 'Customer PO Value', sortable: true, isEnabled: true },
    // { name: 'productdescription', value: 'Product Description', sortable: true, isEnabled: true },
    { name: 'status', value: 'Status', sortable: true, isEnabled: true, },
  ];
  Action: Array<any> = [
    { name: '1', value: 'View', icon: 'eye', multiple: false },
  ];





  LightBlue: any = "#3f51b5";

  active = 1;

  // bread crumb items
  breadCrumbItems: Array<{}>;

  approvalOrderFormGroup: FormGroup;
  ApprovedArrayData: any = []
  ApprovalOrders: any = [];
  ApprovedOrderByMe: any = [];
  productList: any = [];
  addBDMs: any = [];

  pogm: any = 0;
  pogmPer: any=0;
  pmvalue: any=0;
  brValue: any=0;
  gpValue: any=0;
  gpPer: any=0;
  externalCost : any= 0;




  ApprovalOrderCount = 0;
  ApprovalOrderId = 0;
  ApprovalOrderProductType = 0;
  selectedFiles = [];
  orders = [];
  addOnVendors = [];
  history = [];
  userId = 0;
  status = "";
  lastapproval = [];
  error = '';
  viewstep: boolean = true;
  step = 0;
  oemList: any = [];

  constructor(private moduleService: ModuleService, private modalService: NgbModal,
    private formBuilder: FormBuilder, private authService: AuthenticationService,
    private approvalOrderService: ApproveOrderService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Approval order', active: true },

    ];

    if (this.authService.currentUserValue.user)
      this.userId = this.authService.currentUserValue.user.id;

    this.getApproval();
    this.getApprovedBy();
    this.getApprovedByMeOrders();

    this.approvalOrderFormGroup = this.formBuilder.group({
      amId: [''],
      entity: [''],
      companyName: [''],
      companyPaymentTerms: [''],
      oem: [''],
      oemDealerId: [''],
      bdm: [''],
      bdmPercentage: [''],
      businessUnit: [''],
      productDescription: [''],
      pono:[''],
      customerName:[''],
      productType: [''],
      saleProductValue: [''],
      saleProductAttachValue: [''],
      saleProductServiceValue: [''],
      purchaseProductValue: [''],
      purchaseProductAttachValue: [''],
      purchaseProductServiceValue: [''],
      poNo: [''],
      poDate: [''],
      externalCost:[''],
      poValue:[''],
      poPurchaseValue: [''],
      duration: [''],
      vendorSelection: [''],
      vendorPaymentTerms: [''],
      addOnVendor: this.formBuilder.array([]),
      fileSelector: [''],
      vendorPoValue: [''],
      documentName: [''],
      file: [''],
      id: [''],
      comment: [''],

    })
  }

  getApprovedBy() {

    this.approvalOrderService.getApprovedByMe(this.userId).subscribe(result => {
      if (result['status'] == 200) {
        this.ApprovedOrderByMe = result['data'];
        console.log(this.ApprovedOrderByMe)

        this.ApprovedOrderByMeArray = this.ApprovedOrderByMe.map((ApprovedOrderByMe: any) => {
          console.log('111111');
          return {
            id: ApprovedOrderByMe?.id,  
            orderId: ApprovedOrderByMe?.tbl_order.orderCode,
            orderdate: ApprovedOrderByMe?.createdAt,
            // producttype: ApprovedOrderByMe?.tbl_order.tbl_masters_product['productName'],
            customername: ApprovedOrderByMe?.tbl_order.tbl_masters_customer['customerName'],
            pono:ApprovedOrderByMe?.tbl_order.poNo,
            povalue: ApprovedOrderByMe?.tbl_order.poValue,
            podate: ApprovedOrderByMe?.tbl_order.poDate,
            // productdescription: ApprovedOrderByMe?.tbl_order.productDescription,

            status: ApprovedOrderByMe?.status == 'Pending' ? this.domSanitizer.bypassSecurityTrustHtml(`<span style="color: orange">Pending (Step - ${ApprovedOrderByMe?.step})</span>`) :
            ApprovedOrderByMe?.status == 'Approved' ? this.domSanitizer.bypassSecurityTrustHtml(`<span style="color: Green">Approved </span>`) :
              ApprovedOrderByMe?.status == 'Rejected' ? this.domSanitizer.bypassSecurityTrustHtml(`<span style="color: red">Rejected (Step - ${ApprovedOrderByMe?.step})</span>`) :
              ApprovedOrderByMe?.status == 'Fully Approved!!' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: Green">Final Approved!!</span>') : ''
          }
        });

    } else {
      this.error = 'Unknown error!';
    }
  });
  }

  getApproval() {
    this.approvalOrderService.get(this.userId).subscribe(result => {

      if (result['status'] == 200) {
        this.ApprovalOrders = result['data']
        console.log(this.ApprovalOrders);

        this.ApprovalOrdersArray = this.ApprovalOrders.map((ApprovalOrders: any) => {
          return {
            id: ApprovalOrders?.id,  
            orderId: ApprovalOrders?.orderCode,
            orderdate: ApprovalOrders?.createdAt,
            // producttype: ApprovedOrderByMe?.tbl_order.tbl_masters_product['productName'],
            customername: ApprovalOrders?.tbl_masters_customer['customerName'],
            pono:ApprovalOrders?.poNo,
            povalue: ApprovalOrders?.poValue,
            // podate: ApprovalOrders?.tbl_order.poDate,
            // productdescription: ApprovalOrders?.['productDescription'],

            status: ApprovalOrders?.status == 'Pending' ? this.domSanitizer.bypassSecurityTrustHtml(`<span style="color: orange">Pending (Step - ${ApprovalOrders?.step})</span>`) :
              ApprovalOrders?.status == 'Approved' ? this.domSanitizer.bypassSecurityTrustHtml(`<span style="color: Green">Approved (Step - ${ApprovalOrders?.step - 1})</span>`) :
                ApprovalOrders?.status == 'Rejected' ? this.domSanitizer.bypassSecurityTrustHtml(`<span style="color: red">Rejected (Step - ${ApprovalOrders?.step})</span>`) :
                  ApprovalOrders?.status == 'Final Approved!!' ? this.domSanitizer.bypassSecurityTrustHtml('<span style="color: Green">Final Approved!!</span>') : ''
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



  setElementId(tableData) {
    this.ApprovalOrderId = tableData;
    const approvalorders = this.ApprovalOrders.find(approvalorder => approvalorder.id === tableData);
    console.log(approvalorders,"approverorders22222222222222");
    
    this.ApprovalOrderProductType = approvalorders['tbl_order_oems'][0]['productType'];
    console.log(this.ApprovalOrderProductType,"this.approverproducttype");
    
  }
  viewElement(event, viewapprovalorder: any) {
    if (event.action == 1) {

      this.setElementId(event.value);
      this.openViewApprovalOrderModal(event.value, viewapprovalorder);
    }
  }


  
  /**
  * Open modal
  * @param viewapprovalorder modal content
  */
  openViewApprovalOrderModal(id, viewapprovalorder: any) {

    const approvalorders = this.ApprovalOrders.find(approvalorder => approvalorder.id === id);
    console.log(this.ApprovalOrders, "this.ApprovalOrders");


    this.approvalOrderFormGroup.controls.id.setValue(approvalorders['id']);
    this.approvalOrderFormGroup.controls.amId.setValue(approvalorders['amId']);
    this.approvalOrderFormGroup.controls.entity.setValue(approvalorders['tbl_masters_entity']['entityName']);
    this.approvalOrderFormGroup.controls.companyName.setValue(approvalorders.tbl_masters_customer['customerName']);
    this.approvalOrderFormGroup.controls.companyPaymentTerms.setValue(approvalorders['companyPaymentTerms']);
    // this.approvalOrderFormGroup.controls.oem.setValue(approvalorders.tbl_masters_oem['oemName']);
    // this.approvalOrderFormGroup.controls.oemDealerId.setValue(approvalorders['oemDealerId']);
    ((approvalorders.tbl_masters_bdm) != null) ? this.approvalOrderFormGroup.controls.bdm.setValue(approvalorders.tbl_masters_bdm['firstName'] + '' + approvalorders.tbl_masters_bdm['lastName']) : '';

    // (approvalorders.tbl_masters_bdm['firstName'] + '' + approvalorders.tbl_masters_bdm['lastName']!=null)? "this.approvalOrderFormGroup.controls.bdm.setValue(approvalorders.tbl_masters_bdm['firstName'] + '' + approvalorders.tbl_masters_bdm['lastName'])":'';
    this.approvalOrderFormGroup.controls.bdmPercentage.setValue(approvalorders['bdmPercentage']);
    // this.approvalOrderFormGroup.controls.businessUnit.setValue(approvalorders.tbl_masters_business_unit['categoryName']);
    this.approvalOrderFormGroup.controls.productDescription.setValue(approvalorders['productDescription']);
    // this.approvalOrderFormGroup.controls.productType.setValue(approvalorders.tbl_order_oems[0].tbl_masters_product['productName']);
    this.approvalOrderFormGroup.controls.saleProductValue.setValue(approvalorders['tbl_order_sales'][0]['saleProductValue']);
    this.approvalOrderFormGroup.controls.saleProductAttachValue.setValue(approvalorders['tbl_order_sales'][0]['saleProductAttachValue']);
    this.approvalOrderFormGroup.controls.saleProductServiceValue.setValue(approvalorders['tbl_order_sales'][0]['saleProductServiceValue']);
    this.approvalOrderFormGroup.controls.purchaseProductValue.setValue(approvalorders['tbl_order_purchases'][0]['purchaseProductValue']);
    this.approvalOrderFormGroup.controls.purchaseProductAttachValue.setValue(approvalorders['tbl_order_purchases'][0]['purchaseProductAttachValue']);
    this.approvalOrderFormGroup.controls.purchaseProductServiceValue.setValue(approvalorders['tbl_order_purchases'][0]['purchaseProductServiceValue']);
    this.approvalOrderFormGroup.controls.poNo.setValue(approvalorders['poNo']);
    this.approvalOrderFormGroup.controls.externalCost.setValue(approvalorders['externalCost']);
    let podate;
    podate = approvalorders['poDate'];
    podate = podate.split('T');
    this.step = approvalorders['step'];

    if (this.step == 1) {
      this.viewstep = false;


    }
    this.approvalOrderFormGroup.controls.poDate.setValue(podate[0]);
    this.approvalOrderFormGroup.controls.poValue.setValue(approvalorders['poValue']);
    this.approvalOrderFormGroup.controls.poPurchaseValue.setValue(approvalorders['poPurchaseValue']);
    this.approvalOrderFormGroup.controls.duration.setValue(approvalorders['duration']);
    //this.approvalOrderFormGroup.controls.vendorSelection.setValue(approvalorders.tbl_order_vendors[0].tbl_masters_vendor['vendorName']);
    //this.approvalOrderFormGroup.controls.vendorPaymentTerms.setValue(approvalorders.tbl_order_vendors['vendorPaymentValue']);

    //this.approvalOrderFormGroup.controls.userName.setValue(approvalorders['tbl_masters_approvals'][0]['userName']);
    //this.approvalOrderFormGroup.controls.vendorPoValue.setValue(approvalorders.tbl_order_vendors['vendorPoValue']);
    this.addOnVendors = approvalorders['tbl_order_vendors'];
    this.oemList = approvalorders['tbl_order_oems'];
    this.history = (approvalorders['tbl_approval_datas']);
    this.selectedFiles = approvalorders['tbl_order_file_datas'];
    this.addOnVendors = approvalorders['tbl_order_vendors'];
    this.productList = approvalorders['tbl_order_oems'];
    this.addBDMs = approvalorders['tbl_order_oems'];

    

    
    this.pogm = (approvalorders['POGM']);
    this.pogmPer = (approvalorders['POGMPercent']);
    this.pmvalue = (approvalorders['PM']);
    this.brValue = (approvalorders['BR']);
    this.gpValue = (approvalorders['GP']);
    this.gpPer = (approvalorders['GPPercent']);
    this.externalCost = approvalorders['externalCost'];

    this.modalService.open(viewapprovalorder, { size: 'lg', windowClass: 'modal-holder', centered: true });
  }


  downloadFile(item) {
    this.approvalOrderService.downloadFile(item.fileName, item.orderId);
  }





  markAsApprove(viewapprovalorder) {
    const approveComment = this.approvalOrderFormGroup.value.comment;
    console.log(this.getApproval,"rrrrrrrrrrrrrrrrrrr")
    this.approvalOrderService.markAsApproval(this.ApprovalOrderId, this.ApprovalOrderProductType, approveComment).subscribe(result => {
      if (result['status'] == 200) {
        this.successmsg();
        this.modalService.dismissAll(viewapprovalorder);
        this.resetForm();
        this.getApproval();
      }
    },
      error => {
        this.error = error ? error : '';
        console.log(this.error);
      });

  }

  markAsReject(viewapprovalorder) {
    const approveComment = this.approvalOrderFormGroup.value.comment;
    this.approvalOrderService.markAsRejected(this.ApprovalOrderId, approveComment).subscribe(result => {

      if (result['status'] == 200) {
        console.log("order rejected");
        this.errormsg();
        this.modalService.dismissAll(viewapprovalorder);
        this.resetForm();
        this.getApproval();
      }
    }, error => {
      this.error = error ? error : '';
      console.log(this.error);
    });
  }

  successmsg() {
    Swal.fire('Order is Approved successfully!', 'You clicked the button!', 'success');
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
      'Rejected',
      'Order is rejected!',
      'error'
    );
  }

  resetForm() {
    this.approvalOrderFormGroup.reset();
  }

  getApprovedByMeOrders() {
    console.log(this.userId);
    
    this.approvalOrderService.getApprovedByMe(this.userId).subscribe(result => {
      console.log("approved data==>", result)
    })
  }

}


