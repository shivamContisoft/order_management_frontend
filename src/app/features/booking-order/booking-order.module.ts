import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingOrderRoutingModule } from './booking-order-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BookingOrderComponent } from './booking-order.component';
import { Ng2SearchPipe,Ng2SearchPipeModule } from 'ng2-search-filter';

import { Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BookingOrderRoutingModule,
    FormsModule,
    Ng2SearchPipe,
    Ng2SearchPipeModule,
    Pipe,
    SharedModule
  ]
})
export class BookingOrderModule { }
