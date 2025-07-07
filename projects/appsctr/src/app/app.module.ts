import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';   

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { AuthGuard } from './core/guards/auth.guard';
import { AuthJWTInterceptor } from './core/interceptors/auth-jwt.interceptor';
import { FeaturesModule } from './features/features.module';

@NgModule({
  declarations: [
    AppComponent, 
  
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,  
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FeaturesModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-Pe' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthJWTInterceptor , multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
