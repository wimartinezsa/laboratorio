
import prisma from '../libs/prisma.js'


export  const listarPacientes=async(req,resp)=>{

    try{
        const pacientes = await prisma.Paciente.findMany(
            {
                include:{
                    eps:true,
                    municipio:true            
                }
            }
        );
       // console.log(pacientes);
        return resp.status(200).json(pacientes);
    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ error: 'Error al listar los paciente' });
    }
}


export  const buscarPacienteId=async(req,resp)=>{
    try{
        const id= await req.params.id_paciente;
        const paciente = await prisma.Paciente.findFirst(
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
       
        const paciente = await prisma.Paciente.findFirst({
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

        if(paciente)
            return resp.status(200).json({"status":200,paciente});
        else{
            return resp.status(404).json({"status":404,"message":"El paciente no se encuentra registrado en el sistema..."});
        }





    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ status:500,message: 'Error al buscar el paciente' });
    }
}

export  const registrarPaciente=async(req,resp)=>{
    try{
        const datos= await req.body;
      // console.log(datos);

      const exist_paciente = await prisma.Paciente.findFirst({
        where: { identificacion: datos.identificacion },   
    });

    // se busca si el paciente existe
    if(exist_paciente){

        return resp.status(200).json({"status":200,"message":"El paciente ya esta registrado en el sistema"});
    }
 // si no esxite el paciente se registra
    else{
        const paciente = await prisma.Paciente.create(
            {
                data: {
                    tipo_identificacion: datos.tipo_identificacion,
                    identificacion: String(datos.identificacion),
                    nombres: datos.nombres,
                    fecha_nacimiento: new Date(datos.fecha_nacimiento),
                    sexo: datos.sexo,
                    direccion: datos.direccion,
                    email: datos.email && datos.email.trim() !== '' 
                    ? datos.email 
                    : String(datos.identificacion) + '@gmail.com',
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
    
    }

    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ error: 'Error al registrar el paciente' });
       
    }  
}



export  const actualizarPacienteId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_paciente;
        const existencia = await prisma.Paciente.findUnique({
            where: { id_paciente: Number(id)},
          });
          if (!existencia) {
            return resp.status(404).json({"status":404,"message":"El usuario no existe en el sistema"});
          }
          else{

            const paciente = await prisma.Paciente.update(
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
        const existencia = await prisma.Paciente.findUnique({
            where: { id_paciente: Number(id)}
          });

          if (!existencia) {
            return resp.status(404).json({"status":404,"message":"El usuario no existe en el sistema"});
          }
          else{
            const paciente = await prisma.Paciente.update(
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


   