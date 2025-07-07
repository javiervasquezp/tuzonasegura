import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { InteresesLegalesRoutingModule } from './interes-routing.module';
import { InteresComponent } from './interes.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    MainComponent,
    InteresComponent
  ],
  imports: [
    CommonModule,
    InteresesLegalesRoutingModule,
    SharedModule.forRoot()
  ]
})
export class InteresesLegalesModule { }
