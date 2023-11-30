import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from "ng2-charts";

import { StatisticsRoutingModule } from './statistics-routing.module';
import { ProductionStatisticsComponent } from './production-statistics/production-statistics.component';


@NgModule({
  declarations: [
    ProductionStatisticsComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    NgChartsModule
  ]
})
export class StatisticsModule { }
