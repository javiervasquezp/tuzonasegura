
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorizarDatosComponent } from './autorizar-datos.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: AutorizarDatosComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        data: {
          path:'autorizar-datos'
        }
      },
      {path: '', redirectTo: 'autorizar-datos', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorizarDatosRoutingModule { }
