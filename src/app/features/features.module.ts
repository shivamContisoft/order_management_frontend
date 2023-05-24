import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeaturesRoutingModule } from './features-routing.module';
import { BookingOrderComponent } from './booking-order/booking-order.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { UIModule } from '../shared/ui/ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderService } from '../core/services/loader.service';
import { ApproveOrderComponent } from './approve-order/approve-order.component';
import { SharedModule } from '../shared/shared.module';
import { DateFilterPipe } from '../shared/easy-grid/easy-grid/pipe/date-filter';
import { OperationalComponent } from './operational/operational.component';
import {OperationalModule} from './operational/operational.module';
import { InvoicesComponent } from './invoices/invoices.component';
import { AllInvoicesComponent } from './all-invoices/all-invoices.component';
import { ExcelComponent } from './excel/excel.component';



FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin,
  timeGridPlugin,
  listPlugin
]);

@NgModule({
  declarations: [BookingOrderComponent, ApproveOrderComponent, InvoicesComponent, AllInvoicesComponent, ExcelComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FeaturesRoutingModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    UIModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    SimplebarAngularModule,
    SharedModule,
    OperationalModule,
  ],
  providers: [
    DateFilterPipe
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class FeaturesModule { }
