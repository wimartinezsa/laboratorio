
import prisma from '../libs/prisma.js'


export  const listarMunicipios=async(req,resp)=>{
    try{
        
        const municipios = await prisma.Municipio.findMany(

            {include: { 
                departamento: true
                        
                }
            }
            
        );
        return resp.status(200).json(municipios);
    }catch(error){
        console.log("Error en controller.municipio.js :"+error);
    }
}


export  const listarMunicipiosDepartementoId=async(req,resp)=>{
    try{
        let id_departamento = req.params.id_departamento;
        const municipios = await prisma.municipio.findMany(
            {where: { 
                departamentoId: Number(id_departamento)
                        
                }
            } 
        );
        return resp.status(200).json(municipios);
    }catch(error){
        console.log("Error en controller.municipio.js :"+error);
    }
}






   