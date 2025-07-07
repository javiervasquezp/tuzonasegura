import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';

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
