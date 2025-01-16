


import prisma from '../libs/prisma.js'

//JSONbig.storeAsString={ storeAsString: true };


export  const buscarPrestadorId=async(req,resp)=>{
    try{
        const id= await req.params.id_prestador;
        
        const prestadores = await prisma.prestador.findFirst(
            {
                where: {id_prestador:Number(id)}
            }
        );


    return resp.status(200).json(prestadores);
    
    }catch(error){
        console.log("Error en controller.id_prestador.js :"+error);
        resp.status(500).json({ error: 'Error al buscar el prestador' });
    }
}





   