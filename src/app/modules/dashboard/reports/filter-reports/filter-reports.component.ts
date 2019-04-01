import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbDate, NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormControl } from '@angular/forms';

import { FilterService } from '../../../../core/fz-components/filter/filter.service';
import { FilterParam } from '../../../../core/fz-components/filter/filter.model';
import { I18n, CustomDatepickerI18n } from '../../../../utils/date-picker';


@Component({
  selector: 'fz-filter-reports',
  templateUrl: './filter-reports.component.html',
  styleUrls: ['./filter-reports.component.sass'],
  providers: [
    I18n,
    {
      provide: NgbDatepickerI18n,
      useClass: CustomDatepickerI18n
    }
  ]
})
export class FilterReportsComponent implements OnInit {

  @Input() eventFilters: EventEmitter<any>;
  @Input() eventToggleFilter: EventEmitter<boolean>;
  @Output() changedFilter: EventEmitter<FilterParam> = new EventEmitter<FilterParam>();
  @Output() filter: {};

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  selected: NgbDateStruct;

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
    private _filterService: FilterService,
    calendar: NgbCalendar
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

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

  selectDay(date: NgbDateStruct): boolean {
    const selected = this.selected;
    if (selected) {
      if (selected.day === date.day &&
        selected.month === date.month &&
        selected.year === date.year) {
        return true;
      }
    }
    return false;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

}
