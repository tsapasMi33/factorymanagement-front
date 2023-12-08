import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ClientComponent } from './components/client/client.component';
import { OrderComponent } from './components/order/order.component';
import { UserComponent } from './components/user/user.component';
import {ClientService} from "./services/client.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./services/user.service";
import {ProductFamilyService} from "./services/product-family.service";
import {ManufactureModule} from "../manufacture/manufacture.module";
import {ComponentService} from "./services/component.service";
import { ProductVariantListComponent } from './components/order/product-variant-list/product-variant-list.component';
import {OrderService} from "./services/order.service";
import {NgbAlert, NgbPagination, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import { MaterialComponent } from './components/material/material.component';
import { VariantsComponent } from './components/variants/variants.component';
import { VariantsListComponent } from './components/variants/variants-list/variants-list.component';
import {NewVariantComponent} from "./components/variants/product-variant/new-variant.component";
import {ProductFamilyComponent} from "./components/variants/product-variant/product-family/product-family.component";
import {ComponentComponent} from "./components/variants/product-variant/component/component.component";


@NgModule({
  declarations: [
    ClientComponent,
    NewVariantComponent,
    OrderComponent,
    UserComponent,
    ProductFamilyComponent,
    ComponentComponent,
    ProductVariantListComponent,
    MaterialComponent,
    VariantsComponent,
    VariantsListComponent,
  ],
    imports: [
        CommonModule,
        ManagementRoutingModule,
        ReactiveFormsModule,
        ManufactureModule,
        NgbTooltip,
        FormsModule,
        NgbPagination,
        NgbAlert
    ],
  providers: [
    ClientService,
    UserService,
    ProductFamilyService,
    ComponentService,
    OrderService
  ]
})
export class ManagementModule { }
