import { Injectable } from '@angular/core';  
import { environment } from 'projects/apppensionista/src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  
import { ApiService } from '../../../core/services/api.service';
import { NetworkSuccess } from '../../../core/models/network.model'; 
import { DepartamentosModel, DistritosModel, PagoDomicilioModel, ProvinciasModel } from '../models/pago-domicilio.model';
import { ItemModel } from '../../solicitudes/models/item.model';

@Injectable({
    providedIn: 'root',
  })
  export class PagoDomicilioService {
    url: string = "";
    constructor(
      private apiService: ApiService, 
    ) {}
    public async verDatos() : Promise<NetworkSuccess<PagoDomicilioModel>>{
      const url = `${environment.apiServicePensionistaUrl}PagoDomicilio`; 
      return await this.apiService.getAsync<NetworkSuccess<PagoDomicilioModel>>(url);
    } 
    public async listarProvincia(id:string) : Promise<NetworkSuccess<ProvinciasModel[]>>{
        const url = `${environment.apiServicePensionistaUrl}PagoDomicilio/${id}`; 
        return await this.apiService.getAsync<NetworkSuccess<ProvinciasModel[]>>(url);
      } 
      public async listarDistrito(iddep:string,idprod:string) : Promise<NetworkSuccess<DistritosModel[]>>{
        const url = `${environment.apiServicePensionistaUrl}PagoDomicilio/${iddep}/${idprod}`; 
        return await this.apiService.getAsync<NetworkSuccess<DistritosModel[]>>(url);
      } 
      public async registrar(request:object) : Promise<NetworkSuccess<string>>{
        const url = `${environment.apiServicePensionistaUrl}PagoDomicilio`; 
        return await this.apiService.postAsync<NetworkSuccess<string>>(url,request);
      }

      public async listarDepartamento() : Promise<NetworkSuccess<DepartamentosModel[]>>{
        const url = `${environment.apiServicePensionistaUrl}PagoDomicilio/GetDepartamento`; 
        return await this.apiService.getAsync<NetworkSuccess<DepartamentosModel[]>>(url);
      } 
      public async listarPaises() : Promise<NetworkSuccess<ItemModel[]>>{
        const url = `${environment.apiServicePensionistaUrl}Solicitud/GetPaises`; 
        return await this.apiService.getAsync<NetworkSuccess<ItemModel[]>>(url);
      } 
  }