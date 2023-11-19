import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureRoutingModule } from './manufacture-routing.module';
import { PlanningComponent } from './planning/planning.component';
import { ProductionComponent } from './production/production.component';
import { CutComponent } from './cut/cut.component';
import { BendComponent } from './bend/bend.component';
import { CombineComponent } from './combine/combine.component';
import { WeldComponent } from './weld/weld.component';
import { AssembleComponent } from './assemble/assemble.component';
import { FinishComponent } from './finish/finish.component';
import { PackComponent } from './pack/pack.component';
import { ShipComponent } from './ship/ship.component';
import {StepPipe} from "../../core/pipes/step.pipe";


@NgModule({
  declarations: [
    PlanningComponent,
    ProductionComponent,
    CutComponent,
    BendComponent,
    CombineComponent,
    WeldComponent,
    AssembleComponent,
    FinishComponent,
    PackComponent,
    ShipComponent,
    StepPipe,
  ],
  imports: [
    CommonModule,
    ManufactureRoutingModule,
  ]
})
export class ManufactureModule { }
