import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { BdmService } from './bdm.service';
import Swal from 'sweetalert2';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-bdm',
  templateUrl: './bdm.component.html',
  styleUrls: ['./bdm.component.scss']
})
export class BdmComponent implements OnInit {

  bdmArray: Array<any> = []
  Columns: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'name', value: 'Name', sortable: true, isEnabled: true },
    { name: 'contact', value: 'Contact', sortable: true, isEnabled: true },
    { name: 'email', value: 'Email', sortable: true, isEnabled: true },
  ];
  Actions: Array<any> = [
    { name: '1', value: 'View', icon: 'eye', multiple: false },
    { name: '2', value: 'Edit', icon: 'edit', multiple: false },
    { name: '3', value: 'Delete', icon: 'delete', multiple: false },
    // { name: '4', value: 'Add Target', icon: 'add', multiple: false },
  ];
  LightBlue: any = "#3f51b5";



  bdmFormGroup: FormGroup;
  bdmTargetFormGroup: FormGroup;
  Bdms: any = [];
  businessUnit: any = [];
  bdmCount = 0;
  bdmId = 0;
  Years: any = [];
  bdmYears: any = [];
  totlAchieved = 0;
  bdmFullName = '';
  total: any;
  target: any;
  error = '';
  ans: any;
  bdmTarget: any = [];
  totalPoValue = 0;
  poValueArray: any = [];
  constructor(private moduleService: ModuleService, private modalService: NgbModal,
    private formBuilder: FormBuilder, private bdmService: BdmService) { }

  multipleOption: FlatpickrOptions = {
    mode: 'multiple',
  }

  ngOnInit(): void {

    this.getBdm();
    this.getYear();
    this.getBusinessUnit();

    this.bdmFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      contact: ['', [Validators.pattern('(0/91)?[7-9][0-9]{9}'), Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      designation: [''],
      location: [''],
      year: [''],
      userTableId:[''],
      appraisalYear: [''],
      businessUnit: [''],
      // categoryName: [''],
      employeeId: ['', [Validators.required]],
      totalAchieved: [''],
      minEligiblity: [],
      percentageAchieved: [],
      //targetAllote: [''],
      targetAchieve: [''],
      id: [''],
      ctc: [''],
      variables: [''],
      variablePercentage: [''],
      minAchievement: [''],
    })
    this.bdmTargetFormGroup = this.formBuilder.group({
      year: [''],
      appraisalYear: [''],
      totalAchieved: [''],
      minEligiblity: [],
      percentageAchieved: [],
      targetAchieve: [''],
      id: [''],
      ctc: [''],
      variables: [''],
      variablePercentage: [''],
      minAchievement: [''],
    })
  }


  setVariablePercentage() {
    let ctc = this.bdmFormGroup.value['ctc'];
    let variable = this.bdmFormGroup.value['variables'];
    const ans = ctc * variable / 100;
    this.bdmFormGroup.get('variablePercentage').setValue(ans);

  }
  setMinAchievement() {
    let totalAchieved = this.bdmFormGroup.value['totalAchieved'];
    let minEligiblity = this.bdmFormGroup.value['minEligiblity'];
    const ans = totalAchieved * minEligiblity / 100;
    this.bdmFormGroup.get('minAchievement').setValue(ans);
  }
  setVariablePercentages() {
    let ctc = this.bdmTargetFormGroup.value['ctc'];
    let variable = this.bdmTargetFormGroup.value['variables'];
    const ans = ctc * variable / 100;
    this.bdmTargetFormGroup.get('variablePercentage').setValue(ans);

  }
  setMinAchievements() {
    let totalAchieved = this.bdmTargetFormGroup.value['totalAchieved'];
    let minEligiblity = this.bdmTargetFormGroup.value['minEligiblity'];
    const ans = totalAchieved * minEligiblity / 100;
    this.bdmTargetFormGroup.get('minAchievement').setValue(ans);
  }
  setminValue(value: any) {
    this.ans = value * 40 / 100;
    this.target = value;

    this.bdmFormGroup.get('minEligiblity').setValue(this.ans)
  }
  setPerValue(value: any) {

    var ans = this.target / value;
    this.bdmFormGroup.get('percentageAchieved').setValue(ans)
  }
  get getBdmFormControls() {
    return this.bdmFormGroup.controls;
  }

  getBdm() {
    this.bdmService.get().subscribe(result => {
      
      if (result['status'] == 200) {
        this.Bdms = result['data']
        console.log(  this.Bdms,"  this.Bdms")

        this.Bdms[0]['tbl_orders'].forEach(element => {

          this.totalPoValue = +(element)
        });


        this.bdmCount = result['data']['count']

        this.bdmArray = this.Bdms.map((Bdms: any) => {
          return {
            id: Bdms?.id,
            name: Bdms?.firstName + ' ' + Bdms?.lastName,
            contact: Bdms?.contact,
            email: Bdms?.email
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
        console.log(error);

        this.error = error ? error : '';
        setTimeout(() => {
          this.error = '';
        }, 5000);
      });
  }

  getYear() {
    let range = [];
    var max = new Date().getFullYear(),
      min = max - 0,
      max = max + 1;

    for (var i = min; i <= max; i++) {
      let x = i;
      let y = i + 1;
      let z = x + '-' + y;
      range.push({ "id": z });
      console.log(range, "range");

    }

    this.Years = range;
  }

  getBdmYearData(year) {
    this.bdmService.getBdmYearData(year, this.bdmId).subscribe(result => {
      if (result['status'] == 200) {

        if (result['message'] == 'BDM Year data Not Found') {
          this.error = 'BDM Year data Not Found';
          this.errormsg();
        } else {
          this.bdmYears = result['data']['rows']
          this.bdmFormGroup.controls.year.setValue(this.bdmYears[0]['year']);
          this.bdmFormGroup.controls.totalAchieved.setValue(this.bdmYears[0]['totalAchieved']);
          this.bdmFormGroup.controls.minEligiblity.setValue(this.bdmYears[0]['minEligiblity']);
          //this.bdmFormGroup.controls.targetAllote.setValue(this.bdmYears[0]['targetAllote']);
          this.bdmFormGroup.controls.targetAchieve.setValue(this.bdmYears[0]['targetAchieve']);
          this.bdmFormGroup.controls.percentageAchieved.setValue(this.bdmYears[0]['percentageAchieved']);
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

  /**
  * Open modal
  * @param createbdm modal content
  */
  openAddBdmModal(createbdm: any) {
    this.modalService.open(createbdm, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  onSubmit(createbdm) {

    if (this.bdmFormGroup.valid) {
      this.bdmService.create(this.bdmFormGroup.value).subscribe(data => {
        if (data.status == 200) {

          this.successmsg();
          this.modalService.dismissAll(createbdm);
          this.getBdm();
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
  onSubmitTarget(addTarget) {


    this.bdmTargetFormGroup.controls.id.setValue(this.bdmId);

    if (this.bdmTargetFormGroup.valid) {


      this.bdmService.addTarget(this.bdmTargetFormGroup.value).subscribe(data => {
        if (data.status == 200) {

          this.successmsg();
          this.modalService.dismissAll(addTarget);
          this.getBdm();
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
    this.bdmId = id;
  }
  viewElement(event, viewbdm: any) {
    if (event.action == 1) {
      this.setElementId(event.value);
      this.openViewBdmModal(event.value, viewbdm);
    }
  }
  editElement(event, editbdm: any) {
    if (event.action == 2) {
      this.setElementId(event.value);
      this.openEditBdmModal(event.value, editbdm);
    }
  }
  deleteElement(event, deletebdm: any) {
    if (event.action == 3) {
      this.setElementId(event.value);
      this.openDeleteBdmModal(deletebdm);
    }
  }
  addTargetElement(event, addTarget: any) {
    if (event.action == 4) {
      this.setElementId(event.value);
      this.openAddTargetBdmModal(event.value, addTarget);
    }
  }
  /**
  * Open modal
  * @param editbdm modal content
  */
  openEditBdmModal(id, editbdm: any) {
    const bdms = this.Bdms.find(bdm => bdm.id === id);


    this.bdmFormGroup.controls.id.setValue(bdms['id']);
    this.bdmFormGroup.controls.firstName.setValue(bdms['firstName']);
    this.bdmFormGroup.controls.lastName.setValue(bdms['lastName']);
    this.bdmFormGroup.controls.contact.setValue(bdms['contact']);
    this.bdmFormGroup.controls.email.setValue(bdms['email']);
    this.bdmFormGroup.controls.designation.setValue(bdms['designation']);
    this.bdmFormGroup.controls.location.setValue(bdms['location']);
    this.bdmFormGroup.controls.employeeId.setValue(bdms['employeeId']);

    this.bdmFormGroup.controls.userTableId.setValue(bdms['userTableId']);
    this.bdmFormGroup.controls.year.setValue(bdms['tbl_masters_bdm_year_targets'][0]['year']);
    this.bdmFormGroup.controls.totalAchieved.setValue(bdms['tbl_masters_bdm_year_targets'][0]['totalAchieved']);
    this.bdmFormGroup.controls.minEligiblity.setValue(bdms['tbl_masters_bdm_year_targets'][0]['minEligiblity']);
    this.bdmFormGroup.controls.targetAchieve.setValue(bdms['tbl_masters_bdm_year_targets'][0]['targetAchieve']);
    this.bdmFormGroup.controls.percentageAchieved.setValue(bdms['tbl_masters_bdm_year_targets'][0]['percentageAchieved']);
    let buUnit = bdms['tbl_masters_bdm_business_units'].map(function (val) {
      return val.tbl_masters_business_unit?.categoryName;
    })
    this.bdmFormGroup.controls.businessUnit.setValue(buUnit);
    this.bdmFormGroup.controls.ctc.setValue(bdms['tbl_masters_bdm_year_targets'][0]['ctc']);
    this.bdmFormGroup.controls.variables.setValue(bdms['tbl_masters_bdm_year_targets'][0]['variables']);
    this.bdmFormGroup.controls.variablePercentage.setValue(bdms['tbl_masters_bdm_year_targets'][0]['variablePercentage']);
    this.bdmFormGroup.controls.minAchievement.setValue(bdms['tbl_masters_bdm_year_targets'][0]['minAchievement']);


    this.modalService.open(editbdm, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  updateBdm(editbdm) {

    // if (this.bdmFormGroup.valid) {
      console.log("kjsdflfdsa")
      this.bdmService.update(this.bdmFormGroup.value).subscribe(data => {
        console.log(data, "data")
        if (data.status == 200) {

          this.successmsg();
          this.modalService.dismissAll(editbdm);
          this.getBdm();
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

  successmsg() {
    Swal.fire('Saved successfully!', 'You clicked the button!', 'success');
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
      'User is Already Exit! :)',
      'error'
    );
  }

  resetForm() {
    this.bdmFormGroup.reset();
  }

  /**
  * Open modal
  * @param viewbdm modal content
  */
  openViewBdmModal(id, viewbdm: any) {
    const bdms = this.Bdms.find(bdm => bdm.id === id);

    this.bdmFormGroup.controls.id.setValue(bdms['id']);
    this.bdmFullName = bdms['firstName'] + ' ' + bdms['lastName'];
    this.bdmFormGroup.controls.firstName.setValue(bdms['firstName']);
    this.bdmFormGroup.controls.lastName.setValue(bdms['lastName']);
    this.bdmFormGroup.controls.contact.setValue(bdms['contact']);
    this.bdmFormGroup.controls.email.setValue(bdms['email']);
    this.bdmFormGroup.controls.designation.setValue(bdms['designation']);
    this.bdmFormGroup.controls.location.setValue(bdms['location']);
    this.bdmFormGroup.controls.employeeId.setValue(bdms['employeeId']);

    this.bdmTarget = bdms['tbl_masters_bdm_year_targets'];

    this.targetArray = this.bdmTarget.map((Bdmstarget: any) => {
      return {
        id: Bdmstarget?.id,
        year: Bdmstarget?.year,
        appraisalYear: Bdmstarget?.appraisalYear,
        ctc: Bdmstarget?.ctc,
        variables: Bdmstarget?.variables,
        variablePercentage: Bdmstarget?.variablePercentage,
        totalAchieved: Bdmstarget?.totalAchieved,
        minEligiblity: Bdmstarget?.minEligiblity,
        minAchievement: Bdmstarget?.minAchievement,
      }
    });

    this.bdmFormGroup.controls.year.setValue(bdms['tbl_masters_bdm_year_targets'][0]['year']);
    this.bdmFormGroup.controls.totalAchieved.setValue(bdms['tbl_masters_bdm_year_targets'][0]['totalAchieved']);

    this.bdmFormGroup.controls.minEligiblity.setValue(bdms['tbl_masters_bdm_year_targets'][0]['minEligiblity']);
    //this.bdmFormGroup.controls.targetAllote.setValue(bdms['tbl_masters_bdm_year_targets'][0]['targetAllote']);
    this.bdmFormGroup.controls.targetAchieve.setValue(bdms['tbl_masters_bdm_year_targets'][0]['targetAchieve']);
    this.bdmFormGroup.controls.percentageAchieved.setValue(bdms['tbl_masters_bdm_year_targets'][0]['percentageAchieved']);
    // this.businessUnit = bdms['tbl_masters_business_units'].map(function(val) {
    //   return val.categoryName;

    // })

    this.bdmFormGroup.controls.ctc.setValue(bdms['tbl_masters_bdm_year_targets'][0]['ctc']);
    this.bdmFormGroup.controls.variables.setValue(bdms['tbl_masters_bdm_year_targets'][0]['variables']);
    this.bdmFormGroup.controls.variablePercentage.setValue(bdms['tbl_masters_bdm_year_targets'][0]['variablePercentage']);
    this.bdmFormGroup.controls.minAchievement.setValue(bdms['tbl_masters_bdm_year_targets'][0]['minAchievement']);


    this.modalService.open(viewbdm, { size: 'xl', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  targetArray: Array<any> = []
  Columns1: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'year', value: 'Financial Year', sortable: false, isEnabled: true },
    { name: 'appraisalYear', value: 'Appraisal Year', sortable: true, isEnabled: true },
    { name: 'ctc', value: 'CTC', sortable: true, isEnabled: true },
    { name: 'variables', value: 'Variables', sortable: true, isEnabled: true },
    { name: 'variablePercentage', value: 'Variables %', sortable: true, isEnabled: true },
    { name: 'totalAchieved', value: 'Total Achieved', sortable: true, isEnabled: true },
    { name: 'minEligiblity', value: 'Min.Eligiblity', sortable: true, isEnabled: true },
    { name: 'minAchievement', value: 'Min.Achievement', sortable: true, isEnabled: true },
  ];
  // Actions1: Array<any> = [
  //   { name: '1', value: 'View', icon: 'eye', multiple: false },
  //   { name: '2', value: 'edit', icon: 'edit', multiple: false },
  //   { name: '3', value: 'delete', icon: 'delete', multiple: false },
  //   { name: '4', value: 'Add Target', icon: 'add', multiple: false },
  // ];
  LightBlue1: any = "#3f51b5";
  openAddTargetBdmModal(id, addTarget: any) {
    this.modalService.open(addTarget, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }
  /**
  * Open modal
  * @param deletebdm modal content
  */
  openDeleteBdmModal(deletebdm: any) {
    this.modalService.open(deletebdm, { size: 'sm', windowClass: 'modal-holder', centered: true });
  }

  deleteBdm(deletebdm) {
    this.bdmService.delete(this.bdmId).subscribe(data => {
      if (data.status == 200) {

        this.successmsg();
        this.modalService.dismissAll(deletebdm);
        this.getBdm();
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

}