
import { Console } from 'console';
import prisma from '../libs/prisma.js'




export  const listarMuestrasArea=async(req,resp)=>{
    try{
       let rol = req.params.rol;
       let rea = req.params.area;
      
       if(rol==='Administrador' ||  rol==='Bacteriologo'){

        const examenes = await prisma.Examen.findMany(
            { 
                where: {
                    estado: { 
                        in: ['En_Proceso_de_Analisis'] // Filtra por estado
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

       }else{

        const examenes = await prisma.Examen.findMany(
            { 
                where: {
                    estado:'En_Proceso_de_Analisis'             
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
       
        console.log(examenes);
        return resp.status(200).json({"status":200,examenes});

       }
       
          
    }catch(error){
        console.log("Error en controller.muestra.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al listar  las procedimientos facturados' });
    }
}





export const registrarResultado = async (req, resp) => {
    try {
        let {resultado} = req.body;
     
        let id_resultado= req.params.id_resultado;
    
        await prisma.Resultado.updateMany({
            where: {
                id_resultado: Number(id_resultado)
            },
            data: {
                resultado: resultado,
                estado:'Finalizado'
            }
        });

        
        resp.status(200).json({ status: 200, message: "Se registro el resultado del examen" });
       
    } catch (error) {
        console.error("Error en controller.resultado.js:", error);
        resp.status(500).json({ status: 500, message: "Error al registrar el resultado del parametro" });
    }
};




export const finzalizarAnalisis = async (req, resp) => {
    try {
       
        let id_examen= req.params.id_examen;
       // console.log('examen',id_examen);
        await prisma.Examen.update({
            where: {
                id_examen: Number(id_examen)
            },
            data: {
                fecha_resultado:new Date(),
                estado:'Resultados_Listos'
            }
        });

        
        resp.status(200).json({ status: 200, message: "Analisis Finalizado" });
       
    } catch (error) {
        console.error("Error en controller.resultado.js:", error);
        resp.status(500).json({ status: 500, message: "Error al finalizar el proceso de Analisis" });
    }
};


export const registrarResulatadosAutomaticos = async (req, resp) => {
    try {
        let json_resultados = req.body;
        let registrado=0;
        let noEncontrados=0;
        // Asegúrate de que json_resultados sea un array
        if (!Array.isArray(json_resultados)) {
            return resp.status(400).json({ message: "El cuerpo de la solicitud debe ser un array." });
        }

        //
        // Procesar los datos si hay elementos
        if (json_resultados.length > 0) {
          //  console.log(json_resultados);
        //console.log("Resultados encontrados desde completos:",json_resultados);

            for (const element of json_resultados) {
                
                // Usa interpolación segura

                const resultados = await prisma.$queryRaw`
                SELECT res.id_resultado,pa.nombre as parametro, res.parametroId, res.examenId 
                FROM resultados res
                JOIN parametros pa ON pa.id_parametro = res.parametroId
                WHERE res.id_resultado = ${element.codigo}
              `;
  
               if (resultados.length > 0) {
               

                    for (const resultado of resultados) {
                        //console.log(' se inserta : ' +resultado);
                        await prisma.Resultado.updateMany({
                            where: {
                                id_resultado: resultado.id_resultado,
                                estado: 'Pendiente'
                            },
                            data: {
                                resultado: element.resultado,
                                estado: 'Pendiente'
                            }
                        });
                        registrado++;
                }

               

                } else {
                    noEncontrados++;
                   // console.log(`No se encontraron resultados para el código: ${element.codigo}`);
                }




            }// fin del for que recorre el json


            

            resp.status(200).json({ status: 200, message: "Se registraron :"+ registrado + " - No se registraron :" +noEncontrados });
        } else {
            return resp.status(400).json({ message: "El array está vacío." });
        }
    } catch (error) {
        console.error("Error en controller.resultado.js:", error);
        resp.status(500).json({ status: 500, message: "Error al asignar el resultado a la muestra" });
    }
};






export  const listarParametrosId=async(req,resp)=>{
    try{
       let id_parametro = req.params.id_parametro;
      
        const tipos_resultado = await prisma.Tipo_Resultado.findMany(
            { 
                where:{
                    parametroId: Number(id_parametro)
                }
 
            });
       
        return resp.status(200).json({"status":200,tipos_resultado});
         
    }catch(error){
        console.log("Error en controller.muestra.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al listar  las procedimientos facturados' });
    }
}
