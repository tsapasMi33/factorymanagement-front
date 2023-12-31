import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Page404Component} from "./layout/page404/page404.component";
import {adminGuard} from "./core/guards/admin.guard";

const routes: Routes = [
  {path: '', redirectTo: 'manufacture', pathMatch:'full'},
  {path: 'manufacture', loadChildren: () => import('./modules/manufacture/manufacture.module').then(r => r.ManufactureModule)},
  {path: 'management', loadChildren: () => import('./modules/management/management.module').then(r => r.ManagementModule), canMatch: [adminGuard]},
  {path: 'stats', loadChildren: () => import('./modules/statistics/statistics.module').then(r => r.StatisticsModule), canMatch: [adminGuard]},
  {path: '404', component: Page404Component},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
