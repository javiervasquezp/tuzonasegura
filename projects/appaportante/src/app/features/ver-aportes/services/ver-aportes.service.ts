
import { Injectable } from '@angular/core'; 
import { environment } from 'projects/appaportante/src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; 
import { ApiService } from '../../../core/services/api.service';

@Injectable({
    providedIn: 'root',
  })
  export class VerAportesService {
    url: string = "";
    constructor(
      private apiService: ApiService, 
    ) {}
    // estadoReporteAportes() {
    //   const url = `${environment.apiServiceAportanteUrl}EstadoCuentaAportes`; 
    //   return this.apiService.get(url).pipe(
    //     map((res:any) => {
    //       return res;
    //     }),
    //     catchError((err) => {
    //       console.log(err);
    //       // this.toastr.error(CoreConstants.Mensajes.NoHayConexion,CoreConstants.TitulosToastr.Error);
    //       return throwError('Error inesperado en el servidor');
    //     })
    //   );
    // }
    // periodoAportes() {
    //   const url = `${environment.apiServiceAportanteUrl}EstadoCuentaAportes/GetAportesPeridos`; 
    //   return this.apiService.get(url).pipe(
    //     map((res:any) => {
    //       return res;
    //     }),
    //     catchError((err) => {
    //       console.log(err);
    //       // this.toastr.error(CoreConstants.Mensajes.NoHayConexion,CoreConstants.TitulosToastr.Error);
    //       return throwError('Error inesperado en el servidor');
    //     })
    //   );
    // }

    estadoReporteAportes() {
      const url = `${environment.apiServiceAportanteUrl}EstadoCuentaAportes/GetAporteAcreditados`; 
      return this.apiService.get(url).pipe(
        map((res:any) => {
          return res;
        }),
        catchError((err) => {
          console.log(err);
          // this.toastr.error(CoreConstants.Mensajes.NoHayConexion,CoreConstants.TitulosToastr.Error);
          return throwError('Error inesperado en el servidor');
        })
      );
    }
  }