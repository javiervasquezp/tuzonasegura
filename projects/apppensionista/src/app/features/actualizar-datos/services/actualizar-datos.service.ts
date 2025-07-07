import { Injectable } from '@angular/core';  
import { environment } from 'projects/apppensionista/src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  
import { ApiService } from '../../../core/services/api.service';
import { NetworkSuccess } from '../../../core/models/network.model';

@Injectable({
    providedIn: 'root',
  })
  export class ActualizarDatosService {
    url: string = "";
    constructor(
      private apiService: ApiService, 
    ) {}

    obtenerDatos() {
        const url = `${environment.apiServicePensionistaUrl}VerDatos/GetObtenerUsuario`; 
        return this.apiService.get(url).pipe(
          map((res:any) => {
            return res;
          }),
          catchError((err) => {
            console.log(err);
            return throwError('Error inesperado en el servidor');
          })
        );
    }
    
    guardarDatos(request: any) {
        const url = `${environment.apiServicePensionistaUrl}VerDatos/PostActualizarDatos`; 
        return this.apiService.post(url, request).pipe(
          map((res:any) => {
            return res;
          }),
          catchError((err) => {
            console.log(err);
            return throwError('Error inesperado en el servidor');
          })
        );
    }
  }