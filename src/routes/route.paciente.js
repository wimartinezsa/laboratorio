import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {listarPacientes,registrarPaciente,actualizarPacienteId,desactivarPacienteId,buscarPacienteId,buscarPacienteIdent} from "../controllers/controller.paciente.js";

const route = Router();

route.get('/paciente',validarToken,listarPacientes);
route.post('/paciente',validarToken,registrarPaciente);
route.put('/paciente/:id_paciente',validarToken,actualizarPacienteId);
route.delete('/paciente/:id_paciente',validarToken,desactivarPacienteId);
route.get('/paciente/:id_paciente',validarToken,buscarPacienteId);

route.get('/pacienteIdent/:identificacion',validarToken,buscarPacienteIdent);



export default route;