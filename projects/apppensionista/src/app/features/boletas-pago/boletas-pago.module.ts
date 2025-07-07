import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { BoletasPagoRoutingModule } from './boletas-pago-routing.module';
import { BoletasPagoComponent } from './boletas-pago.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MainComponent, BoletasPagoComponent
  ],
  imports: [
    CommonModule,
    BoletasPagoRoutingModule,
    SharedModule.forRoot()
  ]
})
export class BoletasPagoModule { }
