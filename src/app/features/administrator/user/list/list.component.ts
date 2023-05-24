import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Table } from '../user.model';
import { Router } from '@angular/router';
import { tableData } from 'src/app/pages/tables/advancedtable/data';
import { UserService } from '../user.service';
import { UserSortableDirective, SortEvent } from './user-sortable.directive'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreeviewItem } from 'ngx-treeview';
import { first } from 'rxjs/operators';
import { ModuleService } from 'src/app/core/services/module.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [UserService, DecimalPipe]
})
export class ListComponent implements OnInit {

  moduleItems: any = []
  existingModuleItems: any = [];
  userFormGroup: FormGroup;

  // bread crum data
  breadCrumbItems: Array<{}>;
  // Table data
  tableData: Table[];
  public selected: any;
  hideme: boolean[] = [];
  tables$: Observable<Table[]>;
  total$: Observable<number>;

  Users:any = []; 
  userCount = 0;
  selectedAccess: any = [];
  filteredAccess: any = [];
  accountType = 0;
  accountId = 0;

  @ViewChildren(UserSortableDirective) headers: QueryList<UserSortableDirective>;
  public isCollapsed = true;

  constructor(public userService: UserService, public formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private moduleService: ModuleService) {
    this.tables$ = userService.tables$;
    this.total$ = userService.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Datatables', active: true }];
    /**
     * fetch data
     */
    this._fetchData();
    this.getUsers();
    // this._prepareExistingModuleItems();

    this.userFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      contact: ['', [Validators.pattern('[0-9]+')]],
      designation: [''],
    })
  }

  get getChFormControls() {
    return this.userFormGroup.controls;
  }

  getUsers(){
    this.userService.getAll().subscribe(result => {
      if (result['status'] == 200) {
        this.Users = result['data']['rows']
        this.userCount = result['data']['count']

        this.Users.map(element => {
          element.fullName = element.firstName + " " + element.lastName;
        });
      }
    }, error => {
      console.log(error);
    });
    console.log();
  }

  /**
   * fetches the table value
   */
  _fetchData() {
    this.tableData = tableData;
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.userService.sortColumn = column;
    this.userService.sortDirection = direction;
  }

  openAccessModal(userId: number, modal) {
    this.getModules();
    this.accountId = userId;
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(`Closed with ${result}`);
    }, (reason) => {
      console.log(`Closed with ${reason}`);
    })
  }

  onSelectedChange(event) { 
    this.selectedAccess = event;
    console.log("selected=>",this.selectedAccess); 
  }

  onFilterChange(event) { 
    this.filteredAccess = event;
    console.log("Filtered=>",this.filteredAccess); 
  }

  getModules() {
    this.moduleItems = [];
    this.userService.getMoudles(1).pipe(first()).subscribe(result => {
      if (result.status == 200) {
        result.data.map(item => {
          let treeViewItem: any;
          if (item.cp_sub_modules.length > 0) {
            treeViewItem = new TreeviewItem({
              text: item.moduleName,
              value: item.id,
              checked: this.existingModuleItems.findIndex(itm => itm.id == item.id) > 0 ? true : false,
              children: item.cp_sub_modules.map(itm => {
                return new TreeviewItem({
                  text: itm.moduleName,
                  value: item.id + '-' + itm.id,
                  checked: this.existingModuleItems.findIndex(ele => ele.id == item.id + '-' + itm.id) > 0 ? true : false,
                })
              })
            });
          } else {
            treeViewItem = new TreeviewItem({
              text: item.moduleName,
              value: item.id,
            });
          }
          this.moduleItems.push(treeViewItem);
        });
      }
    }, error => {
      console.log(error);
    });
  }

  // private _prepareExistingModuleItems() {
  //   this.moduleService.currentModuleValue.map(item => {
  //     this.existingModuleItems.push(new TreeviewItem({
  //       text: item.label,
  //       value: item.id
  //     }));
  //     if ('subItems' in item && item.subItems.length > 0) {
  //       item.cp_main_modules.map(itm => {
  //         this.existingModuleItems.push(new TreeviewItem({
  //           text: itm.label,
  //           value: item.id + '-' + itm.id
  //         }));
  //       });
  //     }
  //   });
  // }

  allocateAccess(modal) {
    this.Users.map(element => {
      if(element.id == this.accountId){
        this.accountType = element.accountType;
      }
    });

    let data = { 
      accountId: this.accountId, 
      accountType: this.accountType,
      selectedAccess: this.selectedAccess  
    }; 

    this.userService.allocateAccess(data).subscribe(result => {
      console.log(result);
      if (result['status'] == 200) {
        this.modalService.dismissAll(modal);
      }
    }, error => {
      console.log(error);
    }); 

    this.moduleService.getUserModules().pipe(first()).subscribe(result => {
      console.log("module=>",result);
      if (this.Users.accountType == 1)
        this.router.navigate(['/administrator/dashboard']);
      if (this.Users.accountType == 2)
        this.router.navigate(['/costing-team/dashboard']);
      if (this.Users.accountType == 3)
        this.router.navigate(['/vendor/dashboard']);
    }, error => {
      console.log(error)
    })
  }

  successmsg() {
    Swal.fire('Changes saved successfully!', 'You clicked the button!', 'success');
  }

  /**
   * Open modal
   * @param createuser modal content
   */
  openAddUserModal(createuser: any) {
    console.log("model");
    this.modalService.open(createuser, { size: 'lg',windowClass:'modal-holder', centered: true });
  }

  onSubmit(){
    console.log(this.userFormGroup.value)
  }

  /**
  * Open modal
  * @param edituser modal content
  */
  openEditUserModal(edituser: any) {
    this.modalService.open(edituser, { size: 'lg',windowClass:'modal-holder', centered: true });
  }

}
