import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChildren, QueryList  } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { ChartService } from '../../../shared/services/chart.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {

  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;
  @Output() eventFilters: EventEmitter<any> = new EventEmitter();
  @Output() toggleFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public chartData;
  public aggregator;
  public dataPerfServico;
  public dataPerformance;
  public dataClassMedia;
  public dataFeedback;
  public aggrePerfServico;
  public aggrePerformance;
  public aggreClassMedia;
  public aggreFeedback;

  //para guardar valores originais dos dados de performance de atendimento
  //e serem exibidos no tooltip
  oldDataChart = [];
  oldDataChart2 = [];

  constructor(private _chartService: ChartService) { }

  ngOnInit() {

    Chart.pluginService.register(ChartDataLabels);

    this.getChartData();
    this.getAggregatorChart();
    this.getAtdPerformanceData();
    this.getAtdPerformanceAggregator();
    this.getAtdPerfTotalAggregator();
    this.getAtdPerfTotalData();

    this.getAggregatorClassMedia();
    this.getClassMediaChartData();
    this.getFeedbackChartData();
    this.getAggregatorFeedback();
  }

  ngAfterViewInit(){
    var _this = this;

    var performanceAtdCharts = this.charts.toArray().filter(item =>
      //o gráfico de barra horizontal empilhada é o único
      //que deve-se fazer a conversão para porcentagem
      item.chart.config.type=='horizontalBar' &&
      item.chart.options.scales.xAxes[0].stacked

    );

    for(let chart of performanceAtdCharts){
      this.calculatePercentage(chart.datasets, chart.ctx.canvas.id);

      chart.chart.options.tooltips.callbacks.label = function(tooltipItem,data){
        var label = data.datasets[tooltipItem.datasetIndex].label || '';
        if (label) {
            label += ': ';
        }
        var arrayAuxOldData = chart.ctx.canvas.id.indexOf('Total')>-1?_this.oldDataChart2:_this.oldDataChart;
        label += arrayAuxOldData[tooltipItem.datasetIndex][tooltipItem.index];
        return label;
      }
      chart.chart.options.plugins = {
        datalabels:{
          formatter: function(value,context){
            var arrayAuxOldData = chart.ctx.canvas.id.indexOf('Total')>-1?_this.oldDataChart2:_this.oldDataChart;
            return arrayAuxOldData[context.datasetIndex][context.dataIndex];
          }
        }
      };
      chart.chart.update();
    }
  }

  /*

  */
  getChartData(): void{
    this._chartService.getAtendData().subscribe(chartData => this.chartData = chartData);
  }

  getAggregatorChart(): void{
    this._chartService.getAtendAggregator().subscribe(aggregator => this.aggregator = aggregator);
  }

  getAtdPerformanceData(): void {
    this._chartService.getAnotherData().subscribe(chartData => this.dataPerfServico = chartData);
  }

  getAtdPerformanceAggregator(): void{
    this._chartService.getAnotherAggregator().subscribe(aggregator => this.aggrePerfServico = aggregator);
  }

  getAtdPerfTotalData(): void{
    this._chartService.getPerformanceTotalData().subscribe(chartData => this.dataPerformance = chartData);
  }

  getAtdPerfTotalAggregator(): void{
    this._chartService.getAggregatorPerfTotal().subscribe(aggregator => this.aggrePerformance = aggregator);
  }

  getFeedbackChartData(): void{
    this._chartService.getFeedbackData().subscribe(chartData => this.dataFeedback = chartData);
  }

  getAggregatorFeedback(): void{
    this._chartService.getAggregatorFeedback().subscribe(aggregator => this.aggreFeedback = aggregator);
  }

  getClassMediaChartData(): void{
    this._chartService.getDataClassMedia().subscribe(chartData => this.dataClassMedia = chartData);
  }

  getAggregatorClassMedia(): void{
    this._chartService.getAggregatorClassMedia().subscribe(aggregator => this.aggreClassMedia = aggregator);
  }


  /* Utils */

  calculatePercentage(datasets, chartID): void{
    //debugger;
    var tempomedio1 = datasets[0].data;
    var tempomedio2 = datasets[1].data;

    var arrayAuxOldData = chartID.indexOf('Total')>-1 ? this.oldDataChart2 : this.oldDataChart;
    //guardando valores para customizar o tooltip
    arrayAuxOldData[0] = tempomedio1.slice();
    arrayAuxOldData[1] = tempomedio2.slice();

    var total = 0;
    var temp = 0;
    for(var i=0 ; i < tempomedio1.length && i< tempomedio2.length ; i++){
      total = tempomedio1[i] + tempomedio2[i];
      temp = Math.ceil((tempomedio1[i]*100)/total);
      tempomedio1[i] = temp;
      tempomedio2[i] = 100-temp;
    }
    datasets[0].data = tempomedio1;
    datasets[1].data = tempomedio2;
  }

}
