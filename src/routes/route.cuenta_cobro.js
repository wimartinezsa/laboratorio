import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {listarCuentasPendientePago,
        listarContratosActivos,
        registrarCuentaCobro,
        listarCuentasCobradas
} from "../controllers/controller.cuenta_cobro.js";

const route = Router();

route.get('/listarCuentasPendientePago/:id_contrato/:fecha_inicio/:fecha_fin',validarToken,listarCuentasPendientePago);

route.get('/listarCuentasCobradas/:id_contrato/:fecha_inicio/:fecha_fin',validarToken,listarCuentasCobradas);




route.get('/listarContratosActivos',validarToken,listarContratosActivos);
route.put('/registrarCuentaCobro',validarToken,registrarCuentaCobro);



export default route;