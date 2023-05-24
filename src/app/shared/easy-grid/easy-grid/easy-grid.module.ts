import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GridViewComponent } from './grid-view/grid-view.component';
import { EasySelectorComponent } from './easy-selector/easy-selector.component';
import { ColumnFilterPipe } from './pipe/column-filter';
import { DateFilterPipe } from './pipe/date-filter';
import { EasySelectComponent } from './easy-select/easy-select.component';
import { ColumnFilterablePipe } from './pipe/column-filterable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    GridViewComponent,
    EasySelectorComponent,
    ColumnFilterPipe,
    ColumnFilterablePipe,
    DateFilterPipe,
    EasySelectComponent
  ],
  exports: [
    GridViewComponent,
    EasySelectorComponent,
    EasySelectComponent,
    ColumnFilterPipe,
    ColumnFilterablePipe,
    DateFilterPipe],

  providers: [
    DateFilterPipe
  ]
})
export class EasyGridModule { }
