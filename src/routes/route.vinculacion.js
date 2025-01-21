import { Router } from "express";
import {
        registrarVinculacion,
        listarVinculacion,
        eliminarVinculacion
        } 
        from "../controllers/controller.vinculacion.js";

const route = Router();


route.get('/vinculacion/:id_usuario',listarVinculacion);
route.post('/vinculacion',registrarVinculacion);
route.delete('/vinculacion/:id_vinculacion',eliminarVinculacion);




export default route;