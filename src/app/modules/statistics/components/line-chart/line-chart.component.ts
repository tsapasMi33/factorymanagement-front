import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import {Evolution} from "../../../../core/models/evolution.model";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  constructor() {
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [18000, 9500, 9350, 11000, 7500, 2000, 2300, 5010, 3500, 2750, 8000,7300, 4350, 19000, 17500, 22000, 2400, 6010, 1500, 4750],
        label: 'ENCODED',
      },
      {
        data: [8000, 7500, 10350, 5000, 7500, 12000, 12300, 8010, 9500, 10750, 11000,10300, 11350, 14000, 11500, 12000, 12400, 9010, 9500, 10750],
        label: 'PRODUCTION',
      },
      {
        data: [11000, 9500, 8350, 1000, 2500, 3000, 4300, 5010, 8500, 9750, 4000,9300, 14350, 11000, 7500, 9000, 10400, 11010, 12100, 10750],
        label: 'CUT',
      },
      {
        data: [12000, 9400, 8350, 13000, 9500, 12000, 12300, 9010, 8500, 10750, 11000, 11300, 14350, 10000, 10500, 12000, 11400, 9010, 11500, 14750],
        label: 'BENT',
      },
      {
        data: [10300, 9900, 10350, 9300, 10500, 12000, 12300, 9010, 13500, 12750, 10000, 10300, 14350, 9000, 7500, 12000, 12400, 10010, 12500, 12750],
        label: 'COMBINED',
      },
      {
        data: [9000, 10500, 12350, 7000, 12500, 15400, 12300, 15010, 13500, 10750, 14000, 14300, 14350, 10000, 11500, 12000, 12400, 16010, 11500, 14750],
        label: 'WELDED',
      },
      {
        data: [11000, 7500, 14350, 14000, 7900, 6000, 12300, 7510, 6500, 3750, 6000, 13300, 20350, 19000, 12500, 15000, 12400, 6010, 11500, 14750],
        label: 'ASSEMBLED',
      },
      {
        data: [13000, 8500, 11350, 12000, 11500, 7000, 7300, 11010, 9500, 13750, 7000, 13300, 25350, 16000, 7500, 11000, 12400, 6010, 12500, 12750],
        label: 'FINISHED',
      },
      {
        data: [10000, 9500, 14350, 13000, 13400, 9000, 2800, 8010, 8500, 8750, 4500,7300, 13350, 26000, 11500, 2000, 15400, 16010, 15000, 15750],
        label: 'PACKED',
      },
      {
        data: [9000, 12500, 11350, 9000, 12400, 10000, 4300, 15010, 11500, 12750, 8000, 3300, 4350, 24000, 12500, 2000, 15400, 18010, 12500, 17750],
        label: 'SENT',
      }
    ],
    labels: [
      '8/11', '9/11', '10/11', '13/11', '14/11',
      '15/11', '16/11', '17/11', '20/11', '21/11',
      '22/11', '23/11', '24/11', '27/11', '28/11',
      '29/11', '30/11', '1/12', '4/11', '5/11'
    ],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.2,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      }
    },

    plugins: {
      legend: {display: true},
    },
  };

  public lineChartType: ChartType = 'line';


  update(value: Evolution) {
    this.lineChartData.datasets = [];

    for (let date of value.labels) {
      const onDate = value.data[date];
      for (let step in onDate) {
        let dsIdx = this.lineChartData.datasets.findIndex(ds => ds.label === step)
        if (dsIdx === -1) {
          this.lineChartData.datasets.push({data:[onDate[step]], label: step})
        } else {
          this.lineChartData.datasets[dsIdx].data.push(onDate[step])
        }
      }
    }

    if (value.previousData) {
      let dates: string[] = [];
      for (let k in value.previousData) {
        dates.push(k)
      }
      dates.sort((a, b) => a.localeCompare(b))

      for (let date of dates) {
        const onDate = value.previousData[date];
        for (let step in onDate) {
          let dsIdx = this.lineChartData.datasets.findIndex(ds => ds.label === step)
          if (dsIdx === -1) {
            this.lineChartData.datasets.push({data:[onDate[step]], label: step})
          } else {
            this.lineChartData.datasets[dsIdx].data.push(onDate[step])
          }
        }
      }

    }
    this.lineChartData.labels = value.labels;
    this.chart?.update()
  }
}
