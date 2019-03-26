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
    /*this.chartsHTML = document.getElementsByClassName('trigger-charts');
    for(var i=0;i<this.chartsHTML.length;i++){
      this.chartsHTML[i].style.display = 'none';
    }*/
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
   // console.log(this.auxOldChartType);
  }

  getDataFromServer(): void{
    this.chartService.getDataFromServer().subscribe(res=>{
      //this.auxOldChartType = res;
      //preenchimento de gráfico com média de tempo de espera e de atendimento de determinados serviços
      
      /*debugger;
        for(var i=0;i<this.dataPerformance.length;i++){
        var atual = this.dataPerformance[i];
        atual.data=[];
        if(atual.label.indexOf('espera')>-1){
          atual.data.push(res.performanceWaitAvgMin);
        }else{
          atual.data.push(res.performanceAtdAvgMin);
        } 
      }*/
      console.log(this.dataPerformance);
      for(let dt of this.dataPerformance){
        dt.data = [];
        if(dt.label.indexOf('espera')>-1){
          dt.data.push(res.performanceWaitAvgMin);
        }else{
          dt.data.push(res.performanceAtdAvgMin);
        }
      }
      
      console.log(this.dataPerformance);

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
    }else if(destino.indexOf("dimensoesIn")!=-1){
      this.dimensoesIn = event.container.data;
      var atendenteExiste = this.dimensoesIn.indexOf('Atendente')>-1;
      if(this.dimensoesIn.indexOf('Serviço')>-1){
        this.dataSource = SERVICOSTEMP;
        if(this.columnsToDisplay.indexOf('servico')==-1)this.columnsToDisplay.push('servico');
      }
      if(atendenteExiste){
        this.dataSource = ATENDENTESTEMP;
        if(this.columnsToDisplay.indexOf('atendente')==-1) this.columnsToDisplay.push('atendente');
      }//fazer método para simplificar e eliminar duplicação de código/lógica
      
    }else if(destino.indexOf("dimensoesOut")!=-1&&origem.indexOf("dimensoesIn")!=-1){
      this.dimensoesIn = event.previousContainer.data;
      
      if(this.columnsToDisplay.indexOf('servico')!=-1 && this.dimensoesIn.indexOf('Serviço')<0){
        var indexS = this.columnsToDisplay.indexOf('servico',0);
        this.columnsToDisplay.splice(indexS,1); 
        this.dataSource = this.columnsToDisplay.indexOf('atendente')!=-1 ? ATENDENTESTEMP : [];
      }else if(this.columnsToDisplay.indexOf('atendente')!=-1 && this.dimensoesIn.indexOf('Atendente')<0){
        this.dataSource = this.columnsToDisplay.indexOf('servico')!=-1 ? SERVICOSTEMP : [];
        var indexA = this.columnsToDisplay.indexOf('atendente',0);
        this.columnsToDisplay.splice(indexA,1);
      }
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
    //debugger;
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

  //eventos de clique para mudar tipo dos gráficos
  changeToLineChart(event: MouseEvent){
    console.log(event);
    /*var idCanvas = event.path.find(divCanvas => divCanvas.classList[0]=='trigger-charts').childNodes[0].childNodes[1].id;
    var canvasAtt = this.charts.toArray().find(chart => chart.cvs.id==idCanvas);
    
    var tipoGrafico = canvasAtt.chart.config.type+'';
    if(tipoGrafico.toUpperCase().indexOf('BAR')>-1){
      this.auxOldChartType = canvasAtt.chart.config.type;
    }
    canvasAtt.chart.config.type = 'line';
    for(let cd of canvasAtt.chart.config.data.datasets){
      //cd.fill = false;
      cd.borderColor = 'rgba(77,116,234,1.0)';
    }
    //criada visualização em variáveis separadas pois a simples troca tornava a visualização
    //um pouco mais difícil de enxergar
    var grafico_horarios = canvasAtt.chart.config.options.title.text=="Horários de Pico";
    if(grafico_horarios){
      this.aggregator.barChartType = 'line';
      this.chartData = CHARTDATAATDTIME;
      canvasAtt.chart.config.options = BARCHARTATDTIMEOPTIONS;
      canvasAtt.chart.config.type = this.aggregator.barChartType;
      canvasAtt.chart.config.data.datasets = this.chartData;
    }
    canvasAtt.chart.update();
    console.log(canvasAtt.chart.config);*/
  }

  changeToBarChart(event: MouseEvent){
    console.log(event.srcElement);
    
    /*var idCanvas = event.path.find(divCanvas => divCanvas.classList[0]=='trigger-charts').childNodes[0].childNodes[1].id;
    var canvasAtt = this.charts.toArray().find(chart => chart.cvs.id==idCanvas);
    
    if(this.auxOldChartType.indexOf('horizontal')<0){
      canvasAtt.chart.config.type='bar';
      //this.aggregator.barChartType = 'bar';
    }else{
      canvasAtt.chart.config.type='horizontalBar';
      //this.aggregator.barChartType = 'horizontalBar';
    }
    var grafico_horarios = canvasAtt.chart.options.title.text=="Horários de Pico";
    if(grafico_horarios){
      this.getChartData();
      this.getAggregatorChart();
      canvasAtt.chart.options = this.aggregator.barChartOptions;
      canvasAtt.chart.config.data.datasets = this.chartData;
    }
    for(let cd of canvasAtt.chart.config.data.datasets){
      cd.borderColor = 'rgba(255,255,255,1.0)';
      delete cd.type;
      delete cd.fill;
    }
    
    canvasAtt.chart.update();
    console.log(canvasAtt.chart);*/
  }

  getTotalAgendados(){
    return this.dataSource.map(s => s.agendados).reduce((acc, value) => acc + value, 0);
  }

  getTotalCancelados(){
    return this.dataSource.map(s => s.cancelados).reduce((acc, value) => acc + value, 0);
  }

  getTotalConcluidos(){
    return this.dataSource.map(s => s.concluidos).reduce((acc, value) => acc + value, 0);
  }

  getTotalNaoConcluidos(){
    return this.dataSource.map(s => s.naoconcluidos).reduce((acc, value) => acc + value, 0);
  }
}
