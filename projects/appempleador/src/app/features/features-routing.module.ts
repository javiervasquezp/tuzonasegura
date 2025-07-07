import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { FeaturesComponent } from './features.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
       // path: 'pagedefault',
      //  loadChildren: () => import('./ver-aportes/ver-aportes.module').then((m) => m.VerAportesModule),
      },
      //{ path: '',redirectTo: '',pathMatch: 'full',},
      { path: '',redirectTo: '',pathMatch: 'full',},
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {
}