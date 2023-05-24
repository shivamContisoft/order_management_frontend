import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from './product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productArray: Array<any> = []
  Columns: Array<any> = [
    { name: 'id', value: 'ID', sortable: false, isEnabled: false },
    { name: 'productType', value: 'Product Type', sortable: true, isEnabled: true },
    { name: 'description', value: 'Description', sortable: true, isEnabled: true },
   
    
  ];
  Actions: Array<any> = [
    { name: '1', value: 'View', icon: 'eye', multiple: false},
    { name: '2', value: 'edit', icon: 'edit', multiple: false},
    {name: '3', value: 'delete', icon: 'delete', multiple: false},
  ];
  LightBlue: any = "#3f51b5";

  productFormGroup: FormGroup;

  Products: any = [];
  productCount = 0;
  productId = 0;

  error = '';

  constructor(private moduleService: ModuleService, private modalService: NgbModal, 
    private formBuilder: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProduct();

    this.productFormGroup = this.formBuilder.group({
      productName: ['', [Validators.required]],
      description: [''],
      id: ['']
    })
  }

  get getProductFormControls() {
    return this.productFormGroup.controls;
  }

  getProduct(){
    this.productService.get().subscribe(result => {
      if (result['status'] == 200) {
    
        this.Products = result['data']['rows']
        this.productCount = result['data']['count']

        this.productArray  =this.Products.map((Products: any) => {return {id: Products?.id, productType: Products?.productName, description: Products?.description, 
          
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
  * @param createproduct modal content
  */
  openAddProductModal(createproduct: any) {
    this.modalService.open(createproduct, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  onSubmit(createproduct){
    if (this.productFormGroup.valid) {
      this.productService.create(this.productFormGroup.value).subscribe(data => {
        if (data.status == 200) {
       
          this.successmsg();
          this.modalService.dismissAll(createproduct);
          this.getProduct();
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
    this.productId = id;
  }

  /**
  * Open modal
  * @param editproduct modal content
  */
  openEditProductModal(id, editproduct: any) {
    const products = this.Products.find(product => product.id === id);
    this.productFormGroup.controls.id.setValue(products['id']);
    this.productFormGroup.controls.productName.setValue(products['productName']);
    this.productFormGroup.controls.description.setValue(products['description']);
    this.modalService.open(editproduct, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  updateProduct(editproduct){
    if (this.productFormGroup.valid) {
      this.productService.update(this.productFormGroup.value).subscribe( data => {
        if (data.status == 200) {
          this.successmsg();
          this.modalService.dismissAll(editproduct);
          this.getProduct();
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
    this.productFormGroup.reset();
  }
  viewElement(event, viewproduct: any) {
    if (event.action == 1) {
      this.setElementId(event.value);
      this.openViewProductModal(event.value, viewproduct);
    }
  }
  editElement(event, editproduct: any) {
    if (event.action == 2) {
      this.setElementId(event.value);
      this.openEditProductModal(event.value, editproduct);
    }
  }
  deleteElement(event,deleteproduct: any) {
    if (event.action == 3) {
      this.setElementId(event.value);
      this.openDeleteProductModal(deleteproduct);
    }
  }
  /**
  * Open modal
  * @param viewproduct modal content
  */
  openViewProductModal(id, viewproduct: any) {
    const products = this.Products.find(product => product.id === id);
    this.productFormGroup.controls.id.setValue(products['id']);
    this.productFormGroup.controls.productName.setValue(products['productName']);
    this.productFormGroup.controls.description.setValue(products['description']);
    this.modalService.open(viewproduct, { size: 'lg', windowClass: 'modal-holder', centered: true })
      .result.then((result) => {
        return "Not Use";
      }, (reason) => {
        this.resetForm();
      });
  }

  /**
  * Open modal
  * @param deleteproduct modal content
  */
  openDeleteProductModal(deleteproduct: any) {
    this.modalService.open(deleteproduct, { size: 'sm',windowClass:'modal-holder', centered: true });
  }

  deleteProduct(deleteproduct){
    this.productService.delete(this.productId).subscribe(data => {
      if (data.status == 200) {
        this.successmsg();
        this.modalService.dismissAll(deleteproduct);
        this.getProduct();
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
