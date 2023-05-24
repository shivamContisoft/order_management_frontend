import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeeFormGroup: FormGroup;

  Employees: any = [];
  employeeCount = 0;
  employeeId = 0;

  error = '';

  constructor(private moduleService: ModuleService, private modalService: NgbModal, 
    private formBuilder: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployee();
    
    this.employeeFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      contact: [''],
      email: ['', [Validators.required]],
      designation: [''],
      id: ['']
    })
  }

  get getEmpFormControls() {
    return this.employeeFormGroup.controls;
  }

  getEmployee(){
    this.employeeService.get().subscribe(result => {
      if (result['status'] == 200) {
      
        this.Employees = result['data']['rows']
        this.employeeCount = result['data']['count']

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
  * @param createemployee modal content
  */
  openAddEmployeeModal(createemployee: any) {
    this.modalService.open(createemployee, { size: 'lg',windowClass:'modal-holder', centered: true });
  }

  onSubmit(createemployee){

    if (this.employeeFormGroup.valid) {
      this.employeeService.create(this.employeeFormGroup.value).subscribe(data => {
        if (data.status == 200) {
      
          this.successmsg();
          this.modalService.dismissAll(createemployee);
          this.getEmployee();
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
    this.employeeId = id;
  }

  /**
  * Open modal
  * @param editemployee modal content
  */
  openEditEmployeeModal(id, editemployee: any) {
    const employees = this.Employees.find(employee => employee.id === id);
    this.employeeFormGroup.controls.id.setValue(employees['id']);
    this.employeeFormGroup.controls.firstName.setValue(employees['firstName']);
    this.employeeFormGroup.controls.lastName.setValue(employees['lastName']);
    this.employeeFormGroup.controls.contact.setValue(employees['contact']);
    this.employeeFormGroup.controls.email.setValue(employees['email']);
    this.employeeFormGroup.controls.designation.setValue(employees['designation']);
    this.modalService.open(editemployee, { size: 'lg',windowClass:'modal-holder', centered: true });
  }

  updateEmployee(editemployee){
    if (this.employeeFormGroup.valid) {
      this.employeeService.update(this.employeeFormGroup.value).subscribe(data => {
        if (data.status == 200) {
        
          this.successmsg();
          this.modalService.dismissAll(editemployee);
          this.getEmployee();
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
    this.employeeFormGroup.reset();
  }
  
  /**
  * Open modal
  * @param viewemployee modal content
  */
  openViewEmployeeModal(id, viewemployee: any) {
    const employees = this.Employees.find(employee => employee.id === id);
    this.employeeFormGroup.controls.id.setValue(employees['id']);
    this.employeeFormGroup.controls.firstName.setValue(employees['firstName']);
    this.employeeFormGroup.controls.lastName.setValue(employees['lastName']);
    this.employeeFormGroup.controls.contact.setValue(employees['contact']);
    this.employeeFormGroup.controls.email.setValue(employees['email']);
    this.employeeFormGroup.controls.designation.setValue(employees['designation']);
    this.modalService.open(viewemployee, { size: 'lg',windowClass:'modal-holder', centered: true });
  }

  /**
  * Open modal
  * @param deleteemployee modal content
  */
  openDeleteEmployeeModal(deleteemployee: any) {
    this.modalService.open(deleteemployee, { size: 'sm',windowClass:'modal-holder', centered: true });
  }
  
  deleteEmployee(deleteemployee){
    this.employeeService.delete(this.employeeId).subscribe(data => {
      if (data.status == 200) {
      
        this.successmsg();
        this.modalService.dismissAll(deleteemployee);
        this.getEmployee();
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
