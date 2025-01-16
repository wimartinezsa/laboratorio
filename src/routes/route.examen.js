
import { Router } from "express";
import {validarToken} from "../middlewares/authentication.js";
import {
    agregarExamenesFactura,
    listarExamenesFactura,
    eliminarExamenFactura,
    cambiarEstadoExamen

} from "../controllers/controller.examen.js";

const route = Router();


route.post('/examen',validarToken,agregarExamenesFactura);

route.get('/examenFactura/:id_factura',validarToken,listarExamenesFactura);

route.delete('/examenFactura/:id_examen',validarToken,eliminarExamenFactura);

route.put('/cambiarEstadoExamen/:id_examen',validarToken,cambiarEstadoExamen);


export default route;