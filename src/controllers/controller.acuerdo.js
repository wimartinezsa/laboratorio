
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
        const acuerdo = await prisma.Acuerdo.findMany({
            where: {id_acuerdo: Number(id) },
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

       //console.log(acuerdo);
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
        
        const acuerdo = await prisma.acuerdo.create(
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


export const registrarTodosExamenesContrato = async (req, resp) => {
    try {
        const contrato = Number(req.body.contratoId);

        const examenes = await prisma.procedimiento.findMany({
            where: { estado: 'Activo' },
            include: { acuerdo: true }
        });

        for (const element of examenes) {
            const existencia = await prisma.acuerdo.findFirst({
                where: {
                    AND: [
                        { procedimientoId: element.id_procedimiento },
                        { contratoId: contrato }
                    ]
                }
            });

            if (!existencia) {
                const acuerdo = await prisma.acuerdo.create({
                    data: {
                        estado: "Activo",
                        precio: 0,
                        procedimientoId: element.id_procedimiento,
                        contratoId: contrato,
                        iva: 0
                    }
                });

               // console.log(acuerdo);
            }
        }

        return resp.status(200).json({ "status": 200, "message": "Acuerdos registrados correctamente" });

    } catch (error) {
        console.log("Error en controller.acuerdo.js: " + error);
        return resp.status(500).json({ "status": 500, "message": "Error al registrar los acuerdos" });
    }
};




/*
export  const registrarTodosExamenesContrato=async(req,resp)=>{
    try{
        const contrato= await req.body.contratoId;
      
       //

       const examenes = await prisma.procedimiento.findMany({
        where:{estado:'Activo'},
        include: {
            acuerdo:true, 
        }
    });
    examenes.forEach(async element => {


        const existencia = await prisma.acuerdo.findFirst({
            where:{
                AND:[
                        {procedimientoId:Number(element.id_procedimiento)},
                        {contratoId:Number(contrato)},
                        {estado:'Activo'}
                    ]
                 }
        });

     
        if(!existencia){
            
            const acuerdo =await prisma.Acuerdo.create(
                {
                    data: {
                        estado: "Activo",
                        precio: 0,
                        procedimientoId:Number(element.id_procedimiento),
                        contratoId:Number(contrato),
                        iva:0
                    }
                }  
            );
            
          //  console.log(acuerdo);
        }// fin del if existencia
       

    });

        return resp.status(200).json({"status":200,"message":"Examenes registrados al contrato"});
    }catch(error){
        console.log("Error en controller.tarifa.js :"+error);
        resp.status(500).json({"status":200, "message": 'Error al registrar el acuerdo' });
    }  
}

*/




export  const actualizarAcuerdoId=async(req,resp)=>{
    try{
        const datos= await req.body;

       // console.log(datos);
        const id= await req.params.id_acuerdo;
        const existencia = await prisma.Acuerdo.findUnique({
            where: { id_acuerdo: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"EL acuerdo no existe en el sistema"});
          }
          else{
            const acuerdo = await prisma.Acuerdo.update(
                {
                    where:{id_acuerdo:Number(id)},
                    data:{
                        precio: datos.precio,
                        procedimientoId: Number(datos.procedimiento)
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


   