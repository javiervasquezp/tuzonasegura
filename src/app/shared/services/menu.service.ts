import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CoreConstants } from 'src/app/core/data/core-constants';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor( private apiService: ApiService,) { }

  ListaMenu() {
    const url = `Access/permission?codigoAplicacion=${environment.codigoAplicacion}`;
    const filtros:any=null;
    return this.apiService.post(url, filtros).pipe(
      map((res:any) => {
        console.log("LISTAR MENU");
        console.log(res);
        return res;
        /*if (res.IsSuccess == true) {
          if (res.Codigo == CoreConstants.CodigoRespuesta.OperacionExitosa){
            return res.Result;
          }
          else {
            throw new Error(res.Message);
          }           
        }else{
          throw new Error(res.Message);
        }*/
      }),
      catchError((err) => {
        console.log(err);
        return throwError('Error inesperado en el servidor');
      })
    );
  }
  
}
