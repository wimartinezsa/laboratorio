import prisma from '../libs/prisma.js';


export  const reporteUsuariosAtendidos=async(req,resp)=>{
    try{
        let fecha_inicio=req.params.fecha_inicio;
        let fecha_fin=req.params.fecha_fin;
        let empresa=req.params.empresa;
        let sede=req.params.sede;
        
        const examenes = await prisma.$queryRaw`
         SELECT 
            pa.identificacion,pa.nombres,cu.codigo,cu.nombre AS examen,ex.precio,fact.fecha,fact.autorizacion,ex.precio
            ,cont.nombre AS contrato,em.nombre AS empresa,em.nit,se.nombre as sede,ex.cantidad
            FROM facturas fact
            JOIN sedes se ON se.id_sede = fact.sedeId
            JOIN contratos cont ON cont.id_contrato=fact.contratoId
            JOIN empresas em ON em.id_empresa = cont.empresaId
            JOIN examenes ex ON ex.facturaId= fact.id_factura
            JOIN procedimientos proc ON proc.id_procedimiento = ex.procedimientoId
            JOIN cups cu ON cu.id_cups = proc.cupsId
            JOIN  pacientes pa ON pa.id_paciente = fact.pacienteId
            WHERE em.id_empresa=${empresa} and ex.estado='Resultados_Listos' and fact.fecha BETWEEN ${fecha_inicio} AND  ${fecha_fin} and se.id_sede=${sede}
            ORDER BY pa.nombres ASC
        `;
        
        

        return resp.status(200).json(examenes);
       
    }catch(error){
        console.log("Error en controller.reporte.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al listar  reporte de usuarios atendidos' });
    }
}

export  const listarSedes=async(req,resp)=>{
    try{
        const sedes = await prisma.sede.findMany();
        return resp.status(200).json(sedes);
    }catch(error){
        console.log("Error en controller.reporte.js :"+error);
        resp.status(500).json({ error: 'Error al listar las sedes' });
    }
}
