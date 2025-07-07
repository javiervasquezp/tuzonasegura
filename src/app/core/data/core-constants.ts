export module CoreConstants {

export const CodigoRespuesta = {
      OperacionExitosa: "0000",
      OperacionNoEjecutada: "0001",
      ErrorNoControlado: "0002",
      OperacionIncorrectaDatos: "0003"
  };

  export const LocalStorage = { 
    Token: 'app_token',
    UrlValidateToken:'/#/validate/',
    NavegationId:'navegationId',
    RutaDefault: ''
  };
  export const TipoComponente = {
    Aportante: "0BC604AA-B234-47B0-90EB-225A34D3702F",
    Pensionista: "819DAC55-DCCD-4AF2-A023-BE34EC3BE54B", 
    Empleador: "214F0316-D7E1-4DD4-9024-B8FC1C2A8E5C",
    Sctr: "271D26B7-2711-4297-B8B4-F94E2CB119CD",
  }
  export const MicroFrondEnd = {
    Aportante: {
      loaded: false,
      src: 'assets/micro-frontends/appaportante/master.js?v=',
      element: 'app-aportante',
      route: ''
    },
    Pensionista: {
      loaded: false,
      src: 'assets/micro-frontends/apppensionista/master.js?v=',
      element: 'app-pensionista',
      route: ''
    },
    Emplador:{
      loaded: false,
      src: 'assets/micro-frontends/appempleador/master.js?v=',
      element: 'app-empleador',
      route: ''
    },
    Sctr:{
      loaded: false,
      src: 'assets/micro-frontends/appsctr/master.js?v=',
      element: 'app-sctr',
      route: ''
    }
  };

}