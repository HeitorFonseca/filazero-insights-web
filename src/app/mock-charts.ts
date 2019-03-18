import { ChartData } from './chartdata';

export const CHARTDATA: ChartData[] = [
    {data: [0,0,0], label: 'Series A',backgroundColor:'rgba(225,10,24,0.2)',
     borderColor: 'rgba(200,20,24,0.2)'},
    {data: [0,0,0], label: 'Series B',
    type:'line',fill:false, backgroundColor: 'rgba(77,116,234,0.2)',borderColor: 'rgba(77,110,240,0.2)'}
];

export const BARCHARTTYPE = 'bar';
export const BARCHARTTYPEHORIZONTAL = 'horizontalBar';
export const BARCHARTLEGEND = true;
export const BARCHARTLABELS = ['2006', '2007', '2008'];
export const BARCHARTOPTIONS = {
    scaleShowVerticalLines: false,
    responsive: true
};
export const BARCHARTCOLORS = [
    {
        backgroundColor: 'rgba(225,10,24,0.2)',
        borderColor: 'rgba(200,20,24,0.2)',
        pointBackgroundColor: 'rgba(200,20,24,0.2)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    {
        backgroundColor: 'rgba(77,116,234,0.2)',
        borderColor: 'rgba(77,110,240,0.2)',
        pointBackgroundColor: 'rgba(77,110,240,0.2)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,116,234,0.2)'
    }
];

export function randomDataset(multiplier, tamArray): number[]{
    var numb = [];
    for(let i=0 ; i < tamArray; i++){
        numb.push(Math.ceil(Math.random() * multiplier));
    }
    return numb;
}

export const BARCHARTTESTDATA: ChartData[] = [
    {data: [14,13,27], label: 'Tempo médio de espera',backgroundColor:'rgba(77,116,234,0.9)',
     borderColor: 'rgba(77,116,234,0.9)'},
    {data: [11,20,12], label: 'Tempo médio de atendimento',backgroundColor:'rgba(225,10,24,0.9)',
     borderColor: 'rgba(200,20,24,0.9)'}
];

export const BARCHARTPERFTOTALDATA: ChartData[] = [
    {data: [18], label: 'Tempo médio de espera',backgroundColor:'rgba(77,116,234,0.2)',
     borderColor: 'rgba(77,116,234,0.2)'},
    {data: [15], label: 'Tempo médio de atendimento',backgroundColor:'rgba(225,10,24,0.2)',
     borderColor: 'rgba(200,20,24,0.2)'}
];

export const BARCHARTATDPRFLABELS = ['Serviço 1', 'Serviço 2', 'Serviço 3'];

export const BARCHARTTESTOPTIONS = {
    responsive: true,
    title: {
        display: true,
        text: 'Performance de atendimento por serviço',
        fontSize: 15
    },
    scales: {
        xAxes: [
            {
                stacked: true,
                ticks: {
                    min: 0,
                    max: 100,
                    callback: function(value){return value+ "%"},
                    stepSize: 50                                                                                                                                                                          
                }
            }
        ],
        yAxes: [{stacked: true}]
    }
};

export const BARCHARTTOPTIONS = {
    responsive: true,
    title: {
        display: true,
        text: 'Performance de atendimento por serviço',
        fontSize: 15
    },
    scales: {
        xAxes: [
            {
                stacked: true,
                ticks: {
                    min: 0,
                    max: 100,
                    callback: function(value){return value+ "%"},
                    stepSize: 50                                                                                                                                                                          
                }
            }
        ],
        yAxes: [{stacked: true}]
    }
};
//GRÁFICO DE ATENDIMENTO
export const CHARTDATAATD: ChartData[] = [
    {data: [], label: '6-7h',backgroundColor:'rgba(77,116,234,1.0)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-1'},
    {data: [], label: '7-8h',backgroundColor: 'rgba(77,116,234,1.0)'
    , borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-2'},
    {data: [], label: '8-9h',backgroundColor:'rgba(77,116,234,1.0)',
    borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-3'},
    {data: [], label: '9-10h', backgroundColor: 'rgba(77,116,234,1.0)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-4'},
    {data: [], label: '10-11h', backgroundColor: 'rgba(77,116,234,1.0)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-5'},
    {data: [], label: '11-12h', backgroundColor: 'rgba(77,116,234,1.0)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-6'}, 
    {data: [], label: '13-14h', backgroundColor: 'rgba(77,116,234,1.0)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-7'},
    {data: [], label: '14-15h', backgroundColor: 'rgba(77,116,234,1.0)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-8'},
    {data: [], label: '15-16h', backgroundColor: 'rgba(77,116,234,1.0)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-9'},
    {data: [], label: '16-17h', backgroundColor: 'rgba(77,116,234,1.0)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-10'},
    {data: [], label: '17-18h', backgroundColor: 'rgba(77,116,234,1.0)',
     borderColor: 'rgba(255,255,255,1.0)', yAxisID:'atd-11'},
    {data: [], label: '18-19h', backgroundColor: 'rgba(77,116,234,1.0)',
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
        ticks:{
            padding: 50
        }
      }],
      yAxes: [{
        
        id: "atd-1",
        ticks: {
            min:0,
            max:20,
            display:false
        },
        scaleLabel:{
            display:true
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
    },
    plugins:{
        datalabels:{
            anchor: 'start',
            align:'end',
            font:{
                size:10
            },
            offset: -40,
            rotation: -90,
            formatter: function(value,context){
                return context.dataset.label;
            }
        }
    }
  };

//GRÁFICO DE FEEDBACK
export const CHARTDATAFEEDBACK: ChartData[] = [
    {data: [0,0,0], label: 'Média mensal de avaliações',backgroundColor:'rgba(225,10,24,0.2)',
     borderColor: 'rgba(200,20,24,0.2)',yAxisID:'y-media',datalabels:{
        anchor: 'center',
        clamp: true
    }},
    {data: [0,0,0], label: 'Total de avaliações',
     type:'line',fill:false, backgroundColor: 'rgba(77,116,234,0.7)',
     borderColor: 'rgba(77,110,240,0.2)', yAxisID:'y-total',datalabels:{
        anchor: 'start',
        clamp: true,
        align: 'end'
    }}
];
export const CHARTLABELSFEEDBACK = ['Ago/18','Set/18','Out/18'];
export const BARCHARTTOPTIONSFEEDB = {
    responsive: true,
    title: {
        display: true,
        text: 'Classificação mensal x Nº de avaliações',
        fontSize: 15
    },
    scales: {
        yAxes: [{
            id:'y-media',
            position:'left',
            ticks: {
                padding: 23,
                min: 0,
                max: 5,
                stepSize: 1
            }
        },{
            id:'y-total',
            position:'right',
            ticks: {
                min: 0,
                max: 100,
                stepSize: 10                                                                                                                                                                          
            }
        }]
    }
};

//gráfico de classificação média por serviço
export const BARCHARTDATACLASSMEDIA: ChartData[] = [
    {
        data: [], label: 'Classificação média',backgroundColor:'rgba(255, 153, 0, 0.8)',
        borderColor: 'rgba(255,255,255,0.9)'
    },
    {
        data: [], label: 'Total',backgroundColor:'rgba(0,0,225,0.8)',
        borderColor: 'rgba(255,255,255,0.9)'
    }
];
export const BARCHARTLABELSCLASSMEDIA = ['Serviço 1', 'Serviço 2'];
export const BARCHARTOPTCLASSMEDIA = {
    responsive: true,
    title: {
        display: true,
        text: 'Classificação média por serviço',
        fontSize: 15
    },
    plugins:{
        datalabels:{
            anchor: 'end',
            align: 'end',
            clamp: true,
            color: 'black',
            font:{
                size: '14'
            }
        }
    },
    scales:{
        xAxes: [{
            ticks: {
                min: 0,
                //callback: function(value){return value+ "%"},
                stepSize: 5                                                                                                                                                                          
            }
        }]    
    }
};
