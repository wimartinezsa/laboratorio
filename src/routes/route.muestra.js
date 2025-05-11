import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
        listarExamenesTomaMuestra,
        confirmarTomaMuestra,
        noConfirmarTomaMuestra
        } from "../controllers/controller.muestra.js";

const route = Router();



route.get('/listarExamenesTomaMuestra',validarToken,listarExamenesTomaMuestra);

route.put('/confirmarTomaMuestra/:id_prestacion',validarToken,confirmarTomaMuestra);

route.put('/noConfirmarTomaMuestra/:id_prestacion',validarToken,noConfirmarTomaMuestra);






export default route;