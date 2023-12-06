import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from "ng2-charts";

import { StatisticsRoutingModule } from './statistics-routing.module';
import { ProductionStatisticsComponent } from './components/production-statistics/production-statistics.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import {NgbDatepicker, NgbDatepickerMonth} from "@ng-bootstrap/ng-bootstrap";
import { BenefitComponent } from './components/benefit/benefit.component';
import { WorkloadComponent } from './components/workload/workload.component';
import { EvolutionComponent } from './components/evolution/evolution.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { PolarChartComponent } from './components/polar-chart/polar-chart.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProductionStatisticsComponent,
    BarChartComponent,
    BenefitComponent,
    WorkloadComponent,
    EvolutionComponent,
    LineChartComponent,
    PolarChartComponent,
    PolarChartComponent
  ],
    imports: [
        CommonModule,
        StatisticsRoutingModule,
        NgChartsModule,
        NgbDatepicker,
        NgbDatepickerMonth,
        ReactiveFormsModule
    ]
})
export class StatisticsModule { }
