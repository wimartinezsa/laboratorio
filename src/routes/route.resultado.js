import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
        listarExamenesPorArea,
        registrarResulatadosAutomaticos,
        finzalizarResultados,
        listarParametrosExamen,
        cambiarEstadoResultado
        
        
        } from "../controllers/controller.resultado.js";

const route = Router();

route.get('/listarExamenesPorArea',validarToken,listarExamenesPorArea);




route.put('/registrarResulatadosAutomaticos',validarToken,registrarResulatadosAutomaticos);

route.get('/listarParametrosExamen/:id_examen',validarToken,listarParametrosExamen);


route.put('/finzalizarResultados/:id_examen',validarToken,finzalizarResultados);


route.put('/cambiarEstadoResultado/:id_resultado/:estado',validarToken,cambiarEstadoResultado);










export default route;