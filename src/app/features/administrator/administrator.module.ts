import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AmComponent } from './am/am.component';
import { BdmComponent } from './bdm/bdm.component';
import { ProductComponent } from './product/product.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormModule } from 'src/app/pages/form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { VendorComponent } from './vendor/vendor.component';
import { OemComponent } from './oem/oem.component';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { CustomerComponent } from './customer/customer.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AprrovalComponent } from './aprroval/aprroval.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntityComponent } from './entity/entity.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin,
  timeGridPlugin,
  listPlugin
]);

@NgModule({
  declarations: [
    AmComponent,
    BdmComponent,
    ProductComponent,
    EmployeeComponent,
    UsersComponent,
    VendorComponent,
    OemComponent,
    BusinessCategoryComponent,
    CustomerComponent,
    AprrovalComponent,
    EntityComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    FormModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    NgbDropdownModule,
    NgbModalModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    SimplebarAngularModule,
    SharedModule
  ]
})
export class AdministratorModule { }
