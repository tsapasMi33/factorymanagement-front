import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import DataLabelsPlugin from "chartjs-plugin-datalabels";
import {Benefit} from "../../../../core/models/Benefit.model";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {

  level: string = '';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Output() barClicked = new EventEmitter<any>

  constructor() {
  }



  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public chartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor:
          [
            'hsla(0, 100%, 50%, 0.7)', 'hsla(35, 100%, 50%, 0.7)', 'hsla(70, 100%, 50%, 0.7)', 'hsla(105, 100%, 50%, 0.7)', 'hsla(140, 100%, 50%, 0.7)',
            'hsla(175, 100%, 50%, 0.7)', 'hsla(210, 100%, 50%, 0.7)','hsla(245, 100%, 50%, 0.7)', 'hsla(280, 100%, 50%, 0.7)', 'hsla(315, 100%, 50%, 0.7)'
          ]
      },
    ],

  }

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    aspectRatio: 2.8,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [], label:''
      },
    ],
  };

  chosenOptions = this.barChartOptions;
  chosenData:any = this.barChartData;




  // events
  public chartClicked({event, active,}: { event?: ChartEvent; active?: object[]; }): void {
    if (active && active.length > 0) {
      // @ts-ignore
      const chartElement = active[0].element;
      const label = chartElement.$context.parsed.x;

      // @ts-ignore
      this.barClicked.emit(this.barChartData.labels[label]);
    }
  }

  public updateProduction(stats: number[], labels: string[], level: string): void {
    this.level = level
    if (level === 'user') {
      this.chartType = 'pie'
      this.pieChartData.labels = labels
      this.pieChartData.datasets[0].data = [];
      for (const k of labels) {
        // @ts-ignore
        this.pieChartData.datasets[0].data.push(stats[k])
      }
      this.chosenOptions = this.pieChartOptions
      this.chosenData = this.pieChartData
    } else {
      this.barChartData.labels = labels
      for (const k of labels){
      // @ts-ignore
        this.barChartData.datasets[0].data.push(stats[k]);
      }
      this.chartType = "bar"
      this.chosenOptions = this.barChartOptions
      this.chosenData = this.barChartData
    }
    this.chart?.update();
  }

  updateBenefit(value: Benefit, level: string) {
    this.level = level
    this.barChartData.labels = value.labels
    this.barChartData.datasets = []

    const datasetCatalog :{data: number[], backgroundColor: string[], label: string} = {data: [], backgroundColor: ['hsla(0, 100%, 50%, 0.7)'], label: 'Catalog Price'}
    for (const label of this.barChartData.labels) {
      // @ts-ignore
      datasetCatalog.data.push(value.catalogPrice[label])
    }
    this.barChartData.datasets.push(datasetCatalog)

    const datasetSell :{data: number[], backgroundColor: string[], label: string} = {data: [], backgroundColor: ['hsla(23,100%,50%,0.7)'], label: 'Sell Price'}
    for (const label of this.barChartData.labels) {
      // @ts-ignore
      datasetSell.data.push(value.sellPrice[label])
    }
    this.barChartData.datasets.push(datasetSell)


    const datasetCost :{data: number[], backgroundColor: string[], label: string} = {data: [], backgroundColor: ['hsla(255,100%,50%,0.7)'], label: 'Production Cost'}
    for (const label of this.barChartData.labels) {
      // @ts-ignore
      datasetCost.data.push(value.productionCost[label])
    }
    this.barChartData.datasets.push(datasetCost)

    this.chart?.update()
  }
}
