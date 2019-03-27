import { Injectable } from '@angular/core';

import { ChartData } from '../models/chartData.model';
import { CHARTDATA, BARCHARTCOLORS, BARCHARTTYPEHORIZONTAL, CHARTDATAATD, randomDataset, BARCHARTLABELSATD, BARCHARTLABELSCLASSMEDIA, BARCHARTOPTCLASSMEDIA } from '../mock/mock-charts';
import { BARCHARTTYPE, BARCHARTTESTOPTIONS, BARCHARTTESTDATA } from '../mock/mock-charts';
import { BARCHARTLEGEND,BARCHARTPERFTOTALDATA } from '../mock/mock-charts';
import { BARCHARTLABELS, ATDCHARTCOLORS, BARCHARTATDOPTIONS, BARCHARTTOPTIONS, BARCHARTATDPRFLABELS } from '../mock/mock-charts';
import { BARCHARTOPTIONS, CHARTDATAFEEDBACK, CHARTLABELSFEEDBACK,
  BARCHARTTOPTIONSFEEDB, BARCHARTDATACLASSMEDIA } from '../mock/mock-charts';
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

  aggre2 = {//performance de atendimento por serviço
    barChartType: BARCHARTTYPEHORIZONTAL,
    barChartLegend: BARCHARTLEGEND,
    barChartLabels: BARCHARTATDPRFLABELS,
    barChartOptions: BARCHARTTESTOPTIONS,
    barChartColors: BARCHARTCOLORS
  }

  aggre3 = {//horários de pico
    barChartType: BARCHARTTYPE,
    barChartLegend: false,
    barChartLabels: BARCHARTLABELSATD,
    barChartOptions: BARCHARTATDOPTIONS,
    barChartColors: ATDCHARTCOLORS
  }

  aggreFeedback = {//classificação média/serviço
    barChartType: BARCHARTTYPE,
    barChartLegend: true,
    barChartLabels: CHARTLABELSFEEDBACK,
    barChartOptions: BARCHARTTOPTIONSFEEDB
  }

  aggreClassMedia = {//classificação média/mês
    barChartType: BARCHARTTYPEHORIZONTAL,
    barChartLegend: true,
    barChartLabels: BARCHARTLABELSCLASSMEDIA,
    barChartOptions: BARCHARTOPTCLASSMEDIA
  }

  aggrePerfTotal = {//performance de atendimento geral
    barChartType: BARCHARTTYPEHORIZONTAL,
    barChartLegend: BARCHARTLEGEND,
    barChartOptions: BARCHARTTOPTIONS
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

  getPerformanceTotalData(): Observable<ChartData[]>{
    return of(BARCHARTPERFTOTALDATA);
  }

  getAggregatorPerfTotal(): Observable<Object>{
    return of(this.aggrePerfTotal);
  }
}
