import { Injectable } from '@angular/core';
import { CoreConstants } from '../../core/data/core-constants';
import { ApiService } from '../../core/services/api.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'projects/apppensionista/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }


  validateAccess(accessurl : string, token: string) {
    const url = `${environment.apiServiceSeguridadUrl}Access/validateAccess`;
    const filtros:any={"Url":accessurl,"Token": token};
    return this.apiService.post(url, filtros).pipe(
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
