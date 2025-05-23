import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
        cantidadPacientes,
        cantidadEmpresas,
        cantidadContratos,
        examenesTomaMuestra,
        examenesProcesoAnalisis,
        examenesResultadosListos,
        examenesResultadosEntregados,
        cantidadExamenesPorDiaEmpresa,
        cantidadPacientesPorDiaEmpresa
        } from "../controllers/controller.estadistica.js";

const route = Router();

route.get('/cantidadPacientes',cantidadPacientes);
route.get('/cantidadEmpresas',cantidadEmpresas);
route.get('/cantidadContratos',cantidadContratos);
route.get('/cantidadExamenesPorDiaEmpresa',cantidadExamenesPorDiaEmpresa);
route.get('/cantidadPacientesPorDiaEmpresa',cantidadPacientesPorDiaEmpresa);



route.get('/examenesTomaMuestra',examenesTomaMuestra);
route.get('/examenesProcesoAnalisis',examenesProcesoAnalisis);
route.get('/examenesResultadosListos',examenesResultadosListos);
route.get('/examenesResultadosEntregados',examenesResultadosEntregados);





export default route;