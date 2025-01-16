import { Router } from "express";
import {buscarPrestadorId} from "../controllers/controller.prestador.js";

const route = Router();


route.get('/prestador/:id_prestador',buscarPrestadorId);


export default route;