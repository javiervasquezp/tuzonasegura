
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PagoDomicilioComponent } from './pago-domicilio.component';

const routes: Routes = [
  {
    path: '',
    component: PagoDomicilioComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        data: {
          path:'pago-domicilio'
        }
      },
      {path: '', redirectTo: 'pago-domicilio', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagoDomicilioRoutingModule { }
