
import prisma from '../libs/prisma.js'


export  const listarCuentasPendientePago=async(req,resp)=>{
    try{

        let id_contrato = Number(req.params.id_contrato);
        let fecha_inicio = new Date(req.params.fecha_inicio);
        let fecha_fin = new Date(req.params.fecha_fin);

        const cuentaPorCobrar = await prisma.Examen.findMany({
            where: {
                estado_pago:'Pendiente_Pago',
                factura: {
                    contratoId: id_contrato,
                    fecha: {
                        gte: fecha_inicio, // Mayor o igual a fecha_inicio
                        lte: fecha_fin     // Menor o igual a fecha_fin
                    }
                }
            },
            include: {
                factura: {
                    include: {
                        paciente: true,
                        contrato: true
                    }
                },
                procedimiento: {
                    include: {
                        cups: true,
                        acuerdo: true
                    }
                }
            }
        });

        return resp.status(200).json(cuentaPorCobrar);
      
       
    }catch(error){
        console.log("Error en controller.cuenta_cobro.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al listar cuentas por cobrar' });
    }
}


export  const listarCuentasCobradas=async(req,resp)=>{
    try{

        let id_contrato = Number(req.params.id_contrato);
        let fecha_inicio = new Date(req.params.fecha_inicio);
        let fecha_fin = new Date(req.params.fecha_fin);

        const cuentaPorCobrar = await prisma.Examen.findMany({
            where: {
                estado_pago:'Cobro',
                factura: {
                    contratoId: id_contrato,
                    fecha: {
                        gte: fecha_inicio, // Mayor o igual a fecha_inicio
                        lte: fecha_fin     // Menor o igual a fecha_fin
                    }
                }
            },
            include: {
                factura: {
                    include: {
                        paciente: true,
                        contrato: true
                    }
                },
                procedimiento: {
                    include: {
                        cups: true,
                        acuerdo: true
                    }
                }
            }
        });

        return resp.status(200).json(cuentaPorCobrar);
      
       
    }catch(error){
        console.log("Error en controller.cuenta_cobro.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al listar cuentas por cobrar' });
    }
}


export  const listarCuentasPagadas=async(req,resp)=>{
    try{

        let id_contrato = Number(req.params.id_contrato);
        let fecha_inicio = new Date(req.params.fecha_inicio);
        let fecha_fin = new Date(req.params.fecha_fin);

        const cuentaPorCobrar = await prisma.Examen.findMany({
            where: {
                estado_pago:'Pagado',
                factura: {
                    contratoId: id_contrato,
                    fecha: {
                        gte: fecha_inicio, // Mayor o igual a fecha_inicio
                        lte: fecha_fin     // Menor o igual a fecha_fin
                    }
                }
            },
            include: {
                factura: {
                    include: {
                        paciente: true,
                        contrato: true
                    }
                },
                procedimiento: {
                    include: {
                        cups: true,
                        acuerdo: true
                    }
                }
            }
        });

        return resp.status(200).json(cuentaPorCobrar);
      
       
    }catch(error){
        console.log("Error en controller.cuenta_cobro.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al listar cuentas cobradas' });
    }
}






export  const listarContratosActivos=async(req,resp)=>{
    try{
      
        
        const contratos = await prisma.$queryRaw`SELECT 
        co.id_contrato,
        co.estado,
        co.nombre,
        em.nombre as empresa
        FROM contratos co
        JOIN empresas em  on em.id_empresa=co.empresaId 
        WHERE co.estado='Activo'`;
        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
        resp.status(500).json({ error: 'Error al listar el contrato Activos' });
    }
}







// se registra el json con los resultados de los parametros
export const registrarCuentaCobro = async (req, resp) => {
    try {
        let json_cuenta = req.body;
        console.log(json_cuenta);
       
        let actualizado=0;
       
        // Asegúrate de que json_resultados sea un array
        if (!Array.isArray(json_cuenta)) {
            return resp.status(400).json({ message: "No Seleccionó ningun examen" });
        }

        // Procesar los datos si hay elementos
        if (json_cuenta.length > 0) {
         
        //console.log("Resultados encontrados desde completos:",json_resultados);

            for (const element of json_cuenta) {
                
            
                       const resultado_act= await prisma.Examen.updateMany({
                            where: {
                                id_examen: element.id,
                                estado_pago: 'Pendiente_Pago'
                            },
                            data: {
                                estado_pago: 'Cobro',
                                fecha_cobro:new Date()
                            }
                        });

                        if(resultado_act){actualizado++;}


            }// fin del for que recorre el json
            

            resp.status(200).json({ status: 200, message: "Se registraron  :"+ actualizado + " Examenes para Cobro"});
        } else {
            return resp.status(400).json({ message: "No se seleccionó ningun examen" });
        }
    } catch (error) {
        console.error("Error en controller.resultado.js:", error);
        resp.status(500).json({ status: 500, message: "Error al actualizar el resultado al examen" });
    }
};




// se registra el json con los resultados de los parametros
export const registrarCuentaPagada = async (req, resp) => {
    try {
        let json_cuenta = req.body;
       // console.log(json_cuenta);
       
        let actualizado=0;
       
        // Asegúrate de que json_resultados sea un array
        if (!Array.isArray(json_cuenta)) {
            return resp.status(400).json({ message: "No Seleccionó ningun examen" });
        }

        // Procesar los datos si hay elementos
        if (json_cuenta.length > 0) {
         
        //console.log("Resultados encontrados desde completos:",json_resultados);

            for (const element of json_cuenta) {
                
            
                       const resultado_act= await prisma.Examen.updateMany({
                            where: {
                                id_examen: element.id,
                                estado_pago: 'Cobro'
                            },
                            data: {
                                estado_pago: 'Pagado',
                                fecha_pago:new Date()
                            }
                        });

                        if(resultado_act){actualizado++;}


            }// fin del for que recorre el json
            

            resp.status(200).json({ status: 200, message: "Se registraron  :"+ actualizado + " Examenes Pagados"});
        } else {
            return resp.status(400).json({ message: "No se seleccionó ningun examen" });
        }
    } catch (error) {
        console.error("Error en controller.resultado.js:", error);
        resp.status(500).json({ status: 500, message: "Error al actualizar el pago del examen" });
    }
};


