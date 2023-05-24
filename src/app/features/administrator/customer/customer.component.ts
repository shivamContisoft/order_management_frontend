import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomerService } from './customer.service';
import { BookingOrderService } from '../../booking-order/booking-order.service';
import * as countries_data from '../../../shared/regions/countries.json';
import * as states_data from '../../../shared/regions/states.json';
import * as cities_data from '../../../shared/regions/cities.json';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AmService } from '../am/am.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerArray: Array<any> = []
  Columns: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'name', value: 'Company Name', sortable: true, isEnabled: true },
    { name: 'contactPersonName', value: 'Contact Person Name', sortable: true, isEnabled: true },
    { name: 'contactPersonemail1', value: 'Contact Person Email', sortable: true, isEnabled: true },
    { name: 'contactPersonno', value: 'Contact Person Contact', sortable: true, isEnabled: true },


  ];
  Actions: Array<any> = [
    { name: '1', value: 'View', icon: 'eye', multiple: false },
    { name: '2', value: 'edit', icon: 'edit', multiple: false },
    { name: '3', value: 'delete', icon: 'delete', multiple: false },
  ];
  LightBlue: any = "#3f51b5";

  Countries: any = [];
  States: any = [];
  stateData: any = [];
  Cities: any = [];
  cityData: any = [];
  Entitys: any = [];
  PaymentTerm: any;
  customerFormGroup: FormGroup;
  Customers: any = [];
  customerCount = 0;
  customerId = 0;
  error = '';
  file: any;
  arrayBuffer;
  accountManagers: any;
  filelist;
  dataWithErrors: any = [];
  tableData: Array<any> = Array<any>();
  public totalCount: any = 0;
  public validCount: any = 0;
  public invalidCount: any = 0;
  recs: boolean = true;
  userId = 0;
  userAccountType: any;
  accManCount: any;
  AmArray: any;

  constructor(private moduleService: ModuleService, private modalService: NgbModal,
    private formBuilder: FormBuilder, private customerService: CustomerService, private amService: AmService, private bookingOrderService: BookingOrderService, private authService: AuthenticationService) {
      this.getAm();
     }

  ngOnInit(): void {
    if (this.authService.currentUserValue.user)
      this.userId = this.authService.currentUserValue.user.id;
    this.userAccountType = this.authService.currentUserValue.user.tbl_auth.accountType;
    console.log(this.userAccountType);


    this.getCustomer();
    this.getEntity();

    this.customerFormGroup = this.formBuilder.group({
      customerName: ['', [Validators.required]],
      //contact: [''],
      //email: [''],
      entity: [''],
      accountManager: [''],
      address: [''],
      location: [''],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: [''],
      pincode: [''],
      PaymentTerm: [''],
      contactPersonName1: [''],
      contactPersonContact1: [''],
      contactPersonEmail1: ['', [Validators.email]],
      contactPersonName2: ['', Validators.pattern('^[a-zA-Z]+ [a-zA-Z]+$')],
      contactPersonContact2: ['', [Validators.pattern('(0/91)?[7-9][0-9]{9}'), Validators.minLength(10), Validators.maxLength(10)]],
      contactPersonEmail2: ['', [Validators.email]],
      id: ['']
    })

    this.Countries = countries_data;

    this.Countries = this.Countries.countries;

  }

  get getCustomerFormControls() {
    return this.customerFormGroup.controls;
  }

  getCustomer() {
    this.customerService.get().subscribe(result => {
      if (result['status'] == 200) {

        this.Customers = result['data']['rows']
        this.customerCount = result['data']['count']
        this.customerArray = this.Customers.map((Customers: any) => {
          return {
            id: Customers?.id, 
            name: Customers?.customerName, 
            contactPersonName: Customers?.contactPersonName1, 
            contactPersonemail1: Customers?.contactPersonEmail1,
            contactPersonno: Customers?.contactPersonContact1,
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

  getAm() {
    this.amService.get().subscribe(result => {
      if (result['status'] == 200) {

        this.accountManagers = result['data']
        console.log(this.accountManagers,"Acc Man")
        this.accManCount = result['data']['count']
        this.AmArray = this.accountManagers.map((Ams: any) => {
          return {
            id: Ams?.id,
            name: Ams?.firstName + ' ' + Ams?.lastName,


            contact: Ams?.contact,
            email: Ams?.email, designation: Ams?.designation,
          }
        });
        console.log(this.AmArray," -AmsArray")

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

  /**
  * Open modal
  * @param createcustomer modal content
  */
  openAddCustomerModal(createcustomer: any) {
    this.modalService.open(createcustomer, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
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
      'Rejected',
      'Customer already exist!',
      'error'
    );
  }
  onSubmit(createcustomer) {

    if (this.customerFormGroup.valid) {
      this.customerService.create(this.customerFormGroup.value).subscribe(data => {
        if (data.status == 200) {

          this.successmsg();
          this.modalService.dismissAll(createcustomer);
          this.getCustomer();
          this.resetForm();
        } else if (data.status == 201) {
          this.error = 'No credentials provided for authentication.';
        } else if (data.status == 202) {
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
    }
  }

  setElementId(id) {
    this.customerId = id;
  }
  viewElement(event, viewcustomer: any) {
    if (event.action == 1) {
      this.setElementId(event.value);
      this.openViewCustomerModal(event.value, viewcustomer);
    }
  }
  editElement(event, editcustomer: any) {
    if (event.action == 2) {
      this.setElementId(event.value);
      this.openEditCustomerModal(event.value, editcustomer);
    }
  }
  deleteElement(event, deletecustomer: any) {
    if (event.action == 3) {
      this.setElementId(event.value);
      this.openDeleteCustomerModal(deletecustomer);
    }
  }
  /**
  * Open modal
  * @param editcustomer modal content
  */
  openEditCustomerModal(id, editcustomer: any) {
    const customers = this.Customers.find(customer => customer.id === id);


    this.customerFormGroup.controls.id.setValue(customers['id']);
    this.customerFormGroup.controls.customerName.setValue(customers['customerName']);
    //this.customerFormGroup.controls.contact.setValue(customers['contact']);
    //this.customerFormGroup.controls.email.setValue(customers['email']);
    this.customerFormGroup.controls.entity.setValue(customers['entity']);
    this.customerFormGroup.controls.address.setValue(customers['address']);

    this.customerFormGroup.controls.country.setValue(customers['country']);
    this.customerFormGroup.controls.state.setValue(customers['state']);
    this.customerFormGroup.controls.city.setValue(customers['city']);
    // if((customers['country'])!=null)
    // {
    // let country=customers['country'].charAt(0).toUpperCase() + customers['country'].slice(1).toLowerCase();
    // this.customerFormGroup.controls.country.setValue(country);
    // }
    // this.setStates(this.customerFormGroup.controls.country.value);

    // if((customers['state'])!=null)
    // {
    // let state=customers['state'].charAt(0).toUpperCase() + customers['state'].slice(1).toLowerCase()
    // this.customerFormGroup.controls.state.setValue(state);
    // }

    // this.setCities(this.customerFormGroup.controls.state.value);
    // if((customers['city'])!=null)
    // {
    // let city=customers['city'].charAt(0).toUpperCase() + customers['city'].slice(1).toLowerCase();
    // console.log(city);
    // this.customerFormGroup.controls.city.setValue(city);
    // }
    this.customerFormGroup.controls.accountManager.setValue(customers['accountManager']);
    this.customerFormGroup.controls.pincode.setValue(customers['pincode']);
    this.customerFormGroup.controls.PaymentTerm.setValue(customers['PaymentTerm']);
    this.customerFormGroup.controls.contactPersonName1.setValue(customers['contactPersonName1']);
    this.customerFormGroup.controls.contactPersonContact1.setValue(customers['contactPersonContact1']);
    this.customerFormGroup.controls.contactPersonEmail1.setValue(customers['contactPersonEmail1']);
    this.customerFormGroup.controls.contactPersonName2.setValue(customers['contactPersonName2']);
    this.customerFormGroup.controls.contactPersonContact2.setValue(customers['contactPersonContact2']);
    this.customerFormGroup.controls.contactPersonEmail2.setValue(customers['contactPersonEmail2']);
    this.modalService.open(editcustomer, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  updateCustomer(editcustomer) {
    console.log("11111111111");

    if (this.customerFormGroup.valid) {

      console.log(this.customerFormGroup.valid);

      this.customerService.update(this.customerFormGroup.value).subscribe(data => {
        console.log(this.customerFormGroup.value);

        if (data.status == 200) {

          this.successmsg();
          this.modalService.dismissAll(editcustomer);
          this.getCustomer();
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
    }
  }

  successmsg() {
    Swal.fire('Saved successfully!', 'You clicked the button!', 'success');
  }

  resetForm() {
    this.customerFormGroup.reset();
  }


  /**
  * Open modal
  * @param viewcustomer modal content
  */
  openViewCustomerModal(id, viewcustomer: any) {
    const customers = this.Customers.find(customer => customer.id === id);


    this.customerFormGroup.controls.id.setValue(customers['id']);
    this.customerFormGroup.controls.customerName.setValue(customers['customerName']);
    // this.customerFormGroup.controls.contact.setValue(customers['contact']);
    //this.customerFormGroup.controls.email.setValue(customers['email']);
    this.customerFormGroup.controls.entity.setValue(customers['tbl_masters_entity']['entityName']);
    this.customerFormGroup.controls.address.setValue(customers['address']);
    this.customerFormGroup.controls.location.setValue(customers['location']);
    this.customerFormGroup.controls.country.setValue(customers['country']);
    this.customerFormGroup.controls.state.setValue(customers['state']);
    this.customerFormGroup.controls.city.setValue(customers['city']);
    this.customerFormGroup.controls.pincode.setValue(customers['pincode']);
    this.customerFormGroup.controls.PaymentTerm.setValue(customers['PaymentTerm']);
    this.customerFormGroup.controls.accountManager.setValue(customers['accountManager']);
    this.customerFormGroup.controls.contactPersonName1.setValue(customers['contactPersonName1']);
    this.customerFormGroup.controls.contactPersonContact1.setValue(customers['contactPersonContact1']);
    this.customerFormGroup.controls.contactPersonEmail1.setValue(customers['contactPersonEmail1']);
    this.customerFormGroup.controls.contactPersonName2.setValue(customers['contactPersonName2']);
    this.customerFormGroup.controls.contactPersonContact2.setValue(customers['contactPersonContact2']);
    this.customerFormGroup.controls.contactPersonEmail2.setValue(customers['contactPersonEmail2']);
    this.modalService.open(viewcustomer, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  /**
  * Open modal
  * @param deletecustomer modal content
  */
  openDeleteCustomerModal(deletecustomer: any) {
    this.modalService.open(deletecustomer, { size: 'sm', windowClass: 'modal-holder', centered: true });
  }

  deleteCustomer(deletecustomer) {
    this.customerService.delete(this.customerId).subscribe(data => {
      if (data.status == 200) {

        this.successmsg();
        this.modalService.dismissAll(deletecustomer);
        this.getCustomer();
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

  /**  Set states **/
  setStates(country_name) {
    this.States = [];
    let country_code = 0;

    this.Countries.forEach(element => {
      if (element.name == country_name) {
        country_code = element.id;
      }
    });
    this.stateData = states_data;
    this.stateData = this.stateData.states
    this.States = this.stateData.filter(e => parseInt(e.country_id) == country_code);

  }

  /** Set City **/
  setCities(state_name) {
    this.Cities = [];
    let city_code = 0;

    this.States.forEach(element => {
      if (element.name == state_name) {
        city_code = element.id;
      }
    });

    this.cityData = cities_data;
    this.cityData = this.cityData.cities
    this.Cities = this.cityData.filter(e => parseInt(e.state_id) == city_code);

  }
  openModal(modal) {
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-holder', centered: true })
  }

  removeRecord(index, pageNumber) {

    if (pageNumber > 1) {
      index = index + ((pageNumber - 1) * 10);
    }
  }
  convertFile(event: any, errorModal) {

    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();

      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: false });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var arrayList: any = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(arrayList, "arrayList");

      this.customerService.createBulk(arrayList).subscribe(data => {
        if (data.status == 200) {
          console.log("result=>", data);
          this.successmsg();
          // this.modalService.dismissAll(createoem);
          this.getCustomer();
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

      for (let i = 0; i < arrayList.length; i++) {
        let insertionEnabled = true;

        let entity = arrayList[i]['Entity'];
        if (entity == undefined || entity == null || entity == 'null') {
          let record = {
            reason: "Invalid entity Or Not Entered!!",
            entity: arrayList[i]['entity'],
            customerName: arrayList[i]['Customer Name'],
            address: arrayList[i]['Address'],
            country: arrayList[i]['Country'],
            state: arrayList[i]['State'],
            city: arrayList[i]['City'],
            pincode: arrayList[i]['Pincode'],
            PaymentTerm: arrayList[i]['Payment Term'],
            contactPersonName1: arrayList[i]['Contact Person Name'],
            contactPersonContact1: arrayList[i]['Contact Person Contact'],
            contactPersonEmail1: arrayList[i]['Contact Person Email'],
            contactPersonName2: arrayList[i]['Contact Person Name_1'],
            contactPersonContact2: arrayList[i]['Contact Person Contact_1'],
            contactPersonEmail2: arrayList[i]['Contact Person Email-_1'],

          }

          this.dataWithErrors.push(record);
          console.log(this.dataWithErrors, "this.dataWithErrors");

          insertionEnabled = false;
        }
        let customerName = arrayList[i]['Customer Name'];
        if (customerName == undefined || customerName == null || customerName == 'null') {
          let record = {
            reason: "Invalid Customer Name Or Not Entered!!",
            entity: arrayList[i]['entity'],
            customerName: arrayList[i]['Customer Name'],
            address: arrayList[i]['Address'],
            country: arrayList[i]['Country'],
            state: arrayList[i]['State'],
            city: arrayList[i]['City'],
            pincode: arrayList[i]['Pincode'],
            PaymentTerm: arrayList[i]['Payment Term'],
            contactPersonName1: arrayList[i]['Contact Person Name'],
            contactPersonContact1: arrayList[i]['Contact Person Contact'],
            contactPersonEmail1: arrayList[i]['Contact Person Email'],
            contactPersonName2: arrayList[i]['Contact Person Name_1'],
            contactPersonContact2: arrayList[i]['Contact Person Contact_1'],
            contactPersonEmail2: arrayList[i]['Contact Person Email-_1'],
          }
          this.dataWithErrors.push(record);
          console.log(this.dataWithErrors, "this.dataWithErrors");
          insertionEnabled = false;
        }

        let country = arrayList[i]['Country'];
        if (country == undefined || country == null || country == 'null') {
          let record = {
            reason: "Invalid Country Or Not Entered!!",
            entity: arrayList[i]['entity'],
            customerName: arrayList[i]['Customer Name'],
            address: arrayList[i]['Address'],
            country: arrayList[i]['Country'],
            state: arrayList[i]['State'],
            city: arrayList[i]['City'],
            pincode: arrayList[i]['Pincode'],
            PaymentTerm: arrayList[i]['Payment Term'],
            contactPersonName1: arrayList[i]['Contact Person Name'],
            contactPersonContact1: arrayList[i]['Contact Person Contact'],
            contactPersonEmail1: arrayList[i]['Contact Person Email'],
            contactPersonName2: arrayList[i]['Contact Person Name_1'],
            contactPersonContact2: arrayList[i]['Contact Person Contact_1'],
            contactPersonEmail2: arrayList[i]['Contact Person Email-_1'],
          }
          this.dataWithErrors.push(record);
          console.log(this.dataWithErrors, "this.dataWithErrors");
          insertionEnabled = false;
        }

        let state = arrayList[i]['State'];
        if (state == undefined || state == null || state == 'null') {
          let record = {
            reason: "Invalid State Or Not Entered!!",
            entity: arrayList[i]['entity'],
            customerName: arrayList[i]['Customer Name'],
            address: arrayList[i]['Address'],
            country: arrayList[i]['Country'],
            state: arrayList[i]['State'],
            city: arrayList[i]['City'],
            pincode: arrayList[i]['Pincode'],
            PaymentTerm: arrayList[i]['Payment Term'],
            contactPersonName1: arrayList[i]['Contact Person Name'],
            contactPersonContact1: arrayList[i]['Contact Person Contact'],
            contactPersonEmail1: arrayList[i]['Contact Person Email'],
            contactPersonName2: arrayList[i]['Contact Person Name_1'],
            contactPersonContact2: arrayList[i]['Contact Person Contact_1'],
            contactPersonEmail2: arrayList[i]['Contact Person Email-_1'],
          }
          this.dataWithErrors.push(record);
          console.log(this.dataWithErrors, "this.dataWithErrors");
          insertionEnabled = false;
        }

        if (insertionEnabled) {
          let record = {
            entity: arrayList[i]['entity'],
            customerName: arrayList[i]['Customer Name'],
            address: arrayList[i]['Address'],
            country: arrayList[i]['Country'],
            state: arrayList[i]['State'],
            city: arrayList[i]['City'],
            pincode: arrayList[i]['Pincode'],
            PaymentTerm: arrayList[i]['Payment Term'],
            contactPersonName1: arrayList[i]['Contact Person Name'],
            contactPersonContact1: arrayList[i]['Contact Person Contact'],
            contactPersonEmail1: arrayList[i]['Contact Person Email'],
            contactPersonName2: arrayList[i]['Contact Person Name_1'],
            contactPersonContact2: arrayList[i]['Contact Person Contact_1'],
            contactPersonEmail2: arrayList[i]['Contact Person Email-_1'],
          }
          this.tableData.push(record);
          console.log(this.tableData, "this.tableData");

        }
        this.recs = false;

        // if (this.dataWithErrors.length > 0) {
        //   this.openModal(errorModal);
        // }
        this.validCount = this.tableData.length;
        this.invalidCount = this.dataWithErrors.length;
        this.totalCount = this.validCount + this.invalidCount;
      }
      if (this.dataWithErrors.length > 0) {
        this.openModal(errorModal);
      }


    }
  }
  exportErrorData() {
    //this._exportService.exportErrorReportCSV(this.dataWithErrors, 'ErrorReports');
  }

}

