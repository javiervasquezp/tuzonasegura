import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { FeaturesRoutingModule } from './features-routing.module'; 

const COMPONENTS = [
  FeaturesComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule {
  static forRoot(): ModuleWithProviders<FeaturesModule> {
    return {
      ngModule: FeaturesModule,
    };
  }
}