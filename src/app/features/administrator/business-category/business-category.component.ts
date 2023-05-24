import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BusinessCategoryService } from './business-category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-category',
  templateUrl: './business-category.component.html',
  styleUrls: ['./business-category.component.scss']
})
export class BusinessCategoryComponent implements OnInit {

  businessCategoryFormGroup: FormGroup;

  businessCategorys: any = [];
  categoryCount = 0;
  categoryId = 0;

  error = '';

  constructor(private moduleService: ModuleService, private modalService: NgbModal, 
    private formBuilder: FormBuilder, private businessCategoryService: BusinessCategoryService) { }

  ngOnInit(): void {
    this.getBusinessCategory();

    this.businessCategoryFormGroup = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      description: [''],
      id: ['']
    })
  }

  get getBusinessCategoryFormControls() {
    return this.businessCategoryFormGroup.controls;
  }

  getBusinessCategory(){
    this.businessCategoryService.get().subscribe(result => {
      if (result['status'] == 200) {
       
        this.businessCategorys = result['data']['rows']
        this.categoryCount = result['data']['count']

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
  * @param createbusinesscategory modal content
  */
  openAddBusinessCategoryModal(createbusinesscategory: any) {
    this.modalService.open(createbusinesscategory, { size: 'lg',windowClass:'modal-holder', centered: true });
  }

  onSubmit(createbusinesscategory){
    if (this.businessCategoryFormGroup.valid) {
      this.businessCategoryService.create(this.businessCategoryFormGroup.value).subscribe(data => {
        if (data.status == 200) {
     
          this.successmsg();
          this.modalService.dismissAll(createbusinesscategory);
          this.getBusinessCategory();
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
    this.categoryId = id;
  }

  /**
  * Open modal
  * @param editbusinesscategory modal content
  */
  openEditBusinessCategoryModal(id, editbusinesscategory: any) {
    const businesscategorys = this.businessCategorys.find(businesscategory => businesscategory.id === id);
    this.businessCategoryFormGroup.controls.id.setValue(businesscategorys['id']);
    this.businessCategoryFormGroup.controls.categoryName.setValue(businesscategorys['categoryName']);
    this.businessCategoryFormGroup.controls.description.setValue(businesscategorys['description']);
    this.modalService.open(editbusinesscategory, { size: 'lg',windowClass:'modal-holder', centered: true });
  }

  updateBusinessCategory(editbusinesscategory){
    if (this.businessCategoryFormGroup.valid) {
      this.businessCategoryService.update(this.businessCategoryFormGroup.value).subscribe( data => {
        if (data.status == 200) {
          this.successmsg();
          this.modalService.dismissAll(editbusinesscategory);
          this.getBusinessCategory();
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
    this.businessCategoryFormGroup.reset();
  }

  /**
  * Open modal
  * @param viewbusinesscategory modal content
  */
  openViewBusinessCategoryModal(id, viewbusinesscategory: any) {
    const businesscategorys = this.businessCategorys.find(businesscategory => businesscategory.id === id);
    this.businessCategoryFormGroup.controls.id.setValue(businesscategorys['id']);
    this.businessCategoryFormGroup.controls.categoryName.setValue(businesscategorys['categoryName']);
    this.businessCategoryFormGroup.controls.description.setValue(businesscategorys['description']);
    this.modalService.open(viewbusinesscategory, { size: 'lg',windowClass:'modal-holder', centered: true });
  }

  /**
  * Open modal
  * @param deletebusinesscategory modal content
  */
  openDeleteBusinessCategoryModal(deletebusinesscategory: any) {
    this.modalService.open(deletebusinesscategory, { size: 'sm',windowClass:'modal-holder', centered: true });
  }

  deleteBusinessCategory(deletebusinesscategory){
    this.businessCategoryService.delete(this.categoryId).subscribe(data => {
      if (data.status == 200) {
        this.successmsg();
        this.modalService.dismissAll(deletebusinesscategory);
        this.getBusinessCategory();
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
