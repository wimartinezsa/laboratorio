

import { Router } from "express";

const route = Router();




route.get('/',(req,resp)=>{
    
    resp.render("pages/login.ejs");
});

route.get('/home',(req,resp)=>{
    resp.render("pages/home.ejs");
});

route.get('/pacientes',(req,resp)=>{
    resp.render("pages/pacientes.ejs");
});


route.get('/empresas',(req,resp)=>{
    resp.render("pages/empresas.ejs");
});


route.get('/servicios',(req,resp)=>{
    resp.render("pages/servicios.ejs");
});

route.get('/Examenes',(req,resp)=>{
    resp.render("pages/procedimientos.ejs");
});

route.get('/contratos',(req,resp)=>{
    resp.render("pages/contratos.ejs");
});

route.get('/facturas',(req,resp)=>{
    resp.render("pages/facturas.ejs");
});


route.get('/muestras',(req,resp)=>{
    resp.render("pages/muestras.ejs");
});

route.get('/analisis',(req,resp)=>{
    resp.render("pages/analisis.ejs");
});

route.get('/resultados',(req,resp)=>{
    resp.render("pages/resultados.ejs");
});

route.get('/laboratorios',(req,resp)=>{
    resp.render("pages/laboratorio.ejs");
});


route.get('/usuarios',(req,resp)=>{
    resp.render("pages/usuarios.ejs");
});


export default route;