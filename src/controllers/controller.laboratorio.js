
import prisma from '../libs/prisma.js'



export  const listarExamenesListos=async(req,resp)=>{
    try{
        const examenes = await prisma.$queryRaw`
         SELECT 
            pa.identificacion,pa.nombres,ex.id_examen,cu.nombre AS cups,ex.estado,fact.autorizacion,ex.observacion,
            fact.fecha,cont.nombre AS contrato
            FROM facturas fact
            JOIN contratos cont ON cont.id_contrato=fact.contratoId
            JOIN examenes ex ON ex.facturaId= fact.id_factura
            JOIN procedimientos proc ON proc.id_procedimiento = ex.procedimientoId
            JOIN cups cu ON cu.id_cups = proc.cupsId
            JOIN  pacientes pa ON pa.id_paciente = fact.pacienteId
            WHERE ex.estado='Resultados_Listos' 
            ORDER BY ex.fecha_muestra ASC
        `;
        
        return resp.status(200).json({"status":200,examenes});
       
    }catch(error){
        console.log("Error en controller.muestra.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al listar  las procedimientos facturados' });
    }
}



export  const buscarExamenesListos=async(req,resp)=>{
    try{

        let dato= req.params.dato;
        const examenes = await prisma.$queryRaw`
         SELECT 
            pa.identificacion,pa.nombres,ex.id_examen,cu.nombre AS cups,ex.estado,fact.autorizacion,ex.observacion,
            fact.fecha,cont.nombre AS contrato
            FROM facturas fact
            JOIN contratos cont ON cont.id_contrato=fact.contratoId
            JOIN examenes ex ON ex.facturaId= fact.id_factura
            JOIN procedimientos proc ON proc.id_procedimiento = ex.procedimientoId
            JOIN cups cu ON cu.id_cups = proc.cupsId
            JOIN  pacientes pa ON pa.id_paciente = fact.pacienteId
            WHERE (ex.estado='Resultados_Listos' OR ex.estado='Resultados_Entregados') AND (pa.identificacion = ${dato} OR fact.autorizacion = ${dato}) 
            ORDER BY ex.fecha_muestra ASC
        `;
         return resp.status(200).json({"status":200,examenes});
       
        
        
       
    }catch(error){
        console.log("Error en controller.muestra.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al listar  las procedimientos facturados' });
    }
}









export  const generarLaboratorio=async(req,resp)=>{
    try{
       
        const autorizacion= await req.params.autorizacion;
        const examenes = await prisma.Factura.findMany(
            { 
                where:{autorizacion:autorizacion},
                        include:{
                            paciente:{
                                include:{
                                    eps:true
                                }
                            },
                            contrato:{
                                include:{
                                    empresa:true
                                }
                            },
                            examen:{
                                include:{
                                    resultado:{
                                        include:{
                                            parametro:true
                                        }       
                                },
                                procedimiento:{
                                include:{
                                    cups:true,
                                    area:{
                                        include:{
                                            vinculacion:{
                                                include:{
                                                    usuario:{
                                                        where: { estado: "Activo" }
                                                    }

                                                }
                                                
                                            }
                                            
                                        }
                                    }

                                }
                            }
                                }
                                
                            }
                        }  
            } 
        );
        //console.log(examenes);
        return resp.status(200).json(examenes);
    }catch(error){
        console.log("Error en controller.informe.js :"+error);
        resp.status(500).json({ error: 'Error al listar el laboratorio' });
    }
}



export  const firmaLaboratorio=async(req,resp)=>{
    try{
        const bacteriologo = await prisma.Usuario.findFirst(
            { 
                where:{rol:'Bacteriologo'}             
            } 
        );
       // console.log(bacteriologo);
        return resp.status(200).json(bacteriologo);
    }catch(error){
        console.log("Error en controller.informe.js :"+error);
        resp.status(500).json({ error: 'Error al listar quien firma el laboratorio' });
    }
}




export const confirmarEntregaExamen = async (req, resp) => {
    try {
       
        let id_examen= req.params.id_examen;
        await prisma.Examen.update({
            where: {
                id_examen: Number(id_examen)
            },
            data: {
                estado:'Resultados_Entregados'
            }
        });

        
        resp.status(200).json({ status: 200, message: "Laboratorio entregado" });
       
    } catch (error) {
        console.error("Error en controller.informe.js:", error);
        resp.status(500).json({ status: 500, message: "Error al entregar el laboratorio" });
    }
};


