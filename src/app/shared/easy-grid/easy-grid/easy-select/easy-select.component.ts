import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Item } from './easy-select.model';

@Component({
  selector: 'easy-select',
  templateUrl: './easy-select.component.html',
  styleUrls: ['./easy-select.component.scss']
})
export class EasySelectComponent implements OnInit {

  @Input() items: Item[] = [];
  @Input() placeholder: string;
  @Input() showSearch = true;
  @Input() showStatus = true;
  @Input() showError = false;
  @Output() itemChange = new EventEmitter<Item>(null);

  filtered: Item[] = [];
  item: Item = null;

  private searchText = '';

  get search(): string {
    return this.searchText;
  }

  set search(searchText: string) {
    this.searchText = searchText;

    const search = this.searchText.toLowerCase();
    if (!search) {
      this.filtered = [...this.items];
      return;
    }
    this.filtered = this.items.filter(i => i.value.toLowerCase().indexOf(search) !== -1);
  }

  get isEmpty(): boolean {
    return this.filtered.filter(i => i.visible).length === 0;
  }

  ngOnInit(): void {
    this.items.map(item => {
      item.visible = item.visible || true;
    });
    this.filtered = [...this.items];
  }

  trackByName(item: Item): string {
    return item.name;
  }

  onChange(item: Item): void {
    this.item = item;
    this.itemChange.emit(item);
  }

}
