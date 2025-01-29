
import prisma from '../libs/prisma.js'



export  const listarExamenesConfirmados=async(req,resp)=>{
    try{
        const examenes = await prisma.$queryRaw`
            SELECT 
            pa.identificacion,pa.nombres,ex.id_examen,cu.nombre AS cups,ex.estado,fact.autorizacion,ex.observacion
            FROM facturas fact
            JOIN examenes ex ON ex.facturaId= fact.id_factura
            JOIN procedimientos proc ON proc.id_procedimiento = ex.procedimientoId
            JOIN cups cu ON cu.id_cups = proc.cupsId
            JOIN  pacientes pa ON pa.id_paciente = fact.pacienteId
            WHERE ex.estado='En_Toma_de_Muestra'
            ORDER BY ex.fecha_muestra ASC
        `;
        if(examenes){
            return resp.status(200).json({"status":200,examenes});

        }else{
            resp.status(404).json({"status":500,"message": 'No se encontraron examenes facturados' });
        }
        
       
    }catch(error){
        console.log("Error en controller.muestra.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al listar  las examenes facturados' });
    }
}


export  const confirmarTomaMuestra=async(req,resp)=>{
    try{
        const id= await req.params.id_prestacion;
        const datos= await req.body;
        const existencia = await prisma.Examen.findUnique({
            where: { id_examen: Number(id)}
          });

          if (!existencia) {
            return resp.status(404).json({"status":404,"message":"No existe examen en la factura"});
          }
          else{
            
            const prestacion = await prisma.Examen.update(
                {
                    where:{id_examen: Number(id)},
                    data:{
                        fecha_muestra: new  Date(datos.fecha),
                        observacion: datos.observacion,
                        estado: "Muestra_Recibida"                     
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Se confirmo la toma de la muestra"});
        }

       
    }catch(error){
        console.log("Error en controller.factura.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al cambiar de estado el examen de la Factura' });
    }  
}




