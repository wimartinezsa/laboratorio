
import prisma from '../libs/prisma.js'




export  const registrarConfirmarMuestraRecibida=async(req,resp)=>{
    try{
        const id= await req.params.id_examen;
        const datos= await req.body;
        const existencia = await prisma.examen.findUnique({
            where: { id_examen: Number(id)}
          });

          if (!existencia) {
            return resp.status(404).json({"status":404,"message":"No existe examen en la factura"});
          }
          else{
            
            const prestacion = await prisma.examen.update(
                {
                    where:{id_examen: Number(id)},
                    data:{
                        observacion: datos.observacion,
                        estado: "Muestra_Recibida"
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Se confirmó la toma de la muestra"});
        }

       
    }catch(error){
        console.log("Error en controller.factura.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al cambiar de estado el examen de la Factura' });
    }  
}

export  const iniciarProcesoAnalisis=async(req,resp)=>{
    try{
        const id= await req.params.id_examen;

        const existencia = await prisma.examen.findUnique({
            where: { id_examen: Number(id)}
          });

          if (!existencia) {
            return resp.status(404).json({"status":404,"message":"No existe examen en la factura"});
          }
          else{
            const prestacion = await prisma.examen.update(
                {
                    where:{id_examen: Number(id)},
                    data:{
                        estado: "En_Proceso_de_Analisis",
                        fecha_analisis:new Date()
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Se confirma inicio de analisis de la muestra"});
        }
    }catch(error){
        console.log("Error en controller.factura.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al cambiar de estado el examen de la Factura' });
    }  
}


// Se lista de acuerdo al ROl ""
export  const listarMuestrasArea=async(req,resp)=>{
    try{
        let rol = req.params.rol;
        let rea = req.params.area;
       
        if(rol==='Administrador' ||  rol==='Bacteriologo'){
 
         const examenes = await prisma.examen.findMany(
             { 
                 where: {
                     estado: { 
                         in: ['Muestra_Recibida'] // Filtra por estado
                       }          
                   },
                 include:{
                     factura:{
                         include:{
                             paciente:true
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
 
       
        // console.log(examenes);
       
         return resp.status(200).json({"status":200,examenes});
 
        }else{
 
         const examenes = await prisma.examen.findMany(
             { 
                 where: {
                     estado:'Muestra_Recibida'             
                    ,
                     procedimiento: {
                       area: {
                         nombre: rea // Filtro por nombre del área
                       }
                     }
                   },
                 include:{
                     factura:{
                         include:{
                             paciente:true
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
         console.log("Error en controller.analisis.js :"+error);
         resp.status(500).json({"status":500,"message": 'Error al listar  los examenes facturados' });
     }
}
