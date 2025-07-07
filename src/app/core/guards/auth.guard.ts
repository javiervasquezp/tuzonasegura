import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CoreConstants } from '../data/core-constants';
import { UserService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: UserService//, private router: Router
    ) {
  }

  canActivate() {
    if(!this.authService.isAuthenticate()){ 
      localStorage.removeItem(CoreConstants.LocalStorage.Token);
      //this.router.navigate([environment.authlogon]);
      this.authService.authlogon();
      return false;
    }
    return  true;
  }
  canActivateValidate() {
    if(!this.authService.isAuthenticate()){ 
      localStorage.removeItem(CoreConstants.LocalStorage.Token); 
      return false;
    }
    return  true;
  }
}


