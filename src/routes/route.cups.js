import { Router } from "express";
import {
        listarCups
        } 
        from "../controllers/controller.cups.js";

const route = Router();

route.get('/cups',listarCups);


export default route;