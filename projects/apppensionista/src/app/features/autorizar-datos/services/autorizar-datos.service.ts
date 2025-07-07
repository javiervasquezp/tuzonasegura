
import { Injectable } from '@angular/core'; 
import { environment } from 'projects/apppensionista/src/environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; 
import { ApiService } from '../../../core/services/api.service';

@Injectable({
    providedIn: 'root',
  })
  export class AutorizarDatosService {
    url: string = "";
    constructor(
      private apiService: ApiService, 
    ) {}

    listarCooperativas(request: any) {
      const url = `${environment.apiServicePrestamosUrl}Autorizacion/PostConsultarCooperativas`; 
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

    obtenerRegimen(request:any) {
        const url = `${environment.apiServicePrestamosUrl}Autorizacion/PostConsultarPensionista`; 
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

      listarAutorizaciones(request:any) {
        const url = `${environment.apiServicePrestamosUrl}Autorizacion/PostListarAutorizacionesPaginado`; 
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

      registrarAutorizacion(request:any) {
        const url = `${environment.apiServicePrestamosUrl}Autorizacion/PostRegistrarAutorizacion`; 
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

      eliminarAutorizacion(request:any) {
        const url = `${environment.apiServicePrestamosUrl}Autorizacion/PostEliminarAutorizacion`; 
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