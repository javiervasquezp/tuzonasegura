export module AutorizarDatosConstants{
    export const mensajesValidacion = {
        msgIngresarCheck: "<p class='color-p'><strong>Casilla:</strong> debes marcar la casilla de autorización.</p>",
        msgIngresarRegimen: "<p class='color-p'><strong>Régimen:</strong> debes seleccionar tu régimen.</p>",
        msgIngresarEntidadFinanciera: "<p class='color-p'><strong>Entidad financiera:</strong> debes seleccionar la entidad financiera.</p>",
        msgNoAutorizado: "En aplicación a la Cuadragésima Primera Disposición Complementaria Final de la Ley N° 30114 como las normas reglamentarias aprobadas por el Decreto Supremo N° 010-2014-EF las afectaciones a la planilla deben aplicarse solo a servidores o cesantes.",
        msgEncabezadoAlerta: "<p class='alert__info'>Para realizar la autorización, todos los datos deben ser correctos. Los siguientes datos presentan problemas:</p> "
    }

    export const Estados = {
        Activo: "ACTIVO"
    }

    export const TipoDerecho = {
        Propio: 1,
        Derivado: 2
    }

    export const TipoDocumento = {
        Dni: "01",
        CE: "02",
        PS: "06"
    }

    export const TipoDocumentoNSP = {
        Dni: "DI",
        CE: "CE",
        PS: "PS"
    }
}