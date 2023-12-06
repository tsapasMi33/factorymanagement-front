import {Component, ViewChild} from '@angular/core';
import {StatisticsService} from "../../services/statistics.service";
import {PolarChartComponent} from "../polar-chart/polar-chart.component";

@Component({
  selector: 'app-workload',
  templateUrl: './workload.component.html',
  styleUrls: ['./workload.component.css']
})
export class WorkloadComponent {
  @ViewChild('chart') chart!: PolarChartComponent

  constructor(private statsService$: StatisticsService) {
    this.statsService$.getWorkload().subscribe({
      next: value => this.chart.update(value)
    })
  }
}
