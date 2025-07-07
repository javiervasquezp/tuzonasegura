import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertaComponent } from './components/alerta/alerta.component';
import { FechasComponent } from './components/fechas/fechas.component';
import { LeyendaDocumentoComponent } from './components/leyenda-documento/leyenda-documento.component';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';
import { ModalConfComponent } from './components/modal-conf/modal-conf.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicioService } from './services/servicio.service';

const NB_MODULES = 
[
    FormsModule,
    NgxDatatableModule
]

const NB_COMPONENTS = 
[
  UsuarioComponent,
  AlertaComponent,
    LeyendaDocumentoComponent,
    FechasComponent,
    ModalInfoComponent,
    PaginateComponent
]

@NgModule({
  declarations: [
    UsuarioComponent,
    AlertaComponent,
    LeyendaDocumentoComponent,
    FechasComponent,
    ModalInfoComponent,
    ModalConfComponent,
    PaginateComponent
  ],
  imports: [
    CommonModule 
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
