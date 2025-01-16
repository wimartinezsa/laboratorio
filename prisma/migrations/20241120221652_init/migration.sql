/*
  Warnings:

  - You are about to alter the column `codigo` on the `prestadores` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `VarChar(12)`.
  - You are about to drop the column `tipo_procedimientoId` on the `procedimientos` table. All the data in the column will be lost.
  - You are about to drop the column `centro_costoId` on the `servicios` table. All the data in the column will be lost.
  - You are about to drop the `centro_costos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipo_procedimiento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipos_servicios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `autorizacion` to the `facturas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `via_ingreso` to the `facturas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cupsId` to the `procedimientos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalidadId` to the `Servicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grupo_servicio` to the `Servicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modalidad_atencion` to the `Servicios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_tipo_procedimientoId_fkey`;

-- DropForeignKey
ALTER TABLE `servicios` DROP FOREIGN KEY `Servicios_centro_costoId_fkey`;

-- DropForeignKey
ALTER TABLE `servicios` DROP FOREIGN KEY `Servicios_tipo_servicioId_fkey`;

-- AlterTable
ALTER TABLE `facturas` ADD COLUMN `autorizacion` VARCHAR(30) NOT NULL,
    ADD COLUMN `via_ingreso` ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14') NOT NULL;

-- AlterTable
ALTER TABLE `prestaciones` MODIFY `fecha_muestra` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `prestadores` MODIFY `codigo` VARCHAR(12) NOT NULL;

-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `tipo_procedimientoId`,
    ADD COLUMN `cupsId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `servicios` DROP COLUMN `centro_costoId`,
    ADD COLUMN `finalidadId` INTEGER NOT NULL,
    ADD COLUMN `grupo_servicio` ENUM('01', '02', '03', '04', '05') NOT NULL,
    ADD COLUMN `modalidad_atencion` ENUM('01', '02', '03', '04', '06', '07', '08', '09') NOT NULL;

-- DropTable
DROP TABLE `centro_costos`;

-- DropTable
DROP TABLE `tipo_procedimiento`;

-- DropTable
DROP TABLE `tipos_servicios`;

-- CreateTable
CREATE TABLE `Tipo_Servicio` (
    `id_tipo_servicio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_tipo_servicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `finalidad` (
    `id_finalidad` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',

    PRIMARY KEY (`id_finalidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cups` (
    `id_cups` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(30) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_cups`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Servicios` ADD CONSTRAINT `Servicios_tipo_servicioId_fkey` FOREIGN KEY (`tipo_servicioId`) REFERENCES `Tipo_Servicio`(`id_tipo_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicios` ADD CONSTRAINT `Servicios_finalidadId_fkey` FOREIGN KEY (`finalidadId`) REFERENCES `finalidad`(`id_finalidad`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_cupsId_fkey` FOREIGN KEY (`cupsId`) REFERENCES `cups`(`id_cups`) ON DELETE RESTRICT ON UPDATE CASCADE;
