import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { VendorService } from './vendor.service';
import * as countries_data from '../../../shared/regions/countries.json';
import * as states_data from '../../../shared/regions/states.json';
import * as cities_data from '../../../shared/regions/cities.json';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  vendorArray: Array<any> = []
  Columns: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'name', value: 'Name', sortable: true, isEnabled: true },
    { name: 'contact', value: 'Contact Person Name', sortable: true, isEnabled: true },
    { name: 'email', value: 'Contact Person E-mail', sortable: true, isEnabled: true },
    { name: 'contactno', value: 'Contact Person Contact', sortable: true, isEnabled: true },
    
  ];
  Actions: Array<any> = [
    { name: '1', value: 'View', icon: 'eye', multiple: false},
    { name: '2', value: 'edit', icon: 'edit', multiple: false},
    {name: '3', value: 'delete', icon: 'delete', multiple: false},
  ];
  LightBlue: any = "#3f51b5";

  Countries: any = [];
  States: any = [];
  stateData: any = [];
  Cities: any = [];
  cityData: any = [];
  vendorFormGroup: FormGroup;
  Vendors: any = [];
  vendorCount = 0;
  vendorId = 0;
  error = '';
  file: any;
  arrayBuffer;
  filelist;
  dataWithErrors: any = [];
  tableData: Array<any> = Array<any>();
  public totalCount: any = 0;
  public validCount: any = 0;
  public invalidCount: any = 0;
  recs: boolean = true;
  userId = 0;
  userAccountType: any;

  constructor(private moduleService: ModuleService, private modalService: NgbModal, 
    private formBuilder: FormBuilder, private vendorService: VendorService,private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue.user)
    this.userId = this.authService.currentUserValue.user.id;
  this.userAccountType = this.authService.currentUserValue.user.tbl_auth.accountType;
    console.log(this.userAccountType);
    
    this.getVendor();
    
    this.vendorFormGroup = this.formBuilder.group({
      vendorName: ['', [Validators.required]],
      contact: [''],
      email: [''],
      entity: [''],
      address: [''],
      location: [''],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city:[''],
      pincode: [''],
      contactPersonName1: ['',Validators.pattern('^[a-zA-Z]+ [a-zA-Z]+$')],
      contactPersonContact1: ['', [Validators.pattern('(0/91)?[7-9][0-9]{9}'),Validators.minLength(10), Validators.maxLength(10)]],
      contactPersonEmail1: ['',[Validators.email]],
      contactPersonName2: ['',Validators.pattern('^[a-zA-Z]+ [a-zA-Z]+$')],
      contactPersonContact2: ['', [Validators.pattern('(0/91)?[7-9][0-9]{9}'),Validators.minLength(10), Validators.maxLength(10)]],
      contactPersonEmail2: ['',[Validators.email]],
      panNo: [''],
      gstNo: [''],
      bankName: [''],
      accountNo: [''],
      ifscNo: [''],
      branchName: [''],
      addOnVendor: this.formBuilder.array([]),
      id: ['']
    })

    this.Countries = countries_data;
    this.Countries = this.Countries.countries;
  }

  get getVendorFormControls() {
    return this.vendorFormGroup.controls;
  }

  getVendor(){
    this.vendorService.get().subscribe(result => {
      if (result['status'] == 200) {
     
        this.Vendors = result['data']['rows']
        
        

        this.vendorCount = result['data']['count']
        this.vendorArray  =this.Vendors.map((Vendors: any) => {return {id: Vendors?.id, name: Vendors?.vendorName, contact: Vendors?.contactPersonName1, 
          email: Vendors?.contactPersonEmail1, contactno: Vendors?.contactPersonContact1, 
        }});
      

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
  * @param createvendor modal content
  */
  openAddVendorModal(createvendor: any) {
    this.modalService.open(createvendor, { size: 'lg', windowClass: 'modal-holder', centered: true })
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
  onSubmit(createvendor){

    if (this.vendorFormGroup.valid) {
      this.vendorService.create(this.vendorFormGroup.value).subscribe(data => {
        if (data.status == 200) {
      
          this.successmsg();
          this.modalService.dismissAll(createvendor);
          this.getVendor();
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

  setElementId(id){
    this.vendorId = id;
  }
  viewElement(event, viewvendor: any) {
    if (event.action == 1) {
      this.setElementId(event.value);
      this.openViewVendorModal(event.value, viewvendor);
    }
  }
  editElement(event, editvendor: any) {
    if (event.action == 2) {
      this.setElementId(event.value);
      this.openEditVendorModal(event.value, editvendor);
    }
  }
  deleteElement(event,deletevendor: any) {
    if (event.action == 3) {
      this.setElementId(event.value);
      this.openDeleteVendorModal(deletevendor);
    }
  }
  openModal(modal) {
    this.modalService.open(modal, { size: 'xl', windowClass: 'modal-holder', centered: true })
  }

  removeRecord(index, pageNumber) {

    if (pageNumber > 1) {
      index = index + ((pageNumber - 1) * 10);
    }
  }
  
  /**
  * Open modal
  * @param editvendor modal content
  */
  openEditVendorModal(id, editvendor: any) {

    
    const vendors = this.Vendors.find(vendor => vendor.id === id);
   
    
    this.vendorFormGroup.controls.id.setValue(vendors['id']);
    this.vendorFormGroup.controls.vendorName.setValue(vendors['vendorName']);
    this.vendorFormGroup.controls.contact.setValue(vendors['contact']);
    this.vendorFormGroup.controls.email.setValue(vendors['email']);
    this.vendorFormGroup.controls.entity.setValue(vendors['entity']);
    this.vendorFormGroup.controls.address.setValue(vendors['address']);
    this.vendorFormGroup.controls.location.setValue(vendors['location']);
    this.vendorFormGroup.controls.location.setValue(vendors['location']);
    this.vendorFormGroup.controls.country.setValue(vendors['country']);
    this.vendorFormGroup.controls.state.setValue(vendors['state']);
    this.vendorFormGroup.controls.city.setValue(vendors['city']);
    

    this.vendorFormGroup.controls.pincode.setValue(vendors['pincode']);
    this.vendorFormGroup.controls.contactPersonName1.setValue(vendors['contactPersonName1']);
    this.vendorFormGroup.controls.contactPersonContact1.setValue(vendors['contactPersonContact1']);
    this.vendorFormGroup.controls.contactPersonEmail1.setValue(vendors['contactPersonEmail1']);
    this.vendorFormGroup.controls.contactPersonName2.setValue(vendors['contactPersonName2']);
    this.vendorFormGroup.controls.contactPersonContact2.setValue(vendors['contactPersonContact2']);
    this.vendorFormGroup.controls.contactPersonEmail2.setValue(vendors['contactPersonEmail2']);
    this.vendorFormGroup.controls.panNo.setValue(vendors['panNo']);
    this.vendorFormGroup.controls.gstNo.setValue(vendors['gstNo']);
    this.vendorFormGroup.controls.bankName.setValue(vendors['bankName']);
    this.vendorFormGroup.controls.accountNo.setValue(vendors['accountNo']);
    this.vendorFormGroup.controls.ifscNo.setValue(vendors['ifscNo']);
    this.vendorFormGroup.controls.branchName.setValue(vendors['branchName']);
    this.modalService.open(editvendor, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  updateVendor(editvendor){
    if (this.vendorFormGroup.valid) {
      this.vendorService.update(this.vendorFormGroup.value).subscribe(data => {
        if (data.status == 200) {
   
          this.successmsg();
          this.modalService.dismissAll(editvendor);
          this.getVendor();
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
    this.vendorFormGroup.reset();
  }

  /**
  * Open modal
  * @param viewvendor modal content
  */
  openViewVendorModal(id, viewvendor: any) {
    const vendors = this.Vendors.find(vendor => vendor.id === id);
    this.vendorFormGroup.controls.id.setValue(vendors['id']);
    this.vendorFormGroup.controls.vendorName.setValue(vendors['vendorName']);
    this.vendorFormGroup.controls.contact.setValue(vendors['contact']);
    this.vendorFormGroup.controls.email.setValue(vendors['email']);
    this.vendorFormGroup.controls.entity.setValue(vendors['entity']);
    this.vendorFormGroup.controls.address.setValue(vendors['address']);
    this.vendorFormGroup.controls.location.setValue(vendors['location']);
    this.vendorFormGroup.controls.country.setValue(vendors['country']);
    this.vendorFormGroup.controls.state.setValue(vendors['state']);
    this.vendorFormGroup.controls.city.setValue(vendors['city']);
    this.vendorFormGroup.controls.pincode.setValue(vendors['pincode']);
    this.vendorFormGroup.controls.contactPersonName1.setValue(vendors['contactPersonName1']);
    this.vendorFormGroup.controls.contactPersonContact1.setValue(vendors['contactPersonContact1']);
    this.vendorFormGroup.controls.contactPersonEmail1.setValue(vendors['contactPersonEmail1']);
    this.vendorFormGroup.controls.contactPersonName2.setValue(vendors['contactPersonName2']);
    this.vendorFormGroup.controls.contactPersonContact2.setValue(vendors['contactPersonContact2']);
    this.vendorFormGroup.controls.contactPersonEmail2.setValue(vendors['contactPersonEmail2']);
    this.vendorFormGroup.controls.panNo.setValue(vendors['panNo']);
    this.vendorFormGroup.controls.gstNo.setValue(vendors['gstNo']);
    this.vendorFormGroup.controls.bankName.setValue(vendors['bankName']);
    this.vendorFormGroup.controls.accountNo.setValue(vendors['accountNo']);
    this.vendorFormGroup.controls.ifscNo.setValue(vendors['ifscNo']);
    this.vendorFormGroup.controls.branchName.setValue(vendors['branchName']);
    this.modalService.open(viewvendor, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  /**
  * Open modal
  * @param deletevendor modal content
  */
   openDeleteVendorModal(deletevendor: any) {
    this.modalService.open(deletevendor, { size: 'sm',windowClass:'modal-holder', centered: true });
  }
  
  deleteVendor(deletevendor){
    this.vendorService.delete(this.vendorId).subscribe(data => {
      if (data.status == 200) {
    
        this.successmsg();
        this.modalService.dismissAll(deletevendor);
        this.getVendor();
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

  /**  Set States **/
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
  setCities(state_name){
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

  //For Vendor Add on fly
  vendordata(): FormArray {
    return this.vendorFormGroup.get('addOnVendor') as FormArray;
  }

  vendor(): FormGroup {
    return this.formBuilder.group({
      contactPersonName: '',
      contactPersonContact: '',
      contactPersonEmail: ''
    });
  }

  addVendor() {
    this.vendordata().push(this.vendor());
  }

  vendorDelete(i: number) {
    this.vendordata().removeAt(i);
  }
  convertFile(event: any,errorModal)
  {

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
        console.log(arrayList,"arrayList");

        this.vendorService.createBulk(arrayList).subscribe(data => {
          if (data.status == 200) {
            console.log("result=>",data);
            this.successmsg();
            // this.modalService.dismissAll(createoem);
            this.getVendor();
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
  
          let vendorName = arrayList[i]['Vendor Name'];
          if (vendorName == undefined || vendorName == null || vendorName == 'null') {
            let record = {
                reason: "Invalid Vendor Name Or Not Entered!!",
                vendorName: arrayList[i]['Vendor Name'],
                address :  arrayList[i]['Address'],
                country : arrayList[i]['Country'],
                state : arrayList[i]['State'],
                city : arrayList[i]['City'],
                pincode : arrayList[i]['Pincode'],
                contactPersonName1 : arrayList[i]['Contact Person Name'], 
                contactPersonContact1 : arrayList[i]['Contact Person Contact'], 
                contactPersonEmail1 : arrayList[i]['Contact Person Email'],
                contactPersonName2 : arrayList[i]['Contact Person Name_1'],
                contactPersonContact2 : arrayList[i]['Contact Person Contact_1'],
                contactPersonEmail2 : arrayList[i]['Contact Person Email-_1'],
                panNo : arrayList[i]['PAN No'],
                gstNo : arrayList[i]['GST No'],
                bankName : arrayList[i]['Bank Name'],
                accountNo : arrayList[i]['Account No'], 
                ifscNo : arrayList[i]['IFSC No'],
                branchName : arrayList[i]['Branch Name'],

          }
        
          this.dataWithErrors.push(record);
          console.log(this.dataWithErrors,"this.dataWithErrors");
          
          insertionEnabled = false;
        }

        let country = arrayList[i]['Country'];
        if (country == undefined || country == null || country == 'null') {
          let record = {
              reason: "Invalid country Or Not Entered!!",
              vendorName: arrayList[i]['Vendor Name'],
              address :  arrayList[i]['Address'],
              country : arrayList[i]['Country'],
              state : arrayList[i]['State'],
              city : arrayList[i]['City'],
              pincode : arrayList[i]['Pincode'],
              contactPersonName1 : arrayList[i]['Contact Person Name'], 
              contactPersonContact1 : arrayList[i]['Contact Person Contact'], 
              contactPersonEmail1 : arrayList[i]['Contact Person Email'],
              contactPersonName2 : arrayList[i]['Contact Person Name_1'],
              contactPersonContact2 : arrayList[i]['Contact Person Contact_1'],
              contactPersonEmail2 : arrayList[i]['Contact Person Email-_1'],
              panNo : arrayList[i]['PAN No'],
              gstNo : arrayList[i]['GST No'],
              bankName : arrayList[i]['Bank Name'],
              accountNo : arrayList[i]['Account No'], 
              ifscNo : arrayList[i]['IFSC No'],
              branchName : arrayList[i]['Branch Name'],
          }
          this.dataWithErrors.push(record);
          console.log(this.dataWithErrors,"this.dataWithErrors");
          
          insertionEnabled = false;
        }
        let state = arrayList[i]['State'];
        if (state == undefined || state == null || state == 'null') {
          let record = {
              reason: "Invalid State Or Not Entered!!",
              vendorName: arrayList[i]['Vendor Name'],
              address :  arrayList[i]['Address'],
              country : arrayList[i]['Country'],
              state : arrayList[i]['State'],
              city : arrayList[i]['City'],
              pincode : arrayList[i]['Pincode'],
              contactPersonName1 : arrayList[i]['Contact Person Name'], 
              contactPersonContact1 : arrayList[i]['Contact Person Contact'], 
              contactPersonEmail1 : arrayList[i]['Contact Person Email'],
              contactPersonName2 : arrayList[i]['Contact Person Name_1'],
              contactPersonContact2 : arrayList[i]['Contact Person Contact_1'],
              contactPersonEmail2 : arrayList[i]['Contact Person Email-_1'],
              panNo : arrayList[i]['PAN No'],
              gstNo : arrayList[i]['GST No'],
              bankName : arrayList[i]['Bank Name'],
              accountNo : arrayList[i]['Account No'], 
              ifscNo : arrayList[i]['IFSC No'],
              branchName : arrayList[i]['Branch Name'],

        }
      
        this.dataWithErrors.push(record);
        console.log(this.dataWithErrors,"this.dataWithErrors");
        
        insertionEnabled = false;
      }
  
        if (insertionEnabled) {
          let record = {
              vendorName: arrayList[i]['Vendor Name'],
              address :  arrayList[i]['Address'],
              country : arrayList[i]['Country'],
              state : arrayList[i]['State'],
              city : arrayList[i]['City'],
              pincode : arrayList[i]['Pincode'],
              contactPersonName1 : arrayList[i]['Contact Person Name'], 
              contactPersonContact1 : arrayList[i]['Contact Person Contact'], 
              contactPersonEmail1 : arrayList[i]['Contact Person Email'],
              contactPersonName2 : arrayList[i]['Contact Person Name_1'],
              contactPersonContact2 : arrayList[i]['Contact Person Contact_1'],
              contactPersonEmail2 : arrayList[i]['Contact Person Email-_1'],
              panNo : arrayList[i]['PAN No'],
              gstNo : arrayList[i]['GST No'],
              bankName : arrayList[i]['Bank Name'],
              accountNo : arrayList[i]['Account No'], 
              ifscNo : arrayList[i]['IFSC No'],
              branchName : arrayList[i]['Branch Name'],
          }
          this.tableData.push(record);
          console.log(this.tableData,"this.tableData");
          
        }
        this.recs = false;
  
     
        this.validCount = this.tableData.length;
        this.invalidCount = this.dataWithErrors.length;
       this.totalCount = this.validCount + this.invalidCount;
      }
      if (this.dataWithErrors.length > 0) {
        this.openModal(errorModal);
      }
    }
  }

}
