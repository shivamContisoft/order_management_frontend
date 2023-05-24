import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntityService } from './entity.service';
import Swal from 'sweetalert2';
import { BookingOrderService } from '../../booking-order/booking-order.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {


  EntityFormGroup:FormGroup;
  error = '';
  Entitys: any = [];
  entityId = 0;

  EntityArray: Array<any> = []
  Columns: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'entityName', value: 'Name Of Entity', sortable: true, isEnabled: true },

  ];
  Actions: Array<any> = [
    {name: '1', value: 'delete', icon: 'delete', multiple: false},
  ];

  LightBlue: any = "#3f51b5";

  constructor(private modalService: NgbModal,private formBuilder: FormBuilder, private entityService : EntityService, private bookingOrderService: BookingOrderService ) { }

  ngOnInit(): void {

    this.getEntity();

    
    this.EntityFormGroup = this.formBuilder.group({
      entityName: ['', [Validators.required]]
    })
  }

  get getEntityFormControls() {
    return this.EntityFormGroup.controls;
  }

  resetForm(){
    this.EntityFormGroup.reset();
  }

  successmsg() {
    Swal.fire('Saved successfully!', 'You clicked the button!', 'success');
  }

  openAddEntityModal(createEntity: any) {
    this.modalService.open(createEntity, { size: 'md', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  onSubmit(createEntity){
    this.entityService.create(this.EntityFormGroup.value).subscribe(result=>{
      if (result.status == 200){
     
        this.successmsg();
        this.modalService.dismissAll(createEntity);
        this.getEntity();
        this.resetForm();
      } else if (result.status == 201) {
        this.error = 'No credentials provided for authentication.';
      } else if (result.status == 202) {
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
        this.EntityArray = result['data']['rows']

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



  // ---------------------- delete Entity ----------------------------

  setElementId(id){
    this.entityId = id;
  }

  deleteElement(event,deleteEntity: any) {
    if (event.action == 1) {
      this.setElementId(event.value);
      this.openDeleteEntityModal(deleteEntity);
    }
  }

  openDeleteEntityModal(deleteEntity: any) {
    this.modalService.open(deleteEntity, { size: 'sm',windowClass:'modal-holder', centered: true });
  }

  DeleteEntity(deleteEntity){
    this.entityService.delete(this.entityId).subscribe(data => {
      if (data.status == 200) {
        this.successmsg();
        this.modalService.dismissAll(deleteEntity);
        // this.getOem();
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




