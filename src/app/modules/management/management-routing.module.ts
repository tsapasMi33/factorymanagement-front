import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from "./components/client/client.component";
import {OrderComponent} from "./components/order/order.component";
import {UserComponent} from "./components/user/user.component";
import {MaterialComponent} from "./components/material/material.component";
import {VariantsComponent} from "./components/variants/variants.component";
import {VariantsListComponent} from "./components/variants/variants-list/variants-list.component";
import {NewVariantComponent} from "./components/variants/product-variant/new-variant.component";

const routes: Routes = [
  {path: 'clients', component: ClientComponent},
  {path: 'orders', component: OrderComponent},
  {path: 'variants', component: VariantsComponent, children: [
      {path: 'list', component: VariantsListComponent},
      {path: 'new', component: NewVariantComponent}
    ]},
  {path: 'materials', component: MaterialComponent},
  {path: 'users', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
