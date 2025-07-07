export interface IntereseLegalesModel {
	DatosCabecera: DatosCabeceraModel;
	DatosDetalle: DatosDetalleModel[]; 
}
export interface DatosCabeceraModel {
	TipoDocumento: string;
    NumeroDocumento: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Nombres: string;
    Regimen: string;
    FechaUltimaActualizacion: string;
}
export interface DatosDetalleModel {
    Cuenta:  string;
    CodigoPrestacion:  string;
    Prestacion:  string;
    FechaPago: string;
    ModalidadPago:  string;
    FechaInicioPeriodoInteres:  string;
    FechaFinPeriodoInteres:  string;
    MontoPeriodoInteres: number;
    FechaInicioCantidadDevengado:  string;
    FechaFinCantidadDevengado: string;
    MontoCantidadDevengado: number;
    SubtotalIntereses: number;
    MontoDescuentoInteresesPagado:number;
    MontoDescuentoInteresPagadoPorTransaccion:number;
    MontoPagarPorInteres: number;
    FechaInicioPeriodoDevengado:  string;
    FechaFinPeriodoDevengado:  string;
    MontoPeriodoDevengado: number;
    MontoDevengadoBruto:number;
    MontoDescuentoSeguroSocial: number;
    MontoNetoDevengado: number;
    NumeroSolicitud:  string;
    IndicadorGratificacion:  string;
}