
import prisma from '../libs/prisma.js'


export  const listarFacturas=async(req,resp)=>{
    try{
       
        const contratos = await prisma.$queryRaw`
        SELECT fa.id_factura,DATE(fa.fecha) AS fecha,pa.identificacion,pa.primer_nombre,co.nombre AS contrato,
        em.nombre AS empresa,fa.total,fa.estado
        FROM facturas fa
        JOIN pacientes pa ON pa.id_paciente = fa.pacienteId
        JOIN contratos co ON co.id_contrato = fa.contratoId
        JOIN empresas em ON em.id_empresa = co.empresaId
        `;



        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.facturas.js :"+error);
        resp.status(500).json({ error: 'Error al listar  las facturas' });
    }
}




export  const buscarFactura=async(req,resp)=>{
    try{
       
        let id_factura=req.params.id_factura;
        const factura = await prisma.Factura.findMany( 
                {
                    where:{
                            id_factura:Number(id_factura)
                        },
                    include:{
                        paciente:{
                            include:{
                                eps:true,
                                municipio:true
                            }
                        }

                    }
            }
        );
        return resp.status(200).json(factura);
    }catch(error){
        console.log("Error en controller.facturas.js :"+error);
        resp.status(500).json({ error: 'Error al listar  las facturas' });
    }
}



export  const actualizarFactura=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id_factura=await req.params.id_factura;
        const factura = await prisma.Factura.update(
            {    where:{id_factura:Number(id_factura)},
                data: {
                    via_ingreso:datos.via_ingreso,
                    autorizacion:datos.autorizacion 
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Factura actualizada en el sistema"});
    }catch(error){
        console.log("Error en controller.factura.js :"+error);
        resp.status(500).json({ "status":500,"message": 'Error al actualizar la factura' });
    }  
}





export  const listarFacturasContratos=async(req,resp)=>{
    try{
       let id_contrato=req.params.id_contrato;
        const contratos = await prisma.$queryRaw`
        SELECT fa.id_factura,DATE(fa.fecha) AS fecha,pa.identificacion,pa.nombres,co.nombre AS contrato,
        em.nombre AS empresa,SUM(ex.precio) AS total,fa.estado,fa.autorizacion
        FROM facturas fa
        LEFT JOIN examenes ex ON ex.facturaId = fa.id_factura
        JOIN pacientes pa ON pa.id_paciente = fa.pacienteId
        JOIN contratos co ON co.id_contrato = fa.contratoId
        JOIN empresas em ON em.id_empresa = co.empresaId
        WHERE co.id_contrato=${id_contrato} 
        GROUP BY id_factura
       
        `;
        
        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.facturas.js :"+error);
        resp.status(500).json({ status:500,message: 'Error al listar  las facturas' });
    }
}


export  const registrarFactura=async(req,resp)=>{
    try{
        const datos= await req.body;
        //console.log(datos);
        const contrato = await prisma.Factura.create(
            {
                data: {
                
                    fecha:new Date(),
                    pacienteId:Number(datos.pacienteId),
                    contratoId:Number(datos.id_contrato),
                    via_ingreso:datos.via_ingreso,
                    autorizacion:datos.autorizacion,
                    total:0,
                    estado:'Pendiente_Emision',
                  
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Factura registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.factura.js :"+error);
        resp.status(500).json({ "status":500,"message": 'Error al registrar la factura' });
    }  
}


export  const emitirFactura=async(req,resp)=>{
    try{
        const id_factura= await req.params.id_factura;
        let estado_pago='';

        const tipo_empresa = await prisma.Factura.findFirst(
            { 
                where:{id_factura:Number(id_factura)},
                include: {
                        contrato:{
                          include:{empresa:true}  
                        }
                }
            } 
        );

        if(tipo_empresa.contrato.empresa.tipo=='Particular'){
            estado_pago='Pagado';
        }else{
            estado_pago='Pendiente_Pago';
        }

        const total_factura = await prisma.examen.aggregate(
                { 
                    where:{facturaId:Number(id_factura)},
                    _sum:{
                        precio: true
                    }
                } 
        );

    

        const factura = await prisma.Factura.update(
            { 
                where:{id_factura:Number(id_factura)},
                data: {
                        estado:estado_pago,
                        total: total_factura._sum.precio
                }
            } 
        );

        if(factura){
            return resp.status(200).json({"status":200,"message":"Factura Emitida en el Sistema"});
        }else{
            return resp.status(404).json({"status":404,"message":"No se Emitio la Factura en el sistema"});
        }
       
    }catch(error){
        console.log("Error en controller.factura.js :"+error);
        resp.status(500).json({ "status":500,"message": 'Error al emitir la factura' });
    }  
}

// Se listan los ervicios contratados
export  const listarServiciosContrato=async(req,resp)=>{
    try{
       let id_contrato=req.params.id_contrato;
        const contratos = await prisma.$queryRaw`

        SELECT 
        se.id_servicio,se.nombre AS servicio
        FROM acuerdos ac
        JOIN procedimientos pro ON pro.id_procedimiento= ac.procedimientoId
        JOIN servicios se ON se.id_servicio = pro.servicioId
        WHERE ac.contratoId=${id_contrato} and se.estado='Activo'
        `;
        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.facturas.js :"+error);
        resp.status(500).json({ error: 'Error al listar  las facturas' });
    }
}

// se listan los procedimientos de los servicios contratados
export  const listarProcedimientoContratados=async(req,resp)=>{
    try{
       let id_servicio=req.params.id_servicio;
       let id_contrato=req.params.id_contrato;

        const contratos = await prisma.$queryRaw`
        SELECT 
        pro.id_procedimiento, cu.nombre,ac.precio
        FROM acuerdos ac
        JOIN procedimientos pro ON pro.id_procedimiento= ac.procedimientoId
        JOIN cups cu ON cu.id_cups = pro.cupsId
        WHERE pro.servicioId =${id_servicio} and ac.contratoId=${id_contrato} and ac.estado='Activo';
        `;
        
        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.facturas.js :"+error);
        resp.status(500).json({ error: 'Error al listar  las facturas' });
    }
}


export  const generarFactura=async(req,resp)=>{
    try{
       
        const id_factura= await req.params.id_factura;
        const factura = await prisma.Factura.findFirst(
            { 
                where:{id_factura:Number(id_factura)},
                include: {
                          paciente:{
                            include:{
                                eps:true
                            }
                          },
                          examen:{
                            include:{
                                procedimiento:{
                                    include:{
                                        cups:true
                                    }
                          } 
                            }    
                          },
                          contrato:true       
                }
            } 
        );
        //console.log(factura);
        return resp.status(200).json(factura);
    }catch(error){
        console.log("Error en controller.facturas.js :"+error);
        resp.status(500).json({ error: 'Error al listar  las facturas' });
    }
}


export  const anularFactura=async(req,resp)=>{
    try{
        const id_factura= await req.params.id_factura;
      
        const factura = await prisma.Factura.update(
            { 
                where:{id_factura:Number(id_factura)},
                data: {
                        estado:'Anulado'
                }
            } 
        );

        if(factura){
            return resp.status(200).json({"status":200,"message":"Factura Anulada en el Sistema"});
        }else{
            return resp.status(404).json({"status":404,"message":"No se Anuló la Factura"});
        }
       
    }catch(error){
        console.log("Error en controller.factura.js :"+error);
        resp.status(500).json({ "status":500,"message": 'Error al anular la factura' });
    }  
}