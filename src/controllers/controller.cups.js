
import prisma from '../libs/prisma.js'


export  const listarCups=async(req,resp)=>{
    try{
        const cups = await prisma.cups.findMany( );
        return resp.status(200).json(cups);
    }catch(error){
        console.log("Error en controller.cups.js :"+error);
        resp.status(500).json({ error: 'Error al listar los cups' });
    }
}








   