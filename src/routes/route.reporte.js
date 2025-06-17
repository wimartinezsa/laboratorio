import { Router } from "express";
import {
            reporteUsuariosAtendidos
        } 
        from "../controllers/controller.reporte.js";

const route = Router();

route.get('/reporteUsuariosAtendidos/:fecha_inicio/:fecha_fin',reporteUsuariosAtendidos);




export default route;