
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarDatosComponent } from './actualizar-datos.component';
import { FormularioComponent } from './components/formulario/formulario.component';

const routes: Routes = [
  {
    path: '',
    component: ActualizarDatosComponent,
    children: [
      {
        path: '',
        component: FormularioComponent,
        data: {
          path:'actualizar-datos'
        }
      },
      {path: '', redirectTo: 'actualizar-datos', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualizarDatosRoutingModule { }
