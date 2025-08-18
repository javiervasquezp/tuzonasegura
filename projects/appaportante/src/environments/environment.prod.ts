export const environment = {
  production: true,
  apiServiceSeguridadUrl:"https://wsexterno.onp.gob.pe/Seguridad/api/", 
  apiServiceAportanteUrl:"https://wsexterno.onp.gob.pe/Aportante/api/",
  urlOnpvirtual : 'https://onpvirtual.pe/',
  linkTeamsCAV : "https://teams.microsoft.com/l/meetup-join/19%3ameeting_NWEyMWQ2NzYtY2FmMC00MWY5LTgwMmUtMDhjMDMyNDEzNmY4%40thread.v2/0?context=%7b%22Tid%22%3a%2259eb295b-ef81-4708-8888-5756316215ab%22%2c%22Oid%22%3a%22731b6032-2871-42df-b8f9-8fccdeaba94b%22%7d",
  horarioAtencionCAV : {
    diasNoLaborables: [(new Date()).getFullYear() + "/07/23",
                        (new Date()).getFullYear() + "/07/28",
                        (new Date()).getFullYear() + "/07/29",
                        (new Date()).getFullYear() + "/08/06"
                      ],
    diaInicio : 1,
    diaFin : 5,
    HoraInicio: '08',
    MinutoInicio: '00',
    SegundosInicio: "00",
    HoraFin: '16',
    MinutoFin: '59',
    SegundosFin: "59"
  }
};
