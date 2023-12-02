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
import {cutterGuard} from "../../core/guards/cutter.guard";
import {adminGuard} from "../../core/guards/admin.guard";
import {benderGuard} from "../../core/guards/bender.guard";
import {combinerGuard} from "../../core/guards/combiner.guard";
import {welderGuard} from "../../core/guards/welder.guard";
import {assemblerGuard} from "../../core/guards/assembler.guard";
import {finisherGuard} from "../../core/guards/finisher.guard";
import {packerGuard} from "../../core/guards/packer.guard";

const routes: Routes = [
  {path: '', redirectTo: 'planning', pathMatch:'full'},
  {path: 'planning', component: PlanningComponent},
  {path: 'production', component: ProductionComponent, canMatch: [adminGuard]},
  {path: 'cut', component: CutComponent, canActivate: [cutterGuard]},
  {path: 'bend', component: BendComponent, canActivate: [benderGuard]},
  {path: 'combine', component: CombineComponent, canActivate: [combinerGuard]},
  {path: 'weld', component: WeldComponent, canActivate: [welderGuard]},
  {path: 'assemble', component: AssembleComponent, canActivate: [assemblerGuard]},
  {path: 'finish', component: FinishComponent, canActivate: [finisherGuard]},
  {path: 'pack', component: PackComponent, canActivate: [packerGuard]},
  {path: 'ship', component: ShipComponent, canActivate: [packerGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufactureRoutingModule { }
