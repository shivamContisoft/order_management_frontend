import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmComponent } from './am/am.component';
import { BdmComponent } from './bdm/bdm.component';
import { ProductComponent } from './product/product.component';
import { EmployeeComponent } from './employee/employee.component';
import { UsersComponent } from './users/users.component';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { OemComponent } from './oem/oem.component'; 
import { VendorComponent } from './vendor/vendor.component';
import { CustomerComponent } from './customer/customer.component';
import { AprrovalComponent } from './aprroval/aprroval.component';
import { EntityComponent } from './entity/entity.component';

const routes: Routes = [
  {
    path: 'user',
    component: UsersComponent
  },
  {
    path: 'bdm',
    component: BdmComponent
  },
  { 
    path: 'am', 
    component: AmComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'businesscategory',
    component: BusinessCategoryComponent
  },
  {
    path: 'oem',
    component: OemComponent
  },
  {
    path: 'vendor',
    component: VendorComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'approval',
    component: AprrovalComponent
  },
  {
    path: 'entity',
    component: EntityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
