import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {listarServicios,
    buscarServicioId,
    registrarServicio,
    actualizarServicioId,
    estadoServicioId,
    listarServiciosActivos
} from "../controllers/controller.servicio.js";

const route = Router();

route.get('/servicio',validarToken,listarServicios);

route.get('/servicioActivos',validarToken,listarServiciosActivos);

route.post('/servicio',validarToken,registrarServicio);
route.put('/servicio/:id_servicio',validarToken,actualizarServicioId);
route.delete('/servicio/:id_servicio',validarToken,estadoServicioId);
route.get('/servicio/:id_servicio',validarToken,buscarServicioId);



export default route;