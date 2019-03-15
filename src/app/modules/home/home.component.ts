import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import { faChartLine, faChartBar, faChartArea } from '@fortawesome/free-solid-svg-icons';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Chart } from 'chart.js';
import * as ChartZoom from 'chartjs-plugin-zoom';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Generics, SERVICOSTEMP, ATENDENTESTEMP} from '../../mock-dados-tabela';
import { METRICASDIM, CHARTDATAATDTIME, BARCHARTATDTIMEOPTIONS } from '../../mock-met-dim';
import { randomDataset } from '../../mock-charts';
import { ChartService } from '../../shared/services/chart.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DataSource } from '@angular/cdk/table';
import { ConsoleReporter } from 'jasmine';

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

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  
  public chartData;
  public aggregator;

  auxOldChartType='';
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

  //dados mockados para visualizar tabela de perfomance por serviços e atendentes
  dataSource = [];
  columnsToDisplay = [];
  expandedElement: Generics | null;
  //dados mockados para tabela de performance geral
  
  constructor(private chartService: ChartService) { }

  ngOnInit() {
    Chart.pluginService.register(ChartZoom);
    Chart.pluginService.register(ChartDataLabels);

    this.getChartData();
    this.getAggregatorChart();
    this.metricasOut = METRICASDIM.metricas;
    this.dimensoesOut = METRICASDIM.dimensoes;
    
    document.getElementById('trigger-charts').style.display="none";
  }

  getAggregatorChart(): void{
    this.chartService.getAtendAggregator().subscribe(aggregator => this.aggregator = aggregator);
  }

  getChartData(): void{
    this.chartService.getAtendData().subscribe(chartData => this.chartData = chartData);
  }

  getFeedbackChartData(): void{
    this.chartService.getFeedbackData().subscribe(chartData => this.chartData = chartData);
  }

  getAggregatorFeedback(): void{
    this.chartService.getAggregatorFeedback().subscribe(aggregator => this.aggregator = aggregator);
  }

  getClassMediaChartData(): void{
    this.chartService.getDataClassMedia().subscribe(chartData => this.chartData = chartData);
  }

  getAggregatorClassMedia(): void{
    this.chartService.getAggregatorClassMedia().subscribe(aggregator => this.aggregator = aggregator);
  }

  getAtdPerformanceData(): void{
    this.chartService.getAnotherData().subscribe(chartData => this.chartData = chartData);
  }

  getAtdPerformanceAggregator(): void{
    this.chartService.getAnotherAggregator().subscribe(aggregator => this.aggregator = aggregator);
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
      var filtraLine = this.chartData.find(cd => cd.type!=null && cd.type=="line");
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
      }
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
      var auxTeste = this.dimensoesIn.slice();
      var jaExiste = true;
      
      auxTeste.filter(function(obj){
        var val = obj['servico'];
      });
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
    
    //geração aleatória de dados será excluída assim que integrar com API
    for(let cd of this.chartData){
      if(cd.label.includes('Média mensal de avaliações')||cd.label.indexOf('média')>-1){
        cd.data = randomDataset(5,6);
      }else if(cd.label.includes('Total de avaliações')){
        cd.data = randomDataset(100,6);
      }else{
        cd.data = randomDataset(20,6);
        var aux = cd.label.slice().split("-");
        if(aux[0].indexOf('6')>-1||aux[0].indexOf('13')>-1||aux[0].indexOf('14')>-1||aux[0].indexOf('15')>-1
        || aux[0].indexOf('16')>-1 || aux[0].indexOf('17')>-1 || aux[0].indexOf('18')>-1){
          cd.data.pop();
        }
      }
    }
    //não é preciso mostrar os gráficos se não há filtros
    if(this.metricasIn.length==0 && this.dimensoesIn.length==0){
      document.getElementById('trigger-charts').style.display="none";
    }else{
      /*if(this.dimensoesIn.indexOf('Atendente')>-1 && this.dimensoesIn.indexOf('Serviço')>-1){
        this.dataSource = SERVICOS;
        this.columnsToDisplay = ['nome', 'agendados', 'concluidos', 'cancelados','naoconcluidos'];
      }else{
        this.dataSource = PERFORMANCE;
        this.columnsToDisplay = ['nome', 'agendados', 'concluidos', 'cancelados','naoconcluidos','mediaEspera','mediaAtd'];
      }*/
      document.getElementById('trigger-charts').style.display="block";
    }
    
    var _this = this;
    
    if(this.chart.chart.config.type=='horizontalBar' &&
      this.chart.chart.options.scales.xAxes.stacked){
        //o gráfico de barra horizontal empilhada é o único
        //que deve-se fazer a conversão para porcentagem 
      this.calculatePercentage();
    
      this.chart.chart.options.tooltips.callbacks.label = function(tooltipItem,data){
        var label = data.datasets[tooltipItem.datasetIndex].label || '';
        if (label) {
            label += ': ';
        }
        label += _this.oldDataChart[tooltipItem.datasetIndex][tooltipItem.index];
        return label;
      }
    }
    
    this.chart.chart.config.data.datasets = this.chartData;
    this.chart.chart.update();
  }

  calculatePercentage(): void{
    //debugger;
    var tempomedio1 = this.chartData[0].data;
    var tempomedio2 = this.chartData[1].data;
    //guardando valores para customizar o tooltip   
    this.oldDataChart[0] = tempomedio1.slice();
    this.oldDataChart[1] = tempomedio2.slice();

    var total = 0;
    var temp = 0;
    for(var i=0 ; i < tempomedio1.length && i< tempomedio2.length ; i++){
      total = tempomedio1[i] + tempomedio2[i];
      temp = Math.ceil((tempomedio1[i]*100)/total);
      tempomedio1[i] = temp;
      tempomedio2[i] = 100-temp;
    }
    this.chartData[0].data = tempomedio1;
    this.chartData[1].data = tempomedio2;
  }

  //eventos de clique para mudar tipo dos gráficos
  changeToLineChart(event: Event){
    var tipoGrafico = this.chart.chart.config.type+'';
    if(tipoGrafico.toUpperCase().indexOf('BAR')>0){
      this.auxOldChartType = this.chart.chart.config.type;
    }
    this.aggregator.barChartType = 'line';
    for(let cd of this.chartData){
      cd.fill = false;
      cd.borderColor = 'rgba(77,116,234,1.0)';
    }
    //criada visualização em variáveis separadas pois a simples troca tornava a visualização
    //um pouco mais difícil de enxergar
    var grafico_horarios = this.aggregator.barChartOptions.title.text=="Horários de Pico";
    if(grafico_horarios){
      this.chartData = CHARTDATAATDTIME;
      //this.aggregator.barChartOptions = BARCHARTATDTIMEOPTIONS;
      this.chart.chart.options = BARCHARTATDTIMEOPTIONS;
      
    }
  
    this.chart.chart.config.type = this.aggregator.barChartType;
    this.chart.chart.config.data.datasets = this.chartData;
    this.chart.chart.update();
  }

  changeToBarChart(event: Event){
    if(this.auxOldChartType.indexOf('horizontal')<0){
      this.chart.chart.config.type='bar';
      this.aggregator.barChartType = 'bar';
    }else{
      this.chart.chart.config.type='horizontalBar';
      this.aggregator.barChartType = 'horizontalBar';
    }
    var grafico_horarios = this.aggregator.barChartOptions.title.text=="Horários de Pico";
    if(grafico_horarios){
      this.getChartData();
      this.getAggregatorChart();
      this.chart.chart.options = this.aggregator.barChartOptions;
    }
    for(let cd of this.chartData){
      cd.borderColor = 'rgba(255,255,255,1.0)';
      delete cd.type;
      delete cd.fill;
    }
    this.chart.chart.config.data.datasets = this.chartData;
    this.chart.chart.update();
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
