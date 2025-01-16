import express from "express";
import cors from "cors";
import body_parser from 'body-parser'

import path from 'path';
import { fileURLToPath } from 'url';


import { swaggerUi, swaggerSetup }  from "./src/views/swagger.js"
import vistas from './src/routes/route.vistas.js'
import paciente from './src/routes/route.paciente.js'
import tipo_servicio from './src/routes/route.tipo.servicio.js'
import servicio from './src/routes/route.servicio.js'
import empresa from './src/routes/route.empresa.js'
import municipio from './src/routes/route.municipio.js'
import departamento from './src/routes/route.departamento.js'
import contrato from './src/routes/route.contrato.js'
import prestador from './src/routes/route.prestador.js'
import eps from './src/routes/route.eps.js'
import cups from './src/routes/route.cups.js'
import procedimiento from './src/routes/route.procedimiento.js'
import acuerdo from './src/routes/route.acuerdo.js'
import usuario from './src/routes/route.usuario.js'
import finalidad from './src/routes/route.finalidad.js'
import factura from './src/routes/route.factura.js'
import pais from './src/routes/route.pais.js'
import examen from './src/routes/route.examen.js'
import muestra from './src/routes/route.muestra.js'
import analisis from './src/routes/route.analisis.js'
import resultado from './src/routes/route.resultado.js'
import laboratorio from './src/routes/route.laboratorio.js'
import estadistica from './src/routes/route.estadistica.js'

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());



console.log("DATABASE_URL:", process.env.DATABASE_URL);



//Configuración del motor de plantilla ejs
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))


app.use('/api-docs', swaggerUi.serve,swaggerSetup);
app.use(vistas);
app.use(paciente);
app.use(tipo_servicio);
app.use(servicio);
app.use(empresa);
app.use(municipio);
app.use(departamento);
app.use(contrato);
app.use(prestador);
app.use(eps);
app.use(cups);
app.use(procedimiento);
app.use(acuerdo);
app.use(usuario);
app.use(finalidad);
app.use(factura);
app.use(pais);
app.use(examen);
app.use(muestra);
app.use(analisis);
app.use(resultado);
app.use(laboratorio);
app.use(estadistica);

 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});