import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BdmComponent } from './bdm.component';

const routes: Routes = [
  {
    path: '',
    component: BdmComponent
  },
]


@NgModule({
  declarations: [
    BdmComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BdmModule { }
