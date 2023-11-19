import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlanningComponent} from "./planning/planning.component";
import {ProductionComponent} from "./production/production.component";
import {CutComponent} from "./cut/cut.component";
import {BendComponent} from "./bend/bend.component";
import {CombineComponent} from "./combine/combine.component";
import {WeldComponent} from "./weld/weld.component";
import {AssembleComponent} from "./assemble/assemble.component";
import {FinishComponent} from "./finish/finish.component";
import {PackComponent} from "./pack/pack.component";
import {ShipComponent} from "./ship/ship.component";

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
