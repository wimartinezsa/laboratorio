import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
        listarExamenesListos,
        generarLaboratorio,
        firmaLaboratorioBacteriologo,
        confirmarEntregaExamen,
        buscarExamenesListos,
        firmaLaboratorioAuxiliar
        } from "../controllers/controller.laboratorio.js";

const route = Router();



route.get('/listarExamenesListos',validarToken,listarExamenesListos);
route.get('/buscarExamenesListos/:dato',validarToken,buscarExamenesListos);
route.get('/generarLaboratorio/:autorizacion',validarToken,generarLaboratorio);
route.get('/firmaLaboratorioBacteriologo',validarToken,firmaLaboratorioBacteriologo);
route.put('/confirmarEntregaExamen/:id_examen',validarToken,confirmarEntregaExamen);
route.get('/firmaLaboratorioAuxiliar/:id_usuario',validarToken,firmaLaboratorioAuxiliar);







export default route;