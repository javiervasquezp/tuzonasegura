import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'; 
import { CoreConstants } from 'src/app/core/data/core-constants';
import { UserService } from './core/services/user.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-aportante',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appaportante';
  @Input("token") token: string = '';
  constructor( ) {
    //this.router.events.subscribe(event => {
    //  if (event instanceof NavigationEnd) {
       // gtag('config', 'UA-189961576-1',{'page_path': event.urlAfterRedirects});
        //console.log(event.urlAfterRedirects);
    //  }
    //});
  }
  ngOnInit(): void {
    
    
    
  }
 
}
