import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Item } from './easy-selector.model';

@Component({
    selector: 'easy-selector',
    templateUrl: './easy-selector.component.html',
    styleUrls: ['./easy-selector.component.scss']
})
export class EasySelectorComponent implements OnInit, OnChanges {

    @Input() items: Item[] = [];
    @Input() placeholder: string = "";
    @Input() showSearch = true;
    @Input() showAll = true;
    @Input() showStatus = true;
    @Input() showError = false;
    @Output() itemChange = new EventEmitter<Item>();

    filtered: Item[] = [];
    all: Item = {
        name: '1@2#3$',
        value: 'All',
        sortable: false,
        filterable: false,
        exportable: false,
        isEnabled: false,
        visible: true
    };

    private searchText = '';

    get search(): string {
        return this.searchText;
    }

    set search(searchText: string) {
        this.searchText = searchText;

        const search = this.searchText.toLowerCase();
        if (!search) {
            this.filtered = [...this.items];
            this.all.visible = true;
            return;
        }
        this.filtered = this.items.filter(i => i.value.toLowerCase().indexOf(search) !== -1);
        
        if (this.all.name.toLowerCase().indexOf(search) !== -1) {
            this.all.visible = true;
        } else {
            this.all.visible = false;
        }
    }

    get selected(): string {
        return this.all && this.all.isEnabled ? this.all.value :
            this.items.filter(i => i.isEnabled && i.visible).map(i => i.value).join(', ');
    }

    get isEmpty(): boolean {
        return this.filtered.filter(i => i.visible).length === 0;
    }

    get isEnabled(): number {
        return this.items.filter(i => i.isEnabled).length;
    }

    ngOnInit(): void {
        this.items.map(item => {
            item.isEnabled = item.isEnabled || false;
            item.visible = item.visible || true;
        });
        this.filtered = [...this.items];

        if (!this.filtered.length) {
            this.all.visible = false;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['items']) {
            this.items.map(item => {
                item.isEnabled = item.isEnabled || false;
                item.visible = item.visible || true;
            });
            this.filtered = [...this.items];

            if (!this.filtered.length) {
                this.all.visible = false;
            }
        }
    }

    onChange($event: any, item: Item): void {
        const isEnabled = $event.target.checked;
        const index = this.items.findIndex(i => i.name === item.name);

        if (item.name === '1@2#3$') {
            this.all.isEnabled = isEnabled;
            for (const iterator of this.items) {
                iterator.isEnabled = isEnabled;
            }
        } else {
            this.items[index].isEnabled = isEnabled;

            /* istanbul ignore else*/
            if (this.all) {
                /* istanbul ignore else*/
                if (this.all.isEnabled) {
                    this.all.isEnabled = false;
                }
                const allChecked = this.items.filter(i => i.name !== null).every(i => i.isEnabled);
                this.all.isEnabled = allChecked;
            }
        }

        this.itemChange.emit(item);
    }

}
