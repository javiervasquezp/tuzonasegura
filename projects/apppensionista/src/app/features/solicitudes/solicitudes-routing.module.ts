import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtrasSolicitudesComponent } from './components/otras-solicitudes/otras-solicitudes.component';
import { SolicitudesComponent } from './solicitudes.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesComponent,
    children: [
      {
        path: '',
        component: OtrasSolicitudesComponent,
        data: {
          path:'otras-solicitudes'
        }
      },
      {path: '', redirectTo: 'otras-solicitudes', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }