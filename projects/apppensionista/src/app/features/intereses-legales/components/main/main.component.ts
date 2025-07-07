import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoreConstants } from 'projects/apppensionista/src/app/core/data/core-constants';
import { NetworkSuccess } from 'projects/apppensionista/src/app/core/models/network.model';
import { IntereseLegalesModel } from '../../models/intereses-legales.model';
import { InteresesLegalesService } from '../../services/intereses-legales.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  warning: string = ""; 
  ListaInteresesLegales : any[] = [];
  fechaultimaActualizacion : string="";
  constructor(private spinnerService: NgxSpinnerService,
    private interesesLegalesService : InteresesLegalesService) { }

    ngOnInit(): void {
      this.verInteresesLegales();
    }
    verInteresesLegales(){
      this.spinnerService.show();    
      this.interesesLegalesService.verIntereseLegales().then((response : NetworkSuccess<IntereseLegalesModel>) =>{ 
        let resultado = this.evaluarRespuesta(response) as NetworkSuccess<IntereseLegalesModel> ;       
        if(resultado != null && resultado.Result != null ){
          this.ListaInteresesLegales=resultado.Result.DatosDetalle;   
          const fechaData = resultado.Result.DatosCabecera;
          if(fechaData != null) {
            this.fechaultimaActualizacion = fechaData.FechaUltimaActualizacion;
          }            
        } 
        this.spinnerService.hide();    
      });
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
