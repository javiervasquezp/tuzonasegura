import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoreConstants } from 'projects/apppensionista/src/app/core/data/core-constants';
import { NetworkSuccess } from 'projects/apppensionista/src/app/core/models/network.model';
import { SharedConstants } from 'projects/apppensionista/src/app/shared/shared.constants';
import { Subject, Subscription } from 'rxjs';
import { ModalConfirmarComponent } from '../../../autorizar-datos/components/modal/modal.component';
import { DatosCabeceraModel, ResolucionesDetalleModel } from '../../models/resoluciones-detalle.service';
import { DatosDetalle } from '../../models/resoluciones.model';
import { DataResolucionesService } from '../../services/data-resoluciones.service';
import { ResolucionesService } from '../../services/resoluciones.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit,OnDestroy {
  warning:string = "";
  modelo = new DatosDetalle();
  cabecera:DatosCabeceraModel = new DatosCabeceraModel();
  Detalle:any[]=[];
  sharedconstants: any = SharedConstants;
  private destroy$: Subject<void> = new Subject<void>();
  subscription: Subscription | undefined;
  bsModalRef: BsModalRef | null = null;
  constructor(protected router: Router,
    private dataResolucionesService: DataResolucionesService,
    private spinnerService: NgxSpinnerService,
    private resolucionesService : ResolucionesService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.subscription = this.dataResolucionesService.currentMessage.subscribe(message => this.modelo = message);
    this.verDetalle();
  }
  async verDetalle(){ 
    this.spinnerService.show(); 
    if(this.modelo != null && this.modelo.CodigoLey!=""){      
      await this.resolucionesService.verDetalleResoluciones(this.modelo.ExisteDocumentos,this.modelo.CodigoLey,this.modelo.NumeroExpediente,this.modelo.IdExpediente).then((response : NetworkSuccess<ResolucionesDetalleModel>) =>{ 
        let resultado = this.evaluarRespuesta(response) as NetworkSuccess<ResolucionesDetalleModel>; 
       
        if(resultado!=null && resultado.Result != null ){
          this.cabecera = resultado.Result.DatosCabecera;
          this.Detalle = resultado.Result.DatosDetalle;
          
        }
        this.spinnerService.hide();    
      });
    }
    else {
      this.router.navigateByUrl(SharedConstants.rutasview.resoluciones);
    }
  }
  onClickDescargarPDF(id:any){
    this.spinnerService.show();    
    this.resolucionesService.descargarResolucionesPDF(id).then((response : NetworkSuccess<string>) =>{ 
      let resultado = this.evaluarRespuesta(response) as NetworkSuccess<string>;       
      if(resultado!=null && resultado.Result != null ){
        const blobData = this.convertBase64ToBlobData(resultado.Result);
        const blob = new Blob([blobData], { type: this.sharedconstants.General.contentTypePDF});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = resultado.Details;
        link.click(); 
      }else{
        this.abrirAlerta();
      }
      this.spinnerService.hide();    
    });
  }
  convertBase64ToBlobData(base64Data: string, contentType: string='image/png', sliceSize=512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  ngOnDestroy() {
    this.subscription!.unsubscribe();  
    this.destroy$.next();
    this.destroy$.complete();   
  }
  evaluarRespuesta(res:any){
    if (res.IsSuccess == true) {
      switch (res.Codigo) {
          case CoreConstants.CodigoRespuesta.OperacionExitosa: 
            return res;
          case CoreConstants.CodigoRespuesta.OperacionNoEjecutada: 
              this.warning = res.Message;break;
          case CoreConstants.CodigoRespuesta.ErrorNoControlado: 
              this.warning = CoreConstants.Mensajes.NoHayConexion;break;
          case CoreConstants.CodigoRespuesta.OperacionIncorrectaDatos: 
              this.warning = res.Message;break;
          case CoreConstants.CodigoRespuesta.NoAutorizado: 
              this.warning = CoreConstants.Mensajes.NoAutorizado;break;
          case CoreConstants.CodigoRespuesta.CambioClave: 
              this.warning = res.Message;break;
      }
    }else{
        this.warning = res.Message;
    }
  }
  onClickPrint(){ 
     
    window.print();

   


  }

  abrirAlerta(){
    this.bsModalRef = this.modalService.show(ModalConfirmarComponent, {class: 'modal-lg'});
    (<ModalConfirmarComponent>this.bsModalRef!.content).onClose!.subscribe(result => {
      this.bsModalRef!.hide();
    });
    this.bsModalRef.content.titulo = "Alerta";
    this.bsModalRef.content.icon = "~/../../../../assets/images/icon-alert.svg";
    this.bsModalRef.content.body = "<p>Tu resolución no se encuentra disponible por este medio. Puedes solicitar un duplicado de tu resolución ingresando <a href='https://www.onp.gob.pe/paginas/otrasolicitud.aspx' target=_blank>aquí</a>.</p>";
    this.bsModalRef.content.esModalConfirmar = false;
  }
}
