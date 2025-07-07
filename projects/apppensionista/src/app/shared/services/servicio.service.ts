import { Injectable } from '@angular/core';  
import { environment } from 'projects/apppensionista/src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NetworkSuccess } from '../../core/models/network.model';
import { ApiService } from '../../core/services/api.service';
import { DepartamentosModel, DistritosModel, ProvinciasModel } from '../../features/pago-domicilio/models/pago-domicilio.model';
import { ItemModel } from '../../features/solicitudes/models/item.model';
import { MotivosModel } from '../../features/solicitudes/models/motivos.model';

@Injectable({
    providedIn: 'root',
  })
  export class ServicioService {
    url: string = "";
    constructor(
      private apiService: ApiService, 
    ) {}
    public async listarProvincia(id:string) : Promise<NetworkSuccess<ProvinciasModel[]>>{
        const url = `${environment.apiServicePensionistaUrl}PagoDomicilio/${id}`; 
        return await this.apiService.getAsync<NetworkSuccess<ProvinciasModel[]>>(url);
      } 
      public async listarDistrito(iddep:string,idprod:string) : Promise<NetworkSuccess<DistritosModel[]>>{
        const url = `${environment.apiServicePensionistaUrl}PagoDomicilio/${iddep}/${idprod}`; 
        return await this.apiService.getAsync<NetworkSuccess<DistritosModel[]>>(url);
      }
      public async listarDepartamento() : Promise<NetworkSuccess<DepartamentosModel[]>>{
        const url = `${environment.apiServicePensionistaUrl}PagoDomicilio/GetDepartamento`; 
        return await this.apiService.getAsync<NetworkSuccess<DepartamentosModel[]>>(url);
      } 
      public async listarPaises() : Promise<NetworkSuccess<ItemModel[]>>{
        const url = `${environment.apiServicePensionistaUrl}Solicitud/GetPaises`; 
        return await this.apiService.getAsync<NetworkSuccess<ItemModel[]>>(url);
      } 

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
  }