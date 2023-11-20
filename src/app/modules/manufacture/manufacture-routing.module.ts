import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlanningComponent} from "./components/planning/planning.component";
import {ProductionComponent} from "./components/production/production.component";
import {CutComponent} from "./components/cut/cut.component";
import {BendComponent} from "./components/bend/bend.component";
import {CombineComponent} from "./components/combine/combine.component";
import {WeldComponent} from "./components/weld/weld.component";
import {AssembleComponent} from "./components/assemble/assemble.component";
import {FinishComponent} from "./components/finish/finish.component";
import {PackComponent} from "./components/pack/pack.component";
import {ShipComponent} from "./components/ship/ship.component";

const routes: Routes = [
  {path: '', redirectTo: 'planning', pathMatch:'full'},
  {path: 'planning', component: PlanningComponent},
  {path: 'production', component: ProductionComponent},
  {path: 'cut', component: CutComponent},
  {path: 'bend', component: BendComponent},
  {path: 'combine', component: CombineComponent},
  {path: 'weld', component: WeldComponent},
  {path: 'assemble', component: AssembleComponent},
  {path: 'finish', component: FinishComponent},
  {path: 'pack', component: PackComponent},
  {path: 'ship', component: ShipComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufactureRoutingModule { }
