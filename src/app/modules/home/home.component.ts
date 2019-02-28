import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import { ChartService } from '../../shared/services/chart.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartData } from '../../chartdata';
import { METRICASDIM } from '../../mock-met-dim';
import { randomDataset } from '../../mock-charts';
import { faChartLine, faChartBar, faChartArea } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  
  public chartData: ChartData[];
  public aggregator;
  metricasOut: string[];
  dimensoesOut: string[];
  metricasIn = [];
  dimensoesIn = [];
  //ícones font awesome
  faChartBar = faChartBar;
  faChartLine = faChartLine;
  faChartArea = faChartArea;

  constructor(private chartService: ChartService) { }

  ngOnInit() {
    this.getAggregatorChart();
    this.getChartData();
    this.metricasOut = METRICASDIM.metricas;
    this.dimensoesOut = METRICASDIM.dimensoes;
    //this.chartData = [];
    document.getElementById('trigger-charts').style.display="none";
  }

  getAggregatorChart(): void{
    this.chartService.getAggregatorChart()
    .subscribe(aggregator => this.aggregator = aggregator);
  }

  getChartData(): void{
    this.chartService.getChartData()
    .subscribe(chartData => this.chartData = chartData);
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
    
    if(destino.indexOf("metricasin")!=-1){
      this.metricasIn = event.container.data;
      var filtraLine = this.chartData.find(cd => cd.type!=null && cd.type=="line");
      if(this.metricasIn.includes("média")){
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
          this.chartData.find(cd => cd.type!=null && cd.type=="line").data = randomDataset();
        }else{
          var novo : ChartData;
          novo = {
            data: randomDataset(),
            label: 'teste',
            type: "line",
            fill: false,
            backgroundColor: 'rgba(77,116,234,0.2)',
            borderColor: 'rgba(77,110,240,0.2)'
          };
          this.chartData.push(novo);
        }
      }
    }else if(destino.indexOf("dimensoesIn")!=-1){
      this.dimensoesIn = event.container.data;
    }
    for(let cd of this.chartData){
      cd.data = randomDataset();
    }
    //não é preciso mostrar os gráficos se não há filtros
    if(this.metricasIn.length==0 && this.dimensoesIn.length==0){
      document.getElementById('trigger-charts').style.display="none";
    }else{
      document.getElementById('trigger-charts').style.display="block";
    }
    this.chart.chart.config.data.datasets = this.chartData;
    this.chart.chart.update();
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<number>) {
    return item.data % 2 === 0;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }

}
