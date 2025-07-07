import { Injectable } from '@angular/core';  
import { environment } from 'projects/apppensionista/src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  
import { ApiService } from '../../../core/services/api.service';
import { NetworkSuccess } from '../../../core/models/network.model';
import { VerDatosModel } from '../models/ver-datos.model';

@Injectable({
    providedIn: 'root',
  })
  export class VerDatosService {
    url: string = "";
    constructor(
      private apiService: ApiService, 
    ) {}
    public async verDatos() : Promise<NetworkSuccess<VerDatosModel>>{
      const url = `${environment.apiServicePensionistaUrl}VerDatos`; 
      return await this.apiService.getAsync<NetworkSuccess<VerDatosModel>>(url);
    } 
  }