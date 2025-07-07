import { Injectable } from '@angular/core';
import { Cargo } from '../data/documento.model';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  ListaDocumentos : Cargo[] = [];

  constructor() {
    this.ListaDocumentos.push(
      {
        IdDocumento : 1,
        MotivoSolicitud : "Pension",
        FechaCarga : "18/06/2024",
        Regimen : "DL 19990",
        Asesor  : "Miguel Suarez Marquez",
        NumeroSolicitud : "Nro. SLXXXX365522XXX"
      },
      {
        IdDocumento : 2,
        MotivoSolicitud : "Pension Viudez",
        FechaCarga : "18/03/2024",
        Regimen : "DL 19990",
        Asesor  : "Juan Alvarez Vásquez",
        NumeroSolicitud : "Nro. SLXXXX365522XXX"
      },
      {
        IdDocumento : 3,
        MotivoSolicitud : "Pension",
        FechaCarga : "20/05/2024",
        Regimen : "DL 25550",
        Asesor  : "Alex Campos Salvatierra",
        NumeroSolicitud : "Nro. SLXXXX365522XXX"
      },
      {
        IdDocumento : 4,
        MotivoSolicitud : "Pension Viudez",
        FechaCarga : "20/08/2024",
        Regimen : "DL 19990",
        Asesor  : "Miguel Suarez Marquez",
        NumeroSolicitud : "Nro. SLXXXX365522XXX"
      },
      {
        IdDocumento : 5,
        MotivoSolicitud : "Pension",
        FechaCarga : "18/03/2024",
        Regimen : "DL 19990",
        Asesor  : "Juan Alvarez Vásquez",
        NumeroSolicitud : "Nro. SLXXXX365522XXX"
      },
      {
        IdDocumento : 6,
        MotivoSolicitud : "Pension Viudez",
        FechaCarga : "20/07/2024",
        Regimen : "DL 25550",
        Asesor  : "Alex Campos Salvatierra",
        NumeroSolicitud : "Nro. SLXXXX365522XXX"
      }
    )
  }

  GetCargos() : Cargo[] {
    //console.log(this.ListaDocumentos);
    return this.ListaDocumentos;
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
