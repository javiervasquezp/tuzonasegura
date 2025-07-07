
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { VerDatosComponent } from './ver-datos.component';

const routes: Routes = [
  {
    path: '',
    component: VerDatosComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        data: {
          path:'ver-datos'
        }
      },
      {path: '', redirectTo: 'ver-datos', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerDatosRoutingModule { }
