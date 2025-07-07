export module CoreConstants {
    export const LocalStorage = { 
        Token: 'app_token',
        NavegationId:'navegationId'
      };
      export const CodigoRespuesta = {
        OperacionExitosa: "0000",
        OperacionNoEjecutada: "0001",
        ErrorNoControlado: "0002",
        OperacionIncorrectaDatos: "0003",
        NoAutorizado: "0004",
        CambioClave: "0005"
};
export const Mensajes = {
  SesionExpirada: 'Su sesión ha expirado/no tiene permiso.',
  NoHayConexion: 'Error de conexión, intenta nuevamente',
  NoAutorizado: 'Usuario y/o clave no válido.'
};
}