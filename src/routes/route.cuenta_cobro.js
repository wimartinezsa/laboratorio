import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {listarCuentasPorCobrar} from "../controllers/controller.cuenta_cobro.js";

const route = Router();

route.get('/cuentaPorCobrar',validarToken,listarCuentasPorCobrar);



export default route;