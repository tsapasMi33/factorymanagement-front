import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ClientComponent } from './components/client/client.component';
import { ProductVariantComponent } from './components/product-variant/product-variant.component';
import { OrderComponent } from './components/order/order.component';
import { UserComponent } from './components/user/user.component';
import {ClientService} from "./services/client.service";
import {ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./services/user.service";
import { ProductFamilyComponent } from './components/product-variant/product-family/product-family.component';
import { ComponentComponent } from './components/product-variant/component/component.component';
import {ProductFamilyService} from "./services/product-family.service";
import {ManufactureModule} from "../manufacture/manufacture.module";
import {ComponentService} from "./services/component.service";
import { ProductVariantListComponent } from './components/order/product-variant-list/product-variant-list.component';
import {OrderService} from "./services/order.service";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    ClientComponent,
    ProductVariantComponent,
    OrderComponent,
    UserComponent,
    ProductFamilyComponent,
    ComponentComponent,
    ProductVariantListComponent,
  ],
    imports: [
        CommonModule,
        ManagementRoutingModule,
        ReactiveFormsModule,
        ManufactureModule,
        NgbTooltip
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
