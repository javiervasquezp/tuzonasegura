
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoletasPagoComponent } from './boletas-pago.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: BoletasPagoComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        data: {
          path:'boletas-pago'
        }
      },
      {path: '', redirectTo: 'boletas-pago', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletasPagoRoutingModule { }
