import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from "./components/client/client.component";
import {ProductVariantComponent} from "./components/product-variant/product-variant.component";
import {OrderComponent} from "./components/order/order.component";
import {UserComponent} from "./components/user/user.component";
import {MaterialComponent} from "./components/material/material.component";

const routes: Routes = [
  {path: 'clients', component: ClientComponent},
  {path: 'orders', component: OrderComponent},
  {path: 'product-variants', component: ProductVariantComponent},
  {path: 'materials', component: MaterialComponent},
  {path: 'users', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
