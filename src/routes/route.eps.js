import { Router } from "express";
import {listarEps,
        registrarEps,
        actualizarEpsId,
        desactivarEpsId,
        buscarEpsId
        } 
        from "../controllers/controller.eps.js";

const route = Router();

route.get('/eps',listarEps);
route.post('/eps',registrarEps);
route.put('/eps/:id_eps',actualizarEpsId);
route.delete('/eps/:id_eps',desactivarEpsId);
route.get('/eps/:id_eps',buscarEpsId);


export default route;