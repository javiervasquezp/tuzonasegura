

export interface PagoDomicilioModel {
	DatosPensionista: DatosPensionistaModel;
	GruposLey: string[];
	DatosUbigeos: DatosUbigeosModel;
    DatosDepartamentosPD:DatosDepartamentosPDModel;
    DatosProvinciasPD:DatosProvinciasPDModel;
    DatosDistritosPD:DatosDistritosPDModel;
    MensajeCorreoEnviado:string;
    MensajeParrafoSharepoint:string;
}
export interface DatosPensionistaModel {
    Usuario:UsuarioModel; 
}
export class UsuarioDatos {
    Direccion:string='';
    IdDistrito:string='';
    IdProvincia:string='';
    IdDepartamento:string='';
    Referencia:string='';
    IsDeclarionJurada:boolean=false;
    FacilitacionADM:boolean=false;
    submitted:boolean=false;
    ZonaCobertura:boolean=false;
    Distrito:string='';
    Provincia:string='';
    Departamento:string='';
    Correo:string='';  
    Celular:string='';
    Telefono: string = '';
    Nombre:string='';
    TipoDocumento:string='';
    NumeroDocumento:string='';
    AutorizoCasilla: boolean = false;
    AutorizoCorreo: boolean = false;
    CodPaisNacionalidad: string = "PER";
    PaisNacionalidad: string = "";
    Ubigeo: string = "";
}
export interface UsuarioModel {
    NombreCompleto:string;
    Telefono:string;
    Celular:string;
    Correo:string;
    Direccion:string;
    Distrito:string;
    Provincia:string;
    Departamento:string;
    Referencia:string;
}
export interface DatosUbigeosModel {
    Departamentos: DepartamentosModel[];
    Provincias:ProvinciasModel[];
    Distritos:DistritosModel[];
}
export interface DepartamentosModel {
    DescripcionDepartamento:string;
    IdDepartamento:string;
    CodigoDepartamento:string;
}
export interface ProvinciasModel {
    DescripcionProvincia:string;
    IdProvincia:string;
    CodigoDepartamento:string;
    CodigoProvincia:string;
}
export interface DistritosModel {
    DescripcionDistrito:string;
    IdDistrito:string;
    ZonaCobertura:string;
    CodigoProvincia:string;
}
export interface DatosDepartamentosPDModel {
    Departamentos: DepartamentosModel[];
}
export interface DatosProvinciasPDModel {
    Provincias:ProvinciasModel[];
}
export interface DatosDistritosPDModel {
    Distritos:DistritosModel[];
}