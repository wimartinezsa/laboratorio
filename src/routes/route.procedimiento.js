import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {listarProcedimientos,
        registrarProcedimiento,
        actualizarProcedimientoId,
        estadoProcedimientoId,
        buscarProcedimientoId,
        procedimientoServicioId,
        procedimientoActivoServicioId,
        registrarParametro,
        listarParametroId,
        eliminarParametro,
        listarAreas,
        registrarTipoResultado,
        eliminarTipoResultado,
        listarTipoParametro
        } 
        from "../controllers/controller.procedimiento.js";

const route = Router();

route.get('/procedimiento',validarToken,listarProcedimientos);
route.post('/procedimiento',validarToken,registrarProcedimiento);
route.put('/procedimiento/:id_procedimiento',validarToken,actualizarProcedimientoId);
route.delete('/procedimiento/:id_procedimiento',validarToken,estadoProcedimientoId);
route.get('/procedimiento/:id_procedimiento',validarToken,buscarProcedimientoId);
route.get('/procedimientoServicioId/:id_servicio',validarToken,procedimientoServicioId);
route.get('/procedimientoActivoServicioId',validarToken,procedimientoActivoServicioId);


route.post('/parametro',validarToken,registrarParametro);
route.get('/parametro/:id_procedimiento',validarToken,listarParametroId);
route.delete('/parametro/:id_parametro',validarToken,eliminarParametro);


route.post('/tipo_resultado',validarToken,registrarTipoResultado);


route.delete('/tipo_resultado/:id_tipo_resultado',validarToken,eliminarTipoResultado);

route.get('/area',listarAreas);

route.get('/listarTipoParametro',listarTipoParametro);




export default route;