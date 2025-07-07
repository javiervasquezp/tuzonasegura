import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { CoreConstants } from 'projects/appaportante/src/app/core/data/core-constants';
import { SharedConstants } from 'projects/appaportante/src/app/shared/shared.constants';
import { Usuario } from 'src/app/core/data/usuario.model';
import { UserService } from 'src/app/core/services/auth.service';
import { FeaturesConstants } from '../../../features-constants';
import { VerAportesService } from '../../services/ver-aportes.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  bsModalRef: BsModalRef | null = null;
  sharedconstants: any = SharedConstants;
  warning: string = "";
  fechaPerido:string ="";
  usuarioLogueado = new Usuario();
  urlReporte: string = "";
  constructor(private spinnerService: NgxSpinnerService,
              private verAportesService: VerAportesService,
              private userService: UserService
              ) { }

  ngOnInit(): void {
    this.usuarioLogueado = this.userService.getLoggedUsers(); 
    // this.verFechaAporte();
  }
  // verFechaAporte(){
  //   this.spinnerService.show();    
  //   this.verAportesService.periodoAportes().subscribe(
  //     (res: any) => {
  //       let resultado = this.evaluarRespuesta(res); 
  //       if(resultado!=null)
  //         this.fechaPerido=resultado.Result;
  //     this.spinnerService.hide();    
  //     },(err:any) => {
  //     this.warning = `<p class='alert__info'>${err}</p>`; 
  //     this.spinnerService.hide();    
  //   });
  // }
  descargarReporte(){
    if(!(this.usuarioLogueado.TypeUser == "A" || this.usuarioLogueado.TypeUser.includes("NA")))//alerta temporal - retirar
    {
      this.warning = "<p class='title'>"+ FeaturesConstants.Textos.NoHayInformacionSolicitada +"</p>";
    }else{
      this.warning = "";
      this.spinnerService.show();  
      this.verAportesService.estadoReporteAportes().subscribe(
        (res: any) => {
          let resultado = this.evaluarRespuesta(res);
          if(resultado!=null){
            const blobData = this.convertBase64ToBlobData(resultado.Result.contenido);
            const blob = new Blob([blobData], { type: this.sharedconstants.General.contentTypePDF});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = resultado.Result.nombre;
            link.click();
        }
        this.spinnerService.hide();    
        },(err:any) => {
        this.warning = `<p class='alert__info'>${err}</p>`; 
        this.spinnerService.hide();    
      });
    }
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
              this.warning = res.Message;
              break;
      }
    }else{
        this.warning = res.Message;
    }
  }

  // abrirAlertaMixto(){
  //   this.bsModalRef = this.modalService.show(ModalConfirmarComponent, {class: 'modal-lg'});
  //   (<ModalConfirmarComponent>this.bsModalRef!.content).onClose!.subscribe(result => {
  //     this.bsModalRef!.hide();
  //   });
  //   this.bsModalRef.content.titulo = "Lo sentimos";
  //   this.bsModalRef.content.icon = "~/../../../../assets/images/icon-alert.svg";
  //   this.bsModalRef.content.body = "<p class='title'>No se encontró la información solicitada. Acércate al centro de atención de la ONP más cercano o comunícate a ONP Te escucha (01) 634-2222.</p>";
  // }
}
