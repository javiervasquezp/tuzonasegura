
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { VerAportesComponent } from './ver-aportes.component';

const routes: Routes = [
  {
    path: '',
    component: VerAportesComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        data: {
          path:'ver-aportes'
        }
      },
      {path: '', redirectTo: 'ver-aportes', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerAportesRoutingModule { }
