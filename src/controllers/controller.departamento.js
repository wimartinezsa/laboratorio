
import prisma from '../libs/prisma.js'


export  const listarDepartamentos=async(req,resp)=>{
    try{
        let id_pais= req.params.id_pais;
        const departamentos = await prisma.Departamento.findMany(
            {
                where:{
                    paisId:Number(id_pais)
                }
            }
    );
        return resp.status(200).json(departamentos);
    }catch(error){
        console.log("Error en controller.departamento.js :"+error);
    }
}







   