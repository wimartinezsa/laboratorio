import { Router } from "express";
import {listarAcuerdos,
        registrarAcuerdo,
        actualizarAcuerdoId,
        activarAcuerdoId,
        buscarAcuerdoId
        } 
        from "../controllers/controller.acuerdo.js";

const route = Router();

route.get('/acuerdo/:id_contrato',listarAcuerdos);
route.get('/busar_acuerdo/:id_acuerdo',buscarAcuerdoId);
route.post('/acuerdo',registrarAcuerdo);
route.put('/acuerdo/:id_acuerdo',actualizarAcuerdoId);
route.delete('/acuerdo/:id_acuerdo',activarAcuerdoId);



export default route;