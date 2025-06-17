import prisma from '../libs/prisma.js';


export  const reporteUsuariosAtendidos=async(req,resp)=>{
    try{
        let fecha_inicio=req.params.fecha_inicio;
        let fecha_fin=req.params.fecha_fin;
        const examenes = await prisma.$queryRaw`
         SELECT 
            pa.identificacion,pa.nombres,cu.nombre AS examen,fact.fecha,fact.autorizacion,ex.precio
            ,cont.nombre AS contrato,em.nombre AS empresa
            FROM facturas fact
            JOIN contratos cont ON cont.id_contrato=fact.contratoId
            JOIN empresas em ON em.id_empresa = cont.empresaId
            JOIN examenes ex ON ex.facturaId= fact.id_factura
            JOIN procedimientos proc ON proc.id_procedimiento = ex.procedimientoId
            JOIN cups cu ON cu.id_cups = proc.cupsId
            JOIN  pacientes pa ON pa.id_paciente = fact.pacienteId
            WHERE ex.estado='Resultados_Listos' and fact.fecha BETWEEN ${fecha_inicio} AND  ${fecha_fin}
            ORDER BY ex.fecha_muestra ASC
        `;
        
        return resp.status(200).json(examenes);
       
    }catch(error){
        console.log("Error en controller.reporte.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al listar  reporte de usuarios atendidos' });
    }
}

