
import prisma from '../libs/prisma.js'


export  const listarFinalidad=async(req,resp)=>{
    try{
        const finalidad = await prisma.finalidad.findMany();
        return resp.status(200).json(finalidad);
    }catch(error){
        console.log("Error en controller.finalidad.js :"+error);
    }
}







   