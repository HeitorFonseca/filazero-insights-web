import { ChartData } from './chartdata';

export const CHARTDATA: ChartData[] = [
    {data: [0,0,0,0,0,0,0], label: 'Series A',backgroundColor:'rgba(225,10,24,0.2)',
     borderColor: 'rgba(200,20,24,0.2)'},
    {data: [0,0,0,0,0,0,0], label: 'Series B',
    type:'line',fill:false, backgroundColor: 'rgba(77,116,234,0.2)',borderColor: 'rgba(77,110,240,0.2)'}
];

export const BARCHARTTYPE = 'horizontalBar';
export const BARCHARTLEGEND = true;
export const BARCHARTLABELS = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
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

export function randomDataset(): number[]{
    var numb = [];
    for(let i=0 ; i < 7; i++){
        numb.push(Math.random() * 50);
    }
    return numb;
}