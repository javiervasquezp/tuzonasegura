import { Injectable } from '@angular/core';  
import { environment } from 'projects/apppensionista/src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  
import { ApiService } from '../../../core/services/api.service';
import { NetworkSuccess } from '../../../core/models/network.model';
import { ResolucionesModel } from '../models/resoluciones.model';
import { ResolucionesDetalleModel } from '../models/resoluciones-detalle.service';
 

@Injectable({
    providedIn: 'root',
  })
  export class ResolucionesService {
    url: string = "";
    constructor(
      private apiService: ApiService, 
    ) {}
    public async verResoluciones() : Promise<NetworkSuccess<ResolucionesModel>>{
      const url = `${environment.apiServicePensionistaUrl}Resoluciones`; 
      return await this.apiService.getAsync<NetworkSuccess<ResolucionesModel>>(url);
    } 
    public async verDetalleResoluciones(caso:string, ley:string, numeroExpediente:string, idExpediente:string) : Promise<NetworkSuccess<ResolucionesDetalleModel>>{
      const url = `${environment.apiServicePensionistaUrl}Resoluciones/${caso}/${ley}/${numeroExpediente}/${idExpediente}`; 
      return await this.apiService.getAsync<NetworkSuccess<ResolucionesDetalleModel>>(url);
    } 
    public async descargarResolucionesPDF(id:string) : Promise<NetworkSuccess<string>>{
        const url = `${environment.apiServicePensionistaUrl}Resoluciones/${id}`; 
        return await this.apiService.getAsync<NetworkSuccess<string>>(url);
      } 
  }