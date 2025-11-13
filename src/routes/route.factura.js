import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
        listarFacturasContratos,
        listarServiciosContrato,
        listarProcedimientoContratados,
        emitirFactura,
        generarFactura,
        buscarFactura,
        imprimirFactura
        } 
        from "../controllers/controller.factura.js";

const route = Router();

route.get('/buscarFactura/:id_factura',validarToken,buscarFactura);

route.get('/facturaContrato/:id_contrato',validarToken,listarFacturasContratos);


route.get('/servicioContrato/:id_contrato',validarToken,listarServiciosContrato);

route.get('/procedimientosContratados/:id_contrato',validarToken,listarProcedimientoContratados);


route.get('/generarFactura/:id_contrato/:id_paciente',validarToken,generarFactura);

route.put('/emitirFactura/:id_factura',validarToken,emitirFactura);

route.get('/imprimirFactura/:id_factura',validarToken,imprimirFactura);







export default route;