
import prisma from '../libs/prisma.js'
import bcrypt from 'bcryptjs';

export  const listarFacturas=async(req,resp)=>{
    try{
       
        const contratos = await prisma.$queryRaw`
        SELECT fa.id_factura,DATE(fa.fecha) AS fecha,pa.identificacion,co.nombre AS contrato,
        em.nombre AS empresa,fa.total,fa.estado,(select nombre from sedes where id_sede=${req.user.sede}) as sede
        FROM facturas fa
        JOIN pacientes pa ON pa.id_paciente = fa.pacienteId
        JOIN contratos co ON co.id_contrato = fa.contratoId
        JOIN empresas em ON em.id_empresa = co.empresaId
        ORDER BY fa.id_factura DESC
        `;



        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.facturas.js :"+error);
        resp.status(500).json({ error: 'Error al listar  las facturas' });
    }
}





export  const listarFacturasContratos=async(req,resp)=>{
    try{
       let id_contrato=req.params.id_contrato;
      let contratos = '';
       if(req.user.sede===1){

         contratos = await prisma.$queryRaw`
            SELECT fa.id_factura,DATE(fa.fecha) AS fecha,pa.identificacion,pa.nombres,co.nombre AS contrato,
            em.nombre AS empresa,SUM(ex.precio) AS total,fa.estado,fa.autorizacion,(select nombre from sedes where fa.sedeId=id_sede) as sede
            FROM facturas fa
            LEFT JOIN examenes ex ON ex.facturaId = fa.id_factura
            JOIN pacientes pa ON pa.id_paciente = fa.pacienteId
            JOIN contratos co ON co.id_contrato = fa.contratoId
            JOIN empresas em ON em.id_empresa = co.empresaId
            WHERE co.id_contrato=${id_contrato} 
            GROUP BY id_factura `;
       }else{

        contratos = await prisma.$queryRaw`
            SELECT fa.id_factura,DATE(fa.fecha) AS fecha,pa.identificacion,pa.nombres,co.nombre AS contrato,
            em.nombre AS empresa,SUM(ex.precio) AS total,fa.estado,fa.autorizacion,(select nombre from sedes where fa.sedeId=id_sede) as sede
            FROM facturas fa
            LEFT JOIN examenes ex ON ex.facturaId = fa.id_factura
            JOIN pacientes pa ON pa.id_paciente = fa.pacienteId
            JOIN contratos co ON co.id_contrato = fa.contratoId
            JOIN empresas em ON em.id_empresa = co.empresaId
            WHERE co.id_contrato=${id_contrato} and fa.sedeId=${req.user.sede}
            GROUP BY id_factura `;
       }

       
      //console.log(contratos);
       
        
        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.facturas.js :"+error);
        resp.status(500).json({ status:500,message: 'Error al listar  las facturas' });
    }
}




// Se listan los ervicios contratados
export  const listarServiciosContrato=async(req,resp)=>{
    try{
       let id_contrato=req.params.id_contrato;
        const contratos = await prisma.$queryRaw`

        SELECT DISTINCT
        se.id_servicio,se.nombre AS servicio
        FROM acuerdos ac
        JOIN procedimientos pro ON pro.id_procedimiento= ac.procedimientoId
        JOIN servicios se ON se.id_servicio = pro.servicioId
        WHERE ac.contratoId=${id_contrato} and se.estado='Activo' order by se.nombre ASC`;
        
        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.facturas.js :"+error);
        resp.status(500).json({ error: 'Error al listar  las facturas' });
    }
}

// se listan los procedimientos de los servicios contratados
export  const listarProcedimientoContratados=async(req,resp)=>{
    try{
     
       let id_contrato=req.params.id_contrato;

        const contratos = await prisma.$queryRaw`
        SELECT 
        pro.id_procedimiento, cu.nombre,ac.precio
        FROM acuerdos ac
        JOIN procedimientos pro ON pro.id_procedimiento= ac.procedimientoId
        JOIN cups cu ON cu.id_cups = pro.cupsId
        WHERE  ac.contratoId=${id_contrato} and ac.estado='Activo' ORDER BY cu.nombre ASC;
        `;
        
        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.facturas.js :"+error);
        resp.status(500).json({ error: 'Error al listar  las facturas' });
    }
}



//revisarr
export  const emitirFactura=async(req,resp)=>{
    try{
        const id_factura= await req.params.id_factura;
        const autorization= await req.body.autorizacion;    
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
                        total: total_factura._sum.precio,
                        autorizacion:autorization
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





export const buscarFactura = async (req, resp) => {
    try {
        const id_factura = req.params.id_factura;

        const existencia = await prisma.Factura.findFirst({
            where: {
                id_factura: Number(id_factura)
            },
            include: {
                paciente: true,
                contrato: {
                    include: { empresa: true }
                }
            }
        });

        return resp.status(200).json({ status: 200, message: 'Factura encontrada', factura: existencia });
    } catch (error) {
        console.log('Error en controller.factura.js :' + error);
        resp.status(500).json({ status: 500, message: 'Error al encontrar la factura' });
    }
};










const buscarExistenciaFactura=async(id_contrato)=>{
    try{
        
        const existencia = await prisma.Factura.findFirst({
            where: {
                contratoId: Number(id_contrato),
                estado: 'Pendiente_Emision'
            },
            include: {
                paciente: true,
                contrato: {
                    include: { empresa: true }
                }
            }
        });
       
            return existencia;
    }catch(error){
        console.log("Error en controller.facturas.js :"+error);
        
    }
}





//genrar factura
export  const generarFactura=async(req,resp)=>{


    try{

        const id_contrato= await req.params.id_contrato;
        const id_paciente= await req.params.id_paciente;
        const existencia_factura= await buscarExistenciaFactura(id_contrato);

        if(existencia_factura){

                const factura = await prisma.Factura.update(
                                { 
                                    where:{id_factura:Number(existencia_factura.id_factura)},
                                    data: {
                                        pacienteId: Number(id_paciente)     
                                    }
                                } 
                                );

            const existencia_factura2= await buscarExistenciaFactura(id_contrato);
            return resp.status(200).json({"status":200,"message":"Factura existente","factura":existencia_factura2});

        }else{
    // se crea la factura
    const nueva_factura = await prisma.Factura.create(
        {
            data: {
                contratoId: Number(id_contrato),
                pacienteId: Number(id_paciente),
                fecha: new Date(),
                via_ingreso: "DEMANDA_ESPONTANEA",
                autorizacion: "0",
                total: 0,
                estado: 'Pendiente_Emision',
                sedeId: req.user.sede
                 
            }
        });


        if (nueva_factura){
        
                const factura2 = await prisma.factura.update(
                    {    where:{id_factura:nueva_factura.id_factura},
                        data: {
                            autorizacion:String(String(id_contrato)+String(nueva_factura.id_factura))
                        }
                    } 
                );

            } 


         





        const existencia_nueva= await buscarExistenciaFactura(id_contrato);
        return resp.status(200).json({"status":200,"message":"Factura creada","factura":existencia_nueva});
    }
    }catch(error){
        console.log("Error en controller.factura.js :"+error);
        resp.status(500).json({ "status":500,"message": 'Error al generar la factura' });
    }

    
}

//revisarr
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


export  const imprimirFactura=async(req,resp)=>{
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