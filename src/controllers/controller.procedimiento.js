
import prisma from '../libs/prisma.js'


export  const listarProcedimientos=async(req,resp)=>{
    try{
        const procedimientos = await prisma.Procedimiento.findMany(
            {
                include:{
                    cups:true,
                    finalidad:true
                }
            }
        );
        

        if(procedimientos.length>0)
            return resp.status(200).json({"status":200,procedimientos});
        else{
            return resp.status(404).json({"status":404,"message":"No se encontraron Procedimientos"});
        }

        
    }catch(error){
        console.log("Error en controller.procedimiento.js :"+error);
        resp.status(500).json({ error: 'Error al listar los procedimientos' });
    }
}



export  const buscarProcedimientoId=async(req,resp)=>{
    try{
        const id= await req.params.id_procedimiento;
        const procedimientos = await prisma.Procedimiento.findFirst(
            {
                where: { id_procedimiento: Number(id) },
                include:{
                        cups:true,
                        area:true,
                        finalidad:true
                    }
                
            }
        );
       
        return resp.status(200).json(procedimientos);
       
        
    }catch(error){
        console.log("Error en controller.procedimiento.js :"+error);
        resp.status(500).json({"status":500,"message":"Error en el sistema"});
    }
}



export  const registrarProcedimiento=async(req,resp)=>{
    try{
        const datos= await req.body;
        const procedimientos = await prisma.Procedimiento.create(
            {
                data: {
                    cupsId: Number(datos.cupsId),
                    servicioId: Number(datos.servicioId),
                    areaId: Number(datos.areaId),
                    tecnica:datos.tecnica,
                    finalidadId:Number(datos.finalidadId),
                    precio: parseFloat(datos.precio),
                    estado: "Activo"
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Porcedimiento registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.procedimiento.js :"+error);
        resp.status(500).json({ error: 'Error al registrar el procedimiento' });
    }  
}



export  const actualizarProcedimientoId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_procedimiento;


        const procedimientos = await prisma.Procedimiento.findUnique({
            where: { id_procedimiento: Number(id)},
          });
          if (!procedimientos) {
            return resp.status(404).json({"status":200,"message":"El procedimiento no existe en el sistema"});
          }
          else{
            const procedimiento = await prisma.Procedimiento.update(
                {
                    where:{id_procedimiento:Number(id)},
                    data:{
                        cupsId: Number(datos.cupsId),
                        servicioId: Number(datos.servicioId),
                        areaId: Number(datos.areaId),
                        tecnica:datos.tecnica,
                        finalidadId:Number(datos.finalidadId),
                        precio: parseFloat(datos.precio),
                        estado: "Activo"

                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Procediento actualizado en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.procedimiento.js :"+error);
       
        return resp.status(500).json({"status":500,"message":"Error al actualizar el procedimiento"});
    }  
}

export  const estadoProcedimientoId=async(req,resp)=>{
    try{
        const id= await req.params.id_procedimiento;
        const {estado} = req.body;
        const procedimientos = await prisma.Procedimiento.findUnique({
            where: { id_procedimiento: Number(id)}
          });

          if (!procedimientos) {
            return resp.status(404).json({"status":404,"message":"El procedimiento no existe en el sistema"});
          }
          else{
            const proced= await prisma.Procedimiento.update(
                {
                    where:{id_procedimiento:Number(id)},
                    data:{estado: estado}  
                }  
            );
            return resp.status(200).json({"status":200,"message":`Procedimiento ${estado} del sistema`});
        }

    }catch(error){
        console.log("Error en controller.procedimiento.js :"+error);
        return resp.status(500).json({"status":500,"message":`Procedimiento ${estado} del sistema`});
    }  
}



// se listan todos los procedimientos asociados al serviccio 
export  const procedimientoServicioId=async(req,resp)=>{
    try{
        const id_servicio= req.params.id_servicio;
       
        const procedimientos = await prisma.Procedimiento.findMany(
            {
                where:{servicioId:Number(id_servicio)},
                include:{
                    servicio:true,
                    finalidad:true,
                    cups:true,
                    area:true
                }
            }
        );
    
        return resp.status(200).json({"status":200,procedimientos});
       
     
        
    }catch(error){
        console.log("Error en controller.procedimiento.js :"+error);
        return resp.status(500).json({"status":500,"message":"Error al listar los procedimientos"});
       
    }
}



// se listan todos los procedimientos activos asociados al servicio 
export  const procedimientoActivoServicioId=async(req,resp)=>{
    try{
        const id_servicio= req.params.id_servicio;
       
        const procedimientos = await prisma.Procedimiento.findMany(
            {
                where:{servicioId:Number(id_servicio),estado:'Activo'},
                include:{
                    servicio:true,
                    cups:true
                }
            }
        );
    
        return resp.status(200).json({"status":200,procedimientos});
       
     
        
    }catch(error){
        console.log("Error en controller.procedimiento.js :"+error);
        return resp.status(500).json({"status":500,"message":"Error al listar los procedimientos"});
       
    }
}





export  const listarAreas=async(req,resp)=>{
    try{
    
        const areas = await prisma.Area.findMany();
         
     
        return resp.status(200).json({"status":200,areas});      
    }catch(error){
        console.log("Error en controller.procedimiento.js :"+error);
        return resp.status(500).json({"status":500,"message":"Error al listar las areas"});
       
    }
}




// Modulo de parametros

export  const registrarParametro=async(req,resp)=>{
    try{
        const datos= await req.body;
        const parametro = await prisma.Parametro.create(
            {
                data: {
                    nombre: datos.parametro,
                    valor_referencia: datos.valor_referencia,
                    metodo: datos.metodo,
                    unidad: datos.unidad,
                    procedimientoId: Number(datos.id_procedimiento),
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Parametro registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.procedimiento.js :"+error);
        resp.status(500).json({ error: 'Error al registrar el parametro' });
    }  
}



export  const listarParametroId=async(req,resp)=>{
    try{
        const id_procedimiento= req.params.id_procedimiento;
       
        const parametros = await prisma.Parametro.findMany(
            {
                where:{procedimientoId:Number(id_procedimiento)},
                include:{
                    tipo_resultado:true
                }
              
            }
        );
        return resp.status(200).json({"status":200,parametros});      
    }catch(error){
        console.log("Error en controller.procedimiento.js :"+error);
        return resp.status(500).json({"status":500,"message":"Error al listar los parametros"});
       
    }
}


export  const eliminarParametro=async(req,resp)=>{
    try{
        const id_parametro= req.params.id_parametro;
       
        const parametros = await prisma.Parametro.delete(
            {
                where:{id_parametro:Number(id_parametro)}
            }
        );
        return resp.status(200).json({"status":200,"message":"Parametro Eliminado"});      
    }catch(error){
        console.log("Error en controller.procedimiento.js :"+error);
        return resp.status(500).json({"status":500,"message":"Error al elimnarparametros"});
       
    }
}




export  const registrarTipoResultado=async(req,resp)=>{
    try{
        const datos= await req.body;
        const tipo_resultado = await prisma.Tipo_Resultado.create(
            {
                data: {
                    parametroId:Number(datos.id_parametro),
                    nombre: datos.tipo_resultado
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"tipo de resultado registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.procedimiento.js :"+error);
        resp.status(500).json({ error: 'Error al registrar el tipo de resultado' });
    }  
}





export  const eliminarTipoResultado=async(req,resp)=>{
    try{
        const id_tipo_resultado= req.params.id_tipo_resultado;
       
        const tipo_resultado = await prisma.Tipo_Resultado.delete(
            {
                where:{id_tipo_resultado:Number(id_tipo_resultado)}
            }
        );
        return resp.status(200).json({"status":200,"message":"Tipo de Resultado Eliminado"});      
    }catch(error){
        console.log("Error en controller.procedimiento.js :"+error);
        return resp.status(500).json({"status":500,"message":"Error al eliminar el tipo de resultado"});
       
    }
}

