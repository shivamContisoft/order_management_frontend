import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
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
import { withoutValidation } from 'ngx-mask';
import { LogicalFileSystem } from '@angular/compiler-cli/private/localize';
import { element } from 'protractor';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { elementClosest } from '@fullcalendar/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  userId = 0;
  year

  userAccountType: any;
  accountType: any;
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
  totalAchieved = 0;
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
  yearFormGroup: FormGroup;
  orderId: any;
  history = [];
  AMuser = [];
  tabledata: any = [];
  data: any = [];
  data1: any = [];
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
  yearData: any = [];
  YearArray: any = [];
  amYearArray: any = [];
  bdmYearArray: any = [];
  am: any = [];
  bdm: any = [];
  currentYear: any;
  dashboardStatusArray: any = [];
  dashboardStatusArray2: any = [];
  dashboardStatusArray1: any = [];
  dashboardStatusArray3: any = [];
  dashboardStatusArray4: any = [];
  withInvoicesArray1: any = [];
  withoutInvoicesArray1: any = [];
  withoutInvoicesArray: any = [];
  withInvoicesArray: any = [];
  invoicesArray: any = [];
  temp: any = [];
  dashboardStatusFinalArray: any = [];
  finalGp = 0;

  variablePay = 0;
  variable1 = 0;
  variable4 = 0;
  variable5 = 0;
  totalAchieved1 = 0;
  variablePay2 = 0

  TotalAchived = 0;
  finalGp1: any = 0;
  finalGp2: any = 0;




  OrdersArray: Array<any> = []
  Columns: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'orderid', value: 'Order Id', sortable: true, isEnabled: true },
    { name: 'orderdate', value: 'Order Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },
    { name: 'customer', value: 'Customer Name', sortable: true, isEnabled: true },
    { name: 'producttype', value: 'Product Type', sortable: true, isEnabled: true },
    { name: 'povalue', value: 'PO Value', sortable: true, isEnabled: true },
    { name: 'podate', value: 'PO Date', sortable: true, isEnabled: true, isDate: true, dateFormat: 'MM-dd-yyyy' },

  ];
  Actions: Array<any> = [
    { name: '1', value: 'Add', icon: 'eye', multiple: false },
    { name: '2', value: 'View', icon: 'eye', multiple: false },
  ];
  LightBlue: any = "#3f51b5";
  finalObject: { id: any; name: any; name1: any; ctc: any; variablePercentage: any; totalAchieved: any; minEligiblity: any; minAchievement: any; targetArchive: number; percentageAchieved: number; variablePay: any; };
  finalObject1: { id: any; name: any; name1: any; ctc: any; variablePercentage: any; totalAchieved: any; minEligiblity: any; minAchievement: any; targetArchive: number; percentageAchieved: number; variablePay: any; };
  finalObject2: { id: any; name: any; name1: any; ctc: any; variablePercentage: any; totalAchieved: any; minEligiblity: any; minAchievement: any; targetArchive: number; percentageAchieved: number; variablePay: any; };
  PER: number;
  variable: any = 0;

  constructor(private moduleService: ModuleService, private modalService: NgbModal, private amService: AmService, private vendorService: VendorService,
    private bdmService: BdmService, private oemService: OemService, private customerService: CustomerService, private productService: ProductService,
    private formBuilder: FormBuilder, private authService: AuthenticationService,
    private bookingOrderService: BookingOrderService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {



    if (this.authService.currentUserValue.user)
      this.userId = this.authService.currentUserValue.user.id;
    this.userAccountType = this.authService.currentUserValue.user.tbl_auth.accountType;
    console.log(this.userAccountType, "userAccountType")

    this.form = this.formBuilder.group({
      file: ['']
    })

    this.invoiceFormGroup = this.formBuilder.group({
      invoiceRaisedDate: [''], // [Validators.required]
      TIPLInvoiceNo: [''],
      invoiceSalesAmount: [''],
      DueDate: [''],

      VendorName: [''],
      TIPLPONumber: [''],
      TIPLPODate: [''],
      purchaseInvoiceDate: [''],
      InvoiceNumber: [''],
      InvoiceAmount: [''],
      InvoiceRecievedDate: [''],
      orderId: [''],
      paymentCollection: [''],
      qre: [''],


    })
    this.yearFormGroup = this.formBuilder.group({
      year: [''],

    })

    // this.getBdm();
    this.getFullyApprovedOrder();
    // this.getBdmUserstatus();
    // this.getAm();
    // this.getAmUserstatus();
    this.getOrder();
    this.getEntity();
    this.getOem();
    this.getProduct();
    this.getVendor();
    this.getBusinessUnit();
    this.getYear();
    if (this.userAccountType == 2)
      this.getOrdersForDashboardOfAm();
    if (this.userAccountType == 3)
      this.getOrdersForDashboardOfBdm();


    {
      var currentYears = new Date().getFullYear()
      let x = currentYears;
      let y = currentYears + 1;
      this.currentYear = x + '-' + y;
    }

    this.yearFormGroup.controls.year.setValue(this.currentYear);

    if (this.userAccountType == 1)
      this.getYearData(this.currentYear);
  }

  get getInvoiceFormControls() {
    return this.invoiceFormGroup.controls;
  }

  getYear() {
    let range = [];
    var max = new Date().getFullYear(),
      min = max - 1,
      max = max + 0;

    for (var i = min; i <= max; i++) {
      let x = i;
      let y = i + 1;
      let z = x + '-' + y;
      range.push({ "id": z });
    }

    this.Years = range;
  }


  getOrdersForDashboardOfAm() {

    this.bookingOrderService.getFullyApprovedOrder().subscribe(result => {
      console.log(am => am.amId);
      if (am => am.amId == this.userId) {

        let resultData = result['data'].filter(am => am.amId == this.userId);

        console.log(resultData, "resultData")

        this.withInvoicesArray = resultData.filter(order => (order['tbl_order_oems'][0]['productType'] == 1) || (order['tbl_order_oems'][0]['productType'] == 7));
        this.withInvoicesArray1 = this.withInvoicesArray.filter(order => (order.receivedAmount > 0) || (order.purchaseRecievedAmount > 0))

        this.withoutInvoicesArray = resultData.filter(order => order['tbl_order_oems'][0]['productType'] != 1 && order['tbl_order_oems'][0]['productType'] != 7);
        this.withoutInvoicesArray1 = this.withoutInvoicesArray.filter(order => order.status == 'Fully Approved!!')

        this.dashboardStatusArray1 = this.withoutInvoicesArray1.map((orders: any) => {


          return {
            id: orders?.id,
            name: orders['tbl_masters_am']['firstName'],
            name1: orders['tbl_masters_am']['lastName'],
            ctc: orders['tbl_masters_am']['tbl_masters_am_year_targets'][0]['ctc'],
            variablePercentage: orders['tbl_masters_am']['tbl_masters_am_year_targets'][0]['variablePercentage'],
            totalAchieved: orders['tbl_masters_am']['tbl_masters_am_year_targets'][0]['totalAchieved'],
            minEligiblity: orders['tbl_masters_am']['tbl_masters_am_year_targets'][0]['minEligiblity'],
            minAchievement: orders['tbl_masters_am']['tbl_masters_am_year_targets'][0]['minAchievement'],

          }
        });

        this.dashboardStatusArray2 = this.withInvoicesArray1.map((orders: any) => {
          console.log(this.withInvoicesArray1, "this.withInvoicesArray1")


          return {
            id: orders?.id,
            name: orders['tbl_masters_am']['firstName'],
            name1: orders['tbl_masters_am']['lastName'],
            ctc: orders['tbl_masters_am']['tbl_masters_am_year_targets'][0]['ctc'],
            variablePercentage: orders['tbl_masters_am']['tbl_masters_am_year_targets'][0]['variablePercentage'],
            totalAchieved: orders['tbl_masters_am']['tbl_masters_am_year_targets'][0]['totalAchieved'],
            minEligiblity: orders['tbl_masters_am']['tbl_masters_am_year_targets'][0]['minEligiblity'],
            minAchievement: orders['tbl_masters_am']['tbl_masters_am_year_targets'][0]['minAchievement'],

          }
        });

        this.dashboardStatusArray = this.withInvoicesArray1.concat(this.withoutInvoicesArray1)
        const dashboardStatusArrayTemp = this.dashboardStatusArray1.concat(this.dashboardStatusArray2)


        //  ===== for Fms and standlon target achived after generate Invoice of how may percent of po value 
        // -------------------------------------------------------------------------------------------------

        let targetAchieved1 = 0;
        let FMSpercentage = 0;
        let lt = 0;

        let Percentage = 0;
        let variablePay1 = 0;
        let totalAchieved1 = 0;
        let variablePay2 = 0


        // this.dashboardStatusArray.forEach((element: any) => {

        // })
        for (let index = 0; index < this.dashboardStatusArray.length; index++) {
          const element = this.dashboardStatusArray[index];

          let am_gp_value = 0
          console.log(element, "element");
          if (((element['tbl_order_oems'][0]['productType'] == 1) || (element['tbl_order_oems'][0]['productType'] == 7)) && ((element.receivedAmount > 0) || (element.purchaseRecievedAmount > 0))) {
            FMSpercentage = (element.receivedAmount * 100) / (element.poValue)
            console.log(FMSpercentage, "FMSpercentage")
            lt = (element.GP * FMSpercentage) / 100;
            console.log(element.GP, "element.GP")
            console.log(lt, "lt")
            console.log(this.finalGp, "this.finalGp")
            this.finalGp += lt;
            am_gp_value = lt;

            console.log(this.finalGp, "this.finalGp")

            totalAchieved1 = (am_gp_value / element.tbl_masters_am.tbl_masters_am_year_targets[0].totalAchieved) * 100;
            console.log(totalAchieved1, "totalAchieved1")

            this.TotalAchived = this.TotalAchived + totalAchieved1

            variablePay1 = (element.tbl_masters_am.tbl_masters_am_year_targets[0].variablePercentage * totalAchieved1) / 100;
            console.log(variablePay1, "variablePay1 ")

            Percentage = (element.salePaymentReceivedAmount * 100) / (element.poValue);
            console.log(Percentage, "%Percentage")

            variablePay2 = ((variablePay1) * Percentage / 100);
            console.log(variablePay2, "variablePay2")

            this.variablePay = this.variablePay + (variablePay2)
            console.log(this.variablePay, "variablePay")

          }
          else {

            this.finalGp += parseFloat(element.GP);
            console.log(this.finalGp, "this.finalGp")



            this.finalGp1 = parseFloat(element.GP)

            totalAchieved1 = (this.finalGp1 / element.tbl_masters_am.tbl_masters_am_year_targets[0].totalAchieved) * 100;
            console.log(totalAchieved1, "totalAchieved1")

            this.TotalAchived = this.TotalAchived + totalAchieved1

            variablePay1 = (element.tbl_masters_am.tbl_masters_am_year_targets[0].variablePercentage * totalAchieved1) / 100;
            console.log(variablePay1, "variablePay1 ")

            if (element.salePaymentReceivedAmount > 0) {

              Percentage = (element.salePaymentReceivedAmount * 100) / (element.poValue);
              console.log(Percentage, "%Percentage")

              variablePay2 = ((variablePay1) * Percentage / 100);
              console.log(variablePay2, "variablePay2")

              this.variablePay = this.variablePay + (variablePay2)
              console.log(this.variablePay, "variablePay")
            }
          }

          // this.finalGp1 += this.finalGp
          // console.log(this.finalGp1, "this.finalGp1")




          let firstObj = dashboardStatusArrayTemp[0];
          // console.log(firstObj, "___________firstObj")



          //  ============== for add payment wise variable pay ===================
          // ----------------------------------------------------------------------

          // let Percentage = 0;
          // let variablePay1 = 0;
          // let totalAchieved1 = 0;
          // let variablePay2 = 0
          // this.dashboardStatusArray.forEach(ele => {
          //   console.log(ele, "ele")

          //   if ( (ele.tbl_order_oems[0].productType != 1 || ele.tbl_order_oems[0].productType != 7) && (ele.salePaymentReceivedAmount > 0)) {

          //     this.finalGp1 = parseFloat(ele.GP);
          //     console.log(this.finalGp1, "this.finalGp1")

          //     totalAchieved1 = (this.finalGp1 / ele.tbl_masters_am.tbl_masters_am_year_targets[0].totalAchieved) * 100;
          //     console.log(totalAchieved1, "totalAchieved1")

          //     this.TotalAchived = this.TotalAchived + totalAchieved1

          //     variablePay1 = (ele.tbl_masters_am.tbl_masters_am_year_targets[0].variablePercentage * totalAchieved1) / 100;
          //     console.log(variablePay1, "variablePay1 ")

          //     Percentage = (ele.salePaymentReceivedAmount * 100) / (ele.poValue);
          //     console.log(Percentage, "%Percentage")

          //     variablePay2 = ((variablePay1) * Percentage / 100);
          //     console.log(variablePay2, "variablePay2")

          //     this.variablePay = this.variablePay + (variablePay2)
          //     console.log(this.variablePay, "variablePay")
          //   }





          this.finalObject = {
            id: firstObj?.id,
            name: firstObj?.['name'],
            name1: firstObj?.['name1'],
            ctc: firstObj?.ctc,
            variablePercentage: firstObj?.variablePercentage,
            totalAchieved: firstObj?.totalAchieved,
            minEligiblity: firstObj?.minEligiblity,
            minAchievement: firstObj?.minAchievement,
            targetArchive: firstObj ? this.finalGp : 0,
            percentageAchieved: firstObj ? this.TotalAchived : 0,
            variablePay: firstObj ? (this.variablePay).toFixed(0) : 0,
          }



        }

      }



    }, error => console.log(error))
  }

  checker(oems) {
    return oems.some(oem => { if (oem['tbl_masters_bdm'] != null && oem['tbl_masters_bdm']['userTableId'] == this.userId) return true; else false; });
  }

  getOrdersForDashboardOfBdm() {


    this.bookingOrderService.getFullyApprovedOrder().subscribe(result => {
      let bdmOrders = result['data'].filter(BDM => BDM['tbl_order_oems'].length > 0);

      let resultData1 = bdmOrders.filter(BDM => this.checker(BDM['tbl_order_oems']) == true);
      // console.log(resultData1, "resultData1")

      this.withInvoicesArray = resultData1.filter(order => (order['tbl_order_oems'][0]['productType'] == 1) || (order['tbl_order_oems'][0]['productType'] == 7));
      this.withInvoicesArray1 = this.withInvoicesArray.filter(order => (order.receivedAmount > 0) || (order.purchaseRecievedAmount > 0))

      // console.log(this.withInvoicesArray, "withInvoicesArray");
      // console.log(this.withInvoicesArray1, "withInvoicesArray1111111")

      this.withoutInvoicesArray = resultData1.filter(order => order['tbl_order_oems'][0]['productType'] != 1 && order['tbl_order_oems'][0]['productType'] != 7 && order['tbl_order_oems'][0]['productType'] != 0);
      this.withoutInvoicesArray1 = this.withoutInvoicesArray.filter(order => order.status == 'Fully Approved!!')
      // console.log("SDHSDHOSHDOSD - ", this.withoutInvoicesArray1);

      this.dashboardStatusArray3 = this.withoutInvoicesArray1.map((orders: any) => {


        return {
          id: orders?.id,
          name: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['firstName'],
          name1: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['lastName'],
          ctc: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['ctc'],
          variablePercentage: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['variablePercentage'],
          totalAchieved: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['totalAchieved'],
          minEligiblity: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['minEligiblity'],
          minAchievement: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['minAchievement'],
        }

      });


      this.dashboardStatusArray4 = this.withInvoicesArray1.map((orders: any) => {


        const FMSpercentage = (orders.receivedAmount * 100) / (orders.poValue)
        const AchivmentValue = (orders.GP * FMSpercentage) / 100

        return {
          id: orders?.id,
          name: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['firstName'],
          name1: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['lastName'],
          ctc: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['ctc'],
          variablePercentage: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['variablePercentage'],
          totalAchieved: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['totalAchieved'],
          minEligiblity: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['minEligiblity'],
          minAchievement: orders['tbl_order_oems'][orders['tbl_order_oems'].indexOf(orders['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['minAchievement'],
          targetAchieve: AchivmentValue,

        }
      });






      this.dashboardStatusArray = this.withInvoicesArray1.concat(this.withoutInvoicesArray1)

      let FMSpercentage = 0;
      let BdmFMSpercentage = 0;
      let lt = 0;
      let bdmper = 0;
      let Bdm = 0
      this.finalGp1 = 0
      let sum_BDM = 0;
      this.dashboardStatusArray.forEach(element => {
        // console.log(element, "element")
        if (((element['tbl_order_oems'][0]['productType'] == 1) || (element['tbl_order_oems'][0]['productType'] == 7)) && ((element.receivedAmount > 0) || (element.purchaseRecievedAmount > 0))) {
          FMSpercentage = (element.receivedAmount * 100) / (element.poValue)
          lt = (element.GP * FMSpercentage) / 100
          bdmper = (lt * element.tbl_order_oems[0].bdmPercentage) / 100
          this.finalGp1 += (bdmper)
          // console.log(bdmper, "bdmper")
        } else {
          let sum = 0
          element.tbl_order_oems.forEach(oem => {
            if (oem.tbl_masters_bdm?.userTableId == this.userId)
              sum += oem.bdmPercentage
          });
          Bdm = sum

          let oem_order_arr = element.tbl_order_oems.filter((e: any) => { return e.orderId = element.id });
          sum_BDM = oem_order_arr.reduce((partialSum, a) => partialSum + a.BDM_GP, 0);

          this.finalGp1 += sum_BDM;
          console.log(this.finalGp1, "this.finalGp1")

        }

      })

      this.totalAchieved1 = 0
      this.variable = 0
      this.dashboardStatusArray.map(element => {

        element['tbl_order_oems'].map(ele => {
          this.totalAchieved1 = parseFloat(ele.tbl_masters_bdm?.tbl_masters_bdm_year_targets[0].totalAchieved)

        })
      })

      let firstObj1 = this.dashboardStatusArray[0];

      const totalAchieved2 = ((this.finalGp1) / (firstObj1.tbl_order_oems[0].tbl_masters_bdm.tbl_masters_bdm_year_targets[0].totalAchieved) * 100);
      console.log(this.totalAchieved1, "totalAchieved2")

      this.variablePay2 = ((firstObj1.tbl_order_oems[0].tbl_masters_bdm.tbl_masters_bdm_year_targets[0].variablePercentage) * (totalAchieved2) / 100);
      console.log(this.variablePay2, "variablePay2")


      let percentage = 0;
      let finalVariable = 0;
      let FMSpercentage1 = 0;
      let BdmFMSpercentage1 = 0;
      let lt1 = 0;
      let bdmper1 = 0;
      let Bdm1 = 0
      this.finalGp2 = 0
      this.dashboardStatusArray.forEach(elem => {
        console.log(elem, "elem000")

        if (((elem.tbl_order_oems[0].productType == 1) || (elem.tbl_order_oems[0].productType == 7)) && ((elem.receivedAmount > 0) || (elem.purchaseRecievedAmount > 0))) {
          FMSpercentage1 = (elem.receivedAmount * 100) / (elem.poValue)
          lt1 = (elem.GP * FMSpercentage1) / 100
          bdmper1 = (lt1 * elem.tbl_order_oems[0].bdmPercentage) / 100
          this.finalGp2 = this.finalGp + bdmper1;
          console.log(this.finalGp2, "finalGp2")


          const totalAchieved2 = ((this.finalGp2) / (firstObj1.tbl_order_oems[0].tbl_masters_bdm.tbl_masters_bdm_year_targets[0].totalAchieved) * 100);
          console.log(this.totalAchieved1, "totalAchieved2")
          console.log(totalAchieved2, "totalAchieved2")

          this.variablePay2 = ((firstObj1.tbl_order_oems[0].tbl_masters_bdm.tbl_masters_bdm_year_targets[0].variablePercentage) * (totalAchieved2) / 100);
          console.log(this.variablePay2, "variablePay2")

          percentage = (elem.salePaymentReceivedAmount * 100) / (elem.poValue);
          console.log(percentage, "percentage")

          this.variable = (this.variablePay2 * percentage / 100);
          console.log(this.variable, "this.variable")

          finalVariable = finalVariable + (this.variable)
          // console.log(finalVariable, "finalVariable")

        } else {
          let sum = 0
          elem.tbl_order_oems.forEach(oem => {
            if (oem.tbl_masters_bdm?.userTableId == this.userId)
              sum += oem.bdmPercentage
          });

          Bdm1 = sum


          if (((elem.tbl_order_oems.productType != 1) || (elem.tbl_order_oems[0].productType != 7)) && (elem.salePaymentReceivedAmount > 0)) {

            let oem_order_arr = elem.tbl_order_oems.filter((e: any) => { return e.orderId = elem.id });

            sum_BDM = oem_order_arr.reduce((partialSum, a) => partialSum + a.BDM_GP, 0);

            this.finalGp2 = sum_BDM;
            console.log(this.finalGp2, "this.finalGp1")

            const totalAchieved2 = ((this.finalGp2) / (firstObj1.tbl_order_oems[0].tbl_masters_bdm.tbl_masters_bdm_year_targets[0].totalAchieved) * 100);
            console.log(this.totalAchieved1, "totalAchieved2")
            console.log(totalAchieved2, "totalAchieved2")

            this.variablePay2 = ((firstObj1.tbl_order_oems[0].tbl_masters_bdm.tbl_masters_bdm_year_targets[0].variablePercentage) * (totalAchieved2) / 100);
            // console.log(this.variablePay2, "variablePay2")

            percentage = (elem.salePaymentReceivedAmount * 100) / (elem.poValue);
            // console.log(percentage, "percentage")

            this.variable = (this.variablePay2 * percentage / 100);
            // console.log(this.variable, "this.variable")

            finalVariable = finalVariable + (this.variable)
            // console.log(finalVariable, "finalVariable")
          }
        }
      })
      // }

      this.finalObject1 = {
        id: firstObj1?.id,
        name: firstObj1['tbl_order_oems'][firstObj1['tbl_order_oems'].indexOf(firstObj1['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['firstName'],
        name1: firstObj1['tbl_order_oems'][firstObj1['tbl_order_oems'].indexOf(firstObj1['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['lastName'],
        ctc: firstObj1['tbl_order_oems'][firstObj1['tbl_order_oems'].indexOf(firstObj1['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['ctc'],
        variablePercentage: firstObj1['tbl_order_oems'][firstObj1['tbl_order_oems'].indexOf(firstObj1['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['variablePercentage'],
        totalAchieved: firstObj1['tbl_order_oems'][firstObj1['tbl_order_oems'].indexOf(firstObj1['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['totalAchieved'],
        minEligiblity: firstObj1['tbl_order_oems'][firstObj1['tbl_order_oems'].indexOf(firstObj1['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['minEligiblity'],
        minAchievement: firstObj1['tbl_order_oems'][firstObj1['tbl_order_oems'].indexOf(firstObj1['tbl_order_oems'].find(ele => ele.bdm != null))]['tbl_masters_bdm']['tbl_masters_bdm_year_targets'][0]['minAchievement'],
        targetArchive: firstObj1 ? this.finalGp1.toFixed(0) : 0,
        percentageAchieved: firstObj1 ? (totalAchieved2) : 0,
        variablePay: firstObj1 ? (finalVariable).toFixed(2) : 0
      }
    }, error => console.log(error))
  }

  getTotalGP(total, num) {
    if (num.GP) {
      return total + Math.round(num.GP);
    } else {
      return total
    }

  }


  getYearData(year) {
    this.yearData = [];
    this.am = [];
    this.bdm = [];
    this.amYearArray = [];
    this.bdmYearArray = [];
    this.data = [];
    this.data1 = [];
    this.YearArray = [];

    this.bookingOrderService.getYearData(year).subscribe(result => {
      if (result['status'] == 200) {

        this.yearData = result['data'];
        console.log(this.yearData, "this.yearData2")

        this.am = this.yearData[0];
        this.bdm = this.yearData[1];
        let l1 = this.am.length;
        let l2 = this.bdm.length;

        for (let i = 0; i < l1; i++) {
          this.data.push(this.am[i]);
        }


        let FMSper = 0;
        let GPpercent = 0;

        let variable = 0
        let totalAchieved1 = 0
        let Percentage = 0
        let variablePay2 = 0
        this.data.map(amdata => {
          this.variable1 = 0

          amdata.tbl_masters_am?.tbl_orders.map(am => {
            console.log(am, "am")

            if ((am['tbl_order_oems'][0]['productType'] == 1) || (am['tbl_order_oems'][0]['productType'] == 7)) {
              FMSper = (am['receivedAmount'] * 100) / (am['poValue'])

              GPpercent = (am['GP'] * FMSper) / 100

              console.log(am['GP'], "am['GP']")
              console.log(FMSper, "FMSpercentag111111")
              console.log(GPpercent, "GPpercent")
              am['GP'] = GPpercent

              console.log(am['GP'])

              if (am.salePaymentReceivedAmount > 0) {
                totalAchieved1 = (am['GP'] / amdata.totalAchieved) * 100;
                console.log(totalAchieved1, "totalAchieved1")

                variable = (amdata.variablePercentage * totalAchieved1) / 100;
                console.log(variable, "variablePay1 ")


                Percentage = (am.salePaymentReceivedAmount * 100) / (am.poValue);
                console.log(Percentage, "%Percentage")

                variablePay2 = ((variable) * Percentage / 100);
                console.log(variablePay2, "variablePay2")

                this.variable1 += (variablePay2)
                amdata['variablePay'] = this.variable1
                console.log(this.variable1, "variablePay")
              }

            } else {
              am['GP'] = parseFloat(am['GP'])


              if (am.salePaymentReceivedAmount > 0) {

                totalAchieved1 = (am['GP'] / amdata.totalAchieved) * 100;
                console.log(totalAchieved1, "totalAchieved1")

                variable = (amdata.variablePercentage * totalAchieved1) / 100;
                console.log(variable, "variablePay1 ")

                Percentage = (am.salePaymentReceivedAmount * 100) / (am.poValue);
                console.log(Percentage, "%Percentage")

                variablePay2 = ((variable) * Percentage / 100);
                console.log(variablePay2, "variablePay2")

                this.variable1 += (variablePay2)
                amdata['variablePay'] = this.variable1
                console.log(this.variable1, "variablePay")

              }
            }
          })


        })


        this.amYearArray = this.data.map((year: any) => {
          // console.log(year, "this.amYearArray")
          return {
            type: 'am',
            id: year?.id,
            name: year?.tbl_masters_am?.firstName,
            name1: year?.tbl_masters_am?.lastName,
            ctc: year?.['ctc'],
            variablePercentage: year?.['variablePercentage'],
            totalAchieved: year?.['totalAchieved'],
            minEligiblity: year?.['minEligiblity'],
            minAchievement: year?.['minAchievement'],
            targetAchieve: year?.tbl_masters_am?.tbl_orders?.reduce(this.getTotalGP, 0) || 0,
            percentageAchieved: year?.tbl_masters_am?.tbl_orders?.reduce(this.getTotalGP, 0) / year?.['totalAchieved'] * 100 || 0,
            variablePay: year?.variablePay
            // variablePay: (year?.['variablePercentage'] * (year?.tbl_masters_am?.tbl_orders?.reduce(this.getTotalGP, 0) / year?.['totalAchieved'] * 100 || 0) / 100).toFixed(2)
          }
        })

        for (let i = 0; i < l2; i++) {
          this.data1.push(this.bdm[i]);
        }

        let FMSpercentage = 0;
        let lt = 0;
        let bdmper = 0;
        let variable5 = 0;
        let Percentage5 = 0;
        let totalAchieved5 = 0;
        let variablePay5 = 0;
        this.data1.map(bdm => {
          this.variable5 = 0;

          bdm['tbl_masters_bdm']['tbl_order_oems'].map(bd => {
            // console.log(bd, "bd")
            // console.log(bd['tbl_order']['receivedAmount'], "['tbl_order']['receivedAmount']")

            if ((bd['productType'] == 1) || (bd['productType'] == 7)) {

              console.log((bd['productType'] == 7), " (bd['productType'] == 7)")

              FMSpercentage = (bd['tbl_order']['receivedAmount'] * 100) / (bd['tbl_order']['poValue'])
              // console.log(FMSpercentage, "FMSpercentage")

              lt = (bd['tbl_order']['GP'] * FMSpercentage) / 100
              // console.log(lt, "lt")
              bdmper = (lt * bd['bdmPercentage']) / 100
              // console.log(bdmper, "bdmper")
              bd['GP'] = bdmper
              // console.log(bd['GP'])

              if (bd['tbl_order']['salePaymentReceivedAmount'] > 0) {

                totalAchieved5 = (bd['GP'] / bdm.totalAchieved) * 100;
                // console.log(totalAchieved5, "totalAchieved1")

                variable5 = (bdm.variablePercentage * totalAchieved5) / 100;
                // console.log(variable5, "variablePay1 ")

                Percentage5 = (bd['tbl_order']['salePaymentReceivedAmount'] * 100) / (bd['tbl_order']['poValue']);
                // console.log(Percentage5, "%Percentage")

                this.variable5 += ((variable5) * Percentage5 / 100);
                bdm['variablePay'] = this.variable5
                // console.log(this.variable5, "variablePay")
              }

            }

            else {
              {
                bd['GP'] = bd['BDM_GP'];

                // console.log(bd['GP'], "bdm")
                if (bd['tbl_order']['salePaymentReceivedAmount'] > 0) {

                  bd['GP'] = bd['BDM_GP'];

                  totalAchieved5 = (bd['GP'] / bdm.totalAchieved) * 100;
                  // console.log(totalAchieved5, "totalAchieved1")

                  variable5 = (bdm.variablePercentage * totalAchieved5) / 100;
                  // console.log(variable5, "variablePay1 ")

                  Percentage5 = (bd['tbl_order']['salePaymentReceivedAmount'] * 100) / (bd['tbl_order']['poValue']);
                  // console.log(Percentage5, "%Percentage")

                  variablePay5 = ((variable5) * Percentage5 / 100);
                  // console.log(variable5, "variablePay2")

                  this.variable5 += (variablePay5)
                  bdm['variablePay'] = this.variable5
                  // console.log(this.variable5, "variablePay")

                }
              }
            }
          })

        });



        this.bdmYearArray = this.data1.map((year: any) => {

          var totalGp = 0;
          return {
            type: 'bdm',
            id: year?.id,
            variablePay: year?.variablePay,
            name: year?.['tbl_masters_bdm']['firstName'],
            name1: year?.['tbl_masters_bdm']['lastName'],

            ctc: year?.['ctc'],
            variablePercentage: year?.['variablePercentage'],
            totalAchieved: year?.['totalAchieved'],
            minEligiblity: year?.['minEligiblity'],
            minAchievement: year?.['minAchievement'],
            targetAchieve: year?.['tbl_masters_bdm']['tbl_order_oems'].reduce(this.getTotalGP, 0),
            percentageAchieved: year?.['tbl_masters_bdm']['tbl_order_oems'].reduce(this.getTotalGP, 0) * 100 / year?.['totalAchieved'] || 0,
            // variablePay: (year?.['variablePercentage'] * (year?.['tbl_masters_bdm']['tbl_order_oems'].reduce(this.getTotalGP, 0) / year?.['totalAchieved'] * 100 || 0) / 100).toFixed(2)
          }
        })

        let ams = this.amYearArray.length;
        for (let i = 0; i < ams; i++) {
          this.YearArray.push(this.amYearArray[i]);
        }
        let bdms = this.bdmYearArray.length;
        for (let i = 0; i < bdms; i++) {
          this.YearArray.push(this.bdmYearArray[i]);
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














  //     this.withInvoicesArray = this.yearData.filter(order => (order['tbl_masters_am.tbl_orders.tbl_order_oems.productType'] == 1) || (order['tbl_masters_am.tbl_orders.tbl_order_oems.productType'] == 7));
  //     console.log(this.withInvoicesArray, "withInvoicesArray")
  //     this.withInvoicesArray1 = this.withInvoicesArray.filter(order => (order.receivedAmount > 0) || (order.purchaseRecievedAmount > 0))


  //     console.log(this.withInvoicesArray1, "this.withInvoicesArray111");

  //     this.withoutInvoicesArray = this.yearData.filter(order => order.productType != 1 && order.productType != 7);
  //     this.withoutInvoicesArray1 = this.withoutInvoicesArray.filter(order => order.status == 'Fully Approved!!')

  //     console.log(this.withoutInvoicesArray, "this.withoutInvoicesArray");
  //     console.log(this.withoutInvoicesArray1, "this.withoutInvoicesArray111111");

  //     this.dashboardStatusArrayTemp = this.withoutInvoicesArray1.map((orders: any) => {


  //       return {
  //         id: orders?.id,
  //         name: orders['tbl_masters_bdm.firstName'],
  //         name1: orders['tbl_masters_bdm.lastName'],
  //         ctc: orders['tbl_masters_bdm.tbl_masters_bdm_year_targets.ctc'],
  //         variablePercentage: orders['tbl_masters_bdm.tbl_masters_bdm_year_targets.variablePercentage'],
  //         totalAchieved: orders['tbl_masters_bdm.tbl_masters_bdm_year_targets.totalAchieved'],
  //         minEligiblity: orders['tbl_masters_bdm.tbl_masters_bdm_year_targets.minEligiblity'],
  //         minAchievement: orders['tbl_masters_bdm.tbl_masters_bdm_year_targets.minAchievement'],


  //       }
  //     });

  //     this.dashboardStatusArray2 = this.withInvoicesArray1.map((orders: any) => {


  //       return {
  //         id: orders?.id,
  //         name: orders['tbl_masters_bdm.firstName'],
  //         name1: orders['tbl_masters_bdm.lastName'],
  //         ctc: orders['tbl_masters_bdm.tbl_masters_bdm_year_targets.ctc'],
  //         variablePercentage: orders['tbl_masters_bdm.tbl_masters_bdm_year_targets.variablePercentage'],
  //         totalAchieved: orders['tbl_masters_bdm.tbl_masters_bdm_year_targets.totalAchieved'],
  //         minEligiblity: orders['tbl_masters_bdm.tbl_masters_bdm_year_targets.minEligiblity'],
  //         minAchievement: orders['tbl_masters_bdm.tbl_masters_bdm_year_targets.minAchievement'],


  //       }
  //     });



  //     this.dashboardStatusArray.push(this.withInvoicesArray1);
  //     this.dashboardStatusArray.push(this.withoutInvoicesArray1);


  //     this.dashboardStatusArray = this.withInvoicesArray1.concat(this.withoutInvoicesArray1)


  //     this.dashboardStatusArray.forEach(element => {
  //       this.finalGp1 = this.finalGp1 + parseFloat(element.GP) / 100;

  //     })

  //     console.log(this.finalGp1, "totalGp");


  //     let firstObj2 = this.dashboardStatusArray1[0];

  //     this.finalObject2= {
  //       id: firstObj2?.id,
  //       name: firstObj2?.['name'],
  //       name1: firstObj2?.['name1'],
  //       ctc: firstObj2?.ctc,
  //       variablePercentage: firstObj2?.variablePercentage,
  //       totalAchieved: firstObj2?.totalAchieved,
  //       minEligiblity: firstObj2?.minEligiblity,
  //       minAchievement: firstObj2?.minAchievement,
  //       targetArchive: this.finalGp1,
  //       percentageAchieved: firstObj2?.totalAchieved / this.finalGp1,
  //       variablePay: this.finalObject2?.variablePay,
  //     }
  //     // }

  //   }, error => console.log(error))
  // }






  // getYearData(year) {
  //   this.yearData = [];
  //   this.am = [];
  //   this.bdm = [];
  //   this.amYearArray = [];
  //   this.bdmYearArray = [];
  //   this.data = [];
  //   this.data1 = [];
  //   this.YearArray = [];

  //   this.bookingOrderService.getYearData(year).subscribe(result => {
  //     if (result['status'] == 200) {

  //       this.yearData = result['data'];
  //       console.log(this.yearData, "this.yearData2")
  //       this.am = this.yearData[0];
  //       this.bdm = this.yearData[1];
  //       let l1 = this.am.length;
  //       let l2 = this.bdm.length;

  //       for (let i = 0; i < l1; i++) {
  //         this.data.push(this.am[i]);
  //       }
  //       this.amYearArray = this.data.map((year: any) => {
  //         return {
  //           id: year?.id,
  //           name: year?.['tbl_masters_am']['firstName'],
  //           name1: year?.['tbl_masters_am']['lastName'],

  //           ctc: year?.['ctc'],
  //           variablePercentage: year?.['variablePercentage'],
  //           totalAchieved: year?.['totalAchieved'],
  //           minEligiblity: year?.['minEligiblity'],
  //           minAchievement: year?.['minAchievement'],
  //           targetAchieve: year?.GP || 0,
  //           percentageAchieved: year?.GP * 100 / year?.['totalAchieved'] || 0,
  //           variablePay: (year?.GP * 100 / year?.['totalAchieved'] || 0) > (year?.['minAchievement']) ? ((year?.['variablePercentage']) * (year?.GP * 100 / year?.['totalAchieved'] || 0) / 100) : 0
  //         }
  //       })

  //       for (let i = 0; i < l2; i++) {
  //         this.data1.push(this.bdm[i]);
  //       }
  //       this.bdmYearArray = this.data1.map((year: any) => {

  //         var totalGp = 0;
  //         return {
  //           id: year?.id,
  //           name: year?.['tbl_masters_bdm']['firstName'],
  //           name1: year?.['tbl_masters_bdm']['lastName'],

  //           ctc: year?.['ctc'],
  //           variablePercentage: year?.['variablePercentage'],
  //           totalAchieved: year?.['totalAchieved'],
  //           minEligiblity: year?.['minEligiblity'],
  //           minAchievement: year?.['minAchievement'],
  //           targetAchieve: year?.GP || 0,
  //           percentageAchieved: year?.GP * 100 / year?.['totalAchieved'] || 0,
  //           variablePay: (year?.GP * 100 / year?.['totalAchieved'] || 0) > (year?.['minAchievement']) ? ((year?.['variablePercentage']) * (year?.GP * 100 / year?.['totalAchieved'] || 0) / 100) : 0
  //         }
  //       })


  //       let ams = this.amYearArray.length;
  //       for (let i = 0; i < ams; i++) {
  //         this.YearArray.push(this.amYearArray[i]);
  //       }
  //       let bdms = this.bdmYearArray.length;
  //       for (let i = 0; i < bdms; i++) {
  //         this.YearArray.push(this.bdmYearArray[i]);
  //       }



  //       console.log(this.YearArray, "this.YearArray");
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



  // getBdm() {
  //   this.bdmService.get().subscribe(result => {
  //     if (result['status'] == 200) {
  //       this.Bdms = result['data']


  //       this.bdmCount = result['data']['count']


  //       this.bdmArray = this.Bdms.map((Bdms: any) => {
  //         var totalGp = 0;
  //         Bdms.tbl_orders.forEach(element => {
  //           totalGp = totalGp + parseFloat(element.GP) * parseFloat(element.bdmPercentage) / 100;
  //         })

  //         return {
  //           id: Bdms?.id,
  //           name: Bdms?.firstName, name1: Bdms?.lastName,

  //           ctc: Bdms?.['tbl_masters_bdm_year_targets']['ctc'],
  //           variablePercentage: Bdms?.['tbl_masters_bdm_year_targets']['variablePercentage'],
  //           totalAchieved: Bdms?.['tbl_masters_bdm_year_targets'][0]['totalAchieved'],
  //           minEligiblity: Bdms?.['tbl_masters_bdm_year_targets'][0]['minEligiblity'],
  //           minAchievement: Bdms?.['tbl_masters_bdm_year_targets'][0]['minAchievement'],
  //           targetAchieve: totalGp,


  //         }
  //       });



  //       this.bdmArray.forEach(element => {
  //         this.tabledata.push(element)
  //       });




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


  // getAm() {
  //   this.amService.get().subscribe(result => {
  //     if (result['status'] == 200) {
  //       this.Ams = result['data']

  //       console.log(this.Ams, "this.Ams");


  //       this.AmArray = this.Ams.map((Ams: any) => {

  //         var totalGp = 0;
  //         Ams.tbl_orders.forEach(element => {
  //           totalGp = totalGp + parseFloat(element.GP) * (100 - parseFloat(element.bdmPercentage)) / 100;
  //           console.log(totalGp, "totalGp")
  //         })
  //         return {
  //           id: Ams?.id,
  //           name: Ams?.firstName, name1: Ams?.lastName,
  //           // year: Ams?.['tbl_masters_am_year_targets'][0]['year'],
  //           ctc: Ams?.['tbl_masters_am_year_targets']['ctc'],
  //           variablePercentage: Ams?.['tbl_masters_am_year_targets']['variablePercentage'],
  //           totalAchieved: Ams?.['tbl_masters_am_year_targets']['totalAchieved'],
  //           minEligiblity: Ams?.['tbl_masters_am_year_targets']['minEligiblity'],
  //           minAchievement: Ams?.['tbl_masters_am_year_targets']['minAchievement'],
  //           targetAchieve: totalGp,
  //           percentageAchieved: totalGp / Ams?.['tbl_masters_am_year_targets']['totalAchieved'],
  //         }

  //       });



  //       this.AmArray.forEach(element => {
  //         this.tabledata.push(element)


  //       });




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


  // getBdmUserstatus() {


  //   this.bookingOrderService.getBdmUser(this.userId).subscribe(result => {

  //     if (result['status'] == 200) {
  //       if (result['message'] == 'BDM Not Found') {
  //         this.errormsg();
  //       } else {
  //         this.BdmsData = result['data']

  //         console.log(this.BdmsData, "BdmsData");


  //         this.bdmUserArray = this.BdmsData.map((bdms: any) => {
  //           var totalGp = 0;
  //           bdms.tbl_orders.forEach(element => {
  //             totalGp = totalGp + parseFloat(element.GP) * (100 - parseFloat(element.bdmPercentage)) / 100;
  //             console.log(totalGp, "totalGp")
  //           })

  //           return {
  //             id: bdms?.id,
  //             name: bdms?.['firstName'],
  //             name1: bdms?.['lastName'],
  //             year: bdms?.['tbl_masters_bdm_year_targets'][0]['year'],
  //             ctc: bdms?.['tbl_masters_bdm_year_targets'][0]['ctc'],
  //             variablePercentage: bdms?.['tbl_masters_bdm_year_targets'][0]['variablePercentage'],
  //             totalAchieved: bdms?.['tbl_masters_bdm_year_targets'][0]['totalAchieved'],
  //             minEligiblity: bdms?.['tbl_masters_bdm_year_targets'][0]['minEligiblity'],
  //             minAchievement: bdms?.['tbl_masters_bdm_year_targets'][0]['minAchievement'],
  //             targetAchieve: bdms?.GP || 0,
  //             percentageAchieved: bdms?.GP * 100 / bdms?.['tbl_masters_bdm_year_targets'][0]['totalAchieved'] || 0,
  //             variablePay: (bdms?.GP * 100 / bdms?.['tbl_masters_bdm_year_targets'][0]['totalAchieved'] || 0) > (bdms?.['tbl_masters_bdm_year_targets'][0]['minAchievement']) ? ((bdms?.['tbl_masters_bdm_year_targets'][0]['variablePercentage']) * (bdms?.GP * 100 / bdms?.['tbl_masters_bdm_year_targets'][0]['totalAchieved'] || 0) / 100) : 0
  //           }
  //         });



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


  // getAmUserstatus() {
  //   this.amService.getAmUser(this.userId).subscribe(result => {

  //     if (result['status'] == 200) {
  //       if (result['message'] == 'BDM Not Found') {
  //         this.errormsg();
  //       } else {
  //         this.Ams = result['data']

  //         this.AmUserArray = this.Ams.map((year: any) => {

  //           return {
  //             id: year?.id,
  //             name: year?.['firstName'],
  //             name1: year?.['lastName'],
  //             year: year?.['tbl_masters_am_year_targets'][0]['year'],
  //             ctc: year?.['tbl_masters_am_year_targets'][0]['ctc'],
  //             variablePercentage: year?.['tbl_masters_am_year_targets'][0]['variablePercentage'],
  //             totalAchieved: year?.['tbl_masters_am_year_targets'][0]['totalAchieved'],
  //             minEligiblity: year?.['tbl_masters_am_year_targets'][0]['minEligiblity'],
  //             minAchievement: year?.['tbl_masters_am_year_targets'][0]['minAchievement'],
  //             targetAchieve: year?.GP || 0,
  //             percentageAchieved: year?.GP * 100 / year?.['tbl_masters_am_year_targets'][0]['totalAchieved'] || 0,
  //             variablePay: (year?.GP * 100 / year?.['tbl_masters_am_year_targets'][0]['totalAchieved'] || 0) > (year?.['tbl_masters_am_year_targets'][0]['minAchievement']) ? ((year?.['tbl_masters_am_year_targets'][0]['variablePercentage']) * (year?.GP * 100 / year?.['tbl_masters_am_year_targets'][0]['totalAchieved'] || 0) / 100) : 0
  //           }

  //         });





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



  getFullyApprovedOrder() {

    this.bookingOrderService.getFullyApprovedOrder().subscribe(result => {

      if (result['status'] == 200) {
        this.Orders = result['data']
        this.OrdersArray = this.Orders.map((order: any) => {
          return {
            id: order?.id,
            orderid: order?.orderCode,
            orderdate: order?.createdAt,
            customer: order?.['tbl_masters_customer.customerName'],
            producttype: order?.['tbl_masters_product.productName'],
            povalue: order?.poValue,
            podate: order?.poDate,

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
  addData(event, addFullyApprovedorderData: any) {
    if (event.action == 1) {
      this.setElementId(event.value);
      this.addInvoiceData(event.value, addFullyApprovedorderData);
    }
  }
  ViewInvoiceData(event, viewInvoiceData: any) {
    if (event.action == 2) {
      this.setElementId(event.value);
      this.openViewInvoiceData(event.value, viewInvoiceData);
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

  onSubmit(addFullyApprovedorderData) {


    this.invoiceFormGroup.controls.orderId.setValue(this.orderId);




    this.bookingOrderService.UpdateFullyApprovedData(this.invoiceFormGroup.value).subscribe(data => {
      if (data['status'] == 200) {


        this.successmsg();
        this.modalService.dismissAll(addFullyApprovedorderData);

        this.resetForm();
        //this.getOrder();
        // this.getEntity();
        // this.getOem();
        // this.getBdm();
        // this.getAm();
        // this.getProduct();
        // this.getVendor();
        // this.getBusinessUnit();

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
  successmsg() {
    Swal.fire('Saved successfully!', 'You clicked the button!', 'success');
  }
  resetForm() {
    this.invoiceFormGroup.reset();
  }


  addInvoiceData(id, addFullyApprovedorderData: any) {
    const fullyApprovedOrder = this.Orders.find(fullyApproved => fullyApproved.id === id);


    var paymentTerms = 0;
    paymentTerms = parseInt(fullyApprovedOrder['companyPaymentTerms']);
    const invoiceDate = new Date();
    let invoiceSaleDate = invoiceDate.toISOString().split("T")[0];
    invoiceDate.setDate(invoiceDate.getDate() + paymentTerms);
    var DueDate = invoiceDate.getFullYear() + '-' + (invoiceDate.getMonth() + 1 + '').padStart(2, '0') + '-' + invoiceDate.getDate();
    this.invoiceFormGroup.controls.invoiceRaisedDate.setValue(invoiceSaleDate);
    this.invoiceFormGroup.controls.purchaseInvoiceDate.setValue(invoiceSaleDate);
    this.invoiceFormGroup.controls.DueDate.setValue(DueDate);
    this.invoiceFormGroup.controls.InvoiceRecievedDate.setValue(DueDate);
    //let ven=(fullyApprovedOrder['tbl_order_vendors'][0]['tbl_masters_vendor']['vendorName']);


    //this.invoiceFormGroup.controls.VendorName.setValue(fullyApprovedOrder['tbl_order_vendors'][0]['tbl_masters_vendor']['vendorName']);


    this.modalService.open(addFullyApprovedorderData, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });

  }

  openViewInvoiceData(id, viewInvoiceData: any) {
    const viewInvoice = this.invoice.find(invoiceData => invoiceData.id === id);




    this.modalService.open(viewInvoiceData, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });


  }

  findsumOftotalAchieved(): number {
    let sum = 0;
    const yearArr = this.YearArray.filter(yr => yr.type != 'bdm');
    for (let i = 0; i < yearArr.length; i++) {
      sum += parseFloat(yearArr[i].totalAchieved);

    }
    return sum;

  }
  findsumOfminEligiblity(): number {
    let sum = 0;
    const yearArr = this.YearArray.filter(yr => yr.type != 'bdm');
    for (let i = 0; i < yearArr.length; i++) {
      sum += parseFloat(yearArr[i].minEligiblity);
    }
    return sum;
  }

  findsumTargetAchieve(): number {
    let sum = 0;
    const yearArr = this.YearArray.filter(yr => yr.type != 'bdm');
    for (let i = 0; i < yearArr.length; i++) {
      sum += parseFloat(yearArr[i].targetAchieve);
    }
    return sum;
  }

  findOfpercentageAchieved(): number {
    let sum: any = 0;

    const yearArr = this.YearArray.filter(yr => yr.type != 'bdm');
    for (let i = 0; i < yearArr.length; i++) {
      sum += parseFloat(yearArr[i].percentageAchieved);

    }
    return sum;

  }
  findsumOfCtc(): number {
    let sum: any = 0;
    const yearArr = this.YearArray.filter(yr => yr.type != 'bdm');
    for (let i = 0; i < yearArr.length; i++) {
      sum += parseFloat(yearArr[i].ctc);

    }
    return sum;

  }
  findsumOfvariablePercentage(): number {
    let sum: any = 0;

    const yearArr = this.YearArray.filter(yr => yr.type != 'bdm');
    for (let i = 0; i < yearArr.length; i++) {
      sum += parseFloat(yearArr[i].variablePercentage);

    }
    return sum;

  }
  findsumOfminAchievement(): number {
    let sum: any = 0;
    const yearArr = this.YearArray.filter(yr => yr.type != 'bdm');
    for (let i = 0; i < yearArr.length; i++) {
      sum += parseFloat(yearArr[i].minAchievement);

    }
    return sum;

  }
  findOfVariablePay(): number {
    let sum: any = 0;
    const yearArr = this.YearArray.filter(yr => yr.type != 'bdm');
    for (let i = 0; i < yearArr.length; i++) {
      sum += parseFloat(yearArr[i].variablePay);

    }
    return sum;

  }

}

