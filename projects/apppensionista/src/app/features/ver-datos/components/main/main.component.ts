import { DatosCabeceraModel, DatosDetalleModel } from './../../models/ver-datos.model';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoreConstants } from 'projects/apppensionista/src/app/core/data/core-constants';
import { NetworkSuccess } from '../../../../core/models/network.model';
import { VerDatosModel } from '../../models/ver-datos.model';
import { VerDatosService } from '../../services/ver-datos.service';
import { Key } from 'protractor';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit { 
  warning: string = ""; 
  datosCabecera : any =  {};
  datosDetalle : any[] = [];
  GlosaDetalle: any[] = [];
  datosDetalleHead : any[] = [];
  constructor(private spinnerService: NgxSpinnerService,
    private verDatosService : VerDatosService) { }

  ngOnInit(): void {
    this.verdatos();
  }
  verdatos(): void { 
    this.spinnerService.show();    
    this.verDatosService.verDatos().then((response : NetworkSuccess<VerDatosModel>) =>{ 
      let resultado = this.evaluarRespuesta(response) as NetworkSuccess<VerDatosModel>;       
      if(resultado!=null && resultado.Result !=null && resultado.Result.DatosPensionista != null){
        this.datosCabecera=resultado.Result.DatosPensionista.DatosCabecera;
        this.datosDetalle=resultado.Result.DatosPensionista.DatosDetalle; 
        this.GlosaDetalle=resultado.Result.DatosPensionista.GlosaDetalle;
        if(this.GlosaDetalle==null){
          this.GlosaDetalle=[];
        }
        this.datosDetalleHead = this.groupBy(resultado.Result.GruposLey,this.datosDetalle);  
      }
      this.spinnerService.hide();    
    });
     
  }
  onClickPrint(){ 
    window.print();
  }
  groupBy(grupoLey: any,datosDetalle : any) : any[]{
    const datosDetalleHead : any[]=[]
    grupoLey.forEach((item : any)=>{      
        const data = {
          "DescripcionRegimen" : item,
          "Data":datosDetalle.filter((item2 : any)=>item2.DescripcionRegimen==item)
        };
        datosDetalleHead.push(data); 
     
    }); 
    return datosDetalleHead;
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
