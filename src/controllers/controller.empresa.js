
import prisma from '../libs/prisma.js'


export  const listarEmpresas=async(req,resp)=>{
    try{
        const empresas = await prisma.empresa.findMany(
            {
                include:{
                    municipio: true,
                    municipio:{
                        include:{
                            departamento:true
                        }
                    }
                    
                }
            }
        );

        if(empresas.length>0)
            return resp.status(200).json({"status":200,empresas});
        else{
            return resp.status(404).json({"status":404,"message":"No se encontraron Empresas"});
        }
       
    }catch(error){
        console.log("Error en controller.empresa.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al listar  las empresas' });
    }
}


export  const listarEmpresasActivas=async(req,resp)=>{
    try{
        const empresas = await prisma.empresa.findMany(
            {
                where:{estado:'Activo'}
            }
        );
        
  
            return resp.status(200).json({"status":200,empresas});
       
    }catch(error){
        console.log("Error en controller.empresa.js :"+error);
        resp.status(500).json({"status":500,"message": 'Error al listar  las empresas' });
    }
}



export  const buscarEmpresaId=async(req,resp)=>{
    try{
        const id= await req.params.id_empresa;
        const empresa = await prisma.empresa.findFirst(
            {
                where: { id_empresa: Number(id) },
                include:{
                    municipio: true,
                    municipio:{
                        include:{
                            departamento:true
                        }
                    }
                    
                }

            }
        );
        return resp.status(200).json(empresa);
    }catch(error){
        console.log("Error en controller.empresa.js :"+error);
        resp.status(500).json({ error: 'Error al buscar  las empresas' });
    }
}

export  const registrarEmpresa=async(req,resp)=>{
    try{
        const datos= await req.body;
        const empresa = await prisma.empresa.create(
            {
                data: {
                    nit:datos.nit,
                    codigo:datos.codigo,
                    nombre: datos.nombre,
                    sigla:datos.sigla,
                    tipo:datos.tipo,
                    estado:datos.estado,
                    municipioId:Number(datos.municipioId)
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"La empresa se registro en el sistema"});
    }catch(error){
        console.log("Error en controller.empresa.js :"+error);
        resp.status(500).json({ "status":500,"message": 'Error al registrar  la empresa' });
    }  
}

export  const actualizarEmpresaId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_empresa;
        const existencia = await prisma.empresa.findUnique({
            where: { id_empresa: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":205,"message":"La empresa no existe en el sistema"});
          }
          else{
            const empresa = await prisma.empresa.update(
                {
                    where:{id_empresa:Number(id)},
                    data:{
                            nit:datos.nit,
                            codigo:datos.codigo,
                            nombre: datos.nombre,
                            sigla:datos.sigla,
                            tipo:datos.tipo,
                            estado:datos.estado,
                            municipioId:Number(datos.municipioId)
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Empresa actualizada en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.empresa.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar  las empresas' });
    }  
}

export  const desactivarEmpresaId=async(req,resp)=>{
    try{
        const id= await req.params.id_empresa
        const existencia = await prisma.empresa.findUnique({
            where: {id_empresa: Number(id)}
          });
          if (!existencia) {
            return resp.status(404).json({"status":404,"message":"La empresa no existe en el sistema"});
          }
          else{
            const empresa = await prisma.empresa.update(
                {
                    where:{id_empresa:Number(id)},
                    data:{estado: 'Inactivo'}  
                }  
            );
            return resp.status(200).json({"status":200,"message":"La empresa se desactivo del sistema"});
        }
    }catch(error){
        console.log("Error en controller.empresa.js :"+error);
        resp.status(500).json({ error: 'Error al desactivar  las empresas' });
    }  
}


   