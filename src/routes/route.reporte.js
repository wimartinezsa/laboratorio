import { Router } from "express";
import {
            reporteUsuariosAtendidos,
            listarSedes,
            reporteAtendidosFechas
        } 
        from "../controllers/controller.reporte.js";

const route = Router();

route.get('/reporteUsuariosAtendidos/:fecha_inicio/:fecha_fin/:empresa/:sede',reporteUsuariosAtendidos);
route.get('/reporteAtendidosFechas/:fecha_inicio/:fecha_fin',reporteAtendidosFechas);

route.get('/listarSedes',listarSedes);




export default route;