import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationalComponent } from './operational.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OperationalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,

    ReactiveFormsModule,
  ]
})
export class OperationalModule { }
