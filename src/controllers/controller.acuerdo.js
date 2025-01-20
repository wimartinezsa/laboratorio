
import prisma from '../libs/prisma.js'

export  const listarAcuerdos=async(req,resp)=>{
    try{

        const id_contrato= req.params.id_contrato;

        const acuerdos = await prisma.Acuerdo.findMany({
            where: { contratoId: Number(id_contrato) },
            include: {
                contrato: {
                    include: {
                        empresa: true,
                    },
                },
                procedimiento: {
                    include: {
                        servicio: true,
                        cups: true,
                    },
                },
            },
        });

        return resp.status(200).json(acuerdos);
    }catch(error){
        console.log("Error en controller.acuerdo.js :"+error);
        resp.status(500).json({ error: 'Error al listar los acuerdos' });
    }
}

export  const buscarAcuerdoId=async(req,resp)=>{
    try{
        const id= await req.params.id_acuerdo;
        const acuerdo = await prisma.Acuerdo.findFirst(
            {
                where: { id_acuerdo: Number(id) },
                select:{
                    id_acuerdo: true,
                    estado: true,
                    precio: true,
                    iva: true,
                    contratoId: true,
                    servicioId: true,
                contrato:{
                    select:{
                        id_contrato:true,
                        fecha_inicio:true,
                        fecha_fin:true,
                        empresa:{
                            select:{
                            nombre:true,
                            sigla:true,
                            municipio:{
                                select:{
                                    nombre:true
                                }
                            }
                        }
                        },
                      
                        }
                    }
    
                    }
            }
        );
        return resp.status(200).json(acuerdo);
    }catch(error){
        console.log("Error en controller.acuerdo.js :"+error);
        resp.status(500).json({ error: 'Error al buscar acuerdo' });
    }
}


export  const registrarAcuerdo=async(req,resp)=>{
    try{
        const datos= await req.body;
        console.log(datos);
        
        const acuerdo = await prisma.Acuerdo.create(
            {
                data: {
                    estado: "Activo",
                    precio: datos.precio,
                    procedimientoId:Number(datos.procedimientoId),
                    contratoId:Number(datos.contratoId),
                    iva:0
                }
            } 

            
        );
        
        return resp.status(200).json({"status":200,"message":"Acuerdo registrada en el sistema"});
    }catch(error){
        console.log("Error en controller.tarifa.js :"+error);
        resp.status(500).json({"status":200, "message": 'Error al registrar el acuerdo' });
    }  
}

export  const actualizarAcuerdoId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_acuerdo;
        const existencia = await prisma.Acuerdo.findUnique({
            where: { id_acuerdo: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"EL aceurdo no existe en el sistema"});
          }
          else{
            const acuerdo = await prisma.Acuerdo.update(
                {
                    where:{id_acuerdo:Number(id)},
                    data:{
                        estado: datos.estado,
                        precio: datos.precio,
                        iva: datos.iva,
                        contratoId:datos.contratoId,
                        servicioId: datos.servicioId
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Acuerdo actualizada en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.acuerdo.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar la acuerdo' });
    }  
}

export  const activarAcuerdoId=async(req,resp)=>{
    try{
        const id= await req.params.id_acuerdo;
        const {estado}= req.body;
        const existencia = await prisma.Acuerdo.findUnique({
            where: { id_acuerdo: Number(id)}
          });

          if (!existencia) {
            return resp.status(501).json({"status":501,"message":"El acuerdo no existe en el sistema"});
          }
          else{
            const acuerdo= await prisma.Acuerdo.update(
                {
                    where:{id_acuerdo:Number(id)},
                    data:{estado: estado}  
                }  
            );
            return resp.status(200).json({"status":200,"message":`Acuerdo ${estado} en el sistema`});
        }

       
    }catch(error){
        console.log("Error en controller.acuerdo.js :"+error);
        resp.status(500).json({ 'message': 'Error al desactivar la Acuerdo' });
    }  
}


   