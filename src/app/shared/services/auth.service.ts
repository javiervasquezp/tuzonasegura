import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { ApiService } from '../../core/services/api.service'; 
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }


  validateAccess(accessurl : string, token: string) {
    const url = `Access/validateAccess`;    
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