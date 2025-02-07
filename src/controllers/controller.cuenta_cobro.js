
import prisma from '../libs/prisma.js'


export  const listarCuentasPorCobrar=async(req,resp)=>{
    try{
        const cuentaPorCobrar = await prisma.Examen.findMany(
            {
            
            }
        );

        if(cuentaPorCobrar.length>0)
            return resp.status(200).json({"status":200,cuentaPorCobrar});
        else{
            return resp.status(404).json({"status":404,"message":"No se cuentas por cobrar"});
        }
       
    }catch(error){
        console.log("Error en controller.cuenta_cobro.js :"+error);
        resp.status(500).json({ "status":500,"message":'Error al listar cuentas por cobrar' });
    }
}










   