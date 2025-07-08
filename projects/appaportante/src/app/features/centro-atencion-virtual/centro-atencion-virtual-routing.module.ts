import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentroAtencionVirtualComponent } from './centro-atencion-virtual.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
      path: '',
      component: CentroAtencionVirtualComponent,
      children: [
        {
          path: '',
          component: MainComponent,
          data: {
            path:'centro-atencion-virtual'
          }
        },
        {path: '', redirectTo: 'centro-atencion-virtual', pathMatch: 'full' }
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroAtencionVirtualRoutingModule { }
