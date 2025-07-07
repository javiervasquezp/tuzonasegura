// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //apiServiceSeguridadUrl: "https://wsexterno.onp.gob.pe/Seguridad/api/",
  //apiServiceSeguridadUrl: "http://onpsrvlpageqa:807/Seguridad/api/",
  //apiServiceSeguridadUrl: "http://onpsrvlpageqa:807/SeguridadDev/api/",
  apiServiceSeguridadUrl: "http://localhost:5001/api/",
  //authlogon:"https://tuzonasegura.onp.gob.pe/auth/#/login?code=ZSEG",
  //authlogon:"http://onpsrvlpageqa:804/auth/#/login?code=ZSEG",
  //authlogon:"http://onpsrvlpageqa:804/authDev/#/login?code=ZSEG",
  authlogon:"http://localhost:4200/#/login?code=ZSEG",
  //
  urlFichaAsegurado: "http://onpsrvlpageqa:804/ficha/",
  codigoAplicacion: "ZSEG"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
