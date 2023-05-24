import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';
import { EasyGridModule } from './easy-grid/easy-grid/easy-grid.module';
import { DateFilterPipe } from './easy-grid/easy-grid/pipe/date-filter';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UIModule,
    EasyGridModule
  ],
  exports: [
    EasyGridModule
  ],
  providers: [
  ]
})

export class SharedModule { }
