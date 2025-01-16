/*
  Warnings:

  - You are about to drop the column `examensercioId` on the `estudios` table. All the data in the column will be lost.
  - You are about to drop the column `examenId` on the `tipos_resultados` table. All the data in the column will be lost.
  - You are about to drop the `examenes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `examenservicio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipos_examenes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paqueteId` to the `Estudios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `procedimientoId` to the `tipos_resultados` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `estudios` DROP FOREIGN KEY `Estudios_examensercioId_fkey`;

-- DropForeignKey
ALTER TABLE `examenes` DROP FOREIGN KEY `examenes_tipo_examenId_fkey`;

-- DropForeignKey
ALTER TABLE `examenservicio` DROP FOREIGN KEY `examenservicio_examenId_fkey`;

-- DropForeignKey
ALTER TABLE `examenservicio` DROP FOREIGN KEY `examenservicio_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `tipos_resultados` DROP FOREIGN KEY `tipos_resultados_examenId_fkey`;

-- AlterTable
ALTER TABLE `estudios` DROP COLUMN `examensercioId`,
    ADD COLUMN `paqueteId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tipos_resultados` DROP COLUMN `examenId`,
    ADD COLUMN `procedimientoId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `examenes`;

-- DropTable
DROP TABLE `examenservicio`;

-- DropTable
DROP TABLE `tipos_examenes`;

-- CreateTable
CREATE TABLE `paquetes` (
    `id_paquete` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `procedimientoId` INTEGER NOT NULL,
    `servicioId` INTEGER NOT NULL,

    PRIMARY KEY (`id_paquete`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procedimientos` (
    `id_procedimiento` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `unidad` VARCHAR(30) NOT NULL,
    `rango_biologico` VARCHAR(20) NOT NULL,
    `metodo` VARCHAR(30) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',

    PRIMARY KEY (`id_procedimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Estudios` ADD CONSTRAINT `Estudios_paqueteId_fkey` FOREIGN KEY (`paqueteId`) REFERENCES `paquetes`(`id_paquete`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `paquetes` ADD CONSTRAINT `paquetes_procedimientoId_fkey` FOREIGN KEY (`procedimientoId`) REFERENCES `procedimientos`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `paquetes` ADD CONSTRAINT `paquetes_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipos_resultados` ADD CONSTRAINT `tipos_resultados_procedimientoId_fkey` FOREIGN KEY (`procedimientoId`) REFERENCES `procedimientos`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;
