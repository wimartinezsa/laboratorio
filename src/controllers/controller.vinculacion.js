
import prisma from '../libs/prisma.js'



export  const listarVinculacion=async(req,resp)=>{
    try{
        let id_usuario= req.params.id_usuario;
        
        const vincuacion = await prisma.Vinculacion.findMany(
            {
                where :{usuarioId:Number(id_usuario)},
                include:{
                    area:true
                }
            }  
        );
        return resp.status(200).json(vincuacion);
    }catch(error){
        console.log("Error en controller.vinculación.js :"+error);
        resp.status(500).json({ error: 'Error al listar las vincuacion del usuario' });
    }
}






export  const registrarVinculacion=async(req,resp)=>{
    try{
        const datos= await req.body;
        const vincuacion = await prisma.Vinculacion.create(
            {
                data: {
                    areaId:Number(datos.areaId),
                    usuarioId:Number(datos.usuarioId)   
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"La vinculación del usuario se registró en el sistema"});
    }catch(error){
        console.log("Error en controller.vinculacion.js :"+error);
        resp.status(500).json({ "status":500,"message": 'Error al registrar la vinculación del usuario' });
    }  
}



export const eliminarVinculacion = async (req, resp) => {
    try {
       
        let id_vinculacion= req.params.id_vinculacion;
     

        await prisma.Vinculacion.delete({
            where: {
                    id_vinculacion: Number(id_vinculacion)
                    }
        });

        
        resp.status(200).json({ status: 200, message: "Vinculación Eliminada" });
       
    } catch (error) {
        console.error("Error en controller.vinculacion.js:", error);
        resp.status(500).json({ status: 500, message: "Error al eliminar la vinculación" });
    }
};




   