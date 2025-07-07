import { Injectable } from '@angular/core';  
import { environment } from 'projects/apppensionista/src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  
import { ApiService } from '../../../core/services/api.service';
import { NetworkSuccess } from '../../../core/models/network.model'; 
import { BoletasPagoModel } from '../models/boletas-pago.model';

@Injectable({
    providedIn: 'root',
  })
  export class BoletasPagoService { 
    constructor(
      private apiService: ApiService, 
    ) {}
    public async verConstancia() : Promise<NetworkSuccess<BoletasPagoModel>>{
      const url = `${environment.apiServicePensionistaUrl}ConstanciaPago`; 
      return await this.apiService.getAsync<NetworkSuccess<BoletasPagoModel>>(url);
    } 
    public async descargarConstancia(numReg:string,   cuenta:string,   emision:string,   codProceso :string,   iSubProc:string) : Promise<NetworkSuccess<string>>{
        const url = `${environment.apiServicePensionistaUrl}ConstanciaPago/${numReg}/${cuenta}/${emision}/${codProceso}/${iSubProc}`; 
        return await this.apiService.getAsync<NetworkSuccess<string>>(url);
      } 
  }