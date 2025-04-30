
import prisma from '../libs/prisma.js'


export  const listarContratos=async(req,resp)=>{
    try{
       
        const contratos = await prisma.$queryRaw`SELECT 
        co.id_contrato,
        co.fecha_inicio,
        co.fecha_fin,
        co.estado,
        co.nombre,
        em.nombre as empresa,
        mp.nombre as municipio

        FROM contratos co 
        join empresas em on id_empresa=empresaId
        join municipios mp on mp.id_municipio=municipioId
        `;
        return resp.status(200).json(contratos);
      
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
        resp.status(500).json({ error: 'Error al listar el contrato' });
    }
}


export  const listarContratosActivos=async(req,resp)=>{
    try{
        let id_empresa= req.params.id_empresa;
        
        const contratos = await prisma.$queryRaw`SELECT 
        co.id_contrato,
        co.estado,
        co.nombre
        FROM contratos co 
        WHERE co.empresaId=${id_empresa} AND co.estado='Activo'
        `;
        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
        resp.status(500).json({ error: 'Error al listar el contrato Activos' });
    }
}




export  const buscarContratoId=async(req,resp)=>{
    try{
        const id= await req.params.id_contrato;
        const contratos = await prisma.Contrato.findFirst(
            {
                where: { id_contrato: Number(id) },
                    include:
                     {
                        empresa:true,
                        empresa:{
                            include:{
                                municipio:true
                            }
                        }
                     }
                
            }
        );
        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
        resp.status(500).json({ error: 'Error al buscar el contrato' });
    }
}


export  const registrarContrato=async(req,resp)=>{
    try{
        const datos= await req.body;
        const contrato = await prisma.Contrato.create(
            {
                data: {
                    nombre:datos.nombre,
                    fecha_inicio:new Date(datos.fecha_inicio),
                    fecha_fin:new Date(datos.fecha_fin),
                    estado:'Activo',
                    empresaId:Number(datos.empresaId)
                }
            }   
        );


        if(contrato){
                console.log(contrato.id_contrato);


                
        }


        return resp.status(200).json({"status":200,"message":"Contrato registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
        return resp.status(500).json({"status":500,"message":"Error al registrar el contrato"});
    }  
}



export  const actualizarContratoId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_contrato;
        const existencia = await prisma.Contrato.findUnique({
            where: { id_contrato: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"El contrato no existe en el sistema"});
          }
          else{

            const contrato = await prisma.Contrato.update(
                {
                    where:{id_contrato:Number(id)},
                    data:{
                            nombre : datos.nombre,
                            fecha_inicio:new Date(datos.fecha_inicio),
                            fecha_fin:new Date(datos.fecha_fin),
                            empresaId : Number(datos.empresaId),
                            estado:datos.estado
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Contrato actualizado en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar el contrato' });
    }  
}


export  const activarContrato=async(req,resp)=>{
    try{
        const id= await req.params.id_contrato;
        const {estado} = req.body;
        const existencia = await prisma.Contrato.findUnique({
            where: { id_contrato: Number(id)}
          });

          if (!existencia) {
            return resp.status(404).json({"status":404,"message":"El contrato no existe en el sistema"});
          }
          else{
            const contrato= await prisma.Contrato.update(
                {
                    where:{id_contrato:Number(id)},
                    data:{estado: estado}  
                }  
            );
            return resp.status(200).json({"status":200,"message":`Se ${estado} el contrato del sistema`});
        }

       
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
        resp.status(500).json({ error: 'Error al desactivar el contrato' });
    }  
}


