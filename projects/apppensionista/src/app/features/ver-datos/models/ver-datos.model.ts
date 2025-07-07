export interface VerDatosModel {
	DatosPensionista: DatosPensionistaModel;
	DescripcionTipoDocumento: string;
	GruposLey: string[];
	ExistenciaOrfandad: string; 
}
export interface DatosPensionistaModel {
	DatosCabecera: DatosCabeceraModel; 
	DatosDetalle: DatosDetalleModel[]; 
    GlosaDetalle: string[]; 
}
export interface DatosDetalleModel {
	DescripcionRegimen: string; 
	Prestacion: string; 
    DescripcionCuenta: string; 
	TipoPago: string; 
    SimboloMoneda: string; 
	MontoPension: string; 
    CuentaBancaria: string,
    DescripcionZonal: string,
    DescripcionEntidad: string,
    DescripcionAgencia: string,
    DescripcionEntidadRepago: string,
    DescripcionLugarRepago: string,
    TipoRepresentante: string,
    NombreRepresentante: string,
    ApellidoPaternoRepresentante: string,
    ApellidoMaternoRepresentante: string,
    CodigoRepresentante: string,
    FechaVigenciaInicio: string,
    FechaVigenciaFin: string,
    DescripcionGlosa: string
}
export interface DatosCabeceraModel {
	IdTipoDocuIdentidad: string; 
	ApellidoPaterno: string; 
    ApellidoMaterno: string; 
    Nombres: string; 
    FechaNacimiento: string; 
    Sexo: string; 
    Telefono: string; 
    Direccion: string; 
    Referencia: string; 
    Departamento: string; 
    Provincia: string; 
    Distrito: string; 
    Correo: string; 
    oDepartamento: oDepartamentoModel; 
    oDistrito: oDistritoModel; 
    oProvincia: oProvinciaModel; 
}
export interface oDepartamentoModel {
    DescripcionDepartamento: string; 
    IdDepartamento: string; 
    CodigoDepartamento: string; 
}
export interface oDistritoModel {
    DescripcionDistrito: string; 
    IdDistrito: string; 
    CodigoProvincia: string; 
    ZonaCobertura: string; 
}
export interface oProvinciaModel {
    DescripcionProvincia: string; 
    IdProvincia: string; 
    CodigoProvincia: string; 
    CodigoDepartamento: string; 
}