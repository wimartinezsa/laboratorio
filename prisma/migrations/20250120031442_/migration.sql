/*
  Warnings:

  - You are about to drop the `Acuerdos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Areas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contratos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Departamentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Empresas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Examenes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Facturas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Municipios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pacientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Paises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parametros` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prestadores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Procedimientos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resultados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Servicios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tipo_Resultados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Acuerdos` DROP FOREIGN KEY `Acuerdos_contratoId_fkey`;

-- DropForeignKey
ALTER TABLE `Acuerdos` DROP FOREIGN KEY `Acuerdos_procedimientoId_fkey`;

-- DropForeignKey
ALTER TABLE `Areas` DROP FOREIGN KEY `Areas_prestadorId_fkey`;

-- DropForeignKey
ALTER TABLE `Contratos` DROP FOREIGN KEY `Contratos_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `Departamentos` DROP FOREIGN KEY `Departamentos_paisId_fkey`;

-- DropForeignKey
ALTER TABLE `Empresas` DROP FOREIGN KEY `Empresas_municipioId_fkey`;

-- DropForeignKey
ALTER TABLE `Examenes` DROP FOREIGN KEY `Examenes_facturaId_fkey`;

-- DropForeignKey
ALTER TABLE `Examenes` DROP FOREIGN KEY `Examenes_procedimientoId_fkey`;

-- DropForeignKey
ALTER TABLE `Facturas` DROP FOREIGN KEY `Facturas_contratoId_fkey`;

-- DropForeignKey
ALTER TABLE `Facturas` DROP FOREIGN KEY `Facturas_pacienteId_fkey`;

-- DropForeignKey
ALTER TABLE `Municipios` DROP FOREIGN KEY `Municipios_departamentoId_fkey`;

-- DropForeignKey
ALTER TABLE `Pacientes` DROP FOREIGN KEY `Pacientes_epsId_fkey`;

-- DropForeignKey
ALTER TABLE `Pacientes` DROP FOREIGN KEY `Pacientes_municipioId_fkey`;

-- DropForeignKey
ALTER TABLE `Pacientes` DROP FOREIGN KEY `Pacientes_paisId_fkey`;

-- DropForeignKey
ALTER TABLE `Parametros` DROP FOREIGN KEY `Parametros_procedimientoId_fkey`;

-- DropForeignKey
ALTER TABLE `Procedimientos` DROP FOREIGN KEY `Procedimientos_areaId_fkey`;

-- DropForeignKey
ALTER TABLE `Procedimientos` DROP FOREIGN KEY `Procedimientos_cupsId_fkey`;

-- DropForeignKey
ALTER TABLE `Procedimientos` DROP FOREIGN KEY `Procedimientos_finalidadId_fkey`;

-- DropForeignKey
ALTER TABLE `Procedimientos` DROP FOREIGN KEY `Procedimientos_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `Resultados` DROP FOREIGN KEY `Resultados_examenId_fkey`;

-- DropForeignKey
ALTER TABLE `Resultados` DROP FOREIGN KEY `Resultados_parametroId_fkey`;

-- DropForeignKey
ALTER TABLE `Servicios` DROP FOREIGN KEY `Servicios_prestadorId_fkey`;

-- DropForeignKey
ALTER TABLE `Servicios` DROP FOREIGN KEY `Servicios_tipo_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `Tipo_Resultados` DROP FOREIGN KEY `Tipo_Resultados_parametroId_fkey`;

-- DropForeignKey
ALTER TABLE `Usuarios` DROP FOREIGN KEY `Usuarios_areaId_fkey`;

-- DropTable
DROP TABLE `Acuerdos`;

-- DropTable
DROP TABLE `Areas`;

-- DropTable
DROP TABLE `Contratos`;

-- DropTable
DROP TABLE `Departamentos`;

-- DropTable
DROP TABLE `Empresas`;

-- DropTable
DROP TABLE `Examenes`;

-- DropTable
DROP TABLE `Facturas`;

-- DropTable
DROP TABLE `Municipios`;

-- DropTable
DROP TABLE `Pacientes`;

-- DropTable
DROP TABLE `Paises`;

-- DropTable
DROP TABLE `Parametros`;

-- DropTable
DROP TABLE `Prestadores`;

-- DropTable
DROP TABLE `Procedimientos`;

-- DropTable
DROP TABLE `Resultados`;

-- DropTable
DROP TABLE `Servicios`;

-- DropTable
DROP TABLE `Tipo_Resultados`;

-- DropTable
DROP TABLE `Usuarios`;

-- CreateTable
CREATE TABLE `Paciente` (
    `id_paciente` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_identificacion` ENUM('CC', 'CE', 'CD', 'PA', 'SC', 'PE', 'RC', 'TI', 'CN', 'AS', 'MS') NOT NULL,
    `identificacion` VARCHAR(30) NOT NULL,
    `nombres` VARCHAR(50) NOT NULL,
    `fecha_nacimiento` DATE NULL,
    `sexo` ENUM('H', 'I', 'M') NOT NULL,
    `email` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NULL,
    `direccion` VARCHAR(50) NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `tipo_paciente` ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13') NOT NULL,
    `incapacidad` ENUM('SI', 'NO') NOT NULL DEFAULT 'NO',
    `zona` ENUM('01', '02') NULL,
    `paisId` INTEGER NULL,
    `municipioId` INTEGER NULL,
    `epsId` INTEGER NULL,

    UNIQUE INDEX `Paciente_identificacion_key`(`identificacion`),
    UNIQUE INDEX `Paciente_email_key`(`email`),
    PRIMARY KEY (`id_paciente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Factura` (
    `id_factura` INTEGER NOT NULL AUTO_INCREMENT,
    `autorizacion` VARCHAR(30) NULL,
    `via_ingreso` ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14') NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `estado` ENUM('Pendiente_Emision', 'Factura_Emitida', 'Pendiente_Pago', 'Pagado', 'Anulado') NOT NULL DEFAULT 'Pendiente_Emision',
    `contratoId` INTEGER NOT NULL,
    `pacienteId` INTEGER NOT NULL,

    PRIMARY KEY (`id_factura`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resultado` (
    `id_resultado` INTEGER NOT NULL AUTO_INCREMENT,
    `resultado` VARCHAR(200) NULL,
    `estado` ENUM('Pendiente', 'Finalizado') NOT NULL,
    `examenId` INTEGER NOT NULL,
    `parametroId` INTEGER NOT NULL,

    UNIQUE INDEX `Resultado_examenId_parametroId_key`(`examenId`, `parametroId`),
    PRIMARY KEY (`id_resultado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Examen` (
    `id_examen` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `fecha_muestra` DATETIME(3) NULL,
    `fecha_analisis` DATETIME(3) NULL,
    `fecha_resultado` DATETIME(3) NULL,
    `estado` ENUM('Solicitado', 'En_Toma_de_Muestra', 'Muestra_Recibida', 'En_Proceso_de_Analisis', 'Analisis_Completo', 'Resultados_Listos', 'Resultados_Entregados') NOT NULL DEFAULT 'Solicitado',
    `observacion` VARCHAR(200) NULL,
    `procedimientoId` INTEGER NOT NULL,
    `facturaId` INTEGER NOT NULL,

    PRIMARY KEY (`id_examen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pais` (
    `id_pais` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_pais`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departamento` (
    `id_departamento` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `paisId` INTEGER NOT NULL,

    PRIMARY KEY (`id_departamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipio` (
    `id_municipio` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `departamentoId` INTEGER NOT NULL,

    PRIMARY KEY (`id_municipio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servicio` (
    `id_servicio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `grupo_servicio` ENUM('01', '02', '03', '04', '05') NOT NULL,
    `modalidad_atencion` ENUM('01', '02', '03', '04', '06', '07', '08', '09') NOT NULL,
    `prestadorId` INTEGER NOT NULL,
    `tipo_servicioId` INTEGER NOT NULL,

    PRIMARY KEY (`id_servicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tipo_Resultado` (
    `id_tipo_resultado` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `parametroId` INTEGER NOT NULL,

    PRIMARY KEY (`id_tipo_resultado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parametro` (
    `id_parametro` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `metodo` VARCHAR(30) NOT NULL,
    `unidad` VARCHAR(30) NULL,
    `valor_referencia` VARCHAR(300) NULL,
    `procedimientoId` INTEGER NOT NULL,

    PRIMARY KEY (`id_parametro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Procedimiento` (
    `id_procedimiento` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `tecnica` VARCHAR(50) NULL,
    `servicioId` INTEGER NOT NULL,
    `finalidadId` INTEGER NOT NULL,
    `cupsId` INTEGER NOT NULL,
    `areaId` INTEGER NULL,

    PRIMARY KEY (`id_procedimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Area` (
    `id_area` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(30) NOT NULL,
    `prestadorId` INTEGER NULL,

    PRIMARY KEY (`id_area`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prestador` (
    `id_prestador` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(12) NOT NULL,
    `nit` VARCHAR(30) NOT NULL,
    `razon_social` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Prestador_codigo_key`(`codigo`),
    PRIMARY KEY (`id_prestador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_identificacion` ENUM('CC', 'CE', 'CD', 'PA', 'SC', 'PE', 'RC', 'TI', 'CN', 'AS', 'MS') NOT NULL,
    `identificacion` VARCHAR(30) NOT NULL,
    `nombre` VARCHAR(30) NOT NULL,
    `cargo` VARCHAR(50) NOT NULL,
    `firma` VARCHAR(100) NULL,
    `rol` ENUM('Administrador', 'Facturacion', 'Bacteriologo', 'Auxiliar') NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `token` VARCHAR(500) NULL,
    `areaId` INTEGER NOT NULL,

    UNIQUE INDEX `Usuario_identificacion_key`(`identificacion`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresa` (
    `id_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `nit` VARCHAR(530) NOT NULL,
    `codigo` VARCHAR(20) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `sigla` VARCHAR(50) NOT NULL,
    `tipo` ENUM('Particular', 'Empresa', 'Eps', 'Esess') NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `municipioId` INTEGER NOT NULL,

    UNIQUE INDEX `Empresa_nit_key`(`nit`),
    PRIMARY KEY (`id_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contrato` (
    `id_contrato` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `fecha_inicio` DATE NOT NULL,
    `fecha_fin` DATE NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `empresaId` INTEGER NOT NULL,

    PRIMARY KEY (`id_contrato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acuerdo` (
    `id_acuerdo` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `precio` DECIMAL(10, 2) NOT NULL,
    `iva` DECIMAL(10, 2) NOT NULL,
    `procedimientoId` INTEGER NOT NULL,
    `contratoId` INTEGER NOT NULL,

    PRIMARY KEY (`id_acuerdo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Paciente` ADD CONSTRAINT `Paciente_paisId_fkey` FOREIGN KEY (`paisId`) REFERENCES `Pais`(`id_pais`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paciente` ADD CONSTRAINT `Paciente_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `Municipio`(`id_municipio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paciente` ADD CONSTRAINT `Paciente_epsId_fkey` FOREIGN KEY (`epsId`) REFERENCES `Eps`(`id_eps`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contrato`(`id_contrato`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id_paciente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resultado` ADD CONSTRAINT `Resultado_examenId_fkey` FOREIGN KEY (`examenId`) REFERENCES `Examen`(`id_examen`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resultado` ADD CONSTRAINT `Resultado_parametroId_fkey` FOREIGN KEY (`parametroId`) REFERENCES `Parametro`(`id_parametro`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Examen` ADD CONSTRAINT `Examen_procedimientoId_fkey` FOREIGN KEY (`procedimientoId`) REFERENCES `Procedimiento`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Examen` ADD CONSTRAINT `Examen_facturaId_fkey` FOREIGN KEY (`facturaId`) REFERENCES `Factura`(`id_factura`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Departamento` ADD CONSTRAINT `Departamento_paisId_fkey` FOREIGN KEY (`paisId`) REFERENCES `Pais`(`id_pais`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Municipio` ADD CONSTRAINT `Municipio_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `Departamento`(`id_departamento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicio` ADD CONSTRAINT `Servicio_prestadorId_fkey` FOREIGN KEY (`prestadorId`) REFERENCES `Prestador`(`id_prestador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicio` ADD CONSTRAINT `Servicio_tipo_servicioId_fkey` FOREIGN KEY (`tipo_servicioId`) REFERENCES `Tipo_Servicio`(`id_tipo_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tipo_Resultado` ADD CONSTRAINT `Tipo_Resultado_parametroId_fkey` FOREIGN KEY (`parametroId`) REFERENCES `Parametro`(`id_parametro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parametro` ADD CONSTRAINT `Parametro_procedimientoId_fkey` FOREIGN KEY (`procedimientoId`) REFERENCES `Procedimiento`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Procedimiento` ADD CONSTRAINT `Procedimiento_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Procedimiento` ADD CONSTRAINT `Procedimiento_finalidadId_fkey` FOREIGN KEY (`finalidadId`) REFERENCES `Finalidad`(`id_finalidad`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Procedimiento` ADD CONSTRAINT `Procedimiento_cupsId_fkey` FOREIGN KEY (`cupsId`) REFERENCES `Cups`(`id_cups`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Procedimiento` ADD CONSTRAINT `Procedimiento_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `Area`(`id_area`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Area` ADD CONSTRAINT `Area_prestadorId_fkey` FOREIGN KEY (`prestadorId`) REFERENCES `Prestador`(`id_prestador`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `Area`(`id_area`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresa` ADD CONSTRAINT `Empresa_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `Municipio`(`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acuerdo` ADD CONSTRAINT `Acuerdo_procedimientoId_fkey` FOREIGN KEY (`procedimientoId`) REFERENCES `Procedimiento`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acuerdo` ADD CONSTRAINT `Acuerdo_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contrato`(`id_contrato`) ON DELETE RESTRICT ON UPDATE CASCADE;
