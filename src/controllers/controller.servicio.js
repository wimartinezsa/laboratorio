

import prisma from '../libs/prisma.js'


export  const listarServicios=async(req,resp)=>{
    try{

        const servicios = await prisma.Servicio.findMany(
            {
                 include: { 
                    prestador: true,
                    tipo_servicio:true       
                    }
                
            }
        );
        if(servicios.length >0){
            return resp.status(200).json({"status":200,servicios});  
        }else{
            return resp.status(404).json({"status":404,"message":"No se encotraron Servicios"});
        }
        
    }catch(error){
        console.log("Error en controller.servicio.js :"+error);
        return resp.status(500).json({"status":500,"message":"Error al listar los servicios"});
    }
}

export  const listarServiciosActivos=async(req,resp)=>{
    try{

        const servicios = await prisma.Servicio.findMany(
            {   where:{estado:'Activo'},
                 include: { 
                    prestador: true,
                    tipo_servicio:true 
                    }
                
            }
        );
        if(servicios.length >0){
            return resp.status(200).json({"status":200,servicios});  
        }else{
            return resp.status(404).json({"status":404,"message":"No se encotraron Servicios"});
        }
        
    }catch(error){
        console.log("Error en controller.servicio.js :"+error);
        return resp.status(500).json({"status":500,"message":"Error al listar los servicios"});
    }
}


export  const buscarServicioId=async(req,resp)=>{
    try{
        const id= await req.params.id_servicio;

        const servicios = await prisma.Servicio.findFirst(
            {
                where: { id_servicio: Number(id) },
                include: { 
                    prestador: true,
                    tipo_servicio:true        
                    }
                
            }
        );
        return resp.status(200).json(servicios);
    }catch(error){
        console.log("Error en controller.servicio.js :"+error);
        resp.status(500).json({ error: 'Error al buscar el servicio' });
    }
}


export  const registrarServicio=async(req,resp)=>{
    try{
        const datos= await req.body;
        const servicio = await prisma.Servicio.create(
            {
                data: {
                    nombre:datos.nombre,
                    prestadorId:Number(1),
                    tipo_servicioId:Number(datos.tipo_servicioId),
                    grupo_servicio:datos.grupo,
                    modalidad_atencion:datos.modalidad,
                    estado:'Activo'
                }
            } 
        );

    return resp.status(200).json({"status":200,"message":"Servicio registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.Servicio.js :"+error);
        return resp.status(500).json({"status":500,"message":"Error al actualizar el servicio"});
    }  
}



export  const actualizarServicioId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_servicio;
        const existencia = await prisma.Servicio.findUnique({
            where: { id_servicio: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"El servicio no existe en el sistema"});
          }
          else{
            const servicio = await prisma.Servicio.update(
                {
                    where:{id_servicio:Number(id)},
                    data:{
                        nombre:datos.nombre,
                        prestadorId:Number(1),
                        tipo_servicioId:Number(datos.tipo_servicioId),
                        grupo_servicio:datos.grupo,
                        modalidad_atencion:datos.modalidad
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Servicio actualizado en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.servicio.js :"+error);
        return resp.status(500).json({"status":500,"message":"Error al actualizar el servicio"});
    }  
}



export  const estadoServicioId=async(req,resp)=>{
    try{
        const {estado} = req.body;
        const id= await req.params.id_servicio
        const existencia = await prisma.Servicio.findUnique({
            where: { id_servicio: Number(id)}
          });

          if (!existencia) {
            return resp.status(404).json({"status":404,"message":"El servicio no existe en el sistema"});
          }
          else{
            const servicio = await prisma.Servicio.update(
                {
                    where:{id_servicio:Number(id)},
                    data:{estado: estado}  
                }  
            );
            return resp.status(200).json({"status":200,"message":`Se ${estado} del sistema`});
        }

       
    }catch(error){
        console.log("Error en controller.tipo.servicio.js :"+error);
        return resp.status(500).json({"status":500,"message":`Error al  ${estado} el servicio`});
    }  
}

//----------------------- Modulo de Paquetes ------------------


   