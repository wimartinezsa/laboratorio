import { Router } from "express";
import {listarTipoServicio,registrarTipoServicio,actualizarTipoServicioId,desactivarTipoServicioId,buscarTipoServicioId} from "../controllers/controller.tipo.servicio.js";

const route = Router();

route.get('/tipo_servicio',listarTipoServicio);
route.post('/tipo_servicio',registrarTipoServicio);
route.put('/tipo_servicio/:id_tipo_servicio',actualizarTipoServicioId);
route.delete('/tipo_servicio/:id_tipo_servicio',desactivarTipoServicioId);
route.get('/tipo_servicio/:id_tipo_servicio',buscarTipoServicioId);


export default route;