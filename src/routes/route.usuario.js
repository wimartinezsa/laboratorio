import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
    registrarUsuario,
    actualizarUsuarioId,
    buscarUsuarioId,
    listarUsuarios,
    registrarFirma,
    cargarImagen,
    estadoUsuarioId,
    listarSedes
} 
from "../controllers/controller.usuario.js";

import {validarUsuario,cerrrar_sesion} from "../middlewares/authentication.js"

const route = Router();

route.get('/usuario',validarToken,listarUsuarios);
route.post('/login',validarUsuario);

route.get('/cerrrar_sesion/:id_usuario',cerrrar_sesion);


route.get('/usuario/:id_usuario',validarToken,buscarUsuarioId);


route.get('/sedes',listarSedes);


route.post('/usuario',validarToken,registrarUsuario);
route.put('/usuario/:id_usuario',actualizarUsuarioId);

route.put('/registrarFirma/:id_usuario',cargarImagen,registrarFirma);

route.delete('/usuario/:id_usuario',validarToken,estadoUsuarioId);


export default route;