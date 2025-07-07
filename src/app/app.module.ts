import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component'; 
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthJWTInterceptor } from './core/interceptors/auth-jwt.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
   declarations: [
      AppComponent, 
   ],
   imports: [
      BrowserModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      CoreModule,
      NgxSpinnerModule, 
      ModalModule.forRoot() 
   ],
   schemas: [
      CUSTOM_ELEMENTS_SCHEMA
   ],
   providers: [
      { provide: LOCALE_ID, useValue: 'es-Pe' },
      { provide: HTTP_INTERCEPTORS, useClass: AuthJWTInterceptor , multi: true },
      AuthGuard
    ],
   bootstrap: [AppComponent]
})
export class AppModule { }
