import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {listarCuentasPendientePago,
        listarContratosActivos,
        registrarCuentaCobro,
        listarCuentasCobradas,
        listarCuentasPagadas,
        registrarCuentaPagada
} from "../controllers/controller.cuenta_cobro.js";

const route = Router();

route.get('/listarCuentasPendientePago/:id_contrato/:fecha_inicio/:fecha_fin',validarToken,listarCuentasPendientePago);

route.get('/listarCuentasCobradas/:id_contrato/:fecha_inicio/:fecha_fin',validarToken,listarCuentasCobradas);

route.get('/listarCuentasPagadas/:id_contrato/:fecha_inicio/:fecha_fin',validarToken,listarCuentasPagadas);



route.get('/listarContratosActivos',validarToken,listarContratosActivos);
route.put('/registrarCuentaCobro',validarToken,registrarCuentaCobro);

route.put('/registrarCuentaPagada',validarToken,registrarCuentaPagada);


export default route;