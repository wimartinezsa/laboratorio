-- CreateEnum
CREATE TYPE "Tipo_Ident" AS ENUM ('CC', 'CE', 'CD', 'PA', 'SC', 'PE', 'RC', 'TI', 'CN', 'AS', 'MS');

-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('H', 'I', 'M');

-- CreateEnum
CREATE TYPE "Tipo_Paciente" AS ENUM ('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13');

-- CreateEnum
CREATE TYPE "Zona" AS ENUM ('01', '02');

-- CreateEnum
CREATE TYPE "Incapacidad" AS ENUM ('SI', 'NO');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('Activo', 'Inactivo');

-- CreateEnum
CREATE TYPE "Estado_Factura" AS ENUM ('Pendiente_Emision', 'Factura_Emitida', 'Pendiente_Pago', 'Pagado', 'Anulado');

-- CreateEnum
CREATE TYPE "Via_Ingreso" AS ENUM ('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14');

-- CreateEnum
CREATE TYPE "Estado_Examen" AS ENUM ('Solicitado', 'En_Toma_de_Muestra', 'Muestra_Recibida', 'En_Proceso_de_Analisis', 'Analisis_Completo', 'Resultados_Listos', 'Resultados_Entregados');

-- CreateEnum
CREATE TYPE "Estado_Resultado" AS ENUM ('Pendiente', 'Finalizado');

-- CreateEnum
CREATE TYPE "Modalidad_Atencion" AS ENUM ('01', '02', '03', '04', '06', '07', '08', '09');

-- CreateEnum
CREATE TYPE "Grupo_Servicio" AS ENUM ('01', '02', '03', '04', '05');

-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('Administrador', 'Facturacion', 'Bacteriologo', 'Auxiliar');

-- CreateEnum
CREATE TYPE "Tipo_Empresa" AS ENUM ('Particular', 'Empresa', 'Eps', 'Esess');

-- CreateTable
CREATE TABLE "Pacientes" (
    "id_paciente" SERIAL NOT NULL,
    "tipo_identificacion" "Tipo_Ident" NOT NULL,
    "identificacion" VARCHAR(30) NOT NULL,
    "nombres" VARCHAR(50) NOT NULL,
    "fecha_nacimiento" DATE,
    "sexo" "Genero" NOT NULL,
    "email" TEXT,
    "telefono" TEXT,
    "direccion" VARCHAR(50),
    "estado" "Estado" NOT NULL DEFAULT 'Activo',
    "tipo_paciente" "Tipo_Paciente" NOT NULL,
    "incapacidad" "Incapacidad" NOT NULL DEFAULT 'NO',
    "zona" "Zona",
    "paisId" INTEGER,
    "municipioId" INTEGER,
    "epsId" INTEGER,

    CONSTRAINT "Pacientes_pkey" PRIMARY KEY ("id_paciente")
);

-- CreateTable
CREATE TABLE "eps" (
    "id_eps" SERIAL NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "eps_pkey" PRIMARY KEY ("id_eps")
);

-- CreateTable
CREATE TABLE "Tipo_Servicio" (
    "id_tipo_servicio" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "Tipo_Servicio_pkey" PRIMARY KEY ("id_tipo_servicio")
);

-- CreateTable
CREATE TABLE "facturas" (
    "id_factura" SERIAL NOT NULL,
    "autorizacion" VARCHAR(30),
    "via_ingreso" "Via_Ingreso" NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "estado" "Estado_Factura" NOT NULL DEFAULT 'Pendiente_Emision',
    "contratoId" INTEGER NOT NULL,
    "pacienteId" INTEGER NOT NULL,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id_factura")
);

-- CreateTable
CREATE TABLE "resultados" (
    "id_resultado" SERIAL NOT NULL,
    "resultado" VARCHAR(200),
    "estado" "Estado_Resultado" NOT NULL,
    "examenId" INTEGER NOT NULL,
    "parametroId" INTEGER NOT NULL,

    CONSTRAINT "resultados_pkey" PRIMARY KEY ("id_resultado")
);

-- CreateTable
CREATE TABLE "examenes" (
    "id_examen" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "fecha_muestra" TIMESTAMP(3),
    "fecha_analisis" TIMESTAMP(3),
    "fecha_resultado" TIMESTAMP(3),
    "estado" "Estado_Examen" NOT NULL DEFAULT 'Solicitado',
    "observacion" VARCHAR(200),
    "procedimientoId" INTEGER NOT NULL,
    "facturaId" INTEGER NOT NULL,

    CONSTRAINT "examenes_pkey" PRIMARY KEY ("id_examen")
);

-- CreateTable
CREATE TABLE "paises" (
    "id_pais" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "paises_pkey" PRIMARY KEY ("id_pais")
);

-- CreateTable
CREATE TABLE "departamentos" (
    "id_departamento" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "departamentos_pkey" PRIMARY KEY ("id_departamento")
);

-- CreateTable
CREATE TABLE "Municipios" (
    "id_municipio" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "departamentoId" INTEGER NOT NULL,

    CONSTRAINT "Municipios_pkey" PRIMARY KEY ("id_municipio")
);

-- CreateTable
CREATE TABLE "Servicios" (
    "id_servicio" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',
    "grupo_servicio" "Grupo_Servicio" NOT NULL,
    "modalidad_atencion" "Modalidad_Atencion" NOT NULL,
    "prestadorId" INTEGER NOT NULL,
    "tipo_servicioId" INTEGER NOT NULL,

    CONSTRAINT "Servicios_pkey" PRIMARY KEY ("id_servicio")
);

-- CreateTable
CREATE TABLE "finalidad" (
    "id_finalidad" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "finalidad_pkey" PRIMARY KEY ("id_finalidad")
);

-- CreateTable
CREATE TABLE "cups" (
    "id_cups" SERIAL NOT NULL,
    "codigo" VARCHAR(30) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(100) NOT NULL,

    CONSTRAINT "cups_pkey" PRIMARY KEY ("id_cups")
);

-- CreateTable
CREATE TABLE "Tipo_Resultados" (
    "id_tipo_resultado" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "parametroId" INTEGER NOT NULL,

    CONSTRAINT "Tipo_Resultados_pkey" PRIMARY KEY ("id_tipo_resultado")
);

-- CreateTable
CREATE TABLE "Parametros" (
    "id_parametro" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "metodo" VARCHAR(30) NOT NULL,
    "unidad" VARCHAR(30),
    "valor_referencia" VARCHAR(300),
    "procedimientoId" INTEGER NOT NULL,

    CONSTRAINT "Parametros_pkey" PRIMARY KEY ("id_parametro")
);

-- CreateTable
CREATE TABLE "procedimientos" (
    "id_procedimiento" SERIAL NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',
    "tecnica" VARCHAR(50),
    "servicioId" INTEGER NOT NULL,
    "finalidadId" INTEGER NOT NULL,
    "cupsId" INTEGER NOT NULL,
    "areaId" INTEGER,

    CONSTRAINT "procedimientos_pkey" PRIMARY KEY ("id_procedimiento")
);

-- CreateTable
CREATE TABLE "areas" (
    "id_area" SERIAL NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,
    "prestadorId" INTEGER,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id_area")
);

-- CreateTable
CREATE TABLE "Prestadores" (
    "id_prestador" SERIAL NOT NULL,
    "codigo" VARCHAR(12) NOT NULL,
    "nit" VARCHAR(30) NOT NULL,
    "razon_social" VARCHAR(50) NOT NULL,

    CONSTRAINT "Prestadores_pkey" PRIMARY KEY ("id_prestador")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "tipo_identificacion" "Tipo_Ident" NOT NULL,
    "identificacion" VARCHAR(30) NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,
    "cargo" VARCHAR(50) NOT NULL,
    "firma" VARCHAR(100),
    "rol" "Rol" NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',
    "token" VARCHAR(500),
    "areaId" INTEGER NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Empresas" (
    "id_empresa" SERIAL NOT NULL,
    "nit" VARCHAR(530) NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "sigla" VARCHAR(50) NOT NULL,
    "tipo" "Tipo_Empresa" NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',
    "municipioId" INTEGER NOT NULL,

    CONSTRAINT "Empresas_pkey" PRIMARY KEY ("id_empresa")
);

-- CreateTable
CREATE TABLE "Contratos" (
    "id_contrato" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "Contratos_pkey" PRIMARY KEY ("id_contrato")
);

-- CreateTable
CREATE TABLE "Acuerdos" (
    "id_acuerdo" SERIAL NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',
    "precio" DECIMAL(10,2) NOT NULL,
    "iva" DECIMAL(10,2) NOT NULL,
    "procedimientoId" INTEGER NOT NULL,
    "contratoId" INTEGER NOT NULL,

    CONSTRAINT "Acuerdos_pkey" PRIMARY KEY ("id_acuerdo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pacientes_identificacion_key" ON "Pacientes"("identificacion");

-- CreateIndex
CREATE UNIQUE INDEX "Pacientes_email_key" ON "Pacientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "resultados_examenId_parametroId_key" ON "resultados"("examenId", "parametroId");

-- CreateIndex
CREATE UNIQUE INDEX "Prestadores_codigo_key" ON "Prestadores"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_identificacion_key" ON "usuarios"("identificacion");

-- CreateIndex
CREATE UNIQUE INDEX "Empresas_nit_key" ON "Empresas"("nit");

-- AddForeignKey
ALTER TABLE "Pacientes" ADD CONSTRAINT "Pacientes_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "paises"("id_pais") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pacientes" ADD CONSTRAINT "Pacientes_municipioId_fkey" FOREIGN KEY ("municipioId") REFERENCES "Municipios"("id_municipio") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pacientes" ADD CONSTRAINT "Pacientes_epsId_fkey" FOREIGN KEY ("epsId") REFERENCES "eps"("id_eps") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contratos"("id_contrato") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Pacientes"("id_paciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resultados" ADD CONSTRAINT "resultados_examenId_fkey" FOREIGN KEY ("examenId") REFERENCES "examenes"("id_examen") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resultados" ADD CONSTRAINT "resultados_parametroId_fkey" FOREIGN KEY ("parametroId") REFERENCES "Parametros"("id_parametro") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examenes" ADD CONSTRAINT "examenes_procedimientoId_fkey" FOREIGN KEY ("procedimientoId") REFERENCES "procedimientos"("id_procedimiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examenes" ADD CONSTRAINT "examenes_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "facturas"("id_factura") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departamentos" ADD CONSTRAINT "departamentos_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "paises"("id_pais") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipios" ADD CONSTRAINT "Municipios_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "departamentos"("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servicios" ADD CONSTRAINT "Servicios_prestadorId_fkey" FOREIGN KEY ("prestadorId") REFERENCES "Prestadores"("id_prestador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servicios" ADD CONSTRAINT "Servicios_tipo_servicioId_fkey" FOREIGN KEY ("tipo_servicioId") REFERENCES "Tipo_Servicio"("id_tipo_servicio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tipo_Resultados" ADD CONSTRAINT "Tipo_Resultados_parametroId_fkey" FOREIGN KEY ("parametroId") REFERENCES "Parametros"("id_parametro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parametros" ADD CONSTRAINT "Parametros_procedimientoId_fkey" FOREIGN KEY ("procedimientoId") REFERENCES "procedimientos"("id_procedimiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedimientos" ADD CONSTRAINT "procedimientos_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "Servicios"("id_servicio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedimientos" ADD CONSTRAINT "procedimientos_finalidadId_fkey" FOREIGN KEY ("finalidadId") REFERENCES "finalidad"("id_finalidad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedimientos" ADD CONSTRAINT "procedimientos_cupsId_fkey" FOREIGN KEY ("cupsId") REFERENCES "cups"("id_cups") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedimientos" ADD CONSTRAINT "procedimientos_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id_area") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "areas" ADD CONSTRAINT "areas_prestadorId_fkey" FOREIGN KEY ("prestadorId") REFERENCES "Prestadores"("id_prestador") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id_area") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresas" ADD CONSTRAINT "Empresas_municipioId_fkey" FOREIGN KEY ("municipioId") REFERENCES "Municipios"("id_municipio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contratos" ADD CONSTRAINT "Contratos_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresas"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acuerdos" ADD CONSTRAINT "Acuerdos_procedimientoId_fkey" FOREIGN KEY ("procedimientoId") REFERENCES "procedimientos"("id_procedimiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acuerdos" ADD CONSTRAINT "Acuerdos_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contratos"("id_contrato") ON DELETE RESTRICT ON UPDATE CASCADE;
