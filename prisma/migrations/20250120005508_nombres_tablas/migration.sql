/*
  Warnings:

  - You are about to drop the `Acuerdos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contratos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Empresas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Municipios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pacientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parametros` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prestadores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Servicios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tipo_Resultados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tipo_Servicio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Acuerdos` DROP FOREIGN KEY `Acuerdos_contratoId_fkey`;

-- DropForeignKey
ALTER TABLE `Acuerdos` DROP FOREIGN KEY `Acuerdos_procedimientoId_fkey`;

-- DropForeignKey
ALTER TABLE `Contratos` DROP FOREIGN KEY `Contratos_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `Empresas` DROP FOREIGN KEY `Empresas_municipioId_fkey`;

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
ALTER TABLE `Servicios` DROP FOREIGN KEY `Servicios_prestadorId_fkey`;

-- DropForeignKey
ALTER TABLE `Servicios` DROP FOREIGN KEY `Servicios_tipo_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `Tipo_Resultados` DROP FOREIGN KEY `Tipo_Resultados_parametroId_fkey`;

-- DropForeignKey
ALTER TABLE `areas` DROP FOREIGN KEY `areas_prestadorId_fkey`;

-- DropForeignKey
ALTER TABLE `facturas` DROP FOREIGN KEY `facturas_contratoId_fkey`;

-- DropForeignKey
ALTER TABLE `facturas` DROP FOREIGN KEY `facturas_pacienteId_fkey`;

-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `resultados` DROP FOREIGN KEY `resultados_parametroId_fkey`;

-- DropTable
DROP TABLE `Acuerdos`;

-- DropTable
DROP TABLE `Contratos`;

-- DropTable
DROP TABLE `Empresas`;

-- DropTable
DROP TABLE `Municipios`;

-- DropTable
DROP TABLE `Pacientes`;

-- DropTable
DROP TABLE `Parametros`;

-- DropTable
DROP TABLE `Prestadores`;

-- DropTable
DROP TABLE `Servicios`;

-- DropTable
DROP TABLE `Tipo_Resultados`;

-- DropTable
DROP TABLE `Tipo_Servicio`;

-- CreateTable
CREATE TABLE `pacientes` (
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

    UNIQUE INDEX `pacientes_identificacion_key`(`identificacion`),
    UNIQUE INDEX `pacientes_email_key`(`email`),
    PRIMARY KEY (`id_paciente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_servicio` (
    `id_tipo_servicio` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_tipo_servicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `municipios` (
    `id_municipio` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `departamentoId` INTEGER NOT NULL,

    PRIMARY KEY (`id_municipio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servicios` (
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
CREATE TABLE `tipo_resultados` (
    `id_tipo_resultado` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `parametroId` INTEGER NOT NULL,

    PRIMARY KEY (`id_tipo_resultado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parametros` (
    `id_parametro` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `metodo` VARCHAR(30) NOT NULL,
    `unidad` VARCHAR(30) NULL,
    `valor_referencia` VARCHAR(300) NULL,
    `procedimientoId` INTEGER NOT NULL,

    PRIMARY KEY (`id_parametro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prestadores` (
    `id_prestador` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(12) NOT NULL,
    `nit` VARCHAR(30) NOT NULL,
    `razon_social` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `prestadores_codigo_key`(`codigo`),
    PRIMARY KEY (`id_prestador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresas` (
    `id_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `nit` VARCHAR(530) NOT NULL,
    `codigo` VARCHAR(20) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `sigla` VARCHAR(50) NOT NULL,
    `tipo` ENUM('Particular', 'Empresa', 'Eps', 'Esess') NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `municipioId` INTEGER NOT NULL,

    UNIQUE INDEX `empresas_nit_key`(`nit`),
    PRIMARY KEY (`id_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contratos` (
    `id_contrato` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `fecha_inicio` DATE NOT NULL,
    `fecha_fin` DATE NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `empresaId` INTEGER NOT NULL,

    PRIMARY KEY (`id_contrato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acuerdos` (
    `id_acuerdo` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `precio` DECIMAL(10, 2) NOT NULL,
    `iva` DECIMAL(10, 2) NOT NULL,
    `procedimientoId` INTEGER NOT NULL,
    `contratoId` INTEGER NOT NULL,

    PRIMARY KEY (`id_acuerdo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `pacientes_paisId_fkey` FOREIGN KEY (`paisId`) REFERENCES `paises`(`id_pais`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `pacientes_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `municipios`(`id_municipio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `pacientes_epsId_fkey` FOREIGN KEY (`epsId`) REFERENCES `eps`(`id_eps`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facturas` ADD CONSTRAINT `facturas_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `contratos`(`id_contrato`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facturas` ADD CONSTRAINT `facturas_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes`(`id_paciente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultados` ADD CONSTRAINT `resultados_parametroId_fkey` FOREIGN KEY (`parametroId`) REFERENCES `parametros`(`id_parametro`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `municipios` ADD CONSTRAINT `municipios_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `departamentos`(`id_departamento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servicios` ADD CONSTRAINT `servicios_prestadorId_fkey` FOREIGN KEY (`prestadorId`) REFERENCES `prestadores`(`id_prestador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servicios` ADD CONSTRAINT `servicios_tipo_servicioId_fkey` FOREIGN KEY (`tipo_servicioId`) REFERENCES `tipo_servicio`(`id_tipo_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipo_resultados` ADD CONSTRAINT `tipo_resultados_parametroId_fkey` FOREIGN KEY (`parametroId`) REFERENCES `parametros`(`id_parametro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parametros` ADD CONSTRAINT `parametros_procedimientoId_fkey` FOREIGN KEY (`procedimientoId`) REFERENCES `procedimientos`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `areas` ADD CONSTRAINT `areas_prestadorId_fkey` FOREIGN KEY (`prestadorId`) REFERENCES `prestadores`(`id_prestador`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `empresas` ADD CONSTRAINT `empresas_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `municipios`(`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contratos` ADD CONSTRAINT `contratos_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acuerdos` ADD CONSTRAINT `acuerdos_procedimientoId_fkey` FOREIGN KEY (`procedimientoId`) REFERENCES `procedimientos`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acuerdos` ADD CONSTRAINT `acuerdos_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `contratos`(`id_contrato`) ON DELETE RESTRICT ON UPDATE CASCADE;
