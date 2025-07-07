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
        path: 'ver-datos',
        loadChildren: () =>
          import('./ver-datos/ver-datos.module').then((m) => m.VerDatosModule),
      },
      {
        path: 'boletas-pago',
        loadChildren: () =>
          import('./boletas-pago/boletas-pago.module').then((m) => m.BoletasPagoModule),
      },
      {
        path: 'intereses-legales',
        loadChildren: () =>
          import('./intereses-legales/intereses-legales.module').then((m) => m.InteresesLegalesModule),
      },
      {
        path: 'pago-domicilio',
        loadChildren: () =>
          import('./pago-domicilio/pago-domicilio.module').then((m) => m.PagoDomicilioModule),
      },
      {
        path: 'resoluciones',
        loadChildren: () =>
          import('./resoluciones/resoluciones.module').then((m) => m.ResolucionesModule),
      },
      {
        path: 'autorizar-datos',
        loadChildren: () =>
          import('./autorizar-datos/autorizar-datos.module').then((m) => m.AutorizarDatosModule),
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
     {path: '',redirectTo: '',pathMatch: 'full',},
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {
}