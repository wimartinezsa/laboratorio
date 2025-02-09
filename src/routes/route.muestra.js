import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
        listarExamenesTomaMuestra,
        confirmarTomaMuestra
        } from "../controllers/controller.muestra.js";

const route = Router();



route.get('/listarExamenesTomaMuestra',validarToken,listarExamenesTomaMuestra);

route.put('/confirmarTomaMuestra/:id_prestacion',validarToken,confirmarTomaMuestra);







export default route;