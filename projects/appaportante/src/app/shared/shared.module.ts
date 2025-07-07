import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FormsModule } from '@angular/forms';
import { AlertaComponent } from './components/alerta/alerta.component';

const NB_MODULES = 
[
    FormsModule
]

const NB_COMPONENTS = 
[
  AlertaComponent,
  UsuarioComponent
]

@NgModule({
  declarations: [
    UsuarioComponent,
    AlertaComponent
  ],
  imports: [
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
 ],
  exports: [
    ...NB_MODULES,
    ...NB_COMPONENTS
  ],
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders<SharedModule>  {
    return {
      ngModule: SharedModule,
      providers: [
        
      ],
    };
  }
}
