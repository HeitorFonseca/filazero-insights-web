import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {NgbDate, NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormControl } from '@angular/forms';

import { FilterService } from '../../../../core/fz-components/filter/filter.service';
import { FilterParam } from '../../../../core/fz-components/filter/filter.model';
import { I18n, CustomDatepickerI18n } from '../../../../utils/date-picker';

import { ReportsService } from '../../../../shared/services/reports.service';

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
export class FilterReportsComponent implements OnInit{

  @Input() eventFilters: EventEmitter<any>;
  @Input() eventToggleFilter: EventEmitter<boolean>;
  @Output() changedFilter: EventEmitter<FilterParam> = new EventEmitter<FilterParam>();
  @Output() emitFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() filter: {};
  @Output() emitDates: EventEmitter<any> = new EventEmitter<any>();
  
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  selected: NgbDateStruct;

  filterParam = new FilterParam(
    'Serviços',
    'ticketFilter',
    false    
  );

  filterParam2 = new FilterParam(
    'Atendentes',
    'ticketFilter',
    false
  );

  optionsFilter = [
    /*{id: 0, name: 'Cardiologia', value: 'active'},
    {id: 1, name: 'Pneumologia', value: 'active'},
    {id: 2, name: 'Psiquiatria', value: 'active'},*/
  ];

  optionsFilter2 = [
    /*{id: 0, name: 'GUICHE 01', value: '01'},
    {id: 0, name: 'GUICHE 02', value: '02'},
    {id: 0, name: 'GUICHE 03', value: '03'}*/
  ];

  constructor(
    private _filterService: FilterService,
    calendar: NgbCalendar,
    private _reportsService: ReportsService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.changedFilter
      .subscribe((item: FilterParam) => {
        this.toggleFilter(item.key, item.filterItem);
        this.emitFilter.emit({filter: this.filter,
        toDate: this.toDate.year+'-'
        +(this.toDate.month<10?'0'+this.toDate.month:this.toDate.month)+'-'
        +(this.toDate.day<10?'0'+this.toDate.day:this.toDate.day),
        fromDate: this.fromDate.year+'-'
        +(this.fromDate.month<10?'0'+this.fromDate.month:this.fromDate.month)+'-'
        +(this.fromDate.day<10?'0'+this.fromDate.day:this.fromDate.day)});
      });

    this.resetFilter();
    this.getServicesResources();
  }

  /*ngAfterViewInit(){
    var monthView = document.getElementsByTagName('ngb-datepicker-month-view')[0];
    monthView.style.width = 'inherit';
    var dpweek = document.getElementsByClassName('ngb-dp-week ngb-dp-weekdays')[0];
    dpweek.style.width = "inherit";
    var dpmonth = document.getElementsByClassName('ngb-dp-month ng-star-inserted')[0];
    dpmonth.style.width = '-webkit-fill-available';
  }*/

  toggleFilter(key: string, value: object): void {
    this._filterService.toggleFilter(key, value, this.filter);
    //this.eventFilters.emit(this.filter);
  }

  resetFilter(): void {
    this.filter = {
      ticketFilter: this.optionsFilter.slice(0,1)
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
      //só emitir o evento quando as duas datas estiverem preenchidas
      this.emitDates.emit({
        toDate: this.toDate.year+'-'
        +(this.toDate.month<10?'0'+this.toDate.month:this.toDate.month)+'-'
        +(this.toDate.day<10?'0'+this.toDate.day:this.toDate.day),
        fromDate: this.fromDate.year+'-'
        +(this.fromDate.month<10?'0'+this.fromDate.month:this.fromDate.month)+'-'
        +(this.fromDate.day<10?'0'+this.fromDate.day:this.fromDate.day),
        filter: this.filter
      });
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

  getServicesResources(){
    this._reportsService.getServicesResources().subscribe(data => {
      for(let item of data['servicesCustomViewModels']){
        var servico = {
          id: item['serviceId'],
          name: item['serviceName'],
          value: 'Servico'
        }
        this.optionsFilter.push(servico);

        var atendentes = item['attendantsCustomViewModels'];
        for(let i of atendentes){
          if(this.optionsFilter2.filter(at => at.id == i['attendantId']).length==0){
            var aux = {
              id: i['attendantId'],
              name: i['attendantName'],
              value: 'Atendente'
            }
            this.optionsFilter2.push(aux);  
          }
        }
      }
    });
  }
}
