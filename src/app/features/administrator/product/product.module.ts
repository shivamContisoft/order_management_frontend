import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
]


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
