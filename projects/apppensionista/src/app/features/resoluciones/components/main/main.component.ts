import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoreConstants } from 'projects/apppensionista/src/app/core/data/core-constants';
import { NetworkSuccess } from 'projects/apppensionista/src/app/core/models/network.model';
import { SharedConstants } from 'projects/apppensionista/src/app/shared/shared.constants';
import { DatosDetalle, ResolucionesModel } from '../../models/resoluciones.model';
import { DataResolucionesService } from '../../services/data-resoluciones.service';
import { ResolucionesService } from '../../services/resoluciones.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  warning : string ="";
  ListaDatosExpediente : any[]=[]
  constructor(protected router: Router,
    private spinnerService: NgxSpinnerService,
    private resolucionesService : ResolucionesService,
    private dataResolucionesService: DataResolucionesService) { }

  ngOnInit(): void {
    this.listarExpediente();
  }
  listarExpediente(){
    this.warning="";
    this.spinnerService.show();    
    this.resolucionesService.verResoluciones().then((response : NetworkSuccess<ResolucionesModel>) =>{ 
      let resultado = this.evaluarRespuesta(response) as NetworkSuccess<ResolucionesModel>;       
      if(resultado !=null && resultado.Result != null && resultado.Result.DatosDetalle != null && resultado.Result.GruposLey !=null){
          if(resultado.Result.GruposLey.length>0){
          resultado.Result.GruposLey.forEach((item : any)=>{      
            const data = {
              "Ley" : item,
              "Data":resultado.Result.DatosDetalle.filter((item2 : any)=>item2.CodigoLey==item)
            };
            this.ListaDatosExpediente.push(data); 
        
        });         
      }
      else {
        this.warning="<b>No hay información disponible</b><br>No existen documentos para éste Pensionista.";
      }
      }
      this.spinnerService.hide();    
    });
  }
  verDetalle(item:DatosDetalle){
    this.dataResolucionesService.changeMessage(item);
    this.router.navigateByUrl(SharedConstants.rutasview.resolucionesDetalle);
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
}
