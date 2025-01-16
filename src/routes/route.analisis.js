import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
     
   
        //listarMuestrasPendientes,
        registrarConfirmarMuestraRecibida,
        iniciarProcesoAnalisis,
        listarMuestrasArea
        } from "../controllers/controller.analisis.js";

const route = Router();

route.get('/listarMuestrasArea/:rol/:area',validarToken,listarMuestrasArea);
//route.get('/muestrasPendientes',validarToken,listarMuestrasPendientes);
route.put('/registrarConfirmarMuestraRecibida/:id_examen',validarToken,registrarConfirmarMuestraRecibida);
route.put('/inicioProcesoAnalisis/:id_examen',validarToken,iniciarProcesoAnalisis);




export default route;