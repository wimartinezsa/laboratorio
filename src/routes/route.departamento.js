import { Router } from "express";
import {listarDepartamentos} from "../controllers/controller.departamento.js";

const route = Router();

route.get('/departamento/:id_pais',listarDepartamentos);


export default route;