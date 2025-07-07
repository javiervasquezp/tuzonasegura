export interface BoletasPagoModel {
	UltimosPagos: UltimosPagosModel;
	BoletasPagos: BoletasPagosModel[];  
}
export interface UltimosPagosModel {
	DatosCabecera: DatosCabeceraModel;
	DetalleRegimenes: DetalleRegimenesModel[];  
}
export interface DetalleRegimenesModel {
	Regimen: string; 
    DetalleRegimenCuentas: DetalleRegimenCuentasModel[];
}
export interface DetalleRegimenCuentasModel {
	Cuenta: string;  
    Prestacion: string;  
    DetalleCuentaPagos: DetalleCuentaPagosModel[];  
}
export interface DetalleCuentaPagosModel {
    Regimen: string;
    Cuenta: string;
    NumeroEmision: string;
    CodigoProceso: string;
    IndSubProceso: string;
    IndConstanciaPago: string;
    Periodo:string;
    MontoBruto: string;
    MontoNeto: string;
    EstadoPago: string;
    SimboloMoneda:string;
    FechaReintegro: string;
    VisualizaConstanciaPago: boolean;
}
export interface DatosCabeceraModel {
	ApellidoPaterno: string; 
    ApellidoMaterno:string; 
    Nombres:string; 
    SiglaTipoDocumentoIdentidad: string; 
    NumeroDocumentoIdentidad: string; 
    AbreviacionTipoDocumentoIdentidad: string; 
    DescripcionTipoDocumentoIdentidad: string; 
}
export interface BoletasPagosModel {
    descripcionCuenta: string; 
    numRegLey: string; 
    desEntRepago: string; 
    fechaReintegro: string; 
    numEmision: string; 
    codProc: string; 
    inSubProceso:string; 
    desEmision: string; 
    simbMoneda: string; 
    montoPagoBruto: string; 
    montoPagoNeto: string; 
    estPago: string; 
    inConsPago: string; 
	DetalleRegimenes: string;  
}