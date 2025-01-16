import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {listarContratos,
        listarContratosActivos,
        registrarContrato,
        actualizarContratoId,
        activarContrato,
        buscarContratoId
        } 
        from "../controllers/controller.contrato.js";

const route = Router();

route.get('/contrato',validarToken,listarContratos);

route.get('/contratosActivos/:id_empresa',validarToken,listarContratosActivos);

route.post('/contrato',validarToken,registrarContrato);
route.put('/contrato/:id_contrato',validarToken,actualizarContratoId);
route.delete('/contrato/:id_contrato',validarToken,activarContrato);
route.get('/contrato/:id_contrato',validarToken,buscarContratoId);



export default route;