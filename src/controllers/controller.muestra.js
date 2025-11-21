
import prisma from '../libs/prisma.js'



//Listar todos los examens por área
export  const listarExamenesTomaMuestra=async(req,resp)=>{
    try{
       
        let id_usuario=req.user.id;
        let rol=req.user.rol;
      
       if(rol==='Administrador' ||  rol==='Bacteriologo'){

        const examenes = await prisma.Examen.findMany(
            { 
                where: {
                    estado: { 
                        in: ['En_Toma_de_Muestra'] // Filtra por estado
                      }          
                  },
                include:{
                    factura:{
                        include:{
                            paciente:true,
                            contrato:true
                        }
                    },
                    resultado:{
                        include:{
                            parametro:true
                        }
                    },
                    procedimiento:{
                        include:{
                            cups:true,
                            area:true
                        }
                    }
                    
                }         
            } 
        );
           
        return resp.status(200).json({"status":200,examenes});

       }else{
//En_Toma_de_Muestra
        
        const examenes = await prisma.Examen.findMany(
            { 
                where: {
                    estado: { 
                        in: ['En_Toma_de_Muestra'] // Filtra por estado
                      }          
                  },
                include:{
                    factura:{
                        include:{
                            paciente:true,
                            contrato:true
                        }
                    },
                    resultado:{
                        include:{
                            parametro:true
                        }
                    },
                    procedimiento:{
                        include:{
                            cups:true,
                            area:true
                        }
                    }
                    
                }         
            } 
        );
       
        return resp.status(200).json({"status":200,examenes});

       }
       
          
    }catch(error){
        console.log("Error en controller.muestra.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al listar  las procedimientos facturados' });
    }
}





/*
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

*/



export  const confirmarTomaMuestra=async(req,resp)=>{
    try{
        let json_examenes = await req.body;

        // Asegúrate de que json_resultados sea un array
        if (!Array.isArray(json_examenes)) {
            return resp.status(400).json({ message: "No Seleccionó ningun examen" });
        }

        // Procesar los datos si hay elementos
        if (json_examenes.length > 0) {
         
        //console.log("Resultados encontrados desde completos:",json_resultados);

            for (const element of json_examenes) {
                       const resultado_act= await prisma.Examen.updateMany({
                            where: {
                                id_examen: Number(element.examen)  
                            },
                            data: {
                                fecha_muestra: element.fecha,
                                observacion: element.observacion,
                                estado:"Analisis_Completo" 
                            }
                        });
            }// fin del for que recorre el json
            

            resp.status(200).json({ status: 200, message: "Se actualizaron los exmenes a estado Analisis Completo"});
        } else {
            return resp.status(400).json({ message: "No se seleccionó ningun examen" });
        }

    }catch(error){
        console.log("Error en controller.muestra.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al cambiar de estado de los examenes' });
    }  
}


export  const noConfirmarTomaMuestra=async(req,resp)=>{
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
            // se 
            const prestacion = await prisma.Examen.update(
                {
                    where:{id_examen: Number(id)},
                    data:{
                        fecha_muestra: new  Date(datos.fecha),
                        observacion: datos.observacion,
                        estado:"En_Toma_de_Muestra"                     
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Se registro la observación de la toma de muestra"});
        }

       
    }catch(error){
        console.log("Error en controller.factura.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error a registrar la observación de la toma de muestra' });
    }  
}





