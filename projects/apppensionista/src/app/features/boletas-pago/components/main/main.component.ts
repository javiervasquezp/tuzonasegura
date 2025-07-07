import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoreConstants } from 'projects/apppensionista/src/app/core/data/core-constants';
import { NetworkSuccess } from 'projects/apppensionista/src/app/core/models/network.model';
import { SharedConstants } from 'projects/apppensionista/src/app/shared/shared.constants';
import { BoletasPagoModel } from '../../models/boletas-pago.model';
import { BoletasPagoService } from '../../services/boletas-pago.service';
declare function imprimir(id:any):any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  warning: string = ""; 
  idRegimen: string = ""; 
  DetalleRegimenes : any[] = [];
  DetalleRegimenesFilter : any[] = [];
  BoletasPagos : any[] = [];
  ListaBoletasPagos : any[] = [];
  ListaBoletasPagosTitle : any[] = [];
  sharedconstants: any = SharedConstants;
  constructor(private spinnerService: NgxSpinnerService,
    private boletasPagoService : BoletasPagoService) { }

  ngOnInit(): void {
    this.verConstancias();
  }
  verConstancias(){
    this.spinnerService.show();    
    this.boletasPagoService.verConstancia().then((response : NetworkSuccess<BoletasPagoModel>) =>{ 
      let resultado = this.evaluarRespuesta(response);       
      if(resultado != null && resultado.Result != null && resultado.Result.UltimosPagos != null){
        this.DetalleRegimenes=resultado.Result.UltimosPagos.DetalleRegimenes;
        this.BoletasPagos=resultado.Result.BoletasPagos;  
        if(this.DetalleRegimenes != null &&  this.BoletasPagos != null){
          // this.DetalleRegimenes.forEach((item : any,index:number)=>{ 
          //   if(index==0){ 
          //     this.idRegimen=item.Regimen;
          //     item.DetalleRegimenCuentas.forEach((item2 : any)=>{      
          //       const resultado = this.BoletasPagos.filter((item3 : any)=>item3.numRegLey==item.Regimen && item3.descripcionCuenta==item2.Cuenta)
          //       this.ListaBoletasPagos.push(resultado);              
          //     });     
            
          //     this.DetalleRegimenesFilter = this.DetalleRegimenes.filter((item4 : any)=>item4.Regimen == item.Regimen)
          //     console.log(this.DetalleRegimenesFilter);
          //     console.log(this.ListaBoletasPagos);
          //   }     
          // }); 
          this.setearDefault();
          
        }

      } 
      this.spinnerService.hide();    
    });
  }
  onChangeListarRegimen(){
    //this.idRegimen
    this.ListaBoletasPagos=[];
    this.DetalleRegimenesFilter = this.DetalleRegimenes.filter((item : any)=>item.Regimen == this.idRegimen);
    this.DetalleRegimenesFilter.forEach((item : any,index:number)=>{ 
      item.DetalleRegimenCuentas.forEach((item2 : any)=>{      
        const resultado = this.BoletasPagos.filter((item3 : any)=>item3.numRegLey==item.Regimen && item3.descripcionCuenta==item2.Cuenta)
        this.ListaBoletasPagos.push(resultado);              
      });  
    }); 
  }
  onClickPrint(){ 
    window.print();
    //imprimir('Print');
  }
  onClickdescargaPDF(item:any){ 
    this.spinnerService.show();    
    this.boletasPagoService.descargarConstancia(item.numRegLey,item.descripcionCuenta,item.numEmision,item.codProc,item.inSubProceso).then((response : NetworkSuccess<string>) =>{ 
      let resultado = this.evaluarRespuesta(response);       
      if(resultado != null && resultado.Result != null ){
        const blobData = this.convertBase64ToBlobData(resultado.Result);
        const blob = new Blob([blobData], { type: this.sharedconstants.General.contentTypePDF});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = resultado.Details;
        link.click(); 

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

  setearDefault(){
    let regimen = this.DetalleRegimenes.find(x => x.Regimen == "19990");
    if(regimen != undefined)
      this.idRegimen = "19990";
    else
      this.idRegimen = this.DetalleRegimenes[0].Regimen;

    this.onChangeListarRegimen();
  }
}
