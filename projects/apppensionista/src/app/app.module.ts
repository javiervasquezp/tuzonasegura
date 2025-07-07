import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { AuthJWTInterceptor } from './core/interceptors/auth-jwt.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { registerLocaleData } from '@angular/common';
import localeEsPE from '@angular/common/locales/es-PE';
import { createCustomElement } from '@angular/elements';

registerLocaleData(localeEsPE, 'es-Pe');

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
  bootstrap: [AppComponent],
  entryComponents: [
    AppComponent
  ]

})
export class AppModule {

  /*constructor(private injector: Injector) {

    const appPensionista = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('app-pensionista', appPensionista);

  }*/

 }
