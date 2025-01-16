
import prisma from '../libs/prisma.js'


export  const listarPaises=async(req,resp)=>{
    try{
        const paises = await prisma.pais.findMany();
        return resp.status(200).json(paises);
    }catch(error){
        console.log("Error en controller.pais.js :"+error);
    }
}







   