import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
        listarExamenesPorArea,
        registrarResulatadosAutomaticos,
        finzalizarResultados,
        listarParametrosExamen,
        cambiarEstadoResultado,
        registrarAnalisisCompletosArchivo,
        registrarFormularioAutomaticos,
        cargarImagen,
        registrarResultadoLaboratorio
        } from "../controllers/controller.resultado.js";

const route = Router();

route.get('/listarExamenesPorArea',validarToken,listarExamenesPorArea);




route.put('/registrarResulatadosAutomaticos',validarToken,registrarResulatadosAutomaticos);

route.put('/registrarAnalisisCompletosArchivo',validarToken,registrarAnalisisCompletosArchivo);



route.get('/listarParametrosExamen/:id_examen',validarToken,listarParametrosExamen);


route.put('/finzalizarResultados/:id_examen',validarToken,finzalizarResultados);


route.put('/cambiarEstadoResultado/:id_resultado/:estado',validarToken,cambiarEstadoResultado);

route.put('/registrarFormularioAutomaticos',validarToken,registrarFormularioAutomaticos);

route.put('/registrarResultadoLaboratorio/:id_examen',cargarImagen,registrarResultadoLaboratorio);



export default route;