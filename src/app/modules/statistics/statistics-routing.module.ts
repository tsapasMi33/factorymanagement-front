import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductionStatisticsComponent} from "./production-statistics/production-statistics.component";

const routes: Routes = [
  {path: 'production', component: ProductionStatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
