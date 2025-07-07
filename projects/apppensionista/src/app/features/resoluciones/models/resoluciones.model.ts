export interface ResolucionesModel {
 
	DatosDetalle: DatosDetalleModel[]; 
    GruposLey: string[]
}
export interface DatosDetalleModel {
    CodigoLey: string; 
	IdExpediente: string; 
    NumeroExpediente: string; 
    ExisteDocumentos: string;     
}
export class DatosDetalle {
    CodigoLey: string= ""; 
	IdExpediente: string= ""; 
    NumeroExpediente: string= ""; 
    ExisteDocumentos: string= "";     
}