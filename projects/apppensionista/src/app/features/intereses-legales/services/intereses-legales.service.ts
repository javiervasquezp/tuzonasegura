import { Injectable } from '@angular/core';  
import { environment } from 'projects/apppensionista/src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  
import { ApiService } from '../../../core/services/api.service';
import { NetworkSuccess } from '../../../core/models/network.model';  
import { IntereseLegalesModel } from '../models/intereses-legales.model';

@Injectable({
    providedIn: 'root',
  })
  export class InteresesLegalesService { 
    constructor(
      private apiService: ApiService, 
    ) {}
    public async verIntereseLegales() : Promise<NetworkSuccess<IntereseLegalesModel>>{
      const url = `${environment.apiServicePensionistaUrl}Intereseslegales`; 
      return await this.apiService.getAsync<NetworkSuccess<IntereseLegalesModel>>(url);
    } 
   
  }