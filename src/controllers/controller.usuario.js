import prisma from '../libs/prisma.js'
import bcrypt from 'bcryptjs';
import  multer from 'multer-js';


const storage=multer.diskStorage({
    destination:function(req,img,cb){
        cb(null,"public/img/firmas");
    },
    filename: function(req,img,cb){
        cb(null,img.originalname);
    }
});

const upload=multer({storage:storage});
export const cargarImagen=upload.single('img');




export  const listarSedes=async(req,resp)=>{
    try{
        
        const sedes = await prisma.sede.findMany();
          //console.log(usuarios);
          return resp.status(200).json({"status":200,sedes}); 
          
    }catch(error){
        console.log("Error en controller.usuario.js :"+error);
        resp.status(500).json({ error: 'Error al listar las sedes' });
    }  
}




export  const listarUsuarios=async(req,resp)=>{
    try{
        const id= await req.params.id_usuario;
        const usuarios = await prisma.Usuario.findMany({
            where: {
              rol: {
                not: 'Invitado', // Excluye usuarios con rol "invitado"
              },
            },
            select: {
              id_usuario: true,
              identificacion: true,
              nombre: true,
              cargo: true,
              rol: true,
              email: true,
              estado: true,
              firma: true,
              autoriza: true,
              sede:true,
              vinculacion: {
                select: {
                  id_vinculacion: true,
                  area: {
                    select: {
                      nombre: true,
                    },
                  },
                },
              },
            },
          });
          
          
          //console.log(usuarios);
          return resp.status(200).json({"status":200,usuarios}); 
          
    }catch(error){
        console.log("Error en controller.usuario.js :"+error);
        resp.status(500).json({ error: 'Error al listar los Usuario' });
    }  
}



export  const registrarUsuario=async(req,resp)=>{
    try {
      
        const { identificacion,tipo_identificacion,nombre, email,rol,cargo,area,autoriza,sede} = req.body;
      /*
        if (!identificacion || !nombre || !email || !password || !rol || !cargo) {
            return resp.status(400).json({ "status": 400, "message": "Todos los datos son obligatorios" });
        }
*/

        const existenciaUsuario = await prisma.Usuario.findFirst(
            {where: {
                OR:[{email: email},
                    {identificacion:identificacion }
               ]
                     
                    }
            }
        );
      
   
        if (!existenciaUsuario) {

            const encriptPassword = bcrypt.hashSync(String(identificacion), 12)
            const usuario=await  prisma.Usuario.create({
                data: {
                    identificacion:String(identificacion),
                    tipo_identificacion: tipo_identificacion,
                    nombre: nombre,
                    email: email,
                    password: encriptPassword,
                    rol: rol,
                    cargo:cargo,
                    autoriza: autoriza,
                    sedeId:Number(sede)// 👈 Esta es la clave
                }
            })
            
           if(!usuario){
            return resp.status(200).json({"status":200,"message":"Usuario no registrado en el sistema"});

           }else{
            return resp.status(200).json({"status":200,"message":"Usuario registrado en el sistema"});
           }
        }else{
            return resp.status(403).json({"status":403,"message":"La identificación o el  email ya se encuentra registrado"});
    }

       




    } catch (error) {
        console.log("Error en controller.usuario.js :"+error.message);
        resp.status(500).json({ error: 'Error al validar usuario' });
    }
}


export  const actualizarUsuarioId=async(req,resp)=>{
    try{
        const datos= await req.body;
       // console.log(datos);
        const id= await req.params.id_usuario;
      

        const existencia = await prisma.Usuario.findUnique({
            where: {id_usuario: Number(id)},
          });
          //console.log(existencia);

          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"El Usuario no existe en el sistema"});
          }
          else{
           
            const encriptPassword = bcrypt.hashSync(String(datos.identificacion), 12);
         
            const usuario = await prisma.Usuario.update(
                {
                    where:{id_usuario:Number(id)},
                    data:{
                        identificacion:String(datos.identificacion),
                        tipo_identificacion: datos.tipo_identificacion,
                        nombre: datos.nombre,
                        email: datos.email,
                        password: encriptPassword,
                        rol: datos.rol,
                        cargo:datos.cargo,
                        autoriza: datos.autoriza,
                        sedeId:Number(datos.sede)// 👈 Esta es la clave
                                 
                    }
                }  

                


            );
            return resp.status(200).json({"status":200,"message":"Usuario actualizado en el sistema"});
            
          }

          
    }catch(error){
        console.log("Error en controller.usuario.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar el Usuario' });
    }  
}



export  const buscarUsuarioId=async(req,resp)=>{
    try{
        const id= await req.params.id_usuario;
        const usuario = await prisma.Usuario.findUnique({
            where: {id_usuario: Number(id)},
            select: {
                id_usuario: true,
                identificacion: true,
                tipo_identificacion:true,
                nombre: true,
                cargo: true,
                rol: true,
                email: true,
                estado: true,
                sedeId:true,
                vinculacion: { // Carga la relación vinculacion
                    select: {
                      area: { // Dentro de vinculacion, selecciona el área
                        select: {
                          nombre: true, // Selecciona solo el campo 'nombre' del área
                        },
                      },
                    },
                  }
              },
          });

          console.log(usuario);
       resp.status(200).json(usuario);
          
    }catch(error){
        console.log("Error en controller.usuario.js :"+error);
        resp.status(500).json({ error: 'Error al buscar el Usuario' });
    }  
}




export  const registrarFirma=async(req,resp)=>{
    try{
        const id= await req.params.id_usuario;
        let img= req.file.originalname;
       // console.log(img);
            const usuario = await prisma.Usuario.update(
                {
                    where:{id_usuario:Number(id)},
                    data:{
                        firma:img                
                    }
                }  
            );
            //console.log(usuario);
            return resp.status(200).json({"status":200,"message":"Firma registrada en el sistema"});
    }catch(error){
        console.log("Error en controller.usuario.js :"+error);
        resp.status(500).json({ error: 'Error al registrar la firma' });
    }  
}



export  const estadoUsuarioId=async(req,resp)=>{
    try{
        const id= await req.params.id_usuario;
        const {estado} = req.body;
        const usuario = await prisma.Usuario.findUnique({
            where: { id_usuario: Number(id)}
          });

          if (!usuario) {
            return resp.status(404).json({"status":404,"message":"El usuario no existe en el sistema"});
          }
          else{
            const user= await prisma.Usuario.update(
                {
                    where:{id_usuario:Number(id)},
                    data:{estado: estado}  
                }  
            );
            return resp.status(200).json({"status":200,"message":`Usuario ${estado} en el sistema`});
        }

    }catch(error){
        console.log("Error en controller.usuario.js :"+error);
        return resp.status(500).json({"status":500,"message":`Usuario ${estado} del sistema`});
    }  
}

