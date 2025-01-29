import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
        listarExamenesPorArea,
        //registrarResultado,
        registrarResulatadosAutomaticos,
       // finzalizarAnalisis,
       listarParametrosExamen
        
        
        } from "../controllers/controller.resultado.js";

const route = Router();

route.get('/listarExamenesPorArea/:rol/:area',validarToken,listarExamenesPorArea);




route.put('/registrarResulatadosAutomaticos',validarToken,registrarResulatadosAutomaticos);

route.get('/listarParametrosExamen/:id_examen',validarToken,listarParametrosExamen);

//route.put('/registrarResultado/:id_resultado',validarToken,registrarResultado);
//route.put('/finzalizarAnalisis/:id_examen',validarToken,finzalizarAnalisis);




//route.get('/tipo_resultadoId/:id_parametro',validarToken,listarParametrosId);







export default route;