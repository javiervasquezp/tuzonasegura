import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentroAtencionVirtualRoutingModule } from './centro-atencion-virtual-routing.module';
import { CentroAtencionVirtualComponent } from './centro-atencion-virtual.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CentroAtencionVirtualComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    CentroAtencionVirtualRoutingModule,
    SharedModule.forRoot()
  ]
})
export class CentroAtencionVirtualModule { }
