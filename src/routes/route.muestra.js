import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
        listarExamenesConfirmados,
        confirmarTomaMuestra
        } from "../controllers/controller.muestra.js";

const route = Router();



route.get('/listarExamenesConfirmados',validarToken,listarExamenesConfirmados);

route.put('/confirmarTomaMuestra/:id_prestacion',validarToken,confirmarTomaMuestra);







export default route;