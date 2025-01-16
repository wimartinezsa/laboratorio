import { Router } from "express";
import {listarFinalidad} from "../controllers/controller.finalidad.js";

const route = Router();

route.get('/finalidad',listarFinalidad);


export default route;