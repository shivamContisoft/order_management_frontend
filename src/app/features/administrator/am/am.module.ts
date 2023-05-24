import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AmComponent } from './am.component';

const routes: Routes = [
  {
    path: '',
    component: AmComponent
  },
]


@NgModule({
  declarations: [
    AmComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AmModule { }
