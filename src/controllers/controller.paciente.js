
import prisma from '../libs/prisma.js'


export  const listarPacientes=async(req,resp)=>{

    try{
        const pacientes = await prisma.paciente.findMany(
            {
                include:{
                    eps:true,
                    municipio:true            
                }
            }
        );
        return resp.status(200).json(pacientes);
    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ error: 'Error al listar los paciente' });
    }
}


export  const buscarPacienteId=async(req,resp)=>{
    try{
        const id= await req.params.id_paciente;
        const paciente = await prisma.paciente.findFirst(
            {
                where: { id_paciente: Number(id) },
                include:{
                    eps:true,
                    municipio:{
                        include:{
                            departamento:
                            {
                             include:{
                                pais:true
                             }
                            }
                        }
                }
                     
                }
            }
        );
        return resp.status(200).json(paciente);
    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ error: 'Error al buscar el paciente' });
    }
}

export  const buscarPacienteIdent=async(req,resp)=>{
    try{
        const identificacion= await req.params.identificacion;
       
        const paciente = await prisma.paciente.findFirst({
            where: { identificacion: identificacion },
            include: {
                eps: true,

                municipio:{
                    include:{
                    departamento:{
                        include:{
                            pais:true
                        }
                        
                    }
                }
                }
            },
        });
      
        return resp.status(200).json(paciente);
    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ status:500,message: 'Error al buscar el paciente' });
    }
}

export  const registrarPaciente=async(req,resp)=>{
    try{
        const datos= await req.body;
      // console.log(datos);
        const paciente = await prisma.paciente.create(
            {
                data: {
                    tipo_identificacion: datos.tipo_identificacion,
                    identificacion: String(datos.identificacion),
                    nombres: datos.nombres,
                    fecha_nacimiento: new Date(datos.fecha_nacimiento),
                    sexo: datos.sexo,
                    direccion: datos.direccion,
                    email: datos.email,
                    telefono:datos.telefono,
                    tipo_paciente: datos.tipo_paciente,
                    estado:"Activo",
                    municipioId:Number(datos.municipioId),
                    paisId:Number(datos.paisId),
                    epsId: Number(datos.epsId),
                    incapacidad: datos.incapacidad,
                    zona: datos.zona
                    
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Paciente Registrado en el Sistema"});
    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ error: 'Error al registrar el paciente' });
       
    }  
}

export  const actualizarPacienteId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_paciente;
        const existencia = await prisma.paciente.findUnique({
            where: { id_paciente: Number(id)},
          });
          if (!existencia) {
            return resp.status(404).json({"status":404,"message":"El usuario no existe en el sistema"});
          }
          else{

            const paciente = await prisma.paciente.update(
                {
                    where:{id_paciente:Number(id)},
                    data:{
                        tipo_identificacion: datos.tipo_identificacion,
                        identificacion: String(datos.identificacion),
                        nombres: datos.nombres,
                        fecha_nacimiento: new Date(datos.fecha_nacimiento),
                        sexo: datos.sexo,
                        direccion: datos.direccion,
                        email: datos.email,
                        telefono:datos.telefono,
                        tipo_paciente: datos.tipo_paciente,
                        estado:"Activo",
                        municipioId:Number(datos.municipioId),
                        paisId:Number(datos.paisId),
                        epsId: Number(datos.epsId),
                        incapacidad: datos.incapacidad,
                        zona: datos.zona
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Usuario actualizado en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar el paciente' });
    }  
}



export  const desactivarPacienteId=async(req,resp)=>{
    try{
        const id= await req.params.id_paciente;
        const existencia = await prisma.paciente.findUnique({
            where: { id_paciente: Number(id)}
          });

          if (!existencia) {
            return resp.status(404).json({"status":404,"message":"El usuario no existe en el sistema"});
          }
          else{
            const paciente = await prisma.paciente.update(
                {
                    where:{id_paciente:Number(id)},
                    data:{estado: 'Inactivo'}  
                }  
            );
            return resp.status(200).json({"status":200,"message":"Paciente desactivado del sistema"});
        }

       
    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ error: 'Error al desactivar el Paciente' });
    }  
}


   