import {Component, TemplateRef, ViewChild} from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import {BaseChartDirective} from "ng2-charts";

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {StatisticsService} from "../services/statistics.service";
import {Stats} from "../../../core/models/stats.model";
import {Subject} from "rxjs";
@Component({
  selector: 'app-production-statistics',
  templateUrl: './production-statistics.component.html',
  styleUrls: ['./production-statistics.component.css']
})
export class ProductionStatisticsComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  stats: Stats = {stats:new Map([]), startDate: new Date, endDate: new Date}
  reload = false;



  constructor(private statsService$: StatisticsService) {
    this.reload = true;
    this.statsService$.getProductionStatistics(null).subscribe({
      next: value => {
        console.log(value)
        this.stats = value
        this.barChartData = this.fillData(value)
        this.reload = false
      }
    })
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
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

  public barChartData!: ChartData<'bar'>



  // events
  public chartClicked({event, active,}: { event?: ChartEvent; active?: object[]; }): void {

  }

  public chartHovered({event, active,}: { event?: ChartEvent; active?: object[]; }): void {

  }

  fillData(data: Stats): ChartData<'bar'> {
    let labelsa: string[] = []
    let dataa: number[] = []
    Object.keys(data.stats).forEach(key => {

      dataa.push(data.stats[key])
      labelsa.push(key);

    })


    return {
      labels: labelsa,
      datasets: [
        {
        data: dataa,
        backgroundColor:
          [
          'hsla(0, 100%, 50%, 0.7)', 'hsla(35, 100%, 50%, 0.7)', 'hsla(70, 100%, 50%, 0.7)', 'hsla(105, 100%, 50%, 0.7)', 'hsla(140, 100%, 50%, 0.7)',
          'hsla(175, 100%, 50%, 0.7)', 'hsla(210, 100%, 50%, 0.7)','hsla(245, 100%, 50%, 0.7)', 'hsla(280, 100%, 50%, 0.7)', 'hsla(315, 100%, 50%, 0.7)'
          ]
        },
      ],
    }
  }
}
