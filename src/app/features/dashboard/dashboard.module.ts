import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import ApexCharts from 'apexcharts'

//import { OperationalComponent } from '../operational/operational.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
]

@NgModule({
  declarations: [
    DashboardComponent,
    //OperationalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    // ApexCharts,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],

})


export class DashboardModule { }

