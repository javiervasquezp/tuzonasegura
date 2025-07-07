import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { tap } from 'rxjs/operators';
import { UserService } from '../services/auth.service';
import { CoreConstants } from '../data/core-constants'; 

@Injectable()
export class AuthJWTInterceptor implements HttpInterceptor {

 

    constructor(private authService: UserService,private injector: Injector//, private router: Router
        ) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
        this.authService = this.injector.get(UserService); // get it here within intercept
            if (this.authService.isAuthenticate()) {

                let authAppToken: { value: '' };
                authAppToken = JSON.parse(localStorage.getItem(CoreConstants.LocalStorage.Token) || '{}');

                request = request.clone({
                    setHeaders: { 
                        Authorization: `Bearer ${authAppToken.value}`
                    }
                });
            } else { 
                 this.authService.setLogOut();
               this.authService.authlogon();
            }

        return next.handle(request).pipe(tap(() => { },
        (err: any) => {

            if (err instanceof HttpErrorResponse) {
                 if (err.status !== 401 && err.status !== 0) {
                     return;
                 }  
                  this.authService.setLogOut();
                 this.authService.authlogon();
            }
        }));
    }

}
