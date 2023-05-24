import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { UserSortableDirective } from './list/user-sortable.directive';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule, NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { DefaultTreeviewEventParser, TreeviewEventParser, TreeviewI18n, TreeviewModule, DefaultTreeviewI18n, TreeviewConfig } from 'ngx-treeview';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent, 
    ViewComponent,
    UserSortableDirective
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    HttpClientModule,
    TreeviewModule
  ],
  providers: [
    TreeviewConfig,
    { provide: TreeviewI18n, useClass: DefaultTreeviewI18n },
    { provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser }
  ]
})
export class UserModule { }
