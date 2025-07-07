// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiServiceUrl: 'http://localhost:5001/api',
  //apiServiceUrl: 'http://localhost:5001/api',
  //apiServiceUrl: 'http://onpsrvlpageqa:807/Seguridad/api',
  //apiServiceUrl: 'http://onpsrvlpageqa:807/SeguridadDev/api',
  //apiServiceUrl: 'http://onpsrvlpageqa:807/SeguridadDev/api',
  //apiServiceUrl: 'http://172.31.31.38:807/Seguridad/api',
  urlQuieroMiClave: "http://172.31.31.140:830/#/clave-virtual/datos-personales",
  urlOlvideMiClave: "http://172.31.31.140:830/#/recuperar-clave",
  urlOnpvirtual : 'http://172.31.31.140:800/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
