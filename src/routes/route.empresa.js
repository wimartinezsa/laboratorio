import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {listarEmpresas,
        registrarEmpresa,
        actualizarEmpresaId,
        desactivarEmpresaId,
        buscarEmpresaId,
        listarEmpresasActivas} from "../controllers/controller.empresa.js";

const route = Router();

route.get('/empresa',validarToken,listarEmpresas);
route.get('/empresaActivas',validarToken,listarEmpresasActivas);
route.post('/empresa',validarToken,registrarEmpresa);
route.put('/empresa/:id_empresa',validarToken,actualizarEmpresaId);
route.delete('/empresa/:id_empresa',validarToken,desactivarEmpresaId);
route.get('/empresa/:id_empresa',validarToken,buscarEmpresaId);


export default route;