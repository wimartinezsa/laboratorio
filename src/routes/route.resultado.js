import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
        listarMuestrasArea,
        registrarResultado,
        registrarResulatadosAutomaticos,
        finzalizarAnalisis,
        listarParametrosId
        
        
        } from "../controllers/controller.resultado.js";

const route = Router();

route.get('/listarEaxmenesArea/:rol/:area',validarToken,listarMuestrasArea);

route.put('/registrarResultado/:id_resultado',validarToken,registrarResultado);


route.put('/registrarResulatadosAutomaticos',validarToken,registrarResulatadosAutomaticos);

route.put('/finzalizarAnalisis/:id_examen',validarToken,finzalizarAnalisis);




route.get('/tipo_resultadoId/:id_parametro',validarToken,listarParametrosId);







export default route;