import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OemService } from './oem.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
//import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-oem',
  templateUrl: './oem.component.html',
  styleUrls: ['./oem.component.scss']
})
export class OemComponent implements OnInit {

  OemArray: Array<any> = []
  Columns: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'name', value: 'OEM Name', sortable: true, isEnabled: true },
    { name: 'description', value: 'Description', sortable: true, isEnabled: true },
 
    
  ];
  Actions: Array<any> = [
    { name: '1', value: 'View', icon: 'eye', multiple: false},
    { name: '2', value: 'edit', icon: 'edit', multiple: false},
    {name: '3', value: 'delete', icon: 'delete', multiple: false},
  ];
  LightBlue: any = "#3f51b5";

  oemFormGroup: FormGroup;

  Oems: any = [];
  oemCount = 0;
  oemId = 0;
  formRecord: FormGroup;
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

  constructor(private moduleService: ModuleService, private modalService: NgbModal, 
    private formBuilder: FormBuilder, private oemService: OemService) { }

  ngOnInit(): void {
    this.getOem();

    this.oemFormGroup = this.formBuilder.group({
      oemName: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      description: [''],
      id: ['']
    })
  }

  get getOemFormControls() {
    return this.oemFormGroup.controls;
  }

  getOem() {
    this.oemService.get().subscribe(result => {
      if (result['status'] == 200) {
        
        this.Oems = result['data']['rows']
       
        
        this.oemCount = result['data']['count']
        this.OemArray  =this.Oems.map((Oems: any) => {return {id: Oems?.id, name: Oems?.oemName, description: Oems?.description, 
         
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
  * @param createoem modal content
  */
  openAddOemModal(createoem: any) {
    this.modalService.open(createoem, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  onSubmit(createoem){
    if (this.oemFormGroup.valid) {
      this.oemService.create(this.oemFormGroup.value).subscribe(data => {
        if (data.status == 200) {
        
          this.successmsg();
          this.modalService.dismissAll(createoem);
          this.getOem();
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

  setElementId(id){
    this.oemId = id;
  }
  viewElement(event, viewoem: any) {
    if (event.action == 1) {
      this.setElementId(event.value);
      this.openViewOemModal(event.value, viewoem);
    }
  }
  editElement(event, editoem: any) {
    if (event.action == 2) {
      this.setElementId(event.value);
      this.openEditOemModal(event.value, editoem);
    }
  }
  deleteElement(event,deleteoem: any) {
    if (event.action == 3) {
      this.setElementId(event.value);
      this.openDeleteOemModal(deleteoem);
    }
  }
  /**
  * Open modal
  * @param editoem modal content
  */
  openEditOemModal(id, editoem: any) {
    const oems = this.Oems.find(oem => oem.id === id);
    this.oemFormGroup.controls.id.setValue(oems['id']);
    this.oemFormGroup.controls.oemName.setValue(oems['oemName']);
    this.oemFormGroup.controls.description.setValue(oems['description']);
    this.modalService.open(editoem, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  updateOem(editoem){
    if (this.oemFormGroup.valid) {
      this.oemService.update(this.oemFormGroup.value).subscribe( data => {
        if (data.status == 200) {
          this.successmsg();
          this.modalService.dismissAll(editoem);
          this.getOem();
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
    this.oemFormGroup.reset();
  }

  /**
  * Open modal
  * @param viewoem modal content
  */
  openViewOemModal(id, viewoem: any) {
    const oems = this.Oems.find(oem => oem.id === id);
    this.oemFormGroup.controls.id.setValue(oems['id']);
    this.oemFormGroup.controls.oemName.setValue(oems['oemName']);
    this.oemFormGroup.controls.description.setValue(oems['description']);
    this.modalService.open(viewoem, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  /**
  * Open modal
  * @param deleteoem modal content
  */
  openDeleteOemModal(deleteoem: any) {
    this.modalService.open(deleteoem, { size: 'sm',windowClass:'modal-holder', centered: true });
  }

  deleteOem(deleteoem){
    this.oemService.delete(this.oemId).subscribe(data => {
      if (data.status == 200) {
        this.successmsg();
        this.modalService.dismissAll(deleteoem);
        this.getOem();
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

  // closeModal(modal) {
  //   this.modalService.close(modal, { size: 'lg', windowClass: 'modal-holder', centered: true })
  //   this.formRecord.reset();
  // }

  openModal(modal) {
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-holder', centered: true })
  }

  removeRecord(index, pageNumber) {

    if (pageNumber > 1) {
      index = index + ((pageNumber - 1) * 10);
    }
  }
  // onClose() {
  //   swal({
  //     type: 'success',
  //     title: 'Success!',
  //     text: 'close it!',
  //   });
  // }

  // onReset() {
  //   this.totalCount = 0;
  //   this.validCount = 0;
  //   this.invalidCount = 0;
  //   this.tableData = [];
  //   this.dataWithErrors = [];
  // }

 
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

        this.oemService.createBulk(arrayList).subscribe(data => {
          if (data.status == 200) {
          
            this.successmsg();
            // this.modalService.dismissAll(createoem);
            this.getOem();
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

        let oemName = arrayList[i]['OEM Name'];
        if (oemName == undefined || oemName == null || oemName == 'null') {
          let record = {
            reason: "Invalid OEM name Or Not Entered!!",
            oemName: arrayList[i]['OEM Name'],
            description: arrayList[i]['Description'],
        }
         this.dataWithErrors.push(record);
         insertionEnabled = false;
      }

      if (insertionEnabled) {
        let record = {
          oemName: arrayList[i]['OEM Name'],
          description: arrayList[i]['Description'],
        }
        this.tableData.push(record);   
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
  exportErrorData() {
    //this._exportService.exportErrorReportCSV(this.dataWithErrors, 'ErrorReports');
  }
}
