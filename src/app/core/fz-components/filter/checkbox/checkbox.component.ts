import { Component, Input, EventEmitter } from '@angular/core';
import { FilterParam } from '../filter.model';

@Component({
  selector: 'fz-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass']
})
export class CheckboxComponent {
  @Input() items: Array<any> = [];
  @Input() param: FilterParam;
  @Input() changedFilter: EventEmitter<FilterParam>;
  @Input() filter: {};
  @Input() eventFilters: EventEmitter<any>;

  constructor() { }

  toggleFilter(item: any): void {
    this.param.filterItem = item;
    this.param.isChecked = (this.filter[this.param.key].indexOf(item) <= -1)
    this.changedFilter.emit(this.param);
    this.eventFilters.emit(this.filter);
  }
}
