// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiServiceSeguridadUrl:"http://onpsrvlpageqa:807/Seguridad/api/",
  //apiServiceSeguridadUrl:"http://onpsrvlpageqa:807/SeguridadDev/api/",
  //apiServiceSeguridadUrl: "http://localhost:5001/api/", 
  apiServiceAportanteUrl:"http://onpsrvlpageqa:807/Aportante/api/",
  //apiServiceAportanteUrl:" http://localhost:5002/api/",
  urlOnpvirtual : 'http://172.31.31.140:800/',
  linkTeamsCAV: "https://teams.microsoft.com/l/meetup-join/19%3ameeting_NWEyMWQ2NzYtY2FmMC00MWY5LTgwMmUtMDhjMDMyNDEzNmY4%40thread.v2/0?context=%7b%22Tid%22%3a%2259eb295b-ef81-4708-8888-5756316215ab%22%2c%22Oid%22%3a%22731b6032-2871-42df-b8f9-8fccdeaba94b%22%7d",
   horarioAtencionCAV: {
      diasNoLaborables: [(new Date()).getFullYear() + "/07/22",
                           (new Date()).getFullYear() + "/07/28",
                           (new Date()).getFullYear() + "/07/29",
                           (new Date()).getFullYear() + "/08/06"
                        ],   
      diaInicio : 1,
      diaFin : 5,
      HoraInicio: '01',
      MinutoInicio: '00',
      SegundosInicio: "00",
      HoraFin: '23',
      MinutoFin: '59',
      SegundosFin: "59"
   }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
