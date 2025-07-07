import { Injectable } from '@angular/core';  
import { environment } from 'projects/apppensionista/src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  
import { NetworkSuccess } from '../../../core/models/network.model';
import { ApiService } from '../../../core/services/api.service';
import { MotivosModel } from '../models/motivos.model';

@Injectable({
    providedIn: 'root',
  })
  export class SolicitudService {
    url: string = "";
    constructor(
      private apiService: ApiService, 
    ) {}

    public async listarMotivos() : Promise<NetworkSuccess<MotivosModel[]>>{
      const url = `${environment.apiServicePensionistaUrl}Solicitud/GetListaMotivos/${false}`; 
      return await this.apiService.getAsync<NetworkSuccess<MotivosModel[]>>(url);
    } 
    
    guardarDatos(request: any, files : File[]) {
      const data=new FormData();
      data.append("oRequest",JSON.stringify( request));
      files.forEach(element => { 
        data.append("files",element);
      });

      const url = `${environment.apiServicePensionistaUrl}Solicitud/PostRegistrar`; 
      return this.apiService.post(url, data).pipe(
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