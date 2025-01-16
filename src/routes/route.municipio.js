import { Router } from "express";
import {listarMunicipios,
    listarMunicipiosDepartementoId
} from "../controllers/controller.municipio.js";

const route = Router();

route.get('/municipio',listarMunicipios);

route.get('/municipiosDepartamento/:id_departamento',listarMunicipiosDepartementoId);



export default route;