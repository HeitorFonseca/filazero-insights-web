import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FilterService } from '../../../../core/fz-components/filter/filter.service';
import { FilterParam } from '../../../../core/fz-components/filter/filter.model';


@Component({
  selector: 'fz-filter-reports',
  templateUrl: './filter-reports.component.html',
  styleUrls: ['./filter-reports.component.sass']
})
export class FilterReportsComponent implements OnInit {

  @Input() eventFilters: EventEmitter<any>;
  @Input() eventToggleFilter: EventEmitter<boolean>;
  @Output() changedFilter: EventEmitter<FilterParam> = new EventEmitter<FilterParam>();
  @Output() filter: {};

  filterParam = new FilterParam(
    'Serviços',
    'ticketFilter'
  );

  filterParam2 = new FilterParam(
    'Atendentes',
    'ticketFilter'
  );

  optionsFilter = [
    {id: 0, name: 'Cardiologia', value: 'active'},
    {id: 1, name: 'Pneumologia', value: 'active'},
    {id: 2, name: 'Psiquiatria', value: 'active'},
  ];

  optionsFilter2 = [
    {id: 0, name: 'GUICHE 01', value: '01'},
    {id: 0, name: 'GUICHE 02', value: '02'},
    {id: 0, name: 'GUICHE 03', value: '03'}
  ];

  constructor(
    private _filterService: FilterService
  ) { }

  ngOnInit() {
    this.changedFilter
      .subscribe((item: FilterParam) => {
        this.toggleFilter(item.key, item.filterItem);
      });

    this.resetFilter();
  }

  toggleFilter(key: string, value: object): void {
    this._filterService.toggleFilter(key, value, this.filter);
  }

  resetFilter(): void {
    this.filter = {
      ticketFilter: this.optionsFilter.slice(0, 1),
    };
    this.eventFilters.emit(this.filter);
    this.close();
  }

  close(): void {
    this.eventToggleFilter.emit(false);
  }

}
