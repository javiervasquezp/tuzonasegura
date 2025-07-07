import { Injectable } from '@angular/core';
import { Documento } from '../data/documento.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  ListaDocumentos : Documento[] = [];

  constructor() {
    this.ListaDocumentos.push(
      {
        IdDocumento : 1,
        MotivoSolicitud : "Pension",
        FechaCarga : "18/06/2024",
        Regimen : "DL 19990",
        Asesor  : "Miguel Suarez Marquez",
        Estafirmado : true
      },
      {
        IdDocumento : 2,
        MotivoSolicitud : "Pension Viudez",
        FechaCarga : "18/03/2024",
        Regimen : "DL 19990",
        Asesor  : "Juan Alvarez Vásquez",
        Estafirmado : false
      },
      {
        IdDocumento : 3,
        MotivoSolicitud : "Pension",
        FechaCarga : "20/05/2024",
        Regimen : "DL 25550",
        Asesor  : "Alex Campos Salvatierra",
        Estafirmado : false
      },
      {
        IdDocumento : 4,
        MotivoSolicitud : "Pension Viudez",
        FechaCarga : "20/08/2024",
        Regimen : "DL 19990",
        Asesor  : "Miguel Suarez Marquez",
        Estafirmado : true
      },
      {
        IdDocumento : 5,
        MotivoSolicitud : "Pension",
        FechaCarga : "18/03/2024",
        Regimen : "DL 19990",
        Asesor  : "Juan Alvarez Vásquez",
        Estafirmado : false
      },
      {
        IdDocumento : 6,
        MotivoSolicitud : "Pension Viudez",
        FechaCarga : "20/07/2024",
        Regimen : "DL 25550",
        Asesor  : "Alex Campos Salvatierra",
        Estafirmado : false
      }
    )
  }

  GetDocumentosSinFirmar() : Documento[] {
    //console.log(this.ListaDocumentos);
    return this.ListaDocumentos.filter((x)=> x.Estafirmado == false);
    // const url = `${environment.apiServiceAportanteUrl}EstadoCuentaAportes/GetAporteAcreditados`; 
    // return this.apiService.get(url).pipe(
    //   map((res:any) => {
    //     return res;
    //   }),
    //   catchError((err) => {
    //     console.log(err);

    //     return throwError('Error inesperado en el servidor');
    //   })
    // );
  }

  GetDocumentosFirmados() : Documento[] {
    //console.log(this.ListaDocumentos);
    return this.ListaDocumentos.filter((x)=> x.Estafirmado == true);
    // const url = `${environment.apiServiceAportanteUrl}EstadoCuentaAportes/GetAporteAcreditados`; 
    // return this.apiService.get(url).pipe(
    //   map((res:any) => {
    //     return res;
    //   }),
    //   catchError((err) => {
    //     console.log(err);

    //     return throwError('Error inesperado en el servidor');
    //   })
    // );
  }
}
