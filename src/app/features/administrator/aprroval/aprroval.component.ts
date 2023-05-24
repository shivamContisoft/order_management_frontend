import { Component, OnInit  } from '@angular/core';
import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ApprovalService } from './approval.service';
import { ProductService } from '../product/product.service';
import Swal from 'sweetalert2';
import { createLogicalAnd } from 'typescript';

@Component({
  selector: 'app-aprroval',
  templateUrl: './aprroval.component.html',
  styleUrls: ['./aprroval.component.scss']
})
export class AprrovalComponent implements OnInit {

  approvalArray: Array<any> = []
  Columns: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'productName', value: 'product Type', sortable: true, isEnabled: true },
    
    
  ];
  Actions: Array<any> = [
    { name: '1', value: 'View', icon: 'eye', multiple: false},
    // { name: '2', value: 'edit', icon: 'edit', multiple: false},
    {name: '3', value: 'delete', icon: 'delete', multiple: false},
  ];
  LightBlue: any = "#3f51b5";


  approvalFormGroup: FormGroup;

  Approvals: any = [];
  Products: any = [];
  Users: any = [];
  userData: any = [];
  approvalData: any = [];
  approvalCount = 0;
  productId = 0;
  approvalIndex = 0;

  productName = '';

  tableData: Array<any> = Array<any>();
  tableDataFMS: Array<any> = Array<any>();
  stageOrder = 1;
  stageOrderFMS = 1;
  ApprovalProductType=0;
  state = false;

  error = '';

  constructor(private moduleService: ModuleService, private modalService: NgbModal, private productService: ProductService,
    private formBuilder: FormBuilder, private approvalService: ApprovalService) { }

  ngOnInit(): void {

    this.getProduct();
    this.getApproval();
    this.approvalFormGroup = this.formBuilder.group({
      productType: ['', [Validators.required]],
      department: [''],
      userId: [''],
      departmentFMS: [''],
      userIdFMS: [''],
      addFlowList: [],
      // addFlowListFMS: [],
      id: ['']
    })
  }

  get getApprovalFormControls() {
    return this.approvalFormGroup.controls;
  }

  getApproval(){
    console.log("77777777")
    this.approvalService.get().subscribe(result => {
      console.log(result,"result")
      if (result['status'] == 200) {
        this.Approvals = result['data']
        console.log(this.Approvals,"approvals");
        
        this.approvalArray  =this.Approvals.map((Approvals: any) => {return {id: Approvals?.id, productName: Approvals?.productName
         
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

  getProduct(){
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

  getUsers(departmentId){
    this.approvalService.getUserByDepartment(departmentId).subscribe(result => {
      if (result['status'] == 200) {
        // if(result['message'] == 'User according to department id data Not Found') {
        //   this.error = 'User according to department id data Not Found';
        //   this.errormsg();
        // }else {
          this.Users = result['data'] 
        // }
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
    this.Users = [];
    this.userData.push(this.Users)
  }

  /**
 * Open modal
 * @param createapproval modal content
 */
  openAddApprovalModal(createapproval: any) {
    this.modalService.open(createapproval, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetModal();
      });
  }

  resetModal(){
    this.tableData = [];
    this.stageOrder = 1;
    this.stageOrderFMS = 1;
    this.resetForm();
  }

  onSubmit(createapproval) {
    this.approvalFormGroup.controls['addFlowList'].setValue(this.tableData);
    console.log(this.approvalFormGroup.value)

      this.approvalService.create(this.approvalFormGroup.value).subscribe(data => {
        if (data.status == 200) {
          console.log("result=>",data);
          this.successmsg();
          this.state = false;
          this.getApproval();
          this.tableData = [];
          this.stageOrder = 1;
          this.stageOrderFMS = 1;
          this.modalService.dismissAll(createapproval);
          this.resetForm();
        } else if (data.status == 201) {
          this.error = 'No credentials provided for authentication.';
          this.tableData = [];
          this.stageOrder = 1;
          this.stageOrderFMS = 1;
        } else if (data.status == 202) {
          this.errormsg();
          this.tableData = [];
          this.stageOrder = 1;
          this.stageOrderFMS = 1;
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
    this.productId = id;
    const Approvals = this.Approvals.find(approvalorder => approvalorder.id === id);
    this.ApprovalProductType = Approvals.productType;
  }
viewElement(event, viewapproval: any) {
  console.log(event,"11111111");
  
    if (event.action == 1) {
      this.setElementId(event.value);   
      this.openViewApprovalModal(event.value, viewapproval);
    }
  }
  editElement(event, editapproval: any) {
    if (event.action == 2) {
      this.setElementId(event.value);
      this.openEditApprovalModal(event.value, editapproval);
    }
  }
  deleteElement(event,deleteapproval: any) {
    if (event.action == 3) {
      this.setElementId(event.value);
      this.openDeleteApprovalModal(deleteapproval);
    }
  }
  //For Add on fly for all
  addApprovalFlow(){
    this.state = !this.state;
    let dept = this.approvalFormGroup.value['department'];
    let deptType;
    let userName;
    let productName;

    if(dept == 5){
      deptType = "Finance Approver";
    }else if(dept == 7){
      deptType = "Technical Approver";
    }else if(dept == 8){
      deptType = "Service Delivery Approver";
    }else{
      deptType = "Final Approver";
    }

    this.Users.map(element => {
      userName =  element.firstName + " " + element.lastName;
    });

    let proid = this.approvalFormGroup.value['productType']
    for(let i=0; i<this.Products.length; i++){
      if(proid == this.Products[i]['id'])
      productName = this.Products[i]['productName'];
    }

    let data: any[];
    data = [
      { 
        productId: proid,
        productName: productName,
        departmentId: this.approvalFormGroup.value['department'],
        departmentName: deptType,
        userId: this.approvalFormGroup.value['userId'],
        userName: userName,
        stageOrder: this.stageOrder
      }
    ]
    this.stageOrder++;
    console.log(data);
    this.tableData.push(data[0]);
    this.approvalFormGroup.controls['department'].setValue('');
    this.approvalFormGroup.controls['userId'].setValue('');
  }

  removeFlow(index) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      }).then((result) => {
      if (result.value) {
        if (this.tableData.splice(index, 1)) {
          Swal.fire(
            'Removed!',
            'Record has been removed.',
            'success'
          );
        }
      }
    });
  }

  //For add on fly for FMS
  addApprovalFlowFMS(){
    this.state = !this.state;
    let dept = this.approvalFormGroup.value['departmentFMS'];
    let deptType;
    let userName;
    let productName;

    if(dept == 4){
      deptType = "HR Approver";
    }else if(dept == 5){
      deptType = "Finance Approver";
    }else if(dept == 7){
      deptType = "Technical Approver";
    }else if(dept == 8){
      deptType = "Service Delivery Approver";
    // }else if(dept == 8){
    //   deptType = "Service Delivery Head Approver";
    }else{
      deptType = "Final Approver";
    }

    this.Users.map(element => {
      userName =  element.firstName + " " + element.lastName;
    });

    let proid = this.approvalFormGroup.value['productType']
    for(let i=0; i<this.Products.length; i++){
      if(proid == this.Products[i]['id'])
      productName = this.Products[i]['productName'];
      console.log(productName,"prprprprprprpr");
      
    }

    let data: any[];
    data = [
      {
        productId: proid,
        productName: productName,
        departmentId: this.approvalFormGroup.value['departmentFMS'],
        departmentName: deptType,
        userId: this.approvalFormGroup.value['userIdFMS'],
        userName: userName,
        stageOrder: this.stageOrderFMS
      }
    ]
    this.stageOrderFMS++;
    console.log(data);
    this.tableData.push(data[0]);
    this.approvalFormGroup.controls['departmentFMS'].setValue('');
    this.approvalFormGroup.controls['userIdFMS'].setValue('');
  }

  removeFlowFMS(index) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      }).then((result) => {
      if (result.value) {
        if (this.tableData.splice(index, 1)) {
          this.stageOrderFMS - 1;
          Swal.fire(
            'Removed!',
            'Record has been removed.',
            'success'
          );
        }
      }
    });
  }

  /**
  * Open modal
  * @param editapproval modal content
  */






  openEditApprovalModal(id, editapproval: any) {
    this.approvalService.getByProductId(id).subscribe(result => {
      if (result.status == 200) {
        this.approvalData = result['data']['rows']
        this.productName = result['data']['rows'][0]['productName']
        console.log(this.approvalData)
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
    this.modalService.open(editapproval, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetModal();
      });
  }

  updateApproval(editapproval) {
    // if (this.amFormGroup.valid) {
    //   this.amService.update(this.amFormGroup.value).subscribe(data => {
    //     if (data.status == 200) {
    //       console.log("result=>",data);
    //       this.successmsg();
    //       this.modalService.dismissAll(editam);
    //       this.getAm();
    //       this.resetForm();
    //     } else if (data.status == 201) {
    //       this.error = 'No credentials provided for authentication.';
    //     } else if (data.status == 202) {
    //       this.error = 'You have invalid User Name.';
    //     } else {
    //       this.error = 'Unknown error!';
    //     } 
    //     setTimeout(() => {
    //       this.error = '';
    //     }, 5000);
    //   },
    //   error => {
    //     this.error = error ? error : '';
    //     setTimeout(() => {
    //       this.error = '';
    //     }, 5000);
    //   });
    // }
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
      'Already exist !!',
      'You selected product data is Already exist Please Delete previous approval-flow and then try !! :)',
      'error'
    );
  }

  resetForm() {
    this.approvalFormGroup.reset();
  }

  /**
  * Open modal
  * @param viewapproval modal content
  */
  openViewApprovalModal(id, viewapproval: any) {
    console.log(id,"11111111111111111111111111111111111111111111111111111")
    this.approvalService.getByProductId(this.ApprovalProductType).subscribe(result => {
      console.log(result,"approvalService");
      
      if (result.status == 200) {
        this.approvalData = result['data']['rows']
        this.productName = result['data']['rows'][0]['productName']
        console.log(this.approvalData)
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
    this.modalService.open(viewapproval, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetModal();
      });
  }

  /**
  * Open modal
  * @param deleteapproval modal content
  */
  openDeleteApprovalModal(deleteapproval: any) {
    this.modalService.open(deleteapproval, { size: 'sm', windowClass:'modal-holder', centered: true });
  }
  
  deleteApproval(deleteapproval) {
    this.approvalService.delete(this.ApprovalProductType).subscribe(data => {
      if (data.status == 200) {
        console.log("result=>",data);
        this.successmsg();
        this.modalService.dismissAll(deleteapproval);
        this.getApproval();
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
