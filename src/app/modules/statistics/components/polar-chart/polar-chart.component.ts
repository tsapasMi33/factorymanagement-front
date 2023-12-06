import {Component, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartType} from 'chart.js';
import {Stats} from "../../../../core/models/stats.model";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-polar-chart',
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.css']
})
export class PolarChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: [],
    datasets: [
      {
        data: []
      },
    ],
  };
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  public polarChartOptions: ChartConfiguration['options'] = {
    aspectRatio: 2.3,
    responsive: true,
  };

  update(value: Stats) {
    this.polarAreaChartData.labels = value.labels;
    for (let label of value.labels) {
      this.polarAreaChartData.datasets[0].data.push(value.stats[label])
    }

    this.chart?.update()
  }
}
