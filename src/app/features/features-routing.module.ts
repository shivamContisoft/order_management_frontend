import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesComponent } from './profiles/profiles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingOrderComponent } from './booking-order/booking-order.component';
import { ApproveOrderComponent } from './approve-order/approve-order.component';
import { OperationalComponent } from './operational/operational.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AllInvoicesComponent } from './all-invoices/all-invoices.component';
import { ExcelComponent } from './excel/excel.component';
const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent 
  },
  { 
    path: 'profile', 
    component: ProfilesComponent 
  },
  {
    path: 'administrator',
    loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule)
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent 
  },
  { 
    path: 'book-order', 
    component: BookingOrderComponent
  },
  {
    path:'excel',
    component: ExcelComponent
  },
  { 
    path: 'approval-order', 
    component: ApproveOrderComponent
  },
  { 
    path: 'operational', 
    component: OperationalComponent
   // loadChildren: () => import('./operational/operational.module').then(m => m.OperationalModule)
  },
  { 
    path: 'invoices', 
    component: InvoicesComponent
  },
  { 
    path: 'allInvoices', 
    component: AllInvoicesComponent
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
