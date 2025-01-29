
import { Console } from 'console';
import prisma from '../libs/prisma.js'



//Listar todos los examens por área
export  const listarExamenesPorArea=async(req,resp)=>{
    try{
       
        let id_usuario=req.user.id;
        let rol=req.user.rol;
      
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

        
        const examenes = await prisma.Examen.findMany({
            where: {
            estado: 'En_Proceso_de_Analisis',
            procedimiento: {
                area: {
                vinculacion: {
                    some: {
                    usuario: {
                        id_usuario: id_usuario, // Filtra por el ID del usuario
                    },
                    },
                },
                },
            },
            },
            include: {
            factura: {
                include: {
                paciente: true,
                },
            },
            resultado: {
                include: {
                parametro: true,
                },
            },
            procedimiento: {
                include: {
                cups: true,
                area: {
                    include: {
                    vinculacion: {
                        include: {
                        usuario: true,
                        },
                    },
                    },
                },
                },
            },
            },
        });
       
        return resp.status(200).json({"status":200,examenes});

       }
       
          
    }catch(error){
        console.log("Error en controller.muestra.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al listar  las procedimientos facturados' });
    }
}



// Finalizar el proceso de digitar resultados
export const finzalizarResultados = async (req, resp) => {
    try {
       let user= req.user;

        let id_examen= req.params.id_examen;
        let observacion= req.body.observacion;
        

        let usuario=  await prisma.Usuario.findUnique({
            where: {
                id_usuario: Number(user.id)
            }
        });

        await prisma.Examen.update({
            where: {
                id_examen: Number(id_examen)
            },
            data: {
                fecha_resultado:new Date(),
                estado:'Resultados_Listos',
                observacion:observacion,
                profesional:usuario.nombre,
                firma: usuario.firma
            }
        });

      


        
 
        
        resp.status(200).json({ status: 200, message: "Resultados  Finalizado" });
       
    } catch (error) {
        console.error("Error en controller.resultado.js:", error);
        resp.status(500).json({ status: 500, message: "Error al finalizar el proceso de resultado" });
    }
};




// se registra el json con los resultados de los parametros
export const registrarResulatadosAutomaticos = async (req, resp) => {
    try {
        let json_resultados = req.body;
       
        let actualizado=0;
        let noEncontrados=0;
        // Asegúrate de que json_resultados sea un array
        if (!Array.isArray(json_resultados)) {
            return resp.status(400).json({ message: "El cuerpo de la solicitud debe ser un array." });
        }

        //
        // Procesar los datos si hay elementos
        if (json_resultados.length > 0) {
          //console.log(json_resultados);
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
                       const resultado_act= await prisma.Resultado.updateMany({
                            where: {
                                id_resultado: resultado.id_resultado,
                                estado: 'Pendiente'
                            },
                            data: {
                                resultado: element.resultado,
                                estado: 'Pendiente'
                            }
                        });

                        if (resultado_act.count > 0) {
                            actualizado++;
                        }
                }

               

                } else {
                    noEncontrados++;
                   // console.log(`No se encontraron resultados para el código: ${element.codigo}`);
                }




            }// fin del for que recorre el json

            resp.status(200).json({ status: 200, message: "Se actualizaron :"+ actualizado + " - No se actualizaron :" +noEncontrados });
        } else {
            return resp.status(400).json({ message: "El array está vacío." });
        }
    } catch (error) {
        console.error("Error en controller.resultado.js:", error);
        resp.status(500).json({ status: 500, message: "Error al actualizar el resultado al examen" });
    }
};



// se listan los parametros para geenrar el formulario dinamico para digitar los resultados
export  const listarParametrosExamen=async(req,resp)=>{
    try{
       let id_examen = req.params.id_examen;
      
       const resultados = await prisma.resultado.findMany({
        where: {
            examenId: Number(id_examen)
        },
        include: {
            parametro: {
                include: {
                    tipo_resultado: true // Asegúrate de que coincide con el modelo
                }
            }
        }
    });


       
        return resp.status(200).json({"status":200,resultados});
         
    }catch(error){
        console.log("Error en controller.resultado.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al listar los resultados del examen' });
    }
}




// Finalizar el proceso de digitar resultados
export const cambiarEstadoResultado = async (req, resp) => {
    try {
       
        let id_resultado= req.params.id_resultado;
        let estado= req.params.estado;
        if(estado==='Finalizado'){
            estado='Pendiente';
        }else{
            estado='Finalizado';
        }
      
        await prisma.Resultado.update({
            where: {
                id_resultado: Number(id_resultado)
            },
            data: {
                estado:estado
            }
        });

        resp.status(200).json({ status: 200, message: "Resultado "+ estado });
       
    } catch (error) {
        console.error("Error en controller.resultado.js:", error);
        resp.status(500).json({ status: 500, message: "Error al cambiar estado del resultado" });
    }
};
