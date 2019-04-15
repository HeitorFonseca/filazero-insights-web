import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChildren, QueryList, ViewChild, OnChanges  } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { HttpParams } from '@angular/common/http';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { ChartService } from '../../../shared/services/chart.service';
import { ReportsService } from '../../../shared/services/reports.service';
import { UserPreferencesService } from '../../../shared/services/user-preferences.service';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit{

 /* @ViewChild(FilterReportsComponent) 
  private filterReportsComponent: FilterReportsComponent;*/
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

  public labels = {}; //não usado nos gráficos, e sim nos cards
  //para guardar valores originais dos dados de performance de atendimento
  //e serem exibidos no tooltip
  oldDataChart = [[],[]];
  oldDataChart2 = [[],[]];

  constructor(private _chartService: ChartService,
    private _reportService: ReportsService) { 

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

  ngOnInit() {

    Chart.pluginService.register(ChartDataLabels);

    /* zerando os dados para deixar de guardar informações de outras requisições à API*/
    this.chartData.forEach(cd => {
      cd.data = [0,0,0,0,0,0,0];
    });
    this.dataClassMedia.forEach(dcm=>{
      dcm.data = [];
    });
    this.dataFeedback.forEach(df=>{
      df.data = [];
    });
    this.dataPerfServico.forEach(dps =>{
      dps.data = [];
    });
    this.dataPerformance.forEach(dps =>{
      dps.data = [];
    });
    //limpando dados também de categorias(labels) de alguns gráficos
    this.aggreClassMedia.barChartLabels = [];
    this.aggreFeedback.barChartLabels = [];
    this.aggrePerfServico.barChartLabels = [];
  }

  chamaApiFiltro(filtros, fromDate, toDate){
    if(filtros.length>1
      && filtros.find(el => el.value=='Servico') 
      && filtros.find(el => el.value=='Atendente')){
      var servicos = filtros.filter(el => el.value=='Servico');
      var atendentes = filtros.filter(el => el.value=='Atendente');
      var s1 = [];
      var a1 = [];
      servicos.forEach(el =>{
        s1.push(el.id);
      });
      atendentes.forEach(at =>{
        a1.push(at.id);
      });

      const fromDateParam = new Date(Number(fromDate.substring(0,fromDate.indexOf('-'))),
       Number(fromDate.substring(fromDate.indexOf('-')+1,fromDate.lastIndexOf('-'))) - 1,
       Number(fromDate.substring(fromDate.lastIndexOf('-')+1)));
      const dateFormatfromDate = fromDateParam.toISOString().substring(0, 10);
      const dateTimezoneLocation = moment.tz(dateFormatfromDate, "America/Sao_Paulo").utc().format();
      
      const toDateParam = new Date(Number(toDate.substring(0,toDate.indexOf('-'))),
       Number(toDate.substring(toDate.indexOf('-')+1,toDate.lastIndexOf('-'))) - 1,
       Number(toDate.substring(toDate.lastIndexOf('-')+1)));
      const dateFormatToDate = toDateParam.toISOString().substring(0, 10);
      const toDateTimezoneLocation = moment.tz(dateFormatToDate, "America/Sao_Paulo").endOf('day').utc().format();

      var params = {
        startDate: dateTimezoneLocation,
        endDate: toDateTimezoneLocation,
        serviceIds: s1,
        attendantIds: a1
      }
      //cada gráfico tem uma chamada separada, para não haver sobrecarga de queries em uma chamada única
      this.getDataPerformanceTotal(params);
      this.getDataPerfomancePerService(params);
      this.getDataAvgRate(params);
      this.getDataHourRush(params);
      this.getDataAttendances(params);
      this.getDataClassMediaReports(params);
    }
  }

  recebeFiltro(filtro){
    var filtros = filtro.filter.ticketFilter;
    this.chamaApiFiltro(filtros,filtro.fromDate,filtro.toDate);
  }

  recebeDatas(event){
    var filtros = event.filter.ticketFilter;
    this.chamaApiFiltro(filtros,event.fromDate,event.toDate);
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

  async getDataAttendances(params){
    let data = await this._reportService.getAttendancesFromServer(params);
    var __this = this;
    data.subscribe(dados =>{
      __this.labels['agendados'] = dados.totalAgendados;
      __this.labels['concluidos'] = dados.totalConcluidos;
      __this.labels['naoConcluidos'] = dados.totalNaoConcluidos;
      __this.labels['avaliacoes'] = {
        media: dados.mediaAvaliacoes,
        total: dados.totalAvaliacoes
      }
    });
  }

  async getDataPerformanceTotal(params){
    for (let asd of this.dataPerformance) {
      asd.data = [];
    }
    this.oldDataChart2 = [[],[]];
    var __this = this;
    let dados = await this._reportService.getDataPerformFromServer(params);
    dados.subscribe(data =>{
      //preenchimento de gráfico com média de tempo de espera e de atendimento de determinados serviços   
      __this.calculaPorcentagemTeste(Math.ceil(data.performanceWaitAvgMin),
        Math.ceil(data.performanceAtdAvgMin), 'Total', __this.dataPerformance);
        
      var chartPerformanceTotal = __this.charts.toArray().find(child => 
        child.chart.ctx.canvas.id.indexOf('Total')>-1 && child.chart.config.type=='horizontalBar' &&
        child.chart.options.scales.xAxes[0].stacked);
      if(chartPerformanceTotal!=undefined){
        chartPerformanceTotal.chart.options.tooltips.callbacks.title=function(tooltipItem, data){
          return '';
        }
        chartPerformanceTotal.chart.config.data.datasets = chartPerformanceTotal.datasets;
        __this.customTooltipPlugins(__this.oldDataChart2,__this.aggrePerformance);
        chartPerformanceTotal.chart.options.tooltips.callbacks.label = __this.aggrePerformance.barChartOptions.tooltips.callbacks.label;
        chartPerformanceTotal.chart.options.plugins.datalabels = __this.aggrePerformance.barChartOptions.plugins.datalabels

        chartPerformanceTotal.chart.update();
      }
    });
  }

  async getDataPerfomancePerService(params){
    this.aggrePerfServico.barChartLabels = [];
    for(let dt of this.dataPerfServico){
      dt.data = [];
    }
    this.oldDataChart = [[],[]];
    var __this = this;
    let dados = await this._reportService.getDataPerformPerServiceFromServer(params);
    dados.subscribe(data => {
      for(let servico of data.dataPerformanceTimePerService){
        __this.aggrePerfServico.barChartLabels.push(servico.serviceName);
        __this.calculaPorcentagemTeste(Math.ceil(servico.avgTimeWait),Math.ceil(servico.avgTimeAtd),
          'Servico',__this.dataPerfServico);      
      }
      __this.customTooltipPlugins(__this.oldDataChart,__this.aggrePerfServico);

      var performanceSrvcChart = __this.charts.toArray().find(item =>
        //o gráfico de barra horizontal empilhada é o único
        //que deve-se fazer a conversão para porcentagem 
        item.chart.config.type=='horizontalBar' &&
        item.chart.options.scales.xAxes[0].stacked &&
        item.chart.ctx.canvas.id.indexOf('perfServico')>-1
      );

      if(performanceSrvcChart!=undefined){
        performanceSrvcChart.chart.config.data.datasets = performanceSrvcChart.datasets;
        performanceSrvcChart.chart.options.tooltips.callbacks.label = __this.aggrePerfServico.barChartOptions.tooltips.callbacks.label;
        performanceSrvcChart.chart.options.plugins.datalabels = __this.aggrePerfServico.barChartOptions.plugins.datalabels
        performanceSrvcChart.chart.update();
      }
    });
  }

  async getDataAvgRate(params){
    this.aggreFeedback.barChartLabels = [];
    this.dataFeedback.forEach(dfb =>{
      dfb.data = [];
    });
    var __this = this;
    let data = await this._reportService.getDataAvgRateFromServer(params);
    data.subscribe(res => {
      for(let mes of res.dataAvgRatePerMonth){
        __this.aggreFeedback.barChartLabels.push(mes.monthShort);
        for(let dfb of __this.dataFeedback){
          if(dfb.label.indexOf('Média geral')>-1){
            dfb.data.push(res.totalRatings);
          }else if(dfb.label.indexOf('mensal')>-1){
            dfb.data.push(mes.averageRate);
          }else{
            dfb.data.push(mes.countRate);
          }
        }
      }

      __this.dataFeedback.find(dtf => dtf.label=='Média geral').datalabels = {
        anchor: 'start',
        clamp: true,
        align: 'end',
        formatter: function(value, context){
          if(context.dataIndex==Math.ceil(__this.dataFeedback[0].data.length/2)){
              return value;
          }else{
              return "";
          }
        }
      };
      
      var chart = __this.charts.toArray().find(el => el.chart.ctx.canvas.id.indexOf('classMediaMes')>-1);
      if(chart != undefined){        
        chart.chart.update();
      }
    });  
  }

  async getDataHourRush(params){
    for(let cd of this.chartData){
      cd.data = [0,0,0,0,0,0,0];
    }
    var __this = this;

    let data = await this._reportService.getDataRushHourFromServer(params);
    data.subscribe(res =>{
      __this.chartData.forEach(dados =>{
        var dias = res.dataScheduleAtdWeek.filter(el => 
          el.hourIntervalsAtdList
          .find(h=>dados.label.indexOf(h.hourInterval.substring(0,h.hourInterval.indexOf('-')+1))==0));
  
        if(dias.length>0){
          for(let dia of dias){
            dados.data[__this.aggregator.barChartLabels.indexOf(dia.weekdayName)] +=
              dia.hourIntervalsAtdList.find(h => dados.label.indexOf(h.hourInterval.substring(0,h.hourInterval.indexOf('-')+1))==0).countAtd;
          }
        }  
      });

      var chart = __this.charts.toArray().find(el => el.chart.ctx.canvas.id.indexOf('horariosPico')>-1);
      if(chart!=undefined){
        chart.chart.datasets = __this.chartData;
        chart.chart.config.data.datasets = __this.chartData;
        chart.chart.update();
      }
    });
  }

  async getDataClassMediaReports(params){
    var __this = this;

    this._reportService.getDataFromServer(params).subscribe(res =>{
      if(res['responseData'] && res['responseData']==null)
        return;

      //preenchimento de gráfico de classificação média e total por serviço
      __this.dataClassMedia.forEach(dcm =>{
        dcm.data = [];
      });

      __this.aggreClassMedia.barChartLabels = [];

      for(let servico of res.dataFeedbackPerService){
        __this.aggreClassMedia.barChartLabels.push(servico.serviceName);
        __this.dataClassMedia.forEach(dcm =>{
          if(dcm.label.indexOf('Classi')>-1){
            dcm.data.push(servico.averageRate);
          }else{
            dcm.data.push(servico.totalRatings);
          }
        });
      }
      
      var chart = __this.charts.toArray().find(el => el.chart.ctx.canvas.id.indexOf('classMediaServico')>-1);
      if(chart!=undefined){
        chart.chart.update();
      }
    });
  }

  /* Utils
   */

  calculaPorcentagemTeste(val1, val2, id, dataset){
    //console.log(dataset);
    //debugger;
    var arrayAuxOldData = id.indexOf('Total')>-1 ? this.oldDataChart2 : this.oldDataChart;
    arrayAuxOldData[0].push(val1);
    arrayAuxOldData[1].push(val2); //primeiro guarda valores originais

    var total= val1+val2;
    var temp = Math.ceil((val1*100)/total);
    dataset[0].data.push(temp);
    dataset[1].data.push(100-temp);
  }

  customTooltipPlugins(auxArray,aggregator){
    aggregator.barChartOptions['plugins'] = {
        datalabels:{
          formatter: function(value,context){              
            return auxArray[context.datasetIndex][context.dataIndex];
          }
        }
    }
    aggregator.barChartOptions.tooltips = {
      callbacks:{
        label: function(tooltipItem,chart){
          return chart.datasets[tooltipItem.datasetIndex].label+': '
          +auxArray[tooltipItem.datasetIndex][tooltipItem.index];
        }
      }
    }
  }
}
