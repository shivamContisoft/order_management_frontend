import { Component, OnInit  } from '@angular/core';
import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AmService } from './am.service';
import { BdmService } from '../bdm/bdm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-am',
  templateUrl: './am.component.html',
  styleUrls: ['./am.component.scss']
})
export class AmComponent implements OnInit {

AmArray: Array<any> = []
  Columns: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'name', value: 'Name', sortable: true, isEnabled: true },
    { name: 'contact', value: 'Contact', sortable: true, isEnabled: true },
    { name: 'email', value: 'Email', sortable: true, isEnabled: true },
  ];
  Actions: Array<any> = [
    { name: '1', value: 'View', icon: 'eye', multiple: false},
    { name: '2', value: 'Edit', icon: 'edit', multiple: false},
    {name: '3', value: 'Delete', icon: 'delete', multiple: false},
    // {name: '4', value: 'Add Target', icon: 'add', multiple: false},
    
  ];
  LightBlue: any = "#3f51b5";


  amFormGroup: FormGroup;
  amTargetFormGroup: FormGroup;
  Ams: any = [];
  Bdms: any = [];
  amCount = 0;
  amId = 0;
  amIndex = 0;
  Years: any = [];
  amYears: any = [];
  amTarget:any=[];
  target = 0;
  total = 0;
  ans:any;
  amFullName = '';

  error = '';

  constructor(private moduleService: ModuleService, private modalService: NgbModal, 
    private formBuilder: FormBuilder, private amService: AmService, private bdmService: BdmService ) { }

  ngOnInit(): void {

    this.getAm();
    this.getYear();
    
    this.amFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      contact: ['',[Validators.pattern('(0/91)?[7-9][0-9]{9}'),Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required,Validators.email]],
      designation: [''],
      location: [''],
      userTableId:[''],
      year: [''], 
      appraisalYear:[''],
      bdm: [''],
      employeeId: ['',[Validators.required]],
      totalAchieved: [''], 
      minEligiblity: [''], 
      percentageAchieved: [''],
      targetAllote: [''],
      targetAchieve: [''],
      id: [''],
      ctc:[''],
      variables:[''],
      variablePercentage:[''],
      minAchievement:[''],
    })
    this.amTargetFormGroup = this.formBuilder.group({
    
      year: [''], 
      appraisalYear:[''],
      totalAchieved: [''], 
      minEligiblity: [''], 
      percentageAchieved: [''],
      targetAllote: [''],
      targetAchieve: [''],
      id: [''],
      ctc:[''],
      variables:[''],
      variablePercentage:[''],
      minAchievement:[''],
    })
  }
  setminValue(value: any) {
    this.ans= value *40/100;
    this.target=value;

     this.amFormGroup.get('minEligiblity').setValue( this.ans)
   }
 
   setPerValue(value: any) {
         var ans= this.target/value;
        this.amFormGroup.get('percentageAchieved').setValue(ans)
   }
   setVariablePercentage()
   {
       let ctc = this.amFormGroup.value['ctc'];
    let variable = this.amFormGroup.value['variables'];
    const ans=ctc*variable/100;
    this.amFormGroup.get('variablePercentage').setValue(ans);

     }
setMinAchievemente()
{
  let totalAchieved = this.amFormGroup.value['totalAchieved'];
  let minEligiblity = this.amFormGroup.value['minEligiblity'];
  const ans=totalAchieved*minEligiblity/100;
  this.amFormGroup.get('minAchievement').setValue(ans);
}
setVariablePercentages()
   {
       let ctc = this.amTargetFormGroup.value['ctc'];
    let variable = this.amTargetFormGroup.value['variables'];
    const ans=ctc*variable/100;
    this.amTargetFormGroup.get('variablePercentage').setValue(ans);

     }
setMinAchievementes()
{
  let totalAchieved = this.amTargetFormGroup.value['totalAchieved'];
  let minEligiblity = this.amTargetFormGroup.value['minEligiblity'];
  const ans=totalAchieved*minEligiblity/100;
  this.amTargetFormGroup.get('minAchievement').setValue(ans);
}
  get getAmFormControls() {
    return this.amFormGroup.controls;
  }

  getAm() {
    this.amService.get().subscribe(result => {
      if (result['status'] == 200) {
      
        this.Ams = result['data']
        this.amCount = result['data']['count']
        this.AmArray  =this.Ams.map((Ams: any) => {return {id: Ams?.id, 
          name: Ams?.firstName+ ' '+ Ams?.lastName,
          
          
          contact: Ams?.contact, 
          email: Ams?.email, designation: Ams?.designation, 
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

  getBdm() {
    this.bdmService.get().subscribe(result => {
      if (result['status'] == 200) {
      
        this.Bdms = result['data']['rows']

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

  getYear() {
    let range = [];
    var max = new Date().getFullYear(),
    min = max - 0,
    max = max + 1;

    for(var i=min; i<=max; i++){
      let x = i;
      let y = i+1;
      let z = x + '-' + y;
      range.push({"id":z});
    }

    this.Years = range;
  }

  getAmYearData(year) {
    this.amService.getAmYearData(year, this.amId).subscribe(result => {
      if (result['status'] == 200) {
   
        if(result['message'] == 'AM Year data Not Found') {
          this.error = 'AM Year data Not Found';
          this.errormsg();
        }else {
          this.amYears = result['data']['rows']
          this.amFormGroup.controls.year.setValue(this.amYears[0]['year']);
          this.amFormGroup.controls.totalAchieved.setValue(this.amYears[0]['totalAchieved']);
          this.amFormGroup.controls.minEligiblity.setValue(this.amYears[0]['minEligiblity']);
          this.amFormGroup.controls.targetAllote.setValue(this.amYears[0]['targetAllote']);
          this.amFormGroup.controls.targetAchieve.setValue(this.amYears[0]['targetAchieve']);
          this.amFormGroup.controls.percentageAchieved.setValue(this.amYears[0]['percentageAchieved']);
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

  /**
 * Open modal
 * @param createam modal content
 */
  openAddAmModal(createam) {
    this.modalService.open(createam, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  onSubmit(createam) {
   
    if (this.amFormGroup.valid) {
      this.amService.create(this.amFormGroup.value).subscribe(data => {
        if (data.status == 200) {
          
          this.successmsg();
          this.modalService.dismissAll(createam);
          this.getAm();
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
   
    this.amTargetFormGroup.controls.id.setValue(this.amId);
    if (this.amTargetFormGroup.valid) {
      this.amService.addTarget(this.amTargetFormGroup.value).subscribe(data => {
        if (data.status == 200) {
         
          this.successmsg();
          this.modalService.dismissAll(addTarget);
          this.getAm();
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
    this.amId = id;
  }
  viewElement(event, viewAm: any) {
    if (event.action == 1) {
      this.setElementId(event.value);
      this.openViewAmModal(event.value, viewAm);
      
    }
  }
  editElement(event, editAm: any) {
    if (event.action == 2) {
      this.setElementId(event.value);
      this.openEditAmModal(event.value, editAm);
    }
  }
  deleteElement(event,deleteam: any) {
    if (event.action == 3) {
      this.setElementId(event.value);
      this.openDeleteAmModal(deleteam);
    }
  }
  addTargetElement(event, addTarget: any) {
    if (event.action == 4) {
      this.setElementId(event.value);
      this.openAddTargetModal(event.value, addTarget);
    }
  }

  /**
  * Open modal
  * @param editam modal content
  */
  openEditAmModal(id, editam: any) {
    const ams = this.Ams.find(am => am.id === id);
    console.log(this.Ams,"this.Ams")
   
    
    this.amFormGroup.controls.id.setValue(ams['id']);
    this.amFormGroup.controls.firstName.setValue(ams['firstName']);
    this.amFormGroup.controls.lastName.setValue(ams['lastName']);
    this.amFormGroup.controls.contact.setValue(ams['contact']);
    this.amFormGroup.controls.email.setValue(ams['email']);
    this.amFormGroup.controls.designation.setValue(ams['designation']);
    this.amFormGroup.controls.location.setValue(ams['location']);
    this.amFormGroup.controls.employeeId.setValue(ams['employeeId']);
    this.amFormGroup.controls.userTableId.setValue(ams['userTableId']);
    // this.amFormGroup.controls.userTableId.setValue(ams['userTableId']);
    this.amFormGroup.controls.year.setValue(ams['tbl_masters_am_year_targets'][0]['year']);
    this.amFormGroup.controls.appraisalYear.setValue(ams['tbl_masters_am_year_targets'][0]['appraisalYear']);
    this.amFormGroup.controls.totalAchieved.setValue(ams['tbl_masters_am_year_targets'][0]['totalAchieved']);
    this.amFormGroup.controls.minEligiblity.setValue(ams['tbl_masters_am_year_targets'][0]['minEligiblity']);
    this.amFormGroup.controls.targetAllote.setValue(ams['tbl_masters_am_year_targets'][0]['targetAllote']);
    this.amFormGroup.controls.targetAchieve.setValue(ams['tbl_masters_am_year_targets'][0]['targetAchieve']);
    this.amFormGroup.controls.percentageAchieved.setValue(ams['tbl_masters_am_year_targets'][0]['percentageAchieved']);
    this.amFormGroup.controls.ctc.setValue(ams['tbl_masters_am_year_targets'][0]['ctc']);
    this.amFormGroup.controls.variables.setValue(ams['tbl_masters_am_year_targets'][0]['variables']);
    this.amFormGroup.controls.variablePercentage.setValue(ams['tbl_masters_am_year_targets'][0]['variablePercentage']);
    this.amFormGroup.controls.minAchievement.setValue(ams['tbl_masters_am_year_targets'][0]['minAchievement']);
    
    
    this.modalService.open(editam, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  updateAm(editam) {
    if (this.amFormGroup.valid) {
     
      
      this.amService.update(this.amFormGroup.value).subscribe(data => {
        if (data.status == 200) {
       
          this.successmsg();
          this.modalService.dismissAll(editam);
          this.getAm();
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
      'User Already EXIT!! :)',
      'error'
    );
  }

  resetForm() {
    this.amFormGroup.reset();
    //this.AmArray[''].reset();
  }

  /**
  * Open modal
  * @param viewam modal content
  */
  openViewAmModal(id, viewam: any) {
    const ams = this.Ams.find(am => am.id === id);
    this.amFormGroup.controls.id.setValue(ams['id']);
    this.amFullName = ams['firstName'] + ' ' + ams['lastName'];
    this.amFormGroup.controls.firstName.setValue(ams['firstName']);
    this.amFormGroup.controls.lastName.setValue(ams['lastName']);
    this.amFormGroup.controls.contact.setValue(ams['contact']);
    this.amFormGroup.controls.email.setValue(ams['email']);
    this.amFormGroup.controls.designation.setValue(ams['designation']);
    this.amFormGroup.controls.location.setValue(ams['location']);
    this.amFormGroup.controls.userTableId.setValue(ams['userTableId']);
    this.amFormGroup.controls.employeeId.setValue(ams['employeeId']);
    this.amTarget=ams['tbl_masters_am_year_targets'];
       
    this.targetArray = this.amTarget.map((amsTarget: any) => {
      return {
        id: amsTarget?.id, 
        year: amsTarget?.year, 
        appraisalYear: amsTarget?.appraisalYear,
        ctc: amsTarget?.ctc,
        variables: amsTarget?.variables,
        variablePercentage: amsTarget?.variablePercentage,
        totalAchieved: amsTarget?.totalAchieved,
        minEligiblity: amsTarget?.minEligiblity,
        minAchievement: amsTarget?.minAchievement,
      }
    });


    this.amFormGroup.controls.year.setValue(ams['tbl_masters_am_year_targets'][0]['year']);
    this.amFormGroup.controls.totalAchieved.setValue(ams['tbl_masters_am_year_targets'][0]['totalAchieved']);
    this.amFormGroup.controls.minEligiblity.setValue(ams['tbl_masters_am_year_targets'][0]['minEligiblity']);
    this.amFormGroup.controls.targetAllote.setValue(ams['tbl_masters_am_year_targets'][0]['targetAllote']);
    this.amFormGroup.controls.targetAchieve.setValue(ams['tbl_masters_am_year_targets'][0]['targetAchieve']);
    this.amFormGroup.controls.percentageAchieved.setValue(ams['tbl_masters_am_year_targets'][0]['percentageAchieved']);
    this.amFormGroup.controls.ctc.setValue(ams['tbl_masters_am_year_targets'][0]['ctc']);
    this.amFormGroup.controls.variables.setValue(ams['tbl_masters_am_year_targets'][0]['variables']);
    this.amFormGroup.controls.variablePercentage.setValue(ams['tbl_masters_am_year_targets'][0]['variablePercentage']);
    this.amFormGroup.controls.minAchievement.setValue(ams['tbl_masters_am_year_targets'][0]['minAchievement']);
    this.modalService.open(viewam, { size: 'xl', windowClass: 'modal-holder', centered: true })
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
  openAddTargetModal(id, addTarget: any) {

   
    this.modalService.open(addTarget, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }
  /**
  * Open modal
  * @param deleteam modal content
  */
  openDeleteAmModal(deleteam: any) {
    this.modalService.open(deleteam, { size: 'sm',windowClass:'modal-holder', centered: true });
  }
  
  deleteAm(deleteam) {
    this.amService.delete(this.amId).subscribe(data => {
      if (data.status == 200) {
      
        this.successmsg();
        this.modalService.dismissAll(deleteam);
        this.getAm();
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
