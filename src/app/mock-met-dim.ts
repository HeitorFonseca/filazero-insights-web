import { MetDim } from './met-dim';
import { ChartData } from './chartdata';

export const METRICASDIM : MetDim = {
    metricas:["Total","Média"],
    dimensoes:["Atendente","Feedback","Serviço","Dia",
    "Mês","Trimestre","Semestre","Ano","Hora"]
}

//gráfico mockado para horários de pico - sem label de horário abaixo das barras

export const CHARTDATAATDTIME = [
    {data: [
      {
        x: "06:00", y: 5
      }, {
        x: "07:00", y: 10
      }, {
        x: "08:00", y: 18
      }, {
        x: "09:00", y: 17
      }, {
        x: "10:00", y: 9
      }, {
        x: "11:00", y: 8
      }, {
        x: "12:00", y: 7
      }, {
        x: "13:00", y: 12
      }, {
        x: "14:00", y: 5
      }, {
        x: "15:00", y: 8
      }, {
        x: "16:00", y: 13
      }, {
        x: "17:00", y: 3
      }, {
        x: "18:00", y: 4
      }
    ], label: 'Segunda-feira', fill:false, borderColor: 'rgba(255,0,255,1.0)'},
    {data: [
      {
        x: "06:00", y: 5
      }, {
        x: "07:00", y: 4
      }, {
        x: "08:00", y: 19
      }, {
        x: "09:00", y: 16
      }, {
        x: "10:00", y: 14
      }, {
        x: "11:00", y: 11
      }, {
        x: "12:00", y: 6
      }, {
        x: "13:00", y: 13
      }, {
        x: "14:00", y: 10
      }, {
        x: "15:00", y: 7
      }, {
        x: "16:00", y: 6
      }, {
        x: "17:00", y: 5
      }, {
        x: "18:00", y: 1
      }
    ], label: 'Terça-feira', fill:false, borderColor: 'rgba(0,0,255,1.0)'},
    {data: [
      {
        x: "06:00", y: 13
      }, {
        x: "07:00", y: 3
      }, {
        x: "08:00", y: 11
      }, {
        x: "09:00", y: 4
      }, {
        x: "10:00", y: 12
      }, {
        x: "11:00", y: 5
      }, {
        x: "12:00", y: 16
      }, {
        x: "13:00", y: 1
      }, {
        x: "14:00", y: 16
      }, {
        x: "15:00", y: 8
      }, {
        x: "16:00", y: 9
      }, {
        x: "17:00", y: 20
      }, {
        x: "18:00", y: 1
      }
    ], label: 'Quarta-feira', fill:false, borderColor: 'rgba(0,255,0,1.0)'},
    {data: [
      {
        x: "06:00", y: 13
      }, {
        x: "07:00", y: 17
      }, {
        x: "08:00", y: 10
      }, {
        x: "09:00", y: 11
      }, {
        x: "10:00", y: 18
      }, {
        x: "11:00", y: 4
      }, {
        x: "12:00", y: 9
      }, {
        x: "13:00", y: 11
      }, {
        x: "14:00", y: 6
      }, {
        x: "15:00", y: 2
      }, {
        x: "16:00", y: 17
      }, {
        x: "17:00", y: 14
      }, {
        x: "18:00", y: 11
      }
    ], label: 'Quinta-feira', fill:false, borderColor: 'rgba(0,0,0,1.0)'},
    {data: [
      {
        x: "06:00", y: 20
      }, {
        x: "07:00", y: 20
      }, {
        x: "08:00", y: 4
      }, {
        x: "09:00", y: 8
      }, {
        x: "10:00", y: 10
      }, {
        x: "11:00", y: 20
      }, {
        x: "12:00", y: 16
      }, {
        x: "13:00", y: 11
      }, {
        x: "14:00", y: 17
      }, {
        x: "15:00", y: 6
      }, {
        x: "16:00", y: 4
      }, {
        x: "17:00", y: 1
      }, {
        x: "18:00", y: 20
      }
    ], label: 'Sexta-feira', fill:false, borderColor: 'rgba(255,0,0,1.0)'},
    {data: [
      {
        x: "07:00", y: 3
      }, {
        x: "08:00", y: 12
      }, {
        x: "09:00", y: 7
      }, {
        x: "10:00", y: 10
      }, {
        x: "11:00", y: 2
      }, {
        x: "12:00", y: 15
      }, {
        x: "13:00", y: 2
      }
    ], label: 'Sábado', fill:false, borderColor: 'rgba(125,125,0,1.0)',lineTension:0.3}  
];
export const BARCHARTATDTIMEOPTIONS = {
    responsive: true,
    title: {
        display: true,
        text: 'Horários de Pico',
        fontSize: 15
    },
    scales: {
      xAxes: [{
        type:'time',
        time:{
          parser: 'HH',
          min: '06:00:00',
          max: '18:00:00',
          stepSize: 1
        },
        ticks:{
          padding: 20 
        }
      }],
      yAxes:[{
        ticks:{
          beginAtZero:true
        },
        scaleLabel:{
          display: true,
          labelString: 'Qtd. atendimentos'
        }
      }]
    },
    plugins:{
      datalabels:{
        anchor:'start',
        align:'bottom',
        formatter: function(context){
          return context.y;
        }
      }
    }
  };
