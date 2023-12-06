import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductionStatisticsComponent} from "./components/production-statistics/production-statistics.component";
import {EvolutionComponent} from "./components/evolution/evolution.component";
import {BenefitComponent} from "./components/benefit/benefit.component";
import {WorkloadComponent} from "./components/workload/workload.component";

const routes: Routes = [
  {path: 'production', component: ProductionStatisticsComponent},
  {path: 'evolution', component: EvolutionComponent},
  {path: 'benefit', component: BenefitComponent},
  {path: 'workload', component: WorkloadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
