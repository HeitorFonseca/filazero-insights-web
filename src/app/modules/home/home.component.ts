import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import { faChartLine, faChartBar, faChartArea, faForward } from '@fortawesome/free-solid-svg-icons';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Chart } from 'chart.js';
//import * as ChartZoom from 'chartjs-plugin-zoom';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Generics, SERVICOSTEMP, ATENDENTESTEMP} from '../../mock-dados-tabela';
import { METRICASDIM, CHARTDATAATDTIME, BARCHARTATDTIMEOPTIONS } from '../../mock-met-dim';
import { randomDataset } from '../../mock-charts';
import { ChartService } from '../../shared/services/chart.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DataSource, CdkTableModule } from '@angular/cdk/table';


//moment().day("Monday").to
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HomeComponent implements OnInit {

  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;
  
  //dados mockados para todos os gráficos
  public chartData;
  public dataPerformance;
  public dataPerfServico;
  public dataClassMedia;
  public dataFeedback;
  //dados mockados para opções de todos os gráficos
  public aggregator;
  public aggrePerformance;
  public aggrePerfServico;
  public aggreClassMedia;
  public aggreFeedback;

  auxOldChartType;
  metricasOut: string[];
  dimensoesOut: string[];
  metricasIn = [];
  dimensoesIn = [];
  colunasIn = [];
  //ícones font awesome
  faChartBar = faChartBar;
  faChartLine = faChartLine;
  faChartArea = faChartArea;

  //para guardar valores originais dos dados de performance de atendimento
  //e serem exibidos no tooltip
  oldDataChart = [];
  oldDataChart2 = [];

  //dados mockados para visualizar tabela de perfomance por serviços e atendentes
  dataSource = [];
  columnsToDisplay = [];
  expandedElement: Generics | null;
  
  chartsHTML;

  constructor(private chartService: ChartService) { }

  ngOnInit() {
    //Chart.pluginService.register(ChartZoom);
    Chart.pluginService.register(ChartDataLabels);
    //Chart.pluginService.register(ChartAnnotation);
    //pegando dados mockados para todos os gráficos

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
    this.metricasOut = METRICASDIM.metricas;
    this.dimensoesOut = METRICASDIM.dimensoes;
    
    this.getDataFromServer();
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
    }
   // console.log(this.auxOldChartType);
  }

  getDataFromServer(): void{
    this.chartService.getDataFromServer().subscribe(res=>{
       //prenchimento de gráfico de performance de atendimento por serviço
       this.aggrePerfServico.barChartLabels = [];
       this.dataPerfServico.forEach(dt=>{
         dt.data = [];
       });
       for(let servico of res.dataPerformanceTimePerService){
         this.aggrePerfServico.barChartLabels.push(servico.serviceName);
         this.dataPerfServico.forEach(dt =>{
           if(dt.label.indexOf('espera')>-1){
             dt.data.push(servico.avgTimeWait);
           }else{
             dt.data.push(servico.avgTimeAtd);
           }
         });
       }
      //preenchimento de gráfico com média de tempo de espera e de atendimento de determinados serviços   
      for(let dt of this.dataPerformance){
        //dt.data = [];
        if(dt.label.indexOf('espera')>-1){
          dt.data.push(res.performanceWaitAvgMin);
        }else{
          dt.data.push(res.performanceAtdAvgMin);
        }        
      }
      //preenchimento de gráfico de classificação média e total por serviço
      this.dataClassMedia.forEach(dcm =>{
        dcm.data = [];
      });
      this.aggreClassMedia.barChartLabels = [];
      for(let servico of res.dataFeedbackPerService){
        this.aggreClassMedia.barChartLabels.push(servico.serviceName);
        this.dataClassMedia.forEach(dcm =>{
          if(dcm.label.indexOf('Classi')>-1){
            dcm.data.push(servico.averageRate);
          }else{
            dcm.data.push(servico.totalRatings);
          }
        });
      }
      //preenchimento de gráfico de feedbacks durante os meses de acordo com intervalo de tempo fornecido
      this.aggreFeedback.barChartLabels = [];
      this.dataFeedback.forEach(dfb =>{
        dfb.data = [];
      });
      for(let mes of res.dataAvgRatePerMonth){
        this.aggreFeedback.barChartLabels.push(mes.monthShort);
        for(let dfb of this.dataFeedback){
          if(dfb.label.indexOf('Média geral')>-1){
            dfb.data.push(res.totalRatings);
          }else if(dfb.label.indexOf('mensal')>-1){
            dfb.data.push(mes.averageRate);
          }else{
            dfb.data.push(mes.countRate);
          }
        }
      }

      for(let rushHour of res.dataScheduleAtdWeek){ 
        var indiceDia = this.aggregator.barChartLabels.indexOf(rushHour.weekdayName);
        
        var dado = this.chartData.filter(cd => cd.label.indexOf(rushHour.hourIntervalAtdList.hourInterval)>-1);
        for(var i=0; i < indiceDia; i++){
          dado[0].data.push(0); //caso não tenha informações sobre os outros dias anteriores
          //é necessário acrescentar 0s por conta da lógica de armazenar os dados
        }
        dado[0].data.push(rushHour.hourIntervalAtdList.countAtd);
      }
      
      this.charts.forEach(child=>{
        if(child.chart.config.type=='horizontalBar' && child.chart.options.scales.xAxes[0].stacked){
          //console.log(child.chart.config.data.datasets);
          if(child.chart.ctx.canvas.id.indexOf('Servi')>-1){
            this.calculatePercentage(this.dataPerfServico,child.chart.ctx.canvas.id);
          }else{
            this.calculatePercentage(child.chart.config.data.datasets,child.chart.ctx.canvas.id);
          }
        }
        child.chart.update();
      });
    });
  }

  getAggregatorChart(): void{
    this.chartService.getAtendAggregator().subscribe(aggregator => this.aggregator = aggregator);
  }

  getChartData(): void{
    this.chartService.getAtendData().subscribe(chartData => this.chartData = chartData);
  }

  getFeedbackChartData(): void{
    this.chartService.getFeedbackData().subscribe(chartData => this.dataFeedback = chartData);
  }

  getAggregatorFeedback(): void{
    this.chartService.getAggregatorFeedback().subscribe(aggregator => this.aggreFeedback = aggregator);
  }

  getClassMediaChartData(): void{
    this.chartService.getDataClassMedia().subscribe(chartData => this.dataClassMedia = chartData);
  }

  getAggregatorClassMedia(): void{
    this.chartService.getAggregatorClassMedia().subscribe(aggregator => this.aggreClassMedia = aggregator);
  }

  getAtdPerformanceData(): void{
    this.chartService.getAnotherData().subscribe(chartData => this.dataPerfServico = chartData);
  }

  getAtdPerformanceAggregator(): void{
    this.chartService.getAnotherAggregator().subscribe(aggregator => this.aggrePerfServico = aggregator);
  }

  getAtdPerfTotalData(): void{
    this.chartService.getPerformanceTotalData().subscribe(chartData => this.dataPerformance = chartData);
  }

  getAtdPerfTotalAggregator(): void{
    this.chartService.getAggregatorPerfTotal().subscribe(aggregator => this.aggrePerformance = aggregator);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    //mudanças na tabela mockada
    var destino = event.container.element.nativeElement.id;
    var origem = event.previousContainer.element.nativeElement.id;
    
    if(destino.indexOf("metricasin")!=-1){
     // debugger;
      this.metricasIn = event.container.data;
      /*var filtraLine = this.chartData.find(cd => cd.type!=null && cd.type=="line");
      if(this.metricasIn.includes("Média")){
        if(filtraLine!=undefined){
          this.chartData.splice(
            this.chartData.indexOf(
              this.chartData.find(cd => cd.type!=null && cd.type=="line"))
            ,1);  
        }
        //atualizando gráfico apenas com o filtro, depois integrar com
        //queries para que funcione corretamente
      }else{
        if(filtraLine!=undefined){
          this.chartData.find(cd => cd.type!=null && cd.type=="line").data = randomDataset(20,6);
        }else{
          if(this.aggregator.barChartType!='horizontalBar'){
            //var novo : ChartData;
            var novo = {
              data: randomDataset(20,6),
              label: 'teste',
              type: "line",
              fill: false,
              backgroundColor: 'rgba(77,116,234,0.2)',
              borderColor: 'rgba(255,255,255,0.9)'
            };
            this.chartData.push(novo);
          }
        }
      }*/
    }
    /*
    //não é preciso mostrar os gráficos se não há filtros
    if(this.metricasIn.length==0 && this.dimensoesIn.length==0){
      for(var i=0;i<this.chartsHTML.length;i++){
        this.chartsHTML[i].style.display = 'none';
      }
    }else{
      if(this.dimensoesIn.indexOf('Atendente')>-1 && this.dimensoesIn.indexOf('Serviço')>-1){
        this.dataSource = SERVICOS;
        this.columnsToDisplay = ['nome', 'agendados', 'concluidos', 'cancelados','naoconcluidos'];
      }else{
        this.dataSource = PERFORMANCE;
        this.columnsToDisplay = ['nome', 'agendados', 'concluidos', 'cancelados','naoconcluidos','mediaEspera','mediaAtd'];
      }
      for(var i=0;i<this.chartsHTML.length;i++){
        this.chartsHTML[i].style.display = 'block';
      }
    }
    
    var _this = this;
    
    var performanceAtdCharts = this.charts.toArray().filter(item =>
      //o gráfico de barra horizontal empilhada é o único
      //que deve-se fazer a conversão para porcentagem 
      item.chart.config.type=='horizontalBar' &&
       item.chart.options.scales.xAxes[0].stacked
    );
    
    for(let chart of performanceAtdCharts){
      this.calculatePercentage(chart.datasets,chart.ctx.canvas.id);
    
      chart.chart.options.tooltips.callbacks.label = function(tooltipItem,data){
        var label = data.datasets[tooltipItem.datasetIndex].label || '';
        if (label) {
            label += ': ';
        }
        var arrayAuxOldData = chart.ctx.canvas.id.indexOf('Total')>-1?_this.oldDataChart2:_this.oldDataChart;
        label += arrayAuxOldData[tooltipItem.datasetIndex][tooltipItem.index];
        return label;
      }
    }
    //console.log(this.charts);
    //this.charts.first.chart.config.data.datasets = this.chartData;
    this.charts.forEach(child => {
      child.chart.update();
    })*/
  }

  calculatePercentage(datasets, chartID): void{
    var tempomedio1 = datasets[0].data;
    var tempomedio2 = datasets[1].data;

    var arrayAuxOldData = chartID.indexOf('Total')>-1?this.oldDataChart2:this.oldDataChart;
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
