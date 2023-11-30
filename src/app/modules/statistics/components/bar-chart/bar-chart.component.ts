import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import DataLabelsPlugin from "chartjs-plugin-datalabels";

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
  public barChartType: ChartType = 'bar';
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



  // events
  public chartClicked(e : any): void {
    if (e.active.length > 0) {
      this.barClicked.emit(this.barChartData.labels!.at(e.active[0].index))
    }
  }

  public update(stats: number[], labels: string[], level?: string): void {
    this.barChartData.labels = labels
    this.barChartData.datasets[0].data = stats;
    this.chart?.update();
  }

}
