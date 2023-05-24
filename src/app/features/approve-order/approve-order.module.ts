import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveOrderRoutingModule } from './approve-order-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApproveOrderRoutingModule,
    SharedModule,
    NgbNavModule
  ]
})
export class ApproveOrderModule { }
