
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleComponent } from './components/detalle/detalle.component';
import { MainComponent } from './components/main/main.component';
import { ResolucionesComponent } from './resoluciones.component';

const routes: Routes = [
  {
    path: '',
    component: ResolucionesComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        data: {
          path:'resoluciones'
        }
      },
      {
        path: 'resoluciones-detalle', 
        data: {
          path:'resoluciones'
        },
        children: [
          {
            path: '',
            component: DetalleComponent,
            data: {
              path:'resoluciones-detalle'
            }
          }]
      },
      {path: '', redirectTo: 'resoluciones', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResolucionesRoutingModule { }
