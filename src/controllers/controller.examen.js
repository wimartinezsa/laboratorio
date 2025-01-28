
import prisma from '../libs/prisma.js'


export  const agregarExamenesFactura=async(req,resp)=>{
    try{
        const datos= await req.body;

        const examen = await prisma.Examen.create(
            {
                data: {
                
                    fecha_muestra:new Date(),
                    fecha_resultado:new Date(),
                    estado:'Solicitado',
                    observacion : '',
                    cantidad:1,
                    precio:Number(datos.precio),
                    facturaId:Number(datos.id_factura),
                    procedimientoId:Number(datos.id_procedimiento)
                }
            } 
        );
        if(examen){
            const paremetros = await prisma.procedimiento.findMany({
                where: { id_procedimiento:Number(examen.procedimientoId)},
                include:{
                    parametro:true
                }
              });
                if(paremetros){
                    for (const item of paremetros) {
                        for (const subItem of item.parametro) {

                            await prisma.resultado.create({
                                data: {
                                    parametroId: Number(subItem.id_parametro),
                                    examenId: Number(examen.id_examen),
                                    resultado: '',
                                    estado:'Pendiente'
                                }
                            });
                        }
                    }
                }
        }
    
        return resp.status(200).json({"status":200,"message":"Examen agregado a la Factura"});
    }catch(error){
        console.log("Error en controller.examen.js :"+error);
        resp.status(500).json({ "status":500,"message": 'Error al registrar el  ecamen' });
    }  
}



export  const listarExamenesFactura=async(req,resp)=>{
    try{
       let id_factura=req.params.id_factura;
        const contratos = await prisma.$queryRaw`
        
        SELECT 
	ex.id_examen,s.nombre AS servicio, cu.nombre AS procedimiento,ex.cantidad,DATE(ex.fecha_muestra)AS fecha,c.nombre AS contrato,ex.precio,
        cu.codigo AS cups,ex.estado
        FROM facturas f
        JOIN contratos c ON c.id_contrato = f.contratoId
        JOIN acuerdos ac ON ac.contratoId=id_contrato
        JOIN examenes ex ON ex.facturaId = f.id_factura
	    JOIN procedimientos pro ON pro.id_procedimiento= ex.procedimientoId AND pro.id_procedimiento= ac.procedimientoId
	    JOIN cups cu ON cu.id_cups= pro.cupsId
        JOIN servicios s ON s.id_servicio = pro.servicioId
        WHERE f.id_factura =${id_factura}

        `;
        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.facturas.js :"+error);
        resp.status(500).json({ status:500,message: 'Error al listar  las facturas' });
    }
}



export  const eliminarExamenFactura=async(req,resp)=>{
    try{
        const id= await req.params.id_examen;
        const existencia = await prisma.Examen.findUnique({
            where: { id_examen: Number(id)}
          });

          if (!existencia) {
            return resp.status(404).json({"status":404,"message":"No existe examen en la factura"});
          }
          else{
            const examen = await prisma.Examen.delete(
                {
                    where:{id_examen:Number(existencia.id_examen)}
            
                }  
            );
            return resp.status(200).json({"status":200,"message":"Se elimino el examen de la Factura"});
        }

       
    }catch(error){
        console.log("Error en controller.factura.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al eliminar el examen de la Factura' });
    }  
}



export  const cambiarEstadoExamen=async(req,resp)=>{
    try{
        const id= await req.params.id_examen;
        const datos= await req.body;
        const existencia = await prisma.Examen.findUnique({
            where: { id_examen: Number(id)}
          });

          if (!existencia) {
            return resp.status(404).json({"status":404,"message":"No existe examen en la factura"});
          }
          else{
            
            const examen = await prisma.Examen.update(
                {
                    where:{id_examen: Number(id)},
                    data:{
                        fecha_muestra: new  Date(datos.fecha),
                        observacion: datos.observacion,
                        estado: datos.estado_muestra                      
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Se actualizo el estado del el axamen"});
        }

       
    }catch(error){
        console.log("Error en controller.factura.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al cambiar de estado el examen de la Factura' });
    }  
}




