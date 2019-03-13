import { Injectable } from '@angular/core';

import { ChartData } from '../../chartdata';
import { CHARTDATA, BARCHARTCOLORS, BARCHARTTYPEHORIZONTAL, CHARTDATAATD, randomDataset, BARCHARTLABELSATD, BARCHARTLABELSCLASSMEDIA, BARCHARTOPTCLASSMEDIA } from '../../mock-charts';
import { BARCHARTTYPE, BARCHARTTESTOPTIONS, BARCHARTTESTDATA } from '../../mock-charts';
import { BARCHARTLEGEND } from '../../mock-charts';
import { BARCHARTLABELS, BARCHARTATDOPTIONS, BARCHARTATDPRFLABELS } from '../../mock-charts';
import { BARCHARTOPTIONS, CHARTDATAFEEDBACK, CHARTLABELSFEEDBACK, 
  BARCHARTTOPTIONSFEEDB, BARCHARTDATACLASSMEDIA } from '../../mock-charts';
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
    barChartLabels: BARCHARTATDPRFLABELS,
    barChartOptions: BARCHARTTESTOPTIONS,
    barChartColors: BARCHARTCOLORS
  }

  aggre3 = {
    barChartType: BARCHARTTYPE,
    barChartLegend: false,
    barChartLabels: BARCHARTLABELSATD,
    barChartOptions: BARCHARTATDOPTIONS
  }

  aggreFeedback = {
    barChartType: BARCHARTTYPE,
    barChartLegend: true,
    barChartLabels: CHARTLABELSFEEDBACK,
    barChartOptions: BARCHARTTOPTIONSFEEDB
  }

  aggreClassMedia = {
    barChartType: BARCHARTTYPEHORIZONTAL,
    barChartLegend: true,
    barChartLabels: BARCHARTLABELSCLASSMEDIA,
    barChartOptions: BARCHARTOPTCLASSMEDIA
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
    return of(CHARTDATAATD);
  }
  
  getFeedbackData(): Observable<ChartData[]>{
    return of(CHARTDATAFEEDBACK);
  }

  getAggregatorFeedback(): Observable<any>{
    return of(this.aggreFeedback);
  }

  getDataClassMedia(): Observable<ChartData[]>{
    return of(BARCHARTDATACLASSMEDIA);
  }

  getAggregatorClassMedia(): Observable<any>{
    return of(this.aggreClassMedia);
  }
}
