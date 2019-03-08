import { MetDim } from './met-dim';

export const METRICASDIM : MetDim = {
    metricas:["Total","Média"],
    dimensoes:["Atendente","Feedback","Serviço","Dia",
    "Mês","Trimestre","Semestre","Ano","Hora"]
}

/*gráfico mockado para horários de pico - sem label de horário abaixo das barras

export const CHARTDATAATD: ChartData[] = [
    {data: [], label: '7-8h',backgroundColor:'rgba(77,116,234,0.65)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-1'},
    {data: [], label: '8-9h',backgroundColor: 'rgba(77,234,116,0.65)'
    , borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-2'},
    {data: [], label: '9-10h',backgroundColor:'rgba(77,150,234,0.65)',
    borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-3'},
    {data: [], label: '10-11h', backgroundColor: 'rgba(100,116,234,0.65)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-4'},
    {data: [], label: '11-12h', backgroundColor: 'rgba(100,220,116,0.65)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-5'},
    {data: [], label: '12-13h', backgroundColor: 'rgba(77,170,240,0.65)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-6'}, 
    {data: [], label: '13-14h', backgroundColor: 'rgba(45,116,234,0.65)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-7'},
    {data: [], label: '14-15h', backgroundColor: 'rgba(77,0,234,0.65)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-8'},
    {data: [], label: '15-16h', backgroundColor: 'rgba(30,116,234,0.65)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-9'},
    {data: [], label: '16-17h', backgroundColor: 'rgba(77,100,210,0.65)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-10'},
    {data: [], label: '17-18h', backgroundColor: 'rgba(100,65,210,0.65)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-11'},
    {data: [], label: '18-19h', backgroundColor: 'rgba(77,55,234,0.65)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-12'}  
];
export const BARCHARTLABELSATD = ['Segunda-feira', 'Terça-feira', 'Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
export const BARCHARTATDOPTIONS = {
    scaleShowVerticalLines: false,
    title: {
        display: true,
        text: 'Horários de Pico',
        fontSize: 15
    },
    scales: {
      xAxes: [{
        barPercentage: 1,
        categoryPercentage: 0.7
      }],
      yAxes: [{
        
        id: "atd-1",
        ticks: {
            min:0,
            max:20,
            display:false
        }
      }, {
        display:false,
        id: "atd-2",
        ticks: {
            min:0,
            max:20,
            display:false
        }
      }, {
        display:false,
        id: "atd-3",
        ticks: {
            min:0,
            max:20,
            display:false
        }
      }, {
        display:false,
        id: "atd-4",
        ticks: {
            min:0,
            max:20,
            display:false
        }
      }, {
        display:false,
        id: "atd-5",
        ticks: {
            min:0,
            max:20,
            display:false
        }
      }, {
        display:false,
        id: "atd-6",
        ticks: {
            min:0,
            max:20,
            display:false
        }
      }, {
        display:false,
        id: "atd-7",
        ticks: {
            min:0,
            max:20,
            display:false
        }
      }, {
        display:false,
        id: "atd-8",
        ticks: {
            min:0,
            max:20,
            display:false
        }
      }, {
        display:false,
        id: "atd-9",
        ticks: {
            min:0,
            max:20,
            display:false
        }
      }, {
        display:false,
        id: "atd-10",
        ticks: {
            min:0,
            max:20,
            display:false
        }
      }, {
        display:false,
        id: "atd-11",
        ticks: {
            min:0,
            max:20,
            display:false
        }
      }, {
        display:false,
        id: "atd-12",
        ticks: {
            min:0,
            max:20,
            display:false
        }
      }]
    }
  };

*/