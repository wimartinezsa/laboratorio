import { Router } from "express";
import {listarPaises} from "../controllers/controller.pais.js";

const route = Router();

route.get('/pais',listarPaises);


export default route;