
import prisma from '../libs/prisma.js'


export  const listarCups=async(req,resp)=>{
    try{
        const cups = await prisma.Cups.findMany(
            {
                orderBy: {
                    nombre: 'asc' // Ordena por nombre en orden ascendente
                }
            }
        );
        return resp.status(200).json(cups);
    }catch(error){
        console.log("Error en controller.cups.js :"+error);
        resp.status(500).json({ error: 'Error al listar los cups' });
    }
}








   