
import { Console } from 'console';
import prisma from '../libs/prisma.js'
import  multer from 'multer-js';


const storage=multer.diskStorage({
    destination:function(req,img,cb){
        cb(null,"public/laboratorios");
    },
    filename: function(req,img,cb){
        cb(null,img.originalname);
    }
});

const upload=multer({storage:storage});
export const cargarImagen=upload.single('img');





export  const registrarResultadoLaboratorio=async(req,resp)=>{
    try{
        const id= await req.params.id_examen;
        let pdf= req.file.originalname;

     
            const examen = await prisma.examen.update(
                {
                    where:{id_examen:Number(id)},
                    data:{
                        resultado_pdf:pdf                
                    }
                }  
            );

            
            //console.log(usuario);
            return resp.status(200).json({"status":200,"message":"Resultado cargado al sistema"});
    }catch(error){
        console.log("Error en controller.resultado.js :"+error);
        resp.status(500).json({ error: 'Error al registrar el resultado' });
    }  
}


//Listar todos los examens por área
export  const listarExamenesPorArea=async(req,resp)=>{
    try{
       
        let id_usuario=req.user.id;
        let rol=req.user.rol;
      
       if(rol==='Administrador' ||  rol==='Bacteriologo'){


        const examenes = await prisma.Examen.findMany({
            where: {
                OR: [
                    { estado: 'En_Proceso_de_Analisis' }, // 1️⃣ Exámenes en análisis
                    { estado: 'Analisis_Completo' },
                    {
                        estado: 'Resultados_Listos',       // 2️⃣ Exámenes listos
                        resultado: { 
                            some: { estado: 'Pendiente' } // Solo si tienen resultado pendiente
                        }
                    }
                ]
            },
            include: {
                factura: {
                    include: {
                        paciente: true
                    }
                },
                resultado: {
                    include: {
                        parametro: true
                    }
                },
                procedimiento: {
                    include: {
                        cups: true,
                        area: true
                    }
                }
            }
        });
        
  
      
        return resp.status(200).json({"status":200,examenes});

       }else{

        
        const examenes = await prisma.Examen.findMany({
            where: {
                OR: [
                    { estado: 'En_Proceso_de_Analisis' }, // 1️⃣ Exámenes en análisis
                    {
                        estado: 'Resultados_Listos',       // 2️⃣ Exámenes listos
                        resultado: { 
                            some: { estado: 'Pendiente' } // Solo si tienen resultado pendiente
                        }
                    }
                ],
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
                    parametro: true
                }
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



// Se registra los analisis Completos del archivo 

export const registrarAnalisisCompletosArchivo = async (req, resp) => {
    try {
        let json_resultados = req.body;
        let actualizado = 0;
        let noEncontrados = 0;
   
       // console.log(json_resultados);
        
        if (!Array.isArray(json_resultados)) {
            return resp.status(400).json({ message: "El cuerpo de la solicitud debe ser un array." });
        }

        if (json_resultados.length > 0) {
            let batchQueries = [];

            
            for (const element of json_resultados) {
                let sql =`SELECT ex.id_examen,ex.estado,fact.autorizacion FROM facturas fact
                        JOIN examenes ex ON ex.facturaId = fact.id_factura
                        WHERE fact.autorizacion=${element} AND ex.estado='En_Proceso_de_Analisis'`;
                    const resultados = await prisma.$queryRawUnsafe (sql);
    
                    console.log(resultados);
              
                              

                if (resultados.length > 0) {
                    batchQueries.push(
                        prisma.$executeRaw`
                            UPDATE examenes 
                            SET estado = 'Analisis_Completo'
                            WHERE id_examen = ${resultados[0].id_examen}  
                        `
                    );

                    actualizado++;
                } else {
                    noEncontrados++;
                }
                
            }

            // Ejecutar todas las consultas en una transacción
            await prisma.$transaction(batchQueries);

            return resp.status(200).json({ 
                status: 200, 
                message: `Se actulizaron ${actualizado} examenes. No se encontraron: ${noEncontrados}` 
            });
        }

        return resp.status(200).json({ 
            status: 200, 
            message: "No se encontraron registros para actualizar." 
        });

    } catch (error) {
        console.error("Error en controller.resultado.js:", error);
        return resp.status(500).json({ 
            status: 500, 
            message: "Error al actualizar el resultado al examen" 
        });
    }
};





export const registrarFormularioAutomaticos = async (req, resp) => {
    try {
        let json_resultados = req.body;
        let actualizado = 0;
        let noEncontrados = 0;

       // console.log(json_resultados);

        if (!Array.isArray(json_resultados)) {
            return resp.status(400).json({ message: "El cuerpo de la solicitud debe ser un array." });
        }

        if (json_resultados.length > 0) {
            let batchQueries = [];

            for (const element of json_resultados) {
                const resultados = await prisma.$queryRaw`
                    SELECT res.id_resultado, res.resultado, pa.nombre as parametro, res.codigo_maquina, res.autorizacion
                    FROM resultados res
                    JOIN parametros pa ON pa.id_parametro = res.parametroId
                    WHERE res.id_resultado = ${element.codigo} 
                `;

                if (resultados.length > 0) {
                    batchQueries.push(
                        prisma.$executeRaw`
                            UPDATE resultados 
                            SET resultado = ${element.resultado}, estado = 'Pendiente'
                            WHERE id_resultado = ${resultados[0].id_resultado} AND estado = 'Pendiente';
                        `
                    );
                    actualizado++;
                } else {
                    noEncontrados++;
                }
            }

            // Ejecutar todas las consultas en una transacción
            await prisma.$transaction(batchQueries);

            return resp.status(200).json({ 
                status: 200, 
                message: `Se registraron ${actualizado} resultados. No encontrados: ${noEncontrados}` 
            });
        }

        return resp.status(200).json({ 
            status: 200, 
            message: "No se encontraron registros para actualizar." 
        });

    } catch (error) {
        console.error("Error en controller.resultado.js:", error);
        return resp.status(500).json({ 
            status: 500, 
            message: "Error al actualizar el resultado al examen" 
        });
    }
};






// se registra el json con los resultados de los parametros segun autorización
export const registrarResulatadosAutomaticos = async (req, resp) => {
    try {
        let json_resultados = req.body;
        let actualizado = 0;
        let noEncontrados = 0;

       // console.log(json_resultados);

        if (!Array.isArray(json_resultados)) {
            return resp.status(400).json({ message: "El cuerpo de la solicitud debe ser un array." });
        }

        if (json_resultados.length > 0) {
            let batchQueries = [];

            for (const element of json_resultados) {
                const resultados = await prisma.$queryRaw`
                    SELECT res.id_resultado, res.resultado, pa.nombre as parametro, res.codigo_maquina, res.autorizacion
                    FROM resultados res
                    JOIN parametros pa ON pa.id_parametro = res.parametroId
                    WHERE res.autorizacion = ${element.muestra} AND res.codigo_maquina = ${element.parametro}
                `;

                if (resultados.length > 0) {
                    batchQueries.push(
                        prisma.$executeRaw`
                            UPDATE resultados 
                            SET resultado = ${element.valor}, estado = 'Pendiente'
                            WHERE autorizacion = ${resultados[0].autorizacion} and codigo_maquina= ${resultados[0].codigo_maquina}
                            AND estado = 'Pendiente';
                        `
                    );
                    actualizado++;
                } else {
                    noEncontrados++;
                }
            }

            // Ejecutar todas las consultas en una transacción
            await prisma.$transaction(batchQueries);

            return resp.status(200).json({ 
                status: 200, 
                message: `Se registraron ${actualizado} resultados. No encontrados: ${noEncontrados}` 
            });
        }

        return resp.status(200).json({ 
            status: 200, 
            message: "No se encontraron registros para actualizar." 
        });

    } catch (error) {
        console.error("Error en controller.resultado.js:", error);
        return resp.status(500).json({ 
            status: 500, 
            message: "Error al actualizar el resultado al examen" 
        });
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
