
import prisma from '../libs/prisma.js'


export  const listarEps=async(req,resp)=>{
    try{
        const eps = await prisma.eps.findMany();
        return resp.status(200).json(eps);
    }catch(error){
        console.log("Error en controller.eps.js :"+error);
        resp.status(500).json({ error: 'Error al listar las eps' });
    }
}

export  const buscarEpsId=async(req,resp)=>{
    try{
        const id= await req.params.id_eps;
        const eps = await prisma.eps.findFirst(
            {
                where: { id_eps: Number(id) }
            }
        );
        return resp.status(200).json(eps);
    }catch(error){
        console.log("Error en controller.eps.js :"+error);
        resp.status(500).json({ error: 'Error al buscar la eps' });
    }
}

export  const registrarEps=async(req,resp)=>{
    try{
        const datos= await req.body;
        const eps = await prisma.eps.create(
            {
                data: {
                    codigo: datos.codigo,
                    nombre: datos.nombre,
                    estado: datos.estado
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Eps registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.eps.js :"+error);
        resp.status(500).json({ error: 'Error al registrar la eps' });
    }  
}

export  const actualizarEpsId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_eps;
        const existencia = await prisma.eps.findUnique({
            where: { id_eps: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"La Eps no existe en el sistema"});
          }
          else{
            const eps = await prisma.eps.update(
                {
                    where:{id_eps:Number(id)},
                    data:{
                        codigo:datos.codigo,
                        nombre:datos.nombre,
                        estado:datos.estado
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Eps actualizada en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.eps.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar la Eps' });
    }  
}


export  const desactivarEpsId=async(req,resp)=>{
    try{
        const id= await req.params.id_eps;
        const existencia = await prisma.eps.findUnique({
            where: { id_eps: Number(id)}
          });

          if (!existencia) {
            return resp.status(501).json({"status":501,"message":"La Eps no existe en el sistema"});
          }
          else{
            const eps= await prisma.eps.update(
                {
                    where:{id_eps:Number(id)},
                    data:{estado: 'Inactivo'}  
                }  
            );
            return resp.status(200).json({"status":200,"message":"Eps desactivada del sistema"});
        }

       
    }catch(error){
        console.log("Error en controller.eps.js :"+error);
        resp.status(500).json({ error: 'Error al desactivar la Eps' });
    }  
}


   