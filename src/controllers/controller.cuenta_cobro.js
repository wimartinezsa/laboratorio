
import prisma from '../libs/prisma.js'


export  const listarCuentasPendientePago=async(req,resp)=>{
    try{

        let id_contrato = Number(req.params.id_contrato);
        let fecha_inicio = new Date(req.params.fecha_inicio);
        let fecha_fin = new Date(req.params.fecha_fin);
        
        if (!id_contrato || isNaN(id_contrato)) {
            return resp.status(400).json({ status: 400, message: 'ID de contrato inválido' });
        }
        
        if (!(fecha_inicio instanceof Date && !isNaN(fecha_inicio)) || 
            !(fecha_fin instanceof Date && !isNaN(fecha_fin))) {
            return resp.status(400).json({ status: 400, message: 'Fechas inválidas' });
        }

        const cuentaPorCobrar = await prisma.$queryRaw`
            SELECT 
                pa.identificacion,
                pa.nombres,
                pa.fecha_nacimiento,
                pa.telefono,
                cu.codigo,
                cu.nombre AS examen,
                ex.precio,
                ex.id_examen,
                ex.estado_pago,
                fact.id_factura,
                date(fact.fecha) AS fecha,
                fact.autorizacion,
              
                cont.nombre AS contrato,
                em.nombre AS empresa,
                em.nit,
                se.nombre as sede,
                ex.cantidad,
                cu.nombre AS cups_nombre
            FROM facturas fact
            JOIN sedes se ON se.id_sede = fact.sedeId
            JOIN contratos cont ON cont.id_contrato = fact.contratoId
            JOIN empresas em ON em.id_empresa = cont.empresaId
            JOIN examenes ex ON ex.facturaId = fact.id_factura
            JOIN procedimientos proc ON proc.id_procedimiento = ex.procedimientoId
            JOIN cups cu ON cu.id_cups = proc.cupsId
            JOIN pacientes pa ON pa.id_paciente = fact.pacienteId
            WHERE date(fact.fecha) BETWEEN date(${fecha_inicio}) AND date(${fecha_fin})
            AND cont.id_contrato = ${id_contrato}
            AND ex.estado_pago = 'Pendiente_Pago'
            ORDER BY pa.nombres ASC
        `;

        // console.log(cuentaPorCobrar);


        return resp.status(200).json(cuentaPorCobrar);
      
       
    }catch(error){
        console.log("Error en controller.cuenta_cobro.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al listar cuentas por cobrar' });
    }
}

// estado_pago:'Cobro', cuentaPorCobrar
export  const listarCuentasCobradas=async(req,resp)=>{
    try{

        let id_contrato = Number(req.params.id_contrato);
        let fecha_inicio = new Date(req.params.fecha_inicio);
        let fecha_fin = new Date(req.params.fecha_fin);
        
        if (!id_contrato || isNaN(id_contrato)) {
            return resp.status(400).json({ status: 400, message: 'ID de contrato inválido' });
        }
        
        if (!(fecha_inicio instanceof Date && !isNaN(fecha_inicio)) || 
            !(fecha_fin instanceof Date && !isNaN(fecha_fin))) {
            return resp.status(400).json({ status: 400, message: 'Fechas inválidas' });
        }

        const cuentasCobradas = await prisma.$queryRaw`
            SELECT 
                pa.identificacion,
                pa.nombres,
                pa.fecha_nacimiento,
                pa.telefono,
                cu.codigo,
                cu.nombre AS examen,
                ex.precio,
                ex.id_examen,
                ex.estado_pago,
                fact.id_factura,
                date(fact.fecha) AS fecha,
                fact.autorizacion,
              
                cont.nombre AS contrato,
                em.nombre AS empresa,
                em.nit,
                se.nombre as sede,
                ex.cantidad,
                cu.nombre AS cups_nombre
            FROM facturas fact
            JOIN sedes se ON se.id_sede = fact.sedeId
            JOIN contratos cont ON cont.id_contrato = fact.contratoId
            JOIN empresas em ON em.id_empresa = cont.empresaId
            JOIN examenes ex ON ex.facturaId = fact.id_factura
            JOIN procedimientos proc ON proc.id_procedimiento = ex.procedimientoId
            JOIN cups cu ON cu.id_cups = proc.cupsId
            JOIN pacientes pa ON pa.id_paciente = fact.pacienteId
            WHERE date(fact.fecha) BETWEEN date(${fecha_inicio}) AND date(${fecha_fin})
            AND cont.id_contrato = ${id_contrato}
            AND ex.estado_pago = 'Cobro'
            ORDER BY pa.nombres ASC
        `;

      


        return resp.status(200).json(cuentasCobradas);
      
       
    }catch(error){
        console.log("Error en controller.cuenta_cobro.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al listar cuentas cobradas' });
    }
}

//estado_pago:'Pagado',
export  const listarCuentasPagadas=async(req,resp)=>{
    try{

        let id_contrato = Number(req.params.id_contrato);
        let fecha_inicio = new Date(req.params.fecha_inicio);
        let fecha_fin = new Date(req.params.fecha_fin);
        
        if (!id_contrato || isNaN(id_contrato)) {
            return resp.status(400).json({ status: 400, message: 'ID de contrato inválido' });
        }
        
        if (!(fecha_inicio instanceof Date && !isNaN(fecha_inicio)) || 
            !(fecha_fin instanceof Date && !isNaN(fecha_fin))) {
            return resp.status(400).json({ status: 400, message: 'Fechas inválidas' });
        }

        const cuentasPagadas = await prisma.$queryRaw`
            SELECT 
                pa.identificacion,
                pa.nombres,
                pa.fecha_nacimiento,
                pa.telefono,
                cu.codigo,
                cu.nombre AS examen,
                ex.precio,
                ex.id_examen,
                ex.estado_pago,
                fact.id_factura,
                date(fact.fecha) AS fecha,
                fact.autorizacion,
                cont.nombre AS contrato,
                em.nombre AS empresa,
                em.nit,
                se.nombre as sede,
                ex.cantidad,
                cu.nombre AS cups_nombre
            FROM facturas fact
            JOIN sedes se ON se.id_sede = fact.sedeId
            JOIN contratos cont ON cont.id_contrato = fact.contratoId
            JOIN empresas em ON em.id_empresa = cont.empresaId
            JOIN examenes ex ON ex.facturaId = fact.id_factura
            JOIN procedimientos proc ON proc.id_procedimiento = ex.procedimientoId
            JOIN cups cu ON cu.id_cups = proc.cupsId
            JOIN pacientes pa ON pa.id_paciente = fact.pacienteId
            WHERE date(fact.fecha) BETWEEN date(${fecha_inicio}) AND date(${fecha_fin})
            AND cont.id_contrato = ${id_contrato}
            AND ex.estado_pago = 'Pagado'
            ORDER BY pa.nombres ASC
        `;
           


        return resp.status(200).json(cuentasPagadas);
      
       
    }catch(error){
        console.log("Error en controller.cuenta_cobro.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al listar cuentas pagadas' });
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


