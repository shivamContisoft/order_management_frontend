import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Item } from '../easy-selector/easy-selector.model';
import { ExporterClass } from '../helper/exporter';
import { SearchClass } from '../helper/search';
import { SortClass } from '../helper/sort';

@Component({
  selector: 'easy-grid',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
})
export class GridViewComponent implements OnInit, OnChanges, AfterViewInit {

  // access html elements by viewchild
  @ViewChild('actions') actions: ElementRef;
  @ViewChild('searchBox') searchBox: ElementRef;
  @ViewChild('searchBy') searchBy: ElementRef;

  // Incoming Details
  @Input() dataArray: any = []; // Incoming data array from the applications
  @Input() primaryKey: any = ""; // Incoming primary key to perform click action
  @Input() headerBgColor: string = ""; // incoming color schemas
  @Input() headerTextColor: string = ""; // incoming color schemas
  @Input() selectedItemBgColor: string = ""; // incoming color schemas
  @Input() selectedItemTextColor: string = ""; // incoming color schemas
  @Input() downloadBtnBgColor: string = ""; // incoming color schemas
  @Input() downloadBtnTextColor: string = ""; // incoming color schemas
  @Input() dataColumns: any = []; // Incoming columns array from the applications
  @Input() isActionsEnabled: boolean = false; // Actions enabled
  @Input() actionsArray: any = []; // Actions enabled
  @Input() isExportEnabled: boolean = true;  // enable and disable export button
  @Input() disableHtmlInExport: boolean = false;  // enable and disable export button
  @Input() isSearchEnabled: boolean = true;  // search enabled
  @Input() ispaginationEnabled: boolean = true;  // search enabled
  @Input() isSearchGlobal: boolean = false;  // search enabled global
  @Input() isColumnSelectionEnabled: boolean = true;  // column selection enabled
  @Input() count: number = 0; // total count of records for pagination
  @Input() isFirst: boolean = false; // total count of records for pagination
  @Input() isLast: boolean = false; // total count of records for pagination
  @Input() srNoEnable: boolean = false;  // sr_no column enable

  // outgoing details
  @Output() columnStChange = new EventEmitter();
  @Output() onPageChanges = new EventEmitter();
  @Output() onItemsPerPageChanges = new EventEmitter();
  @Output() onActionPerformed = new EventEmitter<{ action: string, value: any }>();
  @Output() onColumnSelected = new EventEmitter<[]>();
  @Output() onSearch = new EventEmitter();
  @Output() onItemSelect = new EventEmitter();

  public showSearch = true; // show search in multiple select
  public showError = false; // show errors in multiple select
  public showAll = true;  // show all select option in multiple select
  public showStatus = true; // show status of selection at bottom in multiple select


  // Number declaration
  public sortOrder: number = 0;  // 0 is for default, 1 is acending order and 2 is for descending order;
  public totalRows: number = 0;  // total rows count
  public currentPage: number = 1;  // current page is set 1 by default in pagination
  public totalPages: number = 0;  // number pages for pagination
  public itemsPerPage: number = 50;  // number of records to be desplayed on table


  // String declaration
  public searchQuery: string = "";  // Search Query holds the value entered in search_box

  // Array declaration
  public selectedRowIds: any = []; // Selected row ids
  public filteredArray: any = [];  // this array holds the actual data to be shown in tables with all applied filters on it
  public tempDataArray: any = [];  // this array holds the actual data to be shown in tables with all applied filters on it
  public totalPagesArray: any = [];  // number pages are stored in here

  constructor(private searchClass: SearchClass,
    private sortClass: SortClass,
    private exportClass: ExporterClass) { }

  ngOnInit(): void {

    // handling undefined values in @Input
    this.dataArray = this.dataArray || [];
    this.dataColumns = this.dataColumns || [];

    // at default filteredArray will contain all the incoming data
    this.filteredArray = this.dataArray;
    this.tempDataArray = this.dataArray;

    if (this.count <= 0)
      this.count = this.dataArray.length

    // pagination initialization
    this.initializePagination();

    // Initializing items from dataColumns
    this.dataColumns = this.dataColumns.map((item: any) => ({
      name: item.name,
      value: item.value,
      isEnabled: 'isEnabled' in item ? item.isEnabled : true,
      sortable: 'sortable' in item ? item.sortable : true,
      filterable: 'filterable' in item ? item.filterable : true,
      exportable: 'exportable' in item ? item.exportable : true,
      textAlign: 'textAlign' in item ? item.textAlign : '',
      isDate: 'isDate' in item ? item.isDate : false,
      dateFormat: 'dateFormat' in item ? item.dateFormat : 'yyyy-MM-dd',
    } as Item));

  }

  ngAfterViewInit(): void {
    this.searchIntializer()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataArray']) {
      this.dataArray = changes['dataArray'].currentValue != 'undefined' ? changes['dataArray'].currentValue : [];
      this.filteredArray = this.dataArray;
      this.tempDataArray = this.dataArray;
      if (this.count <= 0)
        this.count = this.dataArray.length

      // pagination initialization
      this.totalPagesArray = [];
      this.totalRows = this.tempDataArray.length;
      if (this.searchQuery) {
        this.totalPages = Math.max(1, Math.ceil(this.totalRows / this.itemsPerPage));
      } else {
        this.totalPages = Math.max(1, Math.ceil(this.count / this.itemsPerPage));
      }
      for (let index = 1; index <= this.totalPages; index++) {
        this.totalPagesArray.push(index);
      }

      if (this.currentPage > this.totalPages)
        this.setPage(1);
      else
        this.setPage(this.currentPage);
    }
  }

  // Function to sort the data in ascending and descending order with every column available in dataColumns with [sortable = true]
  public sort(index: number) {
    const enabledColumns: any = [];
    this.dataColumns.map((col: any) => { if (col.isEnabled) enabledColumns.push(col); });
    this.sortClass.sort(enabledColumns[index].name, this.sortOrder, this.tempDataArray, (dataArray: any, sortOrder: number) => {
      this.tempDataArray = dataArray;
      this.sortOrder = sortOrder;
    });
    this.sliceArray();
  }

  // Function to search the query in table

  public searchIntializer() {
    fromEvent(this.searchBox.nativeElement, 'keyup')
      .pipe(
        map((event: any) => { return event.target.value }),
        debounceTime(1000),
        distinctUntilChanged())
      .subscribe((searchQuery) => {
        this.search(searchQuery, this.searchBy.nativeElement.value, true);
      });
  }

  public search(query: string, searchBy: string, enter: boolean = false) {
    if (this.isSearchGlobal) {
      if (enter) this.onSearch.emit({ query: query, searchBy: searchBy === '1$2#3&' ? 'all' : searchBy });
      if (!query) this.onSearch.emit({ query: "", searchBy: searchBy === '1$2#3&' ? 'all' : searchBy });
    } else {
      this.tempDataArray = this.searchClass.search(query, searchBy, this.dataArray);
      this.initializePagination();
    }
  }

  trackDataByPrimariKey(_index: number, item: any): string {
    return item[this.primaryKey];
  }

  public onNext() {
    if ((Number(this.currentPage) + 1) <= this.totalPages) {
      this.setPage(Math.min(this.totalPages, Number(this.currentPage) + 1));
      this.onPageChanges.emit(Number(this.currentPage));
    }
  }

  public onPrevious() {
    if ((Number(this.currentPage) - 1) >= 1) {
      this.setPage(Math.max(1, Number(this.currentPage) - 1));
      this.onPageChanges.emit(Number(this.currentPage));
    }
  }

  public onFirst() {
    if (Number(this.currentPage) != 1) {
      this.setPage(1);
      this.onPageChanges.emit(1)
    }
  }

  public onLast() {
    if (this.currentPage != this.totalPages) {
      this.setPage(this.totalPages);
      this.onPageChanges.emit(Number(this.currentPage))
    }
  }

  public onPageChange(page: number) {
    this.setPage(page);
    this.onPageChanges.emit(page)
  }

  public onPageSizeChange(items: any) {
    this.itemsPerPage = items;
    if (this.searchQuery) {
      this.totalPages = Math.max(1, Math.ceil(this.totalRows / this.itemsPerPage));
    } else {
      this.totalPages = Math.max(1, Math.ceil(this.count / this.itemsPerPage));
    }
    this.totalPagesArray = [];
    for (let index = 1; index <= this.totalPages; index++) {
      this.totalPagesArray.push(index);
    }
    this.onItemsPerPageChanges.emit(this.itemsPerPage);
    this.setPage(1);
  }

  public setPage(page: number) {
    this.currentPage = page;
    this.sliceArray();
  }

  // Part Selection and Unselection of row goes here
  public selectedUnselectRow(rowPK: number, index: number) {
    this.selectedRowIds = [];
    if (this.isActionsEnabled) {
      if (this.selectedRowIds.indexOf(rowPK) > -1) {
        this.selectedRowIds.splice(this.selectedRowIds.indexOf(rowPK), 1);
      } else {
        this.selectedRowIds.push(rowPK);
      }
    }
    this.onItemSelect.emit({ primaryValue: rowPK });
  }

  public isSelected(rowPK: number, index: number) {
    if (this.selectedRowIds.indexOf(rowPK) > -1) {
      return true;
    } else {
      return false;
    }
  }

  public onActionSelected(action: string) {
    if (this.selectedRowIds.length > 1) {
      this.onActionPerformed.emit({ action: action != '#all' ? action : 'undefined', value: action != '#all' ? this.selectedRowIds : [] });
    } else {
      this.onActionPerformed.emit({ action: action != '#all' ? action : 'undefined', value: action != '#all' ? this.selectedRowIds[0] : [] });
    }
    this.selectedRowIds = [];
    this.actions.nativeElement.value = '#all'
  }

  // Excel downloader
  public downloadExcel() {
    this.exportClass.exportToXlsx(this.tempDataArray, this.dataColumns, 'Report', this.disableHtmlInExport);
  }

  // Columns filter handlers
  public onColumnEnableDisable(item: any): void {
    this.onColumnSelected.emit(this.dataColumns);
  }

  /*
    Private functions block
  */

  private sliceArray() {
    if (this.itemsPerPage < this.tempDataArray.length) {
      let firstIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
      let lastIndex = Math.min((this.currentPage * this.itemsPerPage) - 1, this.totalRows - 1);
      this.filteredArray = this.tempDataArray.slice(firstIndex, (lastIndex + 1));
    } else {
      this.filteredArray = this.tempDataArray;
    }
  }

  // pagination functions
  private initializePagination() {
    // calculating totalRecords, totalPages and assigning to globals
    this.totalPagesArray = [];
    this.totalRows = this.tempDataArray.length;
    if (this.searchQuery) {
      this.totalPages = Math.max(1, Math.ceil(this.totalRows / this.itemsPerPage));
    } else {
      this.totalPages = Math.max(1, Math.ceil(this.count / this.itemsPerPage));
    }
    for (let index = 1; index <= this.totalPages; index++) {
      this.totalPagesArray.push(index);
    }
    this.setPage(1);
  }

}
