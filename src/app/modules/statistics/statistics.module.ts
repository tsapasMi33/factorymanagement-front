import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from "ng2-charts";

import { StatisticsRoutingModule } from './statistics-routing.module';
import { ProductionStatisticsComponent } from './production-statistics/production-statistics.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';


@NgModule({
  declarations: [
    ProductionStatisticsComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    NgChartsModule
  ]
})
export class StatisticsModule { }
