
import prisma from '../libs/prisma.js'


export  const listarTipoServicio=async(req,resp)=>{
    try{
        const tipos_servicios = await prisma.tipo_Servicio.findMany();
        return resp.status(200).json(tipos_servicios);
    }catch(error){
        console.log("Error en controller.tipo.servicio.js :"+error);
        resp.status(500).json({ error: 'Error al buscar el tipo de servicio' });
    }
}

export  const buscarTipoServicioId=async(req,resp)=>{
    try{
        const id= await req.params.id_tipo_servicio;
        const tipo_servicio = await prisma.Tipo_Servicio.findFirst(
            {
                where: { id_tipo_servicio: Number(id) }
            }
        );
        return resp.status(200).json(tipo_servicio);
    }catch(error){
        console.log("Error en controller.tipo.servicio.js :"+error);
    }
}

export  const registrarTipoServicio=async(req,resp)=>{
    try{
        const datos= await req.body;
        const Tipo_Servicio = await prisma.Tipo_Servicio.create(
            {
                data: {
                    nombre:datos.nombre,
                    estado:'Activo'
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Tipo de Servicio registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.Tipo_Servicio.js :"+error);
        resp.status(500).json({ error: 'Error al buscar el tipo de servicio' });
    }  
}

export  const actualizarTipoServicioId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_tipo_servicio;
        const existencia = await prisma.Tipo_Servicio.findUnique({
            where: { id_tipo_servicio: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"El tipo de servicio no existe en el sistema"});
          }
          else{
            const Tipo_Servicio = await prisma.Tipo_Servicio.update(
                {
                    where:{id_tipo_servicio:Number(id)},
                    data:{
                                 nombre:datos.nombre,
                                estado:datos.estado
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Tipo de servicio actualizado en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.tipo.servicio.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar el tipo de servicio' });
    }  
}
export  const desactivarTipoServicioId=async(req,resp)=>{
    try{
        const id= await req.params.id_tipo_servicio
        const existencia = await prisma.Tipo_Servicio.findUnique({
            where: { id_tipo_servicio: Number(id)}
          });

          if (!existencia) {
            return resp.status(501).json({"status":501,"message":"El tipo de servicio no existe en el sistema"});
          }
          else{
            const tipo_servicio = await prisma.Tipo_Servicio.update(
                {
                    where:{id_tipo_servicio:Number(id)},
                    data:{estado: 'Inactivo'}  
                }  
            );
            return resp.status(200).json({"status":200,"message":"El tipo de servico se desactivo del sistema"});
        }

       
    }catch(error){
        console.log("Error en controller.tipo.servicio.js :"+error);
        resp.status(500).json({ error: 'Error al desactivar el tipo de servicio' });
    }  
}


   