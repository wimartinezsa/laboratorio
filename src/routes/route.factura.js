import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {listarFacturas,
        listarFacturasContratos,
        registrarFactura,
        listarServiciosContrato,
        listarProcedimientoContratados,
        emitirFactura,
        generarFactura,
        anularFactura,
        buscarFactura,
        actualizarFactura
        } 
        from "../controllers/controller.factura.js";

const route = Router();

route.get('/factura',validarToken,listarFacturas);

route.get('/facturaContrato/:id_contrato',validarToken,listarFacturasContratos);
route.post('/factura',validarToken,registrarFactura);

route.get('/servicioContrato/:id_contrato',validarToken,listarServiciosContrato);

route.get('/procedimientosContratados/:id_servicio/:id_contrato',validarToken,listarProcedimientoContratados);

route.put('/emitirFactura/:id_factura',validarToken,emitirFactura);

route.get('/generarFactura/:id_factura',validarToken,generarFactura);

route.put('/anularFactura/:id_factura',validarToken,anularFactura);



route.get('/buscarFactura/:id_factura',validarToken,buscarFactura);

route.put('/actualizarFactura/:id_factura',validarToken,actualizarFactura);



export default route;