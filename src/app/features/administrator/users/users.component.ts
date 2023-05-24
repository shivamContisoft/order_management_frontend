import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsersService } from './users.service';
import Swal from 'sweetalert2';
//import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersArray: Array<any> = []
  Columns: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'name', value: 'Name', sortable: true, isEnabled: true },
    { name: 'contact', value: 'Contact', sortable: true, isEnabled: true },
    { name: 'email', value: 'Email', sortable: true, isEnabled: true },
    { name: 'designation', value: 'Designation', sortable: true, isEnabled: true },
    
  ];
  Actions: Array<any> = [
    { name: '1', value: 'View', icon: 'eye', multiple: false},
    { name: '2', value: 'Edit', icon: 'edit', multiple: false},
    {name: '3', value: 'Delete', icon: 'delete', multiple: false},
  ];
  LightBlue: any = "#3f51b5";


  userFormGroup: FormGroup;

  Users: any = [];
  userCount = 0;
  userId = 0;

  error = '';

  constructor(private moduleService: ModuleService, private modalService: NgbModal, 
    private formBuilder: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {

    this.getUsers();
    
    this.userFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      contact: ['', [Validators.pattern('(0/91)?[7-9][0-9]{9}'),Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required,Validators.email]],
      designation: [''],
      department: ['', [Validators.required]],
      id: ['']
    })
  }

  get getUserFormControls() {
    return this.userFormGroup.controls;
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
      'User already exist!',
      'error'
    );
  }
  getUsers(){
    this.usersService.getAll().subscribe(result => {
      if (result['status'] == 200) {
      
        this.Users = result['data']['rows']
        this.userCount = result['data']['count']
 
        
        this.usersArray  =this.Users.map((Users: any) => {return {
          id: Users?.id,
           name: Users?.firstName+' '+Users?.lastName, 
           contact: Users?.contact, 
          email: Users?.email, designation: Users?.designation, 
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
  * @param createuser modal content
  */
  openAddUserModal(createuser: any) {
    this.modalService.open(createuser, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm()
      });
  }

  onSubmit(createuser){
    if (this.userFormGroup.valid) {
      this.usersService.create(this.userFormGroup.value).subscribe(data => {
        if (data.status == 200) {
      
          this.successmsg();
          this.modalService.dismissAll(createuser);
          this.getUsers();
          this.userFormGroup.reset();
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
    this.userId = id;
  }

  /**
  * Open modal
  * @param edituser modal content
  */
  openEditUserModal(id, edituser: any) {
    const users = this.Users.find(user => user.id === id);

    
    this.userFormGroup.controls.id.setValue(users['id']);
    this.userFormGroup.controls.firstName.setValue(users['firstName']);
    this.userFormGroup.controls.lastName.setValue(users['lastName']);
    this.userFormGroup.controls.contact.setValue(users['contact']);
    this.userFormGroup.controls.email.setValue(users['email']);
    this.userFormGroup.controls.designation.setValue(users['designation']);
    if(users['department']==4){
      this.userFormGroup.controls.department.setValue(4);
      }else if(users['department']==5){
      this.userFormGroup.controls.department.setValue(5);
    }
    else if(users['department']==6){
      this.userFormGroup.controls.department.setValue(6);
    }
    else if(users['department']==7){
      this.userFormGroup.controls.department.setValue(7);
    }
    else if(users['department']==8){
      this.userFormGroup.controls.department.setValue(8);
    }
    else if(users['department']==9){
      this.userFormGroup.controls.department.setValue(9);
    }
    else if(users['department']==10){
      this.userFormGroup.controls.department.setValue(10);
    }
   
    this.modalService.open(edituser, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm()
      });
  }
  
  updateUser(edituser){
    if (this.userFormGroup.valid) {
      this.usersService.update(this.userFormGroup.value).subscribe(data => {
        if (data.status == 200) {
        
          this.successmsg();
          this.modalService.dismissAll(edituser);
          this.getUsers();
          this.userFormGroup.reset();
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
    this.userFormGroup.reset();
  }

  viewElement(event, viewuser: any) {
    if (event.action == 1) {
      this.setElementId(event.value);
      this.openViewUserModal(event.value, viewuser);
    }
  }
  editElement(event, edituser: any) {
    if (event.action == 2) {
      this.setElementId(event.value);
      this.openEditUserModal(event.value, edituser);
    }
  }
  deleteElement(event,deleteuser) {
    if (event.action == 3) {
  
      this.setElementId(event.value);
      this.openDeleteUserModal(deleteuser);
      
    }
  }
  /**
  * Open modal
  * @param viewuser modal content
  */
  openViewUserModal(id, viewuser: any) {
    const users = this.Users.find(user => user.id === id);
    this.userFormGroup.controls.id.setValue(users['id']);
    this.userFormGroup.controls.firstName.setValue(users['firstName']);
    this.userFormGroup.controls.lastName.setValue(users['lastName']);
    this.userFormGroup.controls.contact.setValue(users['contact']);
    this.userFormGroup.controls.email.setValue(users['email']);
    this.userFormGroup.controls.designation.setValue(users['designation']);
   // this.userFormGroup.controls.department.setValue(users['department']);

    
    this.modalService.open(viewuser, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm()
      });
  }
  
  /**
  * Open modal
  * @param deleteuser modal content
  */

  openDeleteUserModal(deleteuser: any) {
    this.modalService.open(deleteuser, { size: 'sm',windowClass:'modal-holder', centered: true });
  }
    
  deleteUser(deleteuser){
    this.usersService.delete(this.userId).subscribe(data => {
      if (data.status == 200) {

        this.successmsg();
        this.modalService.dismissAll(deleteuser);
        this.getUsers();
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
