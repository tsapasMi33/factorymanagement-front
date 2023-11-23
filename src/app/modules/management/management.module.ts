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


@NgModule({
  declarations: [
    ClientComponent,
    ProductVariantComponent,
    OrderComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ClientService,
    UserService
  ]
})
export class ManagementModule { }
