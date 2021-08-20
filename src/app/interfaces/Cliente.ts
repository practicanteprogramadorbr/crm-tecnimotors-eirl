export interface Cliente {
    id: number,
    nombres: string,
    ap_paterno: string,
    ap_materno: string,
    nro_cotizacion: string,
    fecha_solicitud: Date,
    celular: string,
    correo: string,
    moto_id: number,
    cantidad: number;
    repuestos: string,
    bicicleta_id: number;
    fuente_id: number;
    estado_id: number;
    vendedor_id: number;
    comentario: string;
    respuesta_vendedor: string;
}