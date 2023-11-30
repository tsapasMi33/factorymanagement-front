import {Component, ViewChild} from '@angular/core';

import {StatisticsService} from "../services/statistics.service";
import {BarChartComponent} from "../components/bar-chart/bar-chart.component";
import {Stats} from "../../../core/models/stats.model";
import {Step} from "../../../core/enums/step.enum";

@Component({
  selector: 'app-production-statistics',
  templateUrl: './production-statistics.component.html',
  styleUrls: ['./production-statistics.component.css']
})
export class ProductionStatisticsComponent {
  @ViewChild('chart') chart!: BarChartComponent

  stats!: Stats;



  constructor(private statsService$: StatisticsService) {
    this.statsService$.getProductionStatistics(null).subscribe({
      next: value => {
        this.stats = value
        this.chart.update(value.stats, value.labels)
      }
    })
  }


  getDataFor($event: any) {
    if (this.chart.level === ''){
      this.statsService$.getStatisticsForStep($event, null).subscribe({
        next: value => {
          this.chart.update(value.stats,value.labels)
        }
      })
    }
    console.log($event)
  }
}
