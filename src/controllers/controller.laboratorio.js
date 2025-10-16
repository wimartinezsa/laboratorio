
import prisma from '../libs/prisma.js'



export  const listarExamenesListos=async(req,resp)=>{
    try{
        const examenes = await prisma.$queryRaw`
         SELECT 
            pa.identificacion,pa.nombres,ex.id_examen,cu.nombre AS cups,ex.estado,fact.autorizacion,ex.observacion,
            fact.fecha,cont.nombre AS contrato,ex.resultado_pdf,proc.resultado_laboratorio
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
        console.log("Error en controller.laboratorio.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al listar  examenes en estad listos' });
    }
}



export  const listarLaboratoriosPaciente=async(req,resp)=>{
    try{
       let identificacion= req.user.identificacion;

        const examenes = await prisma.$queryRaw `
         SELECT 
                    pa.identificacion,pa.nombres,ex.id_examen,cu.nombre AS cups,ex.estado,fact.autorizacion,ex.observacion,
                    fact.fecha,cont.nombre AS contrato,ex.resultado_pdf,proc.resultado_laboratorio
                    FROM facturas fact
                    JOIN contratos cont ON cont.id_contrato=fact.contratoId
                    JOIN examenes ex ON ex.facturaId= fact.id_factura
                    JOIN procedimientos proc ON proc.id_procedimiento = ex.procedimientoId
                    JOIN cups cu ON cu.id_cups = proc.cupsId
                    JOIN  pacientes pa ON pa.id_paciente = fact.pacienteId
                    WHERE (ex.estado='Resultados_Listos' or ex.estado='Resultados_Entregados') and pa.identificacion=${identificacion}
                    ORDER BY ex.fecha_muestra ASC`;
        
       
        
        return resp.status(200).json({"status":200,examenes});
       
    }catch(error){
        console.log("Error en controller.laboratorio.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al listar  los laboratorios del paciente' });
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
        console.log("Error en controller.laboratiroi.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al buscar examenes' });
    }
}









export  const generarLaboratorio=async(req,resp)=>{
    try{
       
        const autorizacion= await req.params.autorizacion;
        
        const examenes = await prisma.Factura.findMany({
  where: {
    autorizacion: autorizacion
  },
  include: {
    paciente: {
      include: {
        eps: true
      }
    },
    contrato: {
      include: {
        empresa: true
      }
    },
   examen: {
  where: {
    procedimiento: { resultado_laboratorio: "Automatico" }
  },
  include: {
    resultado: {
      include: {
        parametro: {
          include: { tipo_parametro: true }
        }
      }
    },
    procedimiento: {
      include: {
        cups: true,
        area: true
      }
    }
  },
  orderBy: {
    procedimiento: {
      area: {
        nombre: 'asc'
      }
    }
  }
}

  }
});



        //console.log(examenes);
        //console.log(Array.isArray(examenes[0].examen));

       examenes.sort((a, b) => {
        const areaA = a.examen[0]?.procedimiento?.area?.nombre || '';
        const areaB = b.examen[0]?.procedimiento?.area?.nombre || '';
        return areaA.localeCompare(areaB);
        });


        
        return resp.status(200).json(examenes);
    }catch(error){
        console.log("Error en controller.laboratorio.js :"+error);
        resp.status(500).json({ error: 'Error al listar el laboratorio' });
    }
}







export  const firmaLaboratorioAuxiliar=async(req,resp)=>{
    try{
       let id_usuario= req.params.id_usuario;
        const Axuliar = await prisma.Usuario.findFirst(
            { 
                where:{id_usuario:Number(id_usuario)} ,
                select: {
                    identificacion:true,
                    nombre:true,
                    firma:true 
                }           
            } 
        );
       // console.log(bacteriologo);
        return resp.status(200).json(Axuliar);
    }catch(error){
        console.log("Error en controller.laboratorio.js :"+error);
        resp.status(500).json({ error: 'Error al listar quien firma el laboratorio' });
    }
}



export  const firmaLaboratorioBacteriologo=async(req,resp)=>{
    try{
        const bacteriologo = await prisma.Usuario.findMany(
            { 
                where:{
                  autoriza: 'Si',
                OR: [
                    { rol: 'Bacteriologo' },
                    { rol: 'Administrador' }
                ]

                } ,
                select: {
                    identificacion:true,
                    nombre:true,
                    firma:true,
                    rol:true
                }

            } 
        );
       // console.log(bacteriologo);
        return resp.status(200).json(bacteriologo);
    }catch(error){
        console.log("Error en controller.laboratorio.js :"+error);
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
        console.error("Error en controller.laboratorio.js:", error);
        resp.status(500).json({ status: 500, message: "Error al descargar el laboratorio" });
    }
};


