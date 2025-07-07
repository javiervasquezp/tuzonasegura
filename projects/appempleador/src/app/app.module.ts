import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { AuthJWTInterceptor } from './core/interceptors/auth-jwt.interceptor';
import { AuthGuard } from './core/guards/auth.guard'; 
import { FeaturesModule } from './features/features.module';

@NgModule({
  declarations: [
    AppComponent
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
