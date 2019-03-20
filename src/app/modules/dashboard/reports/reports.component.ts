import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {

  @Output() eventFilters: EventEmitter<any> = new EventEmitter();
  @Output() toggleFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
