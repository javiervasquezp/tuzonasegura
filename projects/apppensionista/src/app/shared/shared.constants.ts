export module SharedConstants{
    export const Titulos = {
        VerAportes: "Ver mis aportes declarados"
    }
    export const General = {
        cantidadCaracteresDni: 8,
        cantidadCaracteresDocumento: 12,
        TamanioMaximoAdjuntarMB: 2,
        contentTypeExcel: "application/vnd.ms-excel",
        contentTypePDF: "application/pdf" 
    }
    export const rutasview = {
        resoluciones: "/pensionista/resoluciones",
        resolucionesDetalle: "/pensionista/resoluciones/resoluciones-detalle"

    }

    export const Alerta = {
        msgEncabezadoAlerta: "<p class='alert__info'>Para realizar la autorización, todos los datos deben ser correctos. Los siguientes datos presentan problemas:</p> ",
        msgEncabezadoAlertaSol: "<p class='alert__info'>Para realizar la solicitud, todos los datos deben ser correctos. Los siguientes datos presentan problemas:</p> ",
        msgAlertaCasilla:
        "<div class='cabecera-alerta'>"+
        "<b>Casilla electrónica de la ONP</b>"+
        "</div><br>"
        +"<div>La casilla electrónica es un buzón virtual, en donde podrás recibir todas tus resoluciones, notificaciones y comunicación en general de la ONP de manera segura.<br>"+
        "La casilla electrónica de la ONP estará disponible para:"+
        "<ul>"+
          "<li>Pensionistas</li>"+
          "<li>Afiliadas/os</li>"+
          "<li>Apoderadas/os</li>"+
          "<li>Ciudadanas/os que necesiten hacer una gestión en la ONP</li>"+
        "</ul>"+
      "</div>"+
      "<div class='cabecera-alerta'>"+
        "<b>Términos y condiciones</b>"+
      "</div><br>"+
      "<div>"+
        "<ul>"+
          "<li>La casilla electrónica de la ONP es voluntaria.</li>"+
          "<li>La casilla electrónica de la ONP es gratuita.</li>"+
          "<li>La casilla electrónica voluntaria es única para la o el pensionista, afiliada/o y/o ciudadana/o.</li>"+
          "<li>La persona titular de la casilla electrónica voluntaria es la o el pensionista, afiliada/o y/o ciudadana/o.</li>"+
          "<li>La persona titular de la casilla electrónica voluntaria es la única persona que autoriza, a través de un poder , el acceso a su casilla a una persona apoderada.</li>"+
          "<li>Pueden acceder a la casilla electrónica voluntaria la o el pensionista, afiliada/o, ciudadana/o y/o persona apoderada debidamente acreditada.</li>"+
          "<li>Para acceder a la casilla electrónica de la persona titular, recibirás un usuario y clave en tu correo electrónico.</li>"+
          "<li>Todas las notificaciones a la casilla electrónica de la persona titular serán comunicadas a tu correo electrónico.</li>"+
          "<li>Pide la validación de tus datos: correo electrónico, celular y dirección.</li>"+
          "<li>La notificación será válidamente efectuada con el depósito del documento en la casilla electrónica de la persona titular.</li>"+
          "<li>La notificación surte efectos el día que conste haber sido recibida en la casilla electrónica o, en caso tal día sea no hábil, será a partir del primer día hábil siguiente de haber sido recibida.</li>"+
          "<li>La ONP notificará las resoluciones, esquelas, notificaciones, cuadros de aportes, hojas de regularización, liquidación de intereses/devengados, hojas de cuantía de pensión e informes en general, en respuesta a lo solicitado por la persona titular, quien aceptó ser notificada(o) a través de la casilla electrónica voluntaria.</li>"+
          "<li>La casilla electrónica no constituye una herramienta para dar respuesta a cualquier notificación recibida de la ONP.</li>"+
          "<li>Para el caso de tutores o salvaguardas, no cuentan con poder, el 1ero basta con el documento que acredite ser madre o padre para un orfante, asimismo para ambos también se obtienen la tutela o salvaguarda por mandato judicial.</li>"+
          "<li>Las validaciones se realizarán en línea, al momento de registrar la información en el formulario.</li>"+
          "<li>Cuando no se pueda efectuar la notificación vía casilla electrónica voluntaria, la ONP usará las otras modalidades de notificación previstas en el artículo 20 del Texto Único Ordenado de la Ley N° 27444, Ley del Procedimiento Administrativo General.</li>"+
        "</ul>"+
      "</div><hr>",
      msgAlertaArchivo: "<p>No se pudo adjuntar, el archivo excede los 5MB.</p>",
      msgAlertaNombreArchivo: "<p>No se pudo adjuntar, el nombre del archivo es demasiado largo.</p>",
      msgRegistroSolicitud: "<p class='title'>¡Tu solicitud se ha registrado exitosamente!</p><p class='center-text'>Ten en cuenta que todas las notificaciones serán enviadas según la notificación electrónica seleccionada. Si elegiste correo electrónico, verifica regularmente tu bandeja de entrada o de correo no deseado.</p>"
    }

    export const Perfiles = {
        Aportante: "A",
        Aportante2022: "NA",
        Pensionista: "P",
        Ciudadano: "C",
        Representante: "R"
    }

    export const rutasActualizarDatos = {
      aportante: "/aportante/actualizar-datos",
      pensionista: "/pensionista/actualizar-datos"
    }
}