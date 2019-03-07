import { Injectable } from '@angular/core';

import { ChartData } from '../../chartdata';
import { CHARTDATA, BARCHARTCOLORS, BARCHARTTYPEHORIZONTAL, CHARTDATAFEEDBACK, randomDataset } from '../../mock-charts';
import { BARCHARTTYPE, BARCHARTTESTOPTIONS, BARCHARTTESTDATA } from '../../mock-charts';
import { BARCHARTLEGEND } from '../../mock-charts';
import { BARCHARTLABELS, BARCHARTLABELSFEEDB, BARCHARTFEEDBACKOPTIONS } from '../../mock-charts';
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

  aggre2 = {
    barChartType: BARCHARTTYPEHORIZONTAL,
    barChartLegend: BARCHARTLEGEND,
    barChartLabels: BARCHARTLABELS,
    barChartOptions: BARCHARTTESTOPTIONS,
    barChartColors: BARCHARTCOLORS
  }

  aggre3 = {
    barChartType: BARCHARTTYPE,
    barChartLegend: false,
    barChartLabels: BARCHARTLABELSFEEDB,
    barChartOptions: BARCHARTFEEDBACKOPTIONS
  }

  constructor() { }

  getChartData(): Observable<ChartData[]>{
    return of(CHARTDATA);
  }

  getAggregatorChart(): Observable<any>{
    return of(this.aggregator);
  }

  getAnotherAggregator(): Observable<any>{
    return of(this.aggre2);
  }

  getAtendAggregator(): Observable<any>{
    return of(this.aggre3);
  }

  getAnotherData(): Observable<ChartData[]>{
    return of(BARCHARTTESTDATA);
  }

  getAtendData(): Observable<ChartData[]>{
    return of(CHARTDATAFEEDBACK);
  }
}
