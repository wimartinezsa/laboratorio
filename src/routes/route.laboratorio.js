import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
        listarExamenesListos,
        generarLaboratorio,
        firmaLaboratorio,
        confirmarEntregaExamen,
        buscarExamenesListos
        } from "../controllers/controller.laboratorio.js";

const route = Router();



route.get('/listarExamenesListos',validarToken,listarExamenesListos);
route.get('/buscarExamenesListos/:dato',validarToken,buscarExamenesListos);
route.get('/generarLaboratorio/:autorizacion',validarToken,generarLaboratorio);
route.get('/firmaLaboratorio',validarToken,firmaLaboratorio);
route.put('/confirmarEntregaExamen/:id_examen',validarToken,confirmarEntregaExamen);








export default route;