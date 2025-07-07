
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { InteresComponent } from './interes.component';

const routes: Routes = [
  {
    path: '',
    component: InteresComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        data: {
          path:'intereses-legales'
        }
      },
      {path: '', redirectTo: 'intereses-legales', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteresesLegalesRoutingModule { }
