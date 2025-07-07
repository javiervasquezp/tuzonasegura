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
        path: 'ver-aportes',
        loadChildren: () =>
          import('./ver-aportes/ver-aportes.module').then((m) => m.VerAportesModule),
      },
      {
        path: 'centro-atencion-virtual',
        loadChildren: () =>
          import('./centro-atencion-virtual/centro-atencion-virtual.module').then((m) => m.CentroAtencionVirtualModule),
      },
      {
        path: 'actualizar-datos',
        loadChildren: () =>
          import('./actualizar-datos/actualizar-datos.module').then((m) => m.ActualizarDatosModule),
      },
      {
        path: 'otras-solicitudes',
        loadChildren: () =>
          import('./solicitudes/solicitudes.module').then((m) => m.SolicitudesModule),
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