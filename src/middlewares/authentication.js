import prisma from '../libs/prisma.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export  const validarUsuario=async(req,resp)=>{
    try {
        const { login, password } = req.body;
       // console.log(req.body);
        
        if (!login || !password) {
            return resp.status(400).json({"status":400,"message":"El login y password son obligatorio"});
        }

        const existenciaLogin = await prisma.usuario.findFirst(
                {where: { identificacion: login },
                include:{
                    vinculacion:{
                                include:{
                                    area:true
                                }
                            }
                }
            }
        );
     // console.log(existenciaLogin.vinculacion[0].area.nombre);
     // console.log( existenciaLogin.vinculacion.area.nombre );
    
        if (!existenciaLogin) {
            return resp.status(403).json({"status":403,"message":"Usuario no autorizado"});
        }else{
            const passwordCorrecto  = await bcrypt.compare(password, existenciaLogin.password);
           
         
            if(passwordCorrecto){
                
              
                const token = jwt.sign(
                    { id: existenciaLogin.id_usuario,identificacion:existenciaLogin.identificacion,email: existenciaLogin.email, rol: existenciaLogin.rol}, // Datos que quieras incluir en el token
                    process.env.SECRET_TOKEN,
                    { expiresIn: '8h' } 
                );

            //console.log(existenciaLogin);
                const usuario = await prisma.usuario.update(
                    {
                        where:{id_usuario: Number(existenciaLogin.id_usuario)},
                        data:{
                            token:token
                        }
                    }  
                );
    
                return resp.status(200).json({
                    "status": 200,
                    "message": "Login exitoso",
                    token,
                    "status":200,
                    user: { id: existenciaLogin.id_usuario,identificacion:existenciaLogin.identificacion,nombre:existenciaLogin.nombre ,email: existenciaLogin.email, rol: existenciaLogin.rol}
                });

            }else{
                return resp.status(403).json({"status":403,"message":"Usuario no autorizado"});
            }
        }
    } catch (error) {
        console.log("Error en controller.usuario.js :"+error);
        resp.status(500).json({ error: 'Error al validar usuario' });
    }
}




export const validarToken = async (req, res, next) => {
    try {
        // Captura el encabezado de autorización
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(403).json({ status: 403, message: 'Token es requerido' });
        }

        // Extrae el token
        const token = authHeader.split(' ')[1]; // Dividimos en "Bearer <token>" y tomamos solo el token

        if (!token) {
            return res.status(403).json({ status: 403, message: 'Token es requerido' });
        }

        // Verifica el token con jwt
        jwt.verify(token, process.env.SECRET_TOKEN, async (error, decoded) => {
            if (error) {
                return res.status(403).json({
                    status: 403,
                    message: 'Token inválido o expirado',
                });
            }

            // Busca el usuario por el ID del token decodificado
            const existe_token = await prisma.usuario.findUnique({
                where: { id_usuario: Number(decoded.id) },
            });

            if (!existe_token) {
                return res.status(404).json({
                    status: 404,
                    message: 'Usuario no encontrado',
                });
            }

            // Verifica si el token coincide con el almacenado en la base de datos
            if (existe_token.token === token) {
                req.user = decoded; // Asigna el usuario decodificado a la solicitud
                next(); // Continua al siguiente middleware o controlador
            } else {
                console.log('Token no permitido, redirigiendo al login');
                res.render('pages/login', { message: 'Sesión no válida. Por favor, inicia sesión nuevamente.' });
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error del servidor: ' + error.message,
        });
    }
};



export  const cerrrar_sesion=async(req,resp)=>{
   
    try{
        const id= await req.params.id_usuario;
            const eps = await prisma.usuario.update(
                {
                    where:{id_usuario:Number(id)},
                    data:{
                        token:'' 
                    }
                }  
            );
            resp.render('pages/login', { message: 'Sesión cerrada' });
          
    }catch(error){
        console.log("Error en controller.authentication.js :"+error);
        resp.status(500).json({ error: 'Error al cerrar sesion del usuario' });
    }  

}
