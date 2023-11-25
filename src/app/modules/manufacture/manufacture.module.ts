import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureRoutingModule } from './manufacture-routing.module';
import { PlanningComponent } from './components/planning/planning.component';
import { ProductionComponent } from './components/production/production.component';
import { CutComponent } from './components/cut/cut.component';
import { BendComponent } from './components/bend/bend.component';
import { CombineComponent } from './components/combine/combine.component';
import { WeldComponent } from './components/weld/weld.component';
import { AssembleComponent } from './components/assemble/assemble.component';
import { FinishComponent } from './components/finish/finish.component';
import { PackComponent } from './components/pack/pack.component';
import { ShipComponent } from './components/ship/ship.component';
import {StepPipe} from "../../core/pipes/step.pipe";
import {ProductService} from "./services/product.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BatchService} from "./services/batch.service";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";


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
        ReactiveFormsModule,
        NgbPagination,
        FormsModule,
    ],
    exports: [
        StepPipe
    ],
    providers: [
        ProductService,
        BatchService
    ]
})
export class ManufactureModule { }
