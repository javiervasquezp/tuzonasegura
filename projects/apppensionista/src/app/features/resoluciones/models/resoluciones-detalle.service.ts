export interface ResolucionesDetalleModel {
 
	DatosCabecera: DatosCabeceraModel; 
    DatosDetalle: DatosDetalleModel[];
}
export class DatosCabeceraModel{
    SiglaTipoDocumentoIdentidad: string="";
    NumeroDocumentoIdentidad: string="";
    ApellidoPaterno: string="";
    ApellidoMaterno: string="";
    Nombres: string="";
    DecretoLey: string="";
    Expediente: string="";    
}
export class DatosDetalleModel{
    IdDetalle: string="";
    TipoDocumento: string="";
    FechaCreacionNSP: string="";  
    NumeroDocumento: string="";
    DescripcionDocumento: string="";
    ResultadoDocumento: string="";   
}