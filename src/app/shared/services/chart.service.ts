import { Injectable } from '@angular/core';

import { ChartData } from '../../chartdata';
import { CHARTDATA, BARCHARTCOLORS } from '../../mock-charts';
import { BARCHARTTYPE } from '../../mock-charts';
import { BARCHARTLEGEND } from '../../mock-charts';
import { BARCHARTLABELS } from '../../mock-charts';
import { BARCHARTOPTIONS } from '../../mock-charts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  aggregator = {
    barChartType: BARCHARTTYPE,
    barChartLegend: BARCHARTLEGEND,
    barChartLabels: BARCHARTLABELS,
    barChartOptions: BARCHARTOPTIONS,
    barChartColors: BARCHARTCOLORS
  }

  constructor() { }

  getChartData(): Observable<ChartData[]>{
    return of(CHARTDATA);
  }

  getAggregatorChart(): Observable<any>{
    return of(this.aggregator);
  }

}
