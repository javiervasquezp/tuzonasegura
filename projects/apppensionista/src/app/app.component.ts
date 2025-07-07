import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'; 
 
import { CoreConstants } from './core/data/core-constants';
import { UserService } from './core/services/user.service';
import { AuthService } from './shared/services/auth.service';
declare let $ :any;
@Component({
  selector: 'app-pensionista',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'apppensionista';
  @Input("token") token: string = '';
 
  constructor(private router: Router ) {
   // this.router.events.subscribe(event => {
    //  if (event instanceof NavigationEnd) {
        //gtag('config', 'UA-189961576-1',{'page_path': event.urlAfterRedirects});
        //console.log(event.urlAfterRedirects);
   //   }
    //});
    
  }
  ngOnInit(): void {
    
   
    
  }
 
}
